// Archivo Db.js: Configuración y conexión a la base de datos MySQL
const mysql = require("mysql");
// Se crea la conexión con los datos de acceso a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_db",
});

// Se intenta conectar a la base de datos y se muestra un mensaje en consola
// si la conexión es exitosa o lanza un error si falla
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

// Se exporta la conexión para ser utilizada en otros archivos
module.exports = db;
