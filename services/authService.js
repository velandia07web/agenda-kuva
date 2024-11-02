const { User, Rol } = require("../models");
const { encrypt, compare } = require("../utils/handlePassword");
const {
  tokenSign,
  tokenResetPassword,
  verifyTokenResetPassword,
} = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const sendMail = require("../email/email");
const ejs = require("ejs");
const path = require("path");

const registerUser = async function (body) {
  try {
    if (body.password !== body.verifyPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    const rol = await Rol.findOne({
      where: { name: "Comercial" },
    });

    if (!rol) {
      throw new Error("El rol proporcionado no existe");
    }

    const encryptedPassword = await encrypt(body.password);

    const newUser = await User.create({
      name: body.name, // Cambiar fullName por name
      lastName: body.lastName, // Agregar lastName
      email: body.email,
      password: encryptedPassword,
      idRol: rol.id,
      idCompany: body.idCompany, 
      active: true,
    });

    const token = await tokenSign(newUser);
    await newUser.update({ jwt: token });
    const userWithoutPassword = newUser.toJSON();
    delete userWithoutPassword.password;
    delete userWithoutPassword.jwt;
    delete userWithoutPassword.active;
    delete userWithoutPassword.failedAttempts;

    return { userWithoutPassword, token };
  } catch (error) {
    throw new Error(`Error al crear el user: ${error.message}`);
  }
};

const loginUser = async function (res, body) {
  try {
    const { password, email } = body;

    const user = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "password",
        "name",
        "lastName",
        "idRol",
        "email",
        "jwt",
        "active",
        "failedAttempts",
        "idCompany",
      ],
    });

    if (!user)
      return handleHttpError(res, "Correo o contraseña incorrectos", 401);

    if (!user.active)
      return handleHttpError(
        res,
        "Usuario desactivado. Contacte al administrador.",
        403
      );

    const check = await compare(password, user.password);
    if (!check) {
      user.failedAttempts += 1;
      await user.save();

      if (user.failedAttempts >= 5) {
        user.active = false;
        await user.save();
        return handleHttpError(
          res,
          "Usuario desactivado. Contacte al administrador.",
          403
        );
      }

      return handleHttpError(res, "Correo o contraseña incorrectos", 401);
    }

    user.failedAttempts = 0;
    await user.save();

    const token = await tokenSign(user);
    console.log("epaa", token);
    await user.update({ jwt: token });

    const userWithoutSensitiveData = user.toJSON();
    delete userWithoutSensitiveData.password;
    delete userWithoutSensitiveData.jwt;
    delete userWithoutSensitiveData.failedAttempts;

    return {
      token,
      user: userWithoutSensitiveData,
    };
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error.message}`);
  }
};

const logoutUser = async function (userId) {
  try {
    const user = await User.findByPk(userId.id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    await user.update({ jwt: null });

    return { message: "Sesión cerrada correctamente" };
  } catch (error) {
    throw new Error(`Error al cerrar sesión: ${error.message}`);
  }
};

const forgotPassword = async function (email) {
  try {
    const url = process.env.PUBLIC_URL;
    const user = await User.findOne({
      where: { email: email.email },
    });

    if (!user) {
      throw new Error("El email proporcionado no existe");
    }

    const token = await tokenResetPassword(user);
    const resetUrl = `${url}/cambio-contrasena/${token}`;

    const htmlTemplate = await ejs.renderFile(
      path.join(__dirname, "../email/templates/password.ejs"),
      { name: user.name, lastName: user.lastName, resetUrl }
    );

    await sendMail(user.email, "Restablecimiento de Contraseña", htmlTemplate);

    return {
      message: "Correo de restablecimiento de contraseña enviado correctamente",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al enviar el email");
  }
};

const resetPassword = async function (token, body) {
  try {
    const verifyToken = await verifyTokenResetPassword(token);
    if (!verifyToken) {
      throw new Error("El token no es válido");
    }

    const user = await User.findOne({
      where: { email: verifyToken.email },
    });
    if (!user) {
      throw new Error("El email proporcionado no existe");
    }

    if (body.password !== body.verifyPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    const encryptedPassword = await encrypt(body.password);

    await User.update(
      { password: encryptedPassword },
      { where: { email: verifyToken.email } }
    );

    return { message: "Cambio de contraseña exitoso" };
  } catch (error) {
    throw new Error(`Error al cambiar la contraseña: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
