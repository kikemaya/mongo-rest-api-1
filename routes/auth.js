"use strict"
const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router()

const Usuario = require("./../models/usuario_model")

router.post("/", (req, res) => {
    Usuario.findOne({ email: req.body.email })
        .then(data => {
            if(!data) return res.status(400).json({ msg: "Usuario ò contraseña incorrecto..." })
            
            const correctPass = bcrypt.compareSync(req.body.password, data.password)
            
            if(!correctPass) return res.status(400).json({error: "Ok", msg: "Usuario ò contraseña incorrecto..."})
            
            return res.json(data)
        })
        .catch(error => res.status(500).json({ msg: "Error en el servicio...", error: error, }))
})

module.exports = router