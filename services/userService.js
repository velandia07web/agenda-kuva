const { User } = require('../models')
const { encrypt } = require('../utils/handlePassword')

const getAllUsers = async function () {
  try {
    return await User.findAndCountAll({
      attributes: { exclude: ['password'] }
    })
  } catch (error) {
    throw new Error(`Error al obtener los users: ${error.message}`)
  }
}

const getOneUser = async function (id) {
  try {
    return await User.findOne(
      {
        where: { id },
        attributes: { exclude: ['password'] }
      }
    )
  } catch (error) {
    throw new Error(`Error al obtener el User: ${error.message}`)
  }
}

const createUser = async function (body) {
  try {
    const encryptedPassword = await encrypt(body.password)

    const newUser = await User.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      cedula: body.cedula,
      phone: body.phone,
      password: encryptedPassword,
      idRol: body.idRol,
      idZone: body.idZone,
      active: body.active,
      state: "ACTIVO"
    })

    const userWithoutPassword = await User.findOne({
      where: { id: newUser.id },
      attributes: { exclude: ['password', 'jwt', 'active', 'failedAttempts'] }
    })

    return userWithoutPassword
  } catch (error) {
    throw new Error(`Error al crear el user: ${error.message}`)
  }
}

const updateUser = async function (id, body) {
  try {
    // Crear un objeto con los campos que se van a actualizar
    const updateData = {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      cedula: body.cedula,
      phone: body.phone,
      idRol: body.idRol,
      idZone: body.idZone,
      active: body.active,
      failedAttempts: body.failedAttempts

    }

    // Si la contraseña está presente en el body y no está vacía, encriptarla
    if (body.password && body.password.trim() !== '') {
      const encryptedPassword = await encrypt(body.password)
      updateData.password = encryptedPassword
    }

    // Actualizar el usuario solo con los campos presentes en updateData
    return await User.update(updateData, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el User: ${error.message}`)
  }
}

const deleteUser = async function (id) {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User con id ${id} no encontrado`);
    }

    const newState = user.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    const updatedCount = await User.update(
      { state: newState },
      { where: { id } }
    );
    if (updatedCount[0] === 0) {
      throw new Error(`No se pudo actualizar el estado del user con id ${id}`);
    }
    return { id, newState };
  } catch (error) {
    throw new Error(`Error al alternar el estado del User: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}
