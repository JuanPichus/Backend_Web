// server.js
// Este archivo configura y ejecuta el servidor web con Express para manejar el login.
const express = require("express"); // Importa el framework Express
const bodyParser = require("body-parser"); // Importa body-parser para leer datos de formularios
const db = require("./db"); // Importa la conexión a la base de datos
const path = require("path"); // Importa path para manejar rutas de archivos
const app = express(); // Crea una instancia de la aplicación Express

// Configura body-parser para leer datos codificados en URL (formularios)
app.use(bodyParser.urlencoded({ extended: true }));
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Ruta para manejar el inicio de sesión (POST)
app.post("/login", (req, res) => {
  const { usuario, contra } = req.body; // Obtiene usuario y contraseña del formulario
  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND contra = ?"; // Consulta SQL para verificar credenciales
  db.query(sql, [usuario, contra], (err, resultados) => {
    if (err) throw err; // Si hay error en la consulta, lanza excepción
    if (resultados.length > 0) {
      res.send("Inicio de sesión exitoso"); // Si hay resultados, login correcto
    } else {
      res.send("Credenciales incorrectas"); // Si no, credenciales incorrectas
    }
  });
});

// Ruta principal para servir el formulario de login
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html"); // Envía el archivo HTML de login
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
