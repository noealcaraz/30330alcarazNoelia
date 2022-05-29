// - SEGUNDA ENTREGA DEL PROYECTO FINAL -
const container = document.querySelector(".container")

const cargarCards = () => {
    fetch ("productos.json")
        .then(response => response.json())
        .then(result => {
            let products = result
            products.forEach(card => {
                container.innerHTML += `
                <div class="card" style="width: 18rem" id="card01">
                <img src="${card.imagen}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${card.producto}</h5>
                    <p class="card-text">$${card.precio}</p>
                    <button class="agregar-carrito">${card.boton}</button>
                </div>
            </div>
                `
            })
            const aniadir = document.querySelectorAll(".agregar-carrito");
            for (let i=0; i < aniadir.length; i++) {
                let boton = aniadir[i];
                boton.addEventListener("click", agregarCarrito);
            }
        }
        )
        .catch(error => console.log(error))
        
}

cargarCards()

//Buscador

const buscador = document.querySelector("#buscador");
const buscar = document.querySelector("#buscar");
const resultado = document.querySelector("#resultado");

const filtrar = () => {
    // console.log(buscador.value);
    resultado.innerHTML = '';

    const texto = buscador.value.toLowerCase();

    for (let producto of productos) {
        let nombre = producto.nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <li>${producto.nombre} - Valor: $${producto.valor}</li>
            `
        }
        
    }
    if(resultado.innerHTML === ''){
            resultado.innerHTML += `
                <li>Producto no encontrado...</li>
            `
    }
    
}
buscar.addEventListener('click', filtrar);


// Constantes
const cart = document.querySelector("#cart");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
const cerrarBtn = document.querySelector("#close-btn");
const aniadir = document.querySelectorAll(".agregar-carrito"); 


//abrir el carrito
cart.addEventListener("click",()=>{
    cartModalOverlay.classList.add("open");
});

//cerrar el carrito
cerrarBtn.addEventListener("click",()=>{
    cartModalOverlay.classList.remove("open");
})
cartModalOverlay.addEventListener("click", (e)=>{
    if(e.target.classList.contains("cart-modal-overlay")){
        cartModalOverlay.classList.remove("open");
    }
})

//asignarle a cada boton, su funcion
for (let i=0; i < aniadir.length; i++) {
    let boton = aniadir[i];
    boton.addEventListener("click", agregarCarrito);
}

function agregarCarrito(e) {
  let boton = e.target;
  let card = boton.parentElement.parentElement;
  let prodId = card.getAttribute("id");
  let prodName = card.querySelector(".card-title").innerText;
  let price = card.querySelector(".card-text").innerText;
  let imageSrc = card.querySelector(".card-img-top").src;

  agregarElem(prodId, prodName, price, imageSrc);
}

function agregarElem(prodId, prodName, price, imageSrc){
    let productRow = document.createElement("div");
    let productRows = document.querySelector(".product-rows");
    let prodArray = document.getElementsByClassName("product-rows");

    //chequeo de si el producto se añadió o no
    for(let i=0; i < prodArray.length; i++) {
        if(prodArray[i].getAttribute("id")== prodId) {
            swal("¡Este producto ya existe en el carrito!");
            return;
        } else {
            swal("¡Producto añadido al carrito con éxito!");
        }
    }
    //inyectar el html al carrito
    let cartRowItem = `
        <div class="product-row" id="${prodId}">
            <img class="cart-image" src="${imageSrc}">
            <span>${prodName}</span>
            <span class="cart-price" >${price}</span>
            <input class="product-quantity" type="number" value="1">
            <button class="remove-btn">Borrar</button>
        </div>
    `
    productRow.innerHTML = cartRowItem;
    productRows.append(productRow);
    productRow.querySelector(".remove-btn").addEventListener("click", removeItem);
    productRow.querySelector(".product-quantity").addEventListener("change", cambiarCantidad)
    updatePrice();

}

//eliminar elementos
function removeItem(e) {
    let btnCliked = e.target;
    btnCliked.parentElement.parentElement.remove();
    updatePrice();
}

//cambiar cantidades
function cambiarCantidad(e){
    let cantidad = e.target.value;
    if(isNaN(cantidad) || cantidad <= 0) {
        cantidad = 1;
    }
    updatePrice();
}

//actualizar el total
function updatePrice() {
  const productRowsDiv = document.getElementById("product-rows");
  const productRows = productRowsDiv.querySelectorAll(".product-row")
  let total = 0;
  for (const producto of productRows) {
      let price = parseFloat(producto.querySelector(".cart-price").innerText.replace("$","").replace(/\./g, '').replace(',', '.'));
      let cantidad = producto.querySelector(".product-quantity").value;
      console.log({price, cantidad})
      total += price * cantidad;
      console.log({total})
  }

  document.querySelector(".total-price").innerText = "$" + total;
  document.querySelector(".cart-quantity").textContent = productRows.length;
}




// const carrito = document.querySelector('.carrito');
// const contenedorCarrito = document.querySelector('.lista-carrito tbody');
// const vaciarCarritoBtn = document.querySelector('#boton');
// const listaProductxs = document.querySelector('.lista-productos');
// let total = document.querySelector('.total');
// let articulosCarrito = [];

// class Producto {
//     constructor(id, nombre, precio) {
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = parseFloat(precio);
//         this.vendido = false;
//     }
// }

// const cargarEventListeners = () => {
//     //Agrego producto al hacer click en "Añadir al carrito"
//     listaProductxs.addEventListener('click', agregarProducto);

//     //Elimino productos del carrito
//     carrito.addEventListener('click', eliminarProducto);

//     //Muestra los productos del local storage
//     document.addEventListener('DOMContentLoaded', () => {
//         articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

//         carritoHTML();
//     })

//     //Vaciar el carrito
//     vaciarCarritoBtn.addEventListener('click', () => {
//         articulosCarrito = [];
//         localStorage.removeItem('carrito');
//         limpiarHTML();
//         console.clear();
//         console.log(articulosCarrito);
//     });
// }


//Funciones

// function agregarProducto(e) { 
//     e.preventDefault();
//     if (e.target.classList.contains('agregar-carrito')) {
//         const productoSeleccionado = e.target.parentElement.parentElement;
//         leerDatosProducto(productoSeleccionado);
//     }
// }

// //Elimina un producto del carrito
// function eliminarProducto(e) {
//     if (e.target.classList.contains('borrar-producto')) {
//         const productoId = e.target.getAttribute('data-id');
//         articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
//         console.clear();
//         console.log(articulosCarrito);
//         carritoHTML();
//     }
// }

// function leerDatosProducto(producto) {
//     const id = producto.querySelector('a').getAttribute('data-id');
//     const nombre = producto.querySelector('card-title').textContent;
//     const precio = producto.querySelector('#card-text').textContent;

//     const infoProducto = new Producto(id, nombre, precio);

//     infoProducto.subtotal = Number(infoProducto.precio.replace('$', '')) * infoProducto.cantidad;

//     //Revisa si un elemento ya existe en el carrito
//     const siExiste = articulosCarrito.some(producto => producto.id === infoProducto.id);
//     if (siExiste) {
//         const productos = articulosCarrito.map(producto => {
//             if (producto.id === infoProducto.id) {
//                 producto.cantidad++;
//                 producto.subtotal = Number(producto.precio.replace('$', '')) * producto.cantidad;
//                 return producto;
//             } else {
//                 return producto;
//             }
//         });

//         articulosCarrito = [...productos];


//     } else {
//         articulosCarrito = [...articulosCarrito, infoProducto];
//     }

//     console.log(articulosCarrito);

//     carritoHTML();
// }

// function carritoHTML() {
//     limpiarHTML();

//     articulosCarrito.forEach(producto => {
//         const { imagen, nombre, precio, cantidad, subtotal, id } = producto;
//         const fila = document.createElement('tr');
//         fila.innerHTML = `
//             <td>
//                 <img src="${imagen}" width="100">
//             </td>
//             <td>${nombre}</td>
//             <td>${precio}</td>
//             <td>${cantidad}</td>
//             <td>$${subtotal}</td>
//             <td>
//                 <a href="#" class="borrar-producto" data-id="${id}"> X </a>
//             </td>
//         `;

//         contenedorCarrito.appendChild(fila);
//     });

//     sincronizarStorage();

// }

// function sincronizarStorage() {
//     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
// }

// function limpiarHTML() {
//     while (contenedorCarrito.firstChild) {
//         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
//     }

//     total.innerHTML = `Total : $${totalGeneral()}`;
// }

// function totalGeneral() {
//     let productoTotal = articulosCarrito.reduce((total, producto) => total + producto.subtotal, 0);
//     console.log(`Total : $${productoTotal}`);

//     return productoTotal;
// }

// //Calcular stock 
// // venta(cantidad); {
// //     this.vendido = true;
// //     if ((cantidad <= this.stoc k) && (this.stock >= 1)) {
// //         this.stock -= cantidad;
// //         alert(`Producto ${this.nombre} añadido al carrito con éxito!`);
// //     } else if (cantidad > this.stock) {
// //         alert(`Lo sentimos. En este momento contamos con ${this.stock} productos`)
// //     } else if (this.stock <= 0) {
// //         alert(`No hay stock del producto.`)
// //     } else {
// //         alert(`La cantidad que ingreso no es válida. Por favor ingrese la cantidad que desea.`)
// //     }
// // }

// //Eleccion de producto mediante alert
// const bienvenida = () => {
//     seleccion = prompt('Por favor ingrese el producto que desea: \n 1-Cubre Botas \n 2-Pollerin S \n 3-Pollerin M \n 4-Pollerin L \n Para salir oprima "Cancel"');
//     if (seleccion >= 5 && seleccion <= 0) {
//         alert('Por favor elegí una de las opciones brindadas')
//     }

//     productoElegido = listaProductos[seleccion -= 1].nombre
//     return productoElegido

// }

// //Calcular productos añadidos al carrito
// const productosCantidad = () => {
//     cantidad = prompt(`El valor unitario de ${producto} es de $${listaProductos[seleccion].precio}. Ingresa la cantidad que deseas añadir al carrito `)
//     productoSubT = listaProductos[seleccion].precio * cantidad;
//     console.log(carritox.push(producto, cantidad, productoSubT));
//     if (confirm`Producto ${this.nombre} añadido con éxito! Deseas agregar más?` === true) {
//         productosCantidad()
//     } else {
//         alert(`Chequea tus productos añadidos en la consola.`)
//     }
// }

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




