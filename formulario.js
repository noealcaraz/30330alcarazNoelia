//DESAFIO COMPLEMENTARIO - Interactuar con el HTML + Incorporar Eventos

class Formulario {
    constructor(nombre, telefono, mail){
    this.nombre = nombre;
    this.telefono = telefono;
    this.mail = mail;
    }
}

let buttonEnviar = document.querySelector("#btnEnviar");

const guardarCliente = () => {
    let nombre = document.querySelector(".nombre").value;
    let telefono = document.querySelector(".telefono").value;
    let mail = document.querySelector(".mail").value;
    let nuevoCliente = new Formulario(nombre, telefono, mail)

    const clientesActuales = localStorage.getItem('listaDeClientes')

    if (!clientesActuales) {
      const listaDeClientes = [nuevoCliente]
      localStorage.setItem("listaDeClientes", JSON.stringify(listaDeClientes));
    } else {
      const listaExistente = JSON.parse(clientesActuales);
      const listaNueva = listaExistente.concat(nuevoCliente);
      localStorage.setItem("listaDeClientes", JSON.stringify(listaNueva));
    }
}

const imprimirClientes = () => {
  const listaDeClientes = localStorage.getItem('listaDeClientes')
  if (listaDeClientes) {
    const clientes = JSON.parse(listaDeClientes)
    clientes.forEach(cliente => {
      console.log(cliente.nombre)
    })
  }
}

const clickEnviar = (e) => {
  let nombre = document.querySelector(".nombre").value;
  let telefono = document.querySelector(".telefono").value;
  let mail = document.querySelector(".mail").value;
  if (!nombre || !telefono || !mail) {
    swal("", "Debes completar todos los campos", "warning");
    return
  }
  //aca ya sabemos que nombre, telefono y mail no son null
  const regexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const emailValido = mail.match(regexp)
  if (!emailValido) {
    swal("", "El email no es valido", "warning");
    return
  }
    swal("¡Muchas gracias!", "A la brevedad nos contactaremos", "success");
}

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault()
    clickEnviar();
    guardarCliente();
    imprimirClientes();
})

