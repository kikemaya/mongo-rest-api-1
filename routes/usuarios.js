"use strict"

const express = require("express");
// const jwt = require("jsonwebtoken")
// const config = require("config")
const bcrypt = require('bcrypt');
const router = express.Router()
const Joi = require("joi");

const verificarToken = require("./../middlewares/auth")
const Usuario = require("./../models/usuario_model")

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(10)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

async function listarUsuariosActivos() {
    let usuarios = await Usuario.find({ estado: true })
        .select({ nombre: 1, email: 1 })
    return usuarios
}
async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
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

router.get("/", verificarToken, verificarToken, (req, res) => {
    let resultado = listarUsuariosActivos()

    resultado
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(400).json({ error: err }))
})
router.post("/", (req, res) => {
    let body = req.body

    Usuario.findOne({ email: body.email }, (error1, user) => {
        if(error1) return res.status(500).json({ error1 })
        if (user) return res.status(400).json({ msg: "El usuario ya existe" })

        const { error } = schema.validate({ nombre: body.nombre, email: body.email })
        if (error) return res.status(400).json({ error })

        let resultado = crearUsuario(body)

        resultado
            .then(user => res.status(201).json({
                nombre: user.nombre,
                email: user.email
            }))
            .catch(error3 => res.status(400).json({ error: error3 }))
    })

})
router.put("/:email", verificarToken, (req, res) => {
    const { error, value } = schema.validate({ nombre: req.body.nombre })

    if (error) return res.status(400).json({ error })

    let resultado = actualizarUsuario(req.params.email, req.body)

    resultado
        .then(valor => res.status(201).json({
            nombre: valor.nombre,
            email: valor.email
        }))
        .catch(err => res.status(400).json({ error: err }))
})
router.delete("/:email", verificarToken, (req, res) => {
    let resultado = desactivarUsuario(req.params.email)

    resultado
        .then(valor => res.json({
            nombre: valor.nombre,
            email: valor.email
        }))
        .catch(err => res.status(400).json({ error: err }))
})

module.exports = router