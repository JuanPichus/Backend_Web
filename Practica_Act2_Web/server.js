const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
