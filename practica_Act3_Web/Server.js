const express = require("express");
const bodyParser = require("body-parser");
const db = require("./Db");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/login", (req, res) => {
  const { usuario, contra } = req.body;
  const sql = "SELECT * FROM usuarios WHERE usuario = ? AND contra = ?";
  db.query(sql, [usuario, contra], (err, resultados) => {
    if (err) throw err;
    if (resultados.length > 0) {
      res.send("Inicio de sesión exitoso");
    } else {
      res.send("Credenciales incorrectas");
    }
  });
});

app.post("/signin", (req, res) => {
  const { new_usuario, new_contra } = req.body;

  // Verificar si el usuario ya existe
  const sqlCheck = "SELECT * FROM usuarios WHERE usuario = ?";
  db.query(sqlCheck, [new_usuario], (err, resultados) => {
    if (err) throw err;
    if (resultados.length > 0) {
      return res.send("El usuario ya existe");
    } else {
      const sql = "INSERT INTO usuarios (usuario, contra) VALUES (?, ?)";
      db.query(sql, [new_usuario, new_contra], (err, resultados) => {
        if (err) throw err;
        if (resultados.affectedRows > 0) {
          res.send("Registro exitoso");
        } else {
          res.send("Error al registrar usuario");
        }
      });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
