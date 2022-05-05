//DESAFIO COMPLEMENTARIO - Interactuar con el HTML + Incorporar Eventos

class Formulario {
    constructor(nombre, telefono, mail){
    this.nombre = nombre;
    this.telefono = telefono;
    this.mail = mail;
    }
}

let listaClientes = [];
let buttonEnviar = document.querySelector("#btnEnviar");

const guardarCliente = () => {
    let nombre = document.querySelector(".nombre").value;
    let telefono = document.querySelector(".telefono").value;
    let mail = document.querySelector(".mail").value;

    const nuevoCliente = new Formulario(nombre, telefono, mail)
    if (nuevoCliente === null){
      alert("Completa todos los campos");
    }
    console.log(listaClientes.push(nuevoCliente));
    localStorage.setItem("nuevoCliente", JSON.stringify(nuevoCliente));
}

document.addEventListener('DOMContentLoaded', () => {
    let formulario = document.getElementsByTagName('fieldset');
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        formulario.reset()
    });
});

btnEnviar.addEventListener("click", (e) => {
    e.reset();
})