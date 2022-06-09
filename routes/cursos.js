"use strict"
const express = require("express");
const router = express.Router()
// const Joi = require("joi")

const Curso = require("./../models/curso_model")

// const schema = Joi.object({
// })

async function listarCursosActivos() {
    let cursos = await Curso.find({ estado: true })
    return cursos
}
async function crearCurso(body) {
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion
    })

    return await curso.save()
}
async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true })

    return curso
}
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true })

    return curso
}

router.get("/", (req, res) => {
    let resultado = listarCursosActivos()

    resultado
        .then(courses => res.status(200).json({ courses }))
        .catch(err => res.status(400).json({ error: err }))
})
router.post("/", (req, res) => {
    let body = req.body

    let resultado = crearCurso(body)

    resultado
        .then(course => res.status(201).json({ value: course }))
        .catch(error => res.status(400).json({ error }))
})
router.put("/:id", (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body)

    resultado
        .then(curso => res.status(201).json({ curso }))
        .catch(err => res.status(400).json({ error: err }))
})
router.delete("/:id", (req, res) => {
    let resultado = desactivarCurso(req.params.id)

    resultado
        .then(curso => res.status(201).json({ curso }))
        .catch(error => res.status(400).json({ error }))
})

module.exports = router