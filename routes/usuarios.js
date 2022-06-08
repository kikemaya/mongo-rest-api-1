"use strict"
const express = require("express");
const router = express.Router()

const Usuario = require("./../models/usuario_model")

router.get("/", (req, res) => {
    res.json("Listo el get de usuarios")
})

router.post("/", (req, res) => {
    let body = req.body
    let resultado = crearUsuario(body)

    resultado
        .then(user => res.status(201).json({ value: user }))
        .catch(err => res.status(400).json({ error: err }))
})

async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password,
    })

    return await usuario.save()
}

module.exports = router