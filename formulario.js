//DESAFIO COMPLEMENTARIO - Interactuar con el HTML + Incorporar Eventos

class Formulario {
    constructor(nombre, telefono, mail, descripcion){
    this.nombre = nombre;
    this.telefono = telefono;
    this.mail = mail;
    this.descripcion = descripcion;
    }
}

let listaClientes = [];
let buttonEnviar = document.querySelector("#btnEnviar");

const guardarCliente = () => {
    let nombre = document.querySelector("#nombre").value;
    let telefono = document.querySelector("#telefono").value;
    let mail = document.querySelector("#mail").value;
    let descripcion = document.getElementsByClassName("#field").value;

    const nuevoCliente = new Formulario(nombre, telefono, mail, descripcion)
    listaClientes.push(nuevoCliente);
    return listaClientes
}

btnEnviar.addEventListener("click", (e) => {
    e.preventDefault()
    guardarCliente()
})