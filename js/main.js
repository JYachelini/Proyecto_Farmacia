const carrito = document.querySelector('#carrito');
const carritoTotal = document.querySelector('#total');
const carritoVaciar = document.querySelector('#btn-vaciar');
carritoVaciar.addEventListener('click', deleteAllProducts);
const carritoCounter = document.getElementById('counter');
let lastScrollTop = 0;
let navbar = document.querySelector('nav');

let navbarLeft = document.querySelector('#navbarLeft');
navbarLeft = navbarLeft.clientWidth

let navbarRight = document.querySelector('#navbarRight');
navbarRight.style.width = navbarLeft+"px";

eventListeners()

function eventListeners(){
    window.addEventListener('DOMContentLoaded', () =>{
        loadJSON();
        loadCart();
    })
    window.addEventListener("scroll", function(){
        var scrollTop = window.pageYOffset || this.document.documentElement.scrollTop;
        if(scrollTop > lastScrollTop){
            navbar.style.top="-100px";
        }else{
            navbar.style.top="0";
        }
        lastScrollTop = scrollTop;
    })
}

//actualizar info del carrito
function updateCartInfo(){
    let cartInfo = findCartInfo();
    carritoCounter.textContent = cartInfo.productCount;
    carritoTotal.textContent = cartInfo.total+`$`;
}
updateCartInfo()

function loadJSON(){
    fetch("js/productos.json")
    .then(res=>res.json())
    .then(data =>{
        data.forEach(product => {
            printproducts(product);
        })
    })
    .catch(error =>{
        console.log(error);
    })
}

function printproducts(products){
    printeachproduct(products);
}

function printeachproduct(product){
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    divCard.setAttribute("id", `item${product.id}`);

    const titulo = document.createElement('a');
    titulo.textContent = product.nombreComercial;
    titulo.setAttribute('href', '#');
    titulo.classList.add('card-titulo');

    const descripcion = document.createElement('p');
    descripcion.textContent = product.description;
    descripcion.classList.add('card-description');

    const linkImagen = document.createElement('a');
    linkImagen.setAttribute("href", "#");
    linkImagen.classList.add('card-link-img');
    const imagen = document.createElement('img');
    imagen.classList.add('link-img');
    imagen.setAttribute("src", `${product.img}`);

    const divsubCard = document.createElement('div');
    divsubCard.classList.add('sub-card');

    const divPrecio = document.createElement('div');
    divPrecio.classList.add('card-price')
    const precio = document.createElement('span');
    precio.classList.add('card-price-monto');
    precio.innerText = `${product.price}$`;

    const conIva = document.createElement('span');
    conIva.classList.add('card-price-conIVA')
    conIva.innerText= `*Precio con IVA aplicado`

    const stock = document.createElement('p');
    stock.classList.add('card-stock');
    if(product.stock>0){
        stock.innerText = `Con stock (${product.stock})`;
    }else{
        stock.innerText= `No disponemos de stock actualmente.`;
    }
    const laboratorio = document.createElement('p');
    laboratorio.classList.add('card-laboratory');
    laboratorio.innerText = `Producido por: ${product.laboratory}`;

    const buttonCarrito = document.createElement('button');
    buttonCarrito.classList.add('card-button');
    buttonCarrito.innerText = `Añadir`;
    buttonCarrito.setAttribute('id', 'add-animation');
    buttonCarrito.setAttribute('data-id', product.id);
    buttonCarrito.addEventListener('click', addToCart);
    buttonCarrito.addEventListener('click', checkProducts);


    // const buttonCarritoTXT = document.createElement('p');
    // buttonCarritoTXT.setAttribute('id', 'button-carrito-txt');
    // buttonCarritoTXT.classList.add('button-carrito-txt');
    // buttonCarritoTXT.setAttribute('marcador', product.id);
    // buttonCarritoTXT.innerText = 'Añadir';
    // buttonCarrito.appendChild(buttonCarritoTXT);

    linkImagen.appendChild(imagen);
    divCard.appendChild(linkImagen);
    divsubCard.appendChild(titulo);
    divsubCard.appendChild(descripcion);
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

function addToCart(e){
    checkProducts()
    // console.log(e.target);
    // console.log(e.target.getAttribute('marcador'));
    document.getElementById('overlay').classList.add('is-visible');
    document.getElementById('modalCarrito').classList.add('is-visible');
    document.getElementById('modalCarrito').classList.add('carritoAnimation');
    document.getElementById('modalCarrito').classList.remove('carritoClose');
    document.getElementById('body').classList.add('noScroll');

    if(e.target.classList.contains('button-carrito-txt')){
        let producto = e.target.parentElement.parentElement.parentElement;
        let id = e.target.parentElement.getAttribute('data-id');
        getProductInfo(producto, id);
    }
    if(e.target.classList.contains('cart-svg-path')){
        let producto = e.target.parentElement.parentElement.parentElement.parentElement;
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        getProductInfo(producto, id);
    }
    if(e.target.classList.contains('cart-svg')){
        let producto = e.target.parentElement.parentElement.parentElement;
        let id = e.target.parentElement.getAttribute('data-id');
        getProductInfo(producto, id);
    }
    if(e.target.classList.contains('card-button')){
        let producto = e.target.parentElement.parentElement;
        let id = e.target.getAttribute('data-id');
        getProductInfo(producto, id);
    }
    updateCartInfo();
}

function getProductInfo(producto, id){
    let productInfo ={
        id: id,
        img: producto.querySelector('.link-img').src,
        nombreComercial: producto.querySelector('.card-titulo').textContent,
        price: producto.querySelector('.card-price-monto').textContent,
        description: producto.querySelector('.card-description').textContent
    }
    console.log(productInfo);
    addToCartList(productInfo);
    guardarCarritoLS(productInfo);
}

function addToCartList(producto){
    checkProducts();
    const carritoNuevo = document.createElement('li');
    carritoNuevo.classList.add('itemCarrito');
    carritoNuevo.setAttribute('data-id', `${producto.id}`);

    const carritoImgLink = document.createElement('a');
    carritoImgLink.setAttribute('href', '#');
    carritoImgLink.style.width = '30%';

    const carritoImg = document.createElement('img');
    carritoImg.classList.add('carrito-img');
    carritoImg.setAttribute('src', `${producto.img}`);

    const carritoDetails = document.createElement('div');
    carritoDetails.classList.add('carrito-details');

    const carritoProducto = document.createElement('p');
    carritoProducto.innerText = `${producto.nombreComercial}`;

    const carritoDescription = document.createElement('p');
    carritoDescription.style.fontSize = '12px';
    carritoDescription.innerText = `${producto.description}`;

    // const carritoCantidad = document.createElement('p');
    // carritoCantidad.style.textAlign = 'center';
    // carritoCantidad.innerText = `x1`;
    // carritoCantidad.innerText = `x${cantItem}`;

    // const carritoCantidad = document.createElement('div');
    // carritoCantidad.classList.add('carrito-cant');
    // carritoCantidad.style.textAlign = 'center';
    // carritoCantidad.innerText = `Cant.`;
    // const carritoCantidadTotal = document.createElement('label');
    // carritoCantidadTotal.classList.add('carrito-cant-text');
    // carritoCantidadTotal.innerText = `Cant.`;
    // const carritoIngresarCantidad = document.createElement('span');
    // carritoIngresarCantidad.classList.add('carrito-cant-selector');
    // carritoIngresarCantidad.innerHTML= `<select id="producto-id-${miItem[0].id}" name="cantidad">
    //                                     <option value="1">1</option>
    //                                     <option value="1">2</option>
    //                                     <option value="1">3</option>
    //                                     <option value="1">4</option>
    //                                     <option value="1">5</option>
    //                                     <option value="1">6</option>
    //                                     <option value="1">7</option>
    //                                     <option value="1">8</option>
    //                                     <option value="1">9</option>
    //                                     <option value="1">10</option>
    //                                     </select>`
    // carritoCantidad.appendChild(carritoCantidadTotal);
    // carritoCantidad.appendChild(carritoIngresarCantidad);

    const carritoPrice = document.createElement('p');
    carritoPrice.classList.add('item-total-price');
    carritoPrice.innerText = `${producto.price}`;
    // Boton de borrar item
    const carritoBorrar = document.createElement('button');
    carritoBorrar.classList.add('borrar-itemCarrito');
    carritoBorrar.textContent = 'Borrar';
    carritoBorrar.addEventListener('click', deleteProduct);

    const carritoSubDiv = document.createElement('div');
    carritoSubDiv.classList.add('flex-column');

    carritoImgLink.appendChild(carritoImg);
    carritoDetails.appendChild(carritoProducto);
    carritoDetails.appendChild(carritoDescription);
    carritoDetails.appendChild(carritoPrice);
    // carritoSubDiv.appendChild(carritoCantidad);
    carritoSubDiv.appendChild(carritoBorrar);
    carritoNuevo.appendChild(carritoImgLink);
    carritoNuevo.appendChild(carritoDetails);
    carritoNuevo.appendChild(carritoSubDiv);
    carrito.appendChild(carritoNuevo);
}


// Guardar productos en local storage
function guardarCarritoLS(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// Agarrar todos los items que hayan en el local storage
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse
    (localStorage.getItem('products')) : [];
    // Retorna un array vacio si no hay productos
}

// cargar productos del carrito
function loadCart(){
    let products = getProductFromStorage();
    console.log(products.length);
    products.forEach(product => addToCartList(product));
    updateCartInfo()
    checkProducts()
}

// Calcular el precio total de lcarrito
function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price);
        return acc += price;
    }, 0); // Agregando todos los precios
    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}

// Borrar item del carrito y local storage
function deleteProduct(e){
    console.log(e.target);
    let cartItem;
    cartItem = e.target.parentElement.parentElement;
    console.log(cartItem);
    cartItem.remove(); // Lo remueve unicamente del DOM

    let products = getProductFromStorage();
    let updatedProdutcs = products.filter(product => {
        return product.id != parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProdutcs)); // Lo remueve del local Storage
    console.log(products);
    console.log(updatedProdutcs);
    updateCartInfo();
    checkProducts()
}

function deleteAllProducts(e){
    let cartItem;
    let products = getProductFromStorage();
    for(let p of products){
        cartItem = e.target.parentElement.previousElementSibling.lastChild.firstChild;
        cartItem.remove();
    }
    products = [];
    console.log(products);
    localStorage.setItem('products', JSON.stringify(products));
    loadCart();
    checkProducts()
}

function checkProducts(){
    let products = getProductFromStorage();
    const noHayProducto = document.querySelector('#emptyCart')
    if(products.length>=1){
        noHayProducto.style.display = 'none';
    }else if(products.length==0){
        noHayProducto.style.display = 'block';
    }
}


document.getElementById('btn-carrito').addEventListener('click', function(){
    document.getElementById('overlay').classList.add('is-visible');
    document.getElementById('modalCarrito').classList.add('is-visible');
    document.getElementById('modalCarrito').classList.add('carritoAnimation');
    document.getElementById('modalCarrito').classList.remove('carritoClose');
    document.getElementById('body').classList.add('noScroll');
});

document.getElementById('closeCarrito').addEventListener('click', function(){
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('carritoAnimation');
    document.getElementById('modalCarrito').classList.add('carritoClose');
    document.getElementById('body').classList.remove('noScroll');
});

document.getElementById('overlay').addEventListener('click', function(){
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('carritoAnimation');
    document.getElementById('modalCarrito').classList.add('carritoClose');
    document.getElementById('body').classList.remove('noScroll');
})

$(document).keydown(function(event) {
    if (event.keyCode == 27) {
        document.getElementById('overlay').classList.remove('is-visible');
        document.getElementById('modalCarrito').classList.remove('is-visible');
        document.getElementById('modalCarrito').classList.remove('carritoAnimation');
        document.getElementById('modalCarrito').classList.add('carritoClose');
        document.getElementById('body').classList.remove('noScroll');
    }
});

function slideDown(e){
    var elem = document.getElementById(e);
    // elem.style.transition = "all 1s ease-in-out";
    elem.style.opacity = "1";
    elem.style.maxHeight = "400px";
}

function slideUp(e){
    var elem = document.getElementById(e);
    elem.style.maxHeight= '0px';
    // oncuechange(1, function(){
    //     elem.style.opacity = '0';
    // });
}

function once (seconds, callback) {
	var counter = 0;
	var time = window.setInterval( function () {
		counter++;
		if ( counter >= seconds ) {
			callback();
			window.clearInterval( time );
		}
	}, 400 );
}

document.getElementById('slide-products').addEventListener('mouseenter', ()=>{
    if( ((document.getElementById('discounts').style.maxHeight) > '400') || ((document.getElementById('contact').style.maxHeight) > '400')){
        slideUp('contact');
        slideUp('discounts');
        document.getElementById('discounts').style.boxShadow = "none";
        document.getElementById('contact').style.boxShadow = "none";
        setTimeout(function (){
            slideDown('products');
        }, 700);
        document.getElementById('products').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    }else{
        slideDown('products');
        document.getElementById('products').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    }
})
document.getElementById('slide-disc').addEventListener('mouseenter', ()=>{
    if( ((document.getElementById('products').style.maxHeight) > '400') || ((document.getElementById('contact').style.maxHeight) > '400')){
        slideUp('contact');
        slideUp('products');
        document.getElementById('products').style.boxShadow = "none";
        document.getElementById('contact').style.boxShadow = "none";
        setTimeout(function (){
            slideDown('discounts');
            document.getElementById('discounts').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
        }, 700);
    }else{
        slideDown('discounts');
        document.getElementById('discounts').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    }
})
document.getElementById('slide-contact').addEventListener('mouseenter', ()=>{
    if( ((document.getElementById('discounts').style.maxHeight) > '400') || ((document.getElementById('products').style.maxHeight) > '400')){
        slideUp('products');
        slideUp('discounts');
        document.getElementById('products').style.boxShadow = "none";
        document.getElementById('discounts').style.boxShadow = "none";
        setTimeout(function (){
            slideDown('contact');
            document.getElementById('contact').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
        }, 700);
    }else{
        slideDown('contact');
        document.getElementById('contact').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    }
})


document.getElementById('products').addEventListener('mouseleave', ()=>{
    slideUp('products');
    document.getElementById('products').style.boxShadow = "none";
})
document.getElementById('discounts').addEventListener('mouseleave', ()=>{
    slideUp('discounts');
    document.getElementById('discounts').style.boxShadow = "none";
})
document.getElementById('contact').addEventListener('mouseleave', ()=>{
    slideUp('contact');
    document.getElementById('contact').style.boxShadow = "none";
})