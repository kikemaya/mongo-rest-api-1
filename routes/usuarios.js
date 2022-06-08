"use strict"
const express = require("express");
const router = express.Router()

const Usuario = require("./../models/usuario_model")

async function listarUsuariosActivos() {
    let usuarios = await Usuario.find({ estado: true })
    return usuarios
}
async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password,
    })

    return await usuario.save()
}
async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate({ email: email }, {
        $set: {
            nombre: body.nombre,
            password: body.password
        }
    }, { new: true })

    return usuario
}
async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({ email: email }, {
        $set: {
            estado: false
        }
    }, { new: true })

    return usuario
}

router.get("/", (req, res) => {
    let resultado = listarUsuariosActivos()

    resultado
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(400).json({ error: err }))
})
router.post("/", (req, res) => {
    let body = req.body
    let resultado = crearUsuario(body)

    resultado
        .then(user => res.status(201).json({ value: user }))
        .catch(err => res.status(400).json({ error: err }))
})
router.put("/:email", (req, res) => {
    let resultado = actualizarUsuario(req.params.email, req.body)

    resultado
        .then(valor => res.status(201).json({ valor: valor }))
        .catch(err => res.status(400).json({ error: err }))
})
router.delete("/:email", (req, res) => {
    let resultado = desactivarUsuario(req.params.email)

    resultado
        .then(valor => res.json({ usuario: valor }))
        .catch(err => res.status(400).json({ error: err }))
})

module.exports = router