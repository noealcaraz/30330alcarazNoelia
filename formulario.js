//DESAFIO COMPLEMENTARIO - Interactuar con el HTML + Incorporar Eventos

class Formulario {
    constructor(nombre, telefono, mail){
    this.nombre = nombre;
    this.telefono = telefono;
    this.mail = mail;
    }
}

let listaClientes =  [];
let buttonEnviar = document.querySelector("#btnEnviar");

const guardarCliente = () => {
    let nombre = document.querySelector(".nombre").value;
    let telefono = document.querySelector(".telefono").value;
    let mail = document.querySelector(".mail").value;

    let nuevoCliente = new Formulario(nombre, telefono, mail)    

    if (localStorage.getItem('clientes') == null) {
      listaClientes.push(nuevoCliente);
      localStorage.setItem("nuevoCliente", JSON.stringify(nuevoCliente));
    } else {
      const listaNueva = JSON.parse(localStorage.getItem("clientes"));
      listaNueva.push(nuevoCliente);
      localStorage.setItem("clientes", JSON.stringify(listaNueva));
    }
}


btnEnviar.addEventListener("click", (e) => {
    guardarCliente();
    e.reset();
})