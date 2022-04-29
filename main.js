// - SEGUNDA ENTREGA DEL PROYECTO FINAL -
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductxs = document.querySelector('#lista-productos');
let total = document.querySelector('#total');
let articulosCarrito = [];

class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.vendido = false;
    }
}

const cargarEventListeners = () => {
    //Agrego producto al hacer click en "Añadir al carrito"
    listaProductxs.addEventListener('click', agregarProducto);

    //Elimino productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    //Muestra los productos del local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        localStorage.removeItem('carrito');
        limpiarHTML();
        console.clear();
        console.log(articulosCarrito);
    });
}


//Funciones

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

//Elimina un producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        console.clear();
        console.log(articulosCarrito);
        carritoHTML();
    }
}

function leerDatosProducto(producto) {
    const id = producto.querySelector('a').getAttribute('data-id');
    const nombre = producto.querySelector('card-title').textContent;
    const precio = producto.querySelector('#card-text').textContent;

    const infoProducto = new Producto(id, nombre, precio);

    infoProducto.subtotal = Number(infoProducto.precio.replace('$', '')) * infoProducto.cantidad;

    //Revisa si un elemento ya existe en el carrito
    const siExiste = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (siExiste) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                producto.subtotal = Number(producto.precio.replace('$', '')) * producto.cantidad;
                return producto;
            } else {
                return producto;
            }
        });

        articulosCarrito = [...productos];


    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach(producto => {
        const { imagen, nombre, precio, cantidad, subtotal, id } = producto;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>$${subtotal}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(fila);
    });

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    total.innerHTML = `Total : $${totalGeneral()}`;
}

function totalGeneral() {
    let productoTotal = articulosCarrito.reduce((total, producto) => total + producto.subtotal, 0);
    console.log(`Total : $${productoTotal}`);

    return productoTotal;
}

//Calcular stock 
// venta(cantidad); {
//     this.vendido = true;
//     if ((cantidad <= this.stoc k) && (this.stock >= 1)) {
//         this.stock -= cantidad;
//         alert(`Producto ${this.nombre} añadido al carrito con éxito!`);
//     } else if (cantidad > this.stock) {
//         alert(`Lo sentimos. En este momento contamos con ${this.stock} productos`)
//     } else if (this.stock <= 0) {
//         alert(`No hay stock del producto.`)
//     } else {
//         alert(`La cantidad que ingreso no es válida. Por favor ingrese la cantidad que desea.`)
//     }
// }

//Eleccion de producto mediante alert
const bienvenida = () => {
    seleccion = prompt('Por favor ingrese el producto que desea: \n 1-Cubre Botas \n 2-Pollerin S \n 3-Pollerin M \n 4-Pollerin L \n Para salir oprima "Cancel"');
    if (seleccion >= 5 && seleccion <= 0) {
        alert('Por favor elegí una de las opciones brindadas')
        bienvenida()
    }

    productoElegido = listaProductos[seleccion -= 1].nombre
    return productoElegido

}

//Calcular productos añadidos al carrito
const productosCantidad = () => {
    cantidad = prompt(`El valor unitario de ${producto} es de $${listaProductos[seleccion].precio}. Ingresa la cantidad que deseas añadir al carrito `)
    productoSubT = listaProductos[seleccion].precio * cantidad;
    console.log(carritox.push(producto, cantidad, productoSubT));
    if (confirm`Producto ${this.nombre} añadido con éxito! Deseas agregar más?` === true) {
        productosCantidad()
    } else {
        alert(`Chequea tus productos añadidos en la consola.`)
    }
}

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




