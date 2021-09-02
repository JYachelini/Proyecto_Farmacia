let count = 0;
var lastScrollTop = 0;
navbar = document.querySelector('nav');
window.addEventListener("scroll", function(){
    var scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop){
        navbar.style.top="-100px";
    }else{
        navbar.style.top="0";
    }
    lastScrollTop = scrollTop;
})

class Products{
    constructor(id, name, description, price, stock, laboratory, nombreComercial, img){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = parseFloat(price);
        this.stock = stock;
        this.laboratory = laboratory;
        this.nombreComercial = nombreComercial;
        this.img = img;
    }
    applyDiscount(discount) {
        return (this.price - (this.price*discount));
    }
    sell(quantity){
        if(quantity <= this.stock){
            this.stock -=quantity;
            document.write(`${this.name} x${quantity} agregado al carrito!`);
        }else if(quantity>this.stock){
            document.write(`Lamentablemente no disponemos de ${quantity} ${this.name}, tenemos ${this.stock} ${this.name} disponibles.`);
        }
    }
}
//Ingresos de Array manual
const productos = [];
productos.push(new Products(1, "omeprazol","Antiácido Antiulceroso", 145, 50, "Bagó", "Ulcozol 20", "media/ulcozol.jpg"));
productos.push(new Products(2, "ibuprofeno","Analgésico Antiinflam.", 155, 0, "Savant", "Fabogesic 600", "media/fabogesic600.png"));
productos.push(new Products(3, "paracetamol","Analgésico Antifebril", 341, 5, "Genomma", "Tafirol 500", "media/tafirol.jpg"));
productos.push(new Products(4, "simvastatin","Hipolipemiante", 1462, 30, "Roemmers", "Vasotenal 10", "media/vasotenal.png"));
productos.push(new Products(5, "lansoprazol","Antiulceroso", 1960, 5, "Teva argentina", "Lansoprazol Teva", "media/lansoprazol.png"));
productos.push(new Products(6, "salbutamol","Broncodilatador", 822, 50, "Cassara", "Salbutral", "media/salbutral.jpg"));
productos.push(new Products(7, "Atorvastatin","Hipolipemiante", 2325, 350, "Raffo", "Lipifen", "media/lipifen.jpg"));
productos.push(new Products(8, "amlodipina","Antianginoso Antihipertensivo", 1406, 40, "Raffo", "Zundic", "media/zundic.jpg"));
productos.push(new Products(9, "ramipril","Antihipertensivo", 4174, 44, "Temis Lostalo", "Lostapres", "media/lostapres.jpg"));
productos.push(new Products(10, "Levotiroxina","Terapéutica tiroidea", 1842, 32, "Elea", "Euthyrox", "media/euthyrox.png"));

let carrito = []
let total = 0;
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMvaciar = document.querySelector('#btn-vaciar');
const miLocalStorage = window.localStorage;


function imprimirDatosMedicamento(n){
    for(let producto of n){
        const divCard = document.createElement('div');
        divCard.classList.add('card');


        divCard.setAttribute("id", `item${producto.id}`);

        const titulo = document.createElement('a');
        titulo.textContent = producto.nombreComercial;
        titulo.setAttribute('href', '#');
        titulo.classList.add('card-titulo');

        const linkImagen = document.createElement('a');
        linkImagen.setAttribute("href", "#");
        linkImagen.classList.add('card-link-img');
        const imagen = document.createElement('img');
        imagen.setAttribute("src", `${producto.img}`);

        const divsubCard = document.createElement('div');
        divsubCard.classList.add('sub-card');

        const divPrecio = document.createElement('div');
        divPrecio.classList.add('card-price')
        const precio = document.createElement('span');
        precio.classList.add('card-price-monto');
        precio.innerText = `${producto.price}$`;

        const conIva = document.createElement('span');
        conIva.classList.add('card-price-conIVA')
        conIva.innerText= `*Precio con IVA aplicado`

        const stock = document.createElement('p');
        stock.classList.add('card-stock');
        if(producto.stock>0){
            stock.innerText = `Con stock (${producto.stock})`;
        }else{
            stock.innerText= `No disponemos de stock actualmente.`;
        }
        const laboratorio = document.createElement('p');
        laboratorio.classList.add('card-laboratory');
        laboratorio.innerText = `Producido por: ${producto.laboratory}`;

        const buttonCarrito = document.createElement('button');
        buttonCarrito.classList.add('card-button');
        // buttonCarrito.innerText = `Añadir`;
        buttonCarrito.setAttribute('id', 'add-animation');
        buttonCarrito.setAttribute('marcador', producto.id);
        buttonCarrito.addEventListener('click', addToCart);

        buttonCarrito.innerHTML = `<svg id="cart" height="24" marcador="${producto.id}" viewBox="0 -31 512.00033 512" width="24" xmlns="http://www.w3.org/2000/svg"><path marcador="${producto.id}" d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0"/><path marcador="${producto.id}" d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0"/><path marcador="${producto.id}" d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0"/></svg>`

        const buttonCarritoTXT = document.createElement('p');
        buttonCarritoTXT.setAttribute('id', 'button-carrito-txt');
        buttonCarritoTXT.classList.add('button-carrito-txt');
        buttonCarritoTXT.setAttribute('marcador', producto.id);
        buttonCarritoTXT.innerText = 'Añadir';
        buttonCarrito.appendChild(buttonCarritoTXT);

        linkImagen.appendChild(imagen);
        divCard.appendChild(linkImagen);
        divsubCard.appendChild(titulo);
        divPrecio.appendChild(precio);
        // divPrecio.appendChild(conIva);
        divsubCard.appendChild(divPrecio);
        // divsubCard.appendChild(stock);
        // divsubCard.appendChild(laboratorio);
        divsubCard.appendChild(buttonCarrito);
        divCard.appendChild(divsubCard);

        const conteinerArticulos = document.querySelector('.conteiner-articles');
        conteinerArticulos.appendChild(divCard);
        }
}



//Ordenados por precio
let ordenadosPrecio = [];

function ordernadosPorPrecio(){
    ordenadosPrecio = productos.map(element => element);
    ordenadosPrecio.sort(function(a,b){
        return a.price - b.price;
    });
    imprimirDatosMedicamento(ordenadosPrecio);
}

function addToCart(evt){

    // agregamos item al carrito
    carrito.push(evt.target.getAttribute('marcador'));
    // Calculamos el total
    calcularTotal();
    // Actualizamos el carrito
    imprimirCarrito();
    // Local Storage
    guardarCarritoLS()
}



function imprimirCarrito(){
    comprobarProductos();
    DOMcarrito.textContent = '';
    // Se sacan los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Se imprime el carrito
    carritoSinDuplicados.forEach((item) => {
        // Se obtiene el item de los productos cargados
        const miItem = productos.filter((itemProducto) =>{
            // Se comparan las id y se retorna en caso de que se encuentre.
            return itemProducto.id === parseInt(item);
        });
        // Cuenta el numero de veces que se repite el producto
        const cantItem = carrito.reduce((total, itemID) =>{
            // Si coinciden las ID se incrementa el contador.
            return  itemID === item ? total += 1 : total;
        }, 0);
        // Se empieza a imprimir el carrito
        const carritoNuevo = document.createElement('li');
        carritoNuevo.classList.add('itemCarrito');

        const carritoImgLink = document.createElement('a');
        carritoImgLink.setAttribute('href', '#');
        carritoImgLink.style.width = '30%';

        const carritoImg = document.createElement('img');
        carritoImg.classList.add('carrito-img');
        carritoImg.setAttribute('src', `${miItem[0].img}`);

        const carritoDetails = document.createElement('div');
        carritoDetails.classList.add('carrito-details');

        const carritoProducto = document.createElement('p');
        carritoProducto.innerText = `${miItem[0].nombreComercial}`;

        const carritoDescription = document.createElement('p');
        carritoDescription.style.fontSize = '12px';
        carritoDescription.innerText = `${miItem[0].description}`;

        const carritoCantidad = document.createElement('p');
        carritoCantidad.style.textAlign = 'center';
        carritoCantidad.innerText = `x${cantItem}`;

        const carritoPrice = document.createElement('p');
        carritoPrice.classList.add('item-total-price');
        carritoPrice.innerText = `${miItem[0].price}$`;
        

        
        // Boton de borrar item
        const carritoBorrar = document.createElement('button');
        carritoBorrar.classList.add('borrar-itemCarrito');
        carritoBorrar.textContent = 'Borrar';
        carritoBorrar.dataset.item = item;
        carritoBorrar.addEventListener('click', borrarItemCarrito);

        const carritoSubDiv = document.createElement('div');
        carritoSubDiv.classList.add('flex-column');

        // Mezclamos los elementos
        if(carrito.length>0){
            carritoImgLink.appendChild(carritoImg);
            carritoDetails.appendChild(carritoProducto);
            carritoDetails.appendChild(carritoDescription);
            carritoDetails.appendChild(carritoPrice);
            carritoSubDiv.appendChild(carritoCantidad);
            carritoSubDiv.appendChild(carritoBorrar);
            carritoNuevo.appendChild(carritoImgLink);
            carritoNuevo.appendChild(carritoDetails);
            carritoNuevo.appendChild(carritoSubDiv);
            DOMcarrito.appendChild(carritoNuevo);
        }
    });
}

function comprobarProductos(){
    if(carrito.length==0){
        const noHayProducto = document.createElement('li');
        noHayProducto.innerText = 'No hay productos en tu carrito';
        DOMcarrito.appendChild(noHayProducto);
    }
}

comprobarProductos();

// Función borrar carrito
function borrarItemCarrito(evt){
    // Obtenemos el ID del producto 
    const id = evt.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    })
    counter.innerText = carrito.length;
    // Imprimimos el carrito actualizado
    imprimirCarrito();
    comprobarProductos();
    // Calculamos el nuevo total
    calcularTotal();
    // LS
    guardarCarritoLS();
}

// Función calcular el total precio
function calcularTotal(){
    // Limpiamos el precio anterior
    total = 0;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // Obtenemos el precio de cada item
        const miItem = productos.filter((miItemProducto) =>{
            return miItemProducto.id === parseInt(item);
        });
        total = total + miItem[0].price;
    });
    // Imprimimos el nuevo precio
    let precioTotal = total.toFixed(2);
    DOMtotal.textContent = `${precioTotal}$`;
}

// Vaciar carrito
function vaciarCarrito(){
    // Limpiamos el carrito
    carrito = [];
    counter.innerText = carrito.length;
    // Imprimimos los cambios
    imprimirCarrito();
    comprobarProductos();
    calcularTotal();
    guardarCarritoLS();
}

function guardarCarritoLS(){
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    // miLocalStorage.setItem('counter', JSON.stringify(counter));
}

function cargarCarritoLS(){
    if(miLocalStorage.getItem('carrito') !== null){
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        // counter = JSON.parse(miLocalStorage.getItem('counter'));
    }
}

DOMvaciar.addEventListener('click', vaciarCarrito);
cargarCarritoLS();
ordernadosPorPrecio();
calcularTotal();
imprimirCarrito();

let navbarLeft = document.querySelector('#navbarLeft');
navbarLeft = navbarLeft.clientWidth

let navbarRight = document.querySelector('#navbarRight');
navbarRight.style.width = navbarLeft+"px";

const counter = document.getElementById('counter');
const counterAnimation = document.querySelectorAll('#add-animation');
// Animación: https://codepen.io/dmngu9/pen/oNzrRKZ NO ME FUNCIONA :(


for(const animation of counterAnimation){
    animation.addEventListener('click', event =>{
        navbar.style.top="0";
        const cl = counter.classList;
        const c = 'animated-counter';
        counter.innerText = carrito.length;
        cl.remove(c, cl.contains(c));
        setTimeout(() =>
            counter.classList.add('animated-counter')
        , 1)
    })
}
counter.innerText = carrito.length;

document.getElementById('btn-carrito').addEventListener('click', function(){
    document.getElementById('overlay').classList.add('is-visible');
    document.getElementById('modalCarrito').classList.add('is-visible');
    document.getElementById('body').classList.add('noScroll');
});

document.getElementById('closeCarrito').addEventListener('click', function(){
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('is-visible');
    document.getElementById('body').classList.remove('noScroll');
});

document.getElementById('overlay').addEventListener('click', function(){
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('is-visible');
    document.getElementById('body').classList.remove('noScroll');
})

$(document).keydown(function(event) {
    if (event.keyCode == 27) {
        $('#overlay').removeClass('is-visible');
        $('#modalCarrito').removeClass('is-visible');
        $('body').removeClass('noScroll');
        // document.getElementById('overlay').classList.remove('is-visible');
        // document.getElementById('modalCarrito').classList.remove('is-visible');
        // document.getElementById('body').classList.remove('noScroll');
    }
});