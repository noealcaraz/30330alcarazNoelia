//Cargar cards

const container = document.querySelector(".container")
let productos

const cargarCards = () => {
    fetch("productos.json")
        .then(response => response.json())
        .then(result => {
          productos = result
          productos.forEach(producto => {
              container.innerHTML += generarCardDeProducto(producto)
          })
          agregarEventoComprar()
        })
        .catch(error => console.log(error))
        
}

const agregarEventoComprar = () => {
    const aniadir = document.querySelectorAll(".agregar-carrito");
    for (let i=0; i < aniadir.length; i++) {
        let boton = aniadir[i];
        boton.addEventListener("click", agregarCarrito);
    }
}

const generarCardDeProducto = (producto) => {
  return `
  <div class="card" style="width: 18rem" id="${producto.id}">
    <img src="${producto.imagen}" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <button class="agregar-carrito">${producto.boton}</button>
    </div>
  </div>`
}

cargarCards()

//Buscador

const buscador = document.querySelector("#buscador");
const buscar = document.querySelector("#buscar");
const resultado = document.querySelector("#resultado");

const filtrar = (e) => {
    e.preventDefault()
    container.innerHTML = '';
    const texto = buscador.value.toLowerCase();
    for (let producto of productos) {
        let nombre = producto.nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1){
          container.innerHTML += generarCardDeProducto(producto)
          agregarEventoComprar()
        }
    }
    if(container.innerHTML === ''){
      container.innerHTML += `
      
        <div>
            <h5 class="card-product">PRODUCTO NO ENCONTRADO</h5>
        </div>
      `
    } 
}

buscar.addEventListener('click', filtrar);

// Constantes

const cart = document.querySelector("#cart");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
const cerrarBtn = document.querySelector("#close-btn");
const aniadir = document.querySelectorAll(".agregar-carrito"); 


//Abrir el carrito

cart.addEventListener("click",()=>{
    cartModalOverlay.classList.add("open");
});

//Cerrar el carrito

cerrarBtn.addEventListener("click",()=>{
    cartModalOverlay.classList.remove("open");
})
cartModalOverlay.addEventListener("click", (e)=>{
    if(e.target.classList.contains("cart-modal-overlay")){
        cartModalOverlay.classList.remove("open");
    }
})

//Asignarle a cada boton su funcion

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
    let prodArray = document.getElementsByClassName("product-row");

    //Chequea si el producto se añadió o no
    for (let i=0; i < prodArray.length; i++) {
        if(prodArray[i].getAttribute("id") === prodId) {
            swal("", "Este producto ya existe en el carrito", "error");
            return;
        } else {
            swal("", "¡Producto añadido al carrito con éxito!", "success");
        }
    }

    //Inyecta el html al carrito
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

//Elimina elementos
function removeItem(e) {
    let btnCliked = e.target;
    btnCliked.parentElement.parentElement.remove();
    updatePrice();
}

//Cambia cantidades
function cambiarCantidad(e){
    let cantidad = e.target.value;
    if(isNaN(cantidad) || cantidad <= 0) {
        cantidad = 1;
    }
    updatePrice();
}

//Actualiza el total
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




