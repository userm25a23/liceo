const express = require("express");
const { rutas } = require("./rutas.js");
const path = require("node:path");
const bodyParse = require("body-parser");

const app = express();

//configuraciones de app
app.set("views", path.join(__dirname, "publicos", "plantillas"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "publicos")))
app.use(rutas);


const puerto = process.env.PORT || 4000;


module.exports = { app, puerto }