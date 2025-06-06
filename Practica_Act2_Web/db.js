// db.js
// Este archivo configura y establece la conexión a la base de datos MySQL.
// Se importa el módulo mysql para manejar la base de datos.
const mysql = require("mysql");
// Se crea la conexión con los parámetros de la base de datos.
const db = mysql.createConnection({
  host: "localhost", // Dirección del servidor de la base de datos
  user: "root", // Usuario de la base de datos
  password: "", // Contraseña del usuario
  database: "login_db", // Nombre de la base de datos
});

// Se establece la conexión y se maneja el error si ocurre.
db.connect((err) => {
  if (err) throw err; // Si hay error, se lanza una excepción
  console.log("Connected to the database"); // Mensaje de éxito
});

// Se exporta la conexión para usarla en otros archivos.
module.exports = db;
