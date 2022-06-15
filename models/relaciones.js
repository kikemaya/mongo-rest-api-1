//Por referencia. Como la normalizacion 
// -Consultas consistentes. Las modificaciones no afectan la relacion
let usuario = {
    id: "U0001",
    nombre: "Enrique",
    email: "mail@email.com"
}
let curso = {
    id: "C0001",
    id_alumnos: ["U0001", "U0002", "U0003"],
    titulo: "JavaScript Moderno",
    descripcion: "xxxx"
}

//Relaciones por documentos embebidos ò sub documentos (Desnormalizaciòn)
// - Mejor performance, la consistencia se pierde :'v
let curso = {
    id: "C0001",
    autor: {
        nombre: "Enrique Maya",
        email: "kike@mail.com"
    },
    id_alumnos: [
        { id: "U0001", nombre: "Kikin", email: "mail@mail.com" },
        { id: "U0002", nombre: "Pamela", email: "pam@mail.com" },
        { id: "U0003", nombre: "Samantha", email: "sam@mail.com" },
    ],
    titulo: "JavaScript Moderno",
    descripcion: "xxxx"
}