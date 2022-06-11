"use strict"
const express = require("express")
const mongoose = require("mongoose")

const auth = require("./routes/auth")
const usuarios = require("./routes/usuarios")
const cursos = require("./routes/cursos")

const PORT = process.env.PORT || 5000
const app = new express()

mongoose.connect("mongodb://localhost:27017/demo")
    .then(() => console.log("Conectado a MongoDB..."))
    .catch(error => console.error("No se pudo conectar con MongoDB...", error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth", auth)
app.use("/api/v1/usuarios", usuarios)
app.use("/api/v1/cursos", cursos)

app.get('/', (req, res) => res.send("API listening..."))

app.listen(PORT, () => console.log('Listening at: ' + PORT + '...'))