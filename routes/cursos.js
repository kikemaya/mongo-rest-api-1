"use strict"
const express = require("express");

const router = express.Router()

router.get("/", (req, res) => {
    res.json("Listo el get de cursos")
})

module.exports = router