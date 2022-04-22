//Calcular pagos en cuotas sobre un monto determinado

function calcularCuotas() {
    let importeTotal = parseInt(prompt('Ingrese el importe total a calcular'));
    let cantidadCuotas = parseInt(prompt('¿Quiere aplicar 3, 6 o 12 cuotas sin interes?'));
    let resultadoCuotas = importeTotal / cantidadCuotas;

    while (isNaN(importeTotal)) {
        importeTotal = prompt('El dato que ingreso no es valido. Ingrese el importe total a calcular');
    }
    if (cantidadCuotas != 3 && cantidadCuotas != 6 && cantidadCuotas != 12) {
        alert('la cantidad de cuotas no es válida')
    } else if (cantidadCuotas === 3) {
        alert(`Usted pagará $${importeTotal} en ${cantidadCuotas} cuotas de $${resultadoCuotas}`)
    } else if (cantidadCuotas === 6) {
        alert(`Usted pagará $${importeTotal} en ${cantidadCuotas} cuotas de $${resultadoCuotas}`)
    } else if (cantidadCuotas === 12) {
        alert(`Usted pagará $${importeTotal} en ${cantidadCuotas} cuotas de $${resultadoCuotas}`)
    }
}

// - PRIMERA ENTREGA DEL PROYECTO FINAL -

class Producto {
    constructor(nombre, stock, precio) {
        this.nombre = nombre;
        this.stock = parseInt(stock);
        this.precio = parseFloat(precio);
        this.vendido = false;
    }

    venta() {
        this.vendido = true;
        if ((cantidad <= this.stock) && (this.stock >= 1)) {
            this.stock -= cantidad;
            alert(`Producto ${this.nombre} añadido al carrito con éxito!`);
        } else if (cantidad > this.stock) {
            alert(`Lo sentimos. En este momento contamos con ${this.stock} productos`)
        } else if (this.stock <= 0) {
            alert(`No hay stock del producto.`)
        } else {
            alert(`La cantidad que ingreso no es válida. Por favor ingrese la cantidad que desea.`)
        }
    }
}


//Productos
const cubreBotas = new Producto('Cubre Botas', 20, 900);
const pollerinS = new Producto('Pollerin talle S', 20, 1500);
const pollerinM = new Producto('Pollerin talle M', 20, 1500);
const pollerinL = new Producto('Pollerin talle L', 20, 1500);

//Arrays
let listaProductos = [cubreBotas, pollerinS, pollerinM, pollerinL];
let carrito = [];

//Variables
let seleccion
let cantidad
let producto

//Funciones

const bienvenida = () => {
    seleccion = prompt('Por favor ingrese el producto que desea: \n 1-Cubre Botas \n 2-Pollerin S \n 3-Pollerin M \n 4-Pollerin L \n Para salir oprima "Cancel"');
    if (seleccion >= 5 && seleccion <= 0) {
        alert('Por favor elegí una de las opciones brindadas')
        bienvenida()
    } 

    productoElegido = listaProductos[seleccion -= 1].nombre
    return productoElegido

}

const productosCantidad = () => {
    cantidad = prompt(`El valor unitario de ${producto} es de $${listaProductos[seleccion].precio}. Ingresa la cantidad que deseas añadir al carrito `)
    productoSubT = listaProductos[seleccion].precio * cantidad;
    console.log(carrito.push(producto, cantidad, productoSubT));
    if (confirm`Producto ${this.nombre} añadido con éxito! Deseas agregar más?` === true) {
        productosCantidad()
    } else {
        alert(`Chequea tus productos añadidos en la consola.`)
    }
}


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

buttonEnviar.addEventListener ("click", (e) => {
    e.preventDefault()
    guardarCliente()
})
