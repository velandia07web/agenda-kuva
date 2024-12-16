const authcontroller = require('../controllers/authController')
const authMiddleware = require('../middlewares/session')
const { Router } = require('express')
const { validatorCreateItem, validatorLogin, validatorLogout, validatorForgotPassword } = require('../validators/auth')
const router = Router()

router
  .post("/resetPassword/:token", authcontroller.resetPassword)
  .post('/register', validatorCreateItem, authcontroller.registerUsers)
  .post('/login', validatorLogin, authcontroller.loginUsers)
  .post('/:id', authMiddleware(), validatorLogout, authcontroller.logoutUser)
  .post('/', validatorForgotPassword, authcontroller.forgotPassword)
  .get('/reset-password', (req, res) => {
    const token = req.query.token;
  
    if (!token) {
      return res.status(400).send("El token es requerido para restablecer la contraseña.");
    }
  
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Restablecer Contraseña</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
          }
          h1 {
            text-align: center;
            font-size: 24px;
            color: #333;
          }
          form {
            display: flex;
            flex-direction: column;
          }
          input {
            margin-bottom: 15px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            padding: 10px;
            background: #fbb03b;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
          button:hover {
            background: #e0a32b;
          }
          .error {
            color: red;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Restablecer Contraseña</h1>
          <div class="error" id="errorMessage"></div>
          <form id="resetPasswordForm">
            <input type="password" id="password" placeholder="Nueva Contraseña" required />
            <input type="password" id="verifyPassword" placeholder="Confirmar Contraseña" required />
            <button type="submit">Restablecer</button>
          </form>
        </div>
        <script>
          document.getElementById("resetPasswordForm").addEventListener("submit", async (event) => {
            event.preventDefault();
  
            const password = document.getElementById("password").value;
            const verifyPassword = document.getElementById("verifyPassword").value;
  
            if (password !== verifyPassword) {
              document.getElementById("errorMessage").textContent = "Las contraseñas no coinciden.";
              return;
            }
  
            const token = "${token}"; // Token obtenido de la URL
            const response = await fetch("/api/auth/resetPassword/" + token, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ password, verifyPassword }),
            });
  
            const data = await response.json();
            if (response.ok) {
              alert("Contraseña restablecida con éxito");
              window.location.href = "/login"; // Redirige al login tras éxito
            } else {
              document.getElementById("errorMessage").textContent = data.message || "Error al restablecer la contraseña.";
            }
          });
        </script>
      </body>
      </html>
    `);
  });
  

module.exports = router

