// Archivo Server.js: Servidor principal con Express para login y registro de usuarios
// Se importan los módulos necesarios
const express = require("express"); // Framework para crear el servidor web
const bodyParser = require("body-parser"); // Middleware para procesar datos de formularios
const db = require("./Db"); // Conexión a la base de datos MySQL
const path = require("path"); // Módulo para manejar rutas de archivos
const app = express(); // Se crea una instancia de la aplicación Express

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Ruta POST para el inicio de sesión de usuarios
app.post("/login", (req, res) => {
  // Se extraen los datos enviados desde el formulario de login
  const { usuario, contra } = req.body;
  // Consulta SQL para buscar un usuario con el nombre y contraseña proporcionados
  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND contra = ?";
  db.query(sql, [usuario, contra], (err, resultados) => {
    if (err) throw err; // Si hay error en la consulta, se lanza una excepción
    // Si la consulta devuelve al menos un resultado, las credenciales son correctas
    if (resultados.length > 0) {
      res.send("Inicio de sesión exitoso"); // Respuesta positiva al cliente
    } else {
      res.send("Credenciales incorrectas"); // Respuesta negativa al cliente
    }
  });
});

// Ruta POST para el registro de nuevos usuarios
app.post("/signin", (req, res) => {
  // Se extraen los datos enviados desde el formulario de registro
  const { new_usuario, new_contra } = req.body;

  // Consulta SQL para verificar si el usuario ya existe en la base de datos
  const sqlCheck = "SELECT * FROM usuarios WHERE usuario = ?";
  db.query(sqlCheck, [new_usuario], (err, resultados) => {
    if (err) throw err; // Si hay error en la consulta, se lanza una excepción
    if (resultados.length > 0) {
      // Si el usuario ya existe, se notifica al cliente
      return res.send("El usuario ya existe");
    } else {
      // Si el usuario no existe, se inserta el nuevo usuario en la base de datos
      const sql = "INSERT INTO usuarios (usuario, contra) VALUES (?, ?)";
      db.query(sql, [new_usuario, new_contra], (err, resultados) => {
        if (err) throw err; // Si hay error al insertar, se lanza una excepción
        // Si la inserción fue exitosa (al menos una fila afectada)
        if (resultados.affectedRows > 0) {
          res.send("Registro exitoso"); // Se notifica al cliente
        } else {
          res.send("Error al registrar usuario"); // Si no se pudo registrar
        }
      });
    }
  });
});

// Ruta GET principal para servir el formulario de login al usuario
app.get("/", (req, res) => {
  // Se envía el archivo HTML de login ubicado en la carpeta 'public'
  res.sendFile(__dirname + "/public/login.html");
});

// Se inicia el servidor en el puerto 3000 y se muestra un mensaje en consola
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
