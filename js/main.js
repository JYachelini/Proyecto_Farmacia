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
        buttonCarrito.innerText = `Añadir`;
        buttonCarrito.setAttribute('id', 'add-animation');
        buttonCarrito.setAttribute('marcador', producto.id);
        buttonCarrito.addEventListener('click', addToCart);

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
}

DOMvaciar.addEventListener('click', vaciarCarrito);

ordernadosPorPrecio();


let navbarLeft = document.querySelector('#navbarLeft');
navbarLeft = navbarLeft.clientWidth

let navbarRight = document.querySelector('#navbarRight');
navbarRight.style.width = navbarLeft+"px";

const counter = document.getElementById('counter');
const counterAnimation = document.querySelectorAll('#add-animation')
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