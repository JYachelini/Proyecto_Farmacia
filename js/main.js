const carrito = document.querySelector('#carrito');
const carritoTotal = document.querySelector('#total');
const paymentTotal = document.querySelector('#total-payment');
const carritoVaciar = document.querySelector('#btn-vaciar');
carritoVaciar.addEventListener('click', deleteAllProducts);
const carritoCounter = document.getElementById('counter');
let lastScrollTop = 0;
let navbar = document.querySelector('nav');

const tarjeta = document.querySelector('#tarjeta');
const tarjetaTrasera = document.querySelector('.tarjeta-trasera');
const nombre = document.getElementById('nombre');
const numero = document.getElementById('numero');
const numError = document.getElementById('num-card-error');
const nameError = document.getElementById('name-card-error');
const mesError = document.getElementById('mes-card-error');
const yearError = document.getElementById('year-card-error');
const ccvError = document.getElementById('ccv-card-error');
const mes = document.getElementById('mes');
const year = document.getElementById('year');
const ccv = document.getElementById('ccv');
const numeroCard = document.getElementById('numeroCard');
const nombreCard = document.getElementById('nombreCard');
const mesCard = document.querySelector('#tarjeta .mes');
const yearCard = document.querySelector('#tarjeta .year');
const ccvCard = document.querySelector('#tarjeta .ccv');
const btnPayment = document.getElementById('btn-payment-complete');
const logo = document.querySelector('.logo-marca');
const label = document.querySelectorAll('.label');
const resultadoPayment = document.getElementById('resultado');
let visa = /^4[0-9]{3}-?\s[0-9]{4}-?\s[0-9]{4}-?\s[0-9]{4}/g;
let mc = /^5[1-5][0-9]{2}-?\s[0-9]{4}-?\s[0-9]{4}\s[0-9]{4}/g;

let navbarRight = document.querySelector('#navbarRight');
navbarRight = navbarRight.clientWidth

let navbarLeft = document.querySelector('#navbarLeft');
navbarLeft.style.width = navbarRight+"px";

eventListeners()

function eventListeners(){
    window.addEventListener('DOMContentLoaded', () =>{
        loadJSON();
        loadCart();
        numero.textContent = '';
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

// Tarjeta animación

tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
})

const mostrarFrente = () =>{
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}

const mostrarTrasera = () =>{
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }
}


// Modal Payment validación
btnPayment.addEventListener("click", (e) =>{
    e.preventDefault();
    let error = validarPayment();
    numero.style.borderBottom = '1px solid #e6e6e6';
    nombre.style.borderBottom = '1px solid #e6e6e6';
    ccv.style.borderBottom = '1px solid #e6e6e6';
    mes.style.borderBottom = '1px solid #e6e6e6';
    year.style.borderBottom = '1px solid #e6e6e6';
    const dataError = document.createElement('li');
    dataError.classList.add('payment-error');
    dataError.classList.remove('payment-succes');
    const cleanError = document.querySelector('.payment-error');
    if(cleanError){
        cleanError.remove()
    }
    if(error[0]){
        if(error[1]){
            dataError.innerHTML = error[1];
            numError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[2]){
            dataError.innerHTML = error[2];
            numError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[3]){
            dataError.innerHTML = error[3];
            numError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[4]){
            dataError.innerHTML = error[4];
            numError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[5]){
            dataError.innerHTML = error[5];
            nameError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[6]){
            dataError.innerHTML = error[6];
            nameError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[7]){
            dataError.innerHTML = error[7];
            mesError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[8]){
            dataError.innerHTML = error[8];
            yearError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
        else if(error[9]){
            dataError.innerHTML = error[9];
            ccvError.appendChild(dataError);
            const marcarError = dataError.previousElementSibling;
            marcarError.style.borderBottom = '1px solid red';
        }
    } else{
        console.log('x');
    }
})

const validarPayment = () =>{
    let error = [];
    if (numero.value.length == 0) {
        error[0] = true;
        error[1] = "El numero de la tarjeta esta vacio.";
        return error;
    }
    else if(numero.value.length != 19){
        error[0] = true;
        error[2] = "Los números de la tarjeta son invalidos.";
        return error;
    }
    else if(!numero.value.match(mc) && !numero.value.match(visa)){
        if(numero.value[0] == 5){
            if(!numero.value.match(mc)){
                error[0] = true;
                error[3] = "Los números de la tarjeta ingresados no son de Mastercard.";
                return error;
            }
        }
        else if(numero.value[0] == 4){
            if(!numero.value.match(visa)){
                error[0] = true;
                error[4] = "Los números de la tarjeta ingresados no son de Visa.";
                return error;
            }
        }
    }
    else if(nombre.value.length == 0){
        error[0] = true;
        error[5] = "El nombre esta vacio."
        return error;
    }
    else if(nombre.value.length < 3 || nombre.value.length > 40){
        error[0] = true;
        error[6] = "El nombre es inválido."
        return error;
    }
    else if(mes.value == 'Mes'){
        error[0] = true;
        error[7] = "Selecciona un mes"
        return error;
    }
    else if(year.value == 'Año'){
        error[0] = true;
        error[8] = "Selecciona un año"
        return error;
    }
    else if (ccv.value.length != 3){
        error[0] = true;
        error[9] = "El número CCV es inválido.";
        return error;
    }
    error[0] = false;
    return error;
}

// Input de numero de tarjeta
numero.addEventListener('keyup', (e) => {
    let inputValue = e.target.value;

    numero.value = inputValue
    // Se eliminan los espacios en blanco, letras y un espacio cada 4 numeros
    .replace(/\s/g, '').replace(/\D/g, '').replace(/([0-9]{4})/g, '$1 ').trim();

    numeroCard.textContent = inputValue;

    if(inputValue == ''){
        numeroCard.textContent = '#### #### #### ####';

        logo.innerHTML = '';
        logo.style.backgroundColor = '#666';
        logo.style.opacity = '.1';
        tarjeta.style.backgroundImage = 'none';
        tarjeta.style.color = 'rgba(0, 0, 0, 0.6)';
    }

    if(inputValue[0] == 4){
        logo.innerHTML = `
        <svg viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
            <title>Visa</title>
            <g fill="none" fill-rule="evenodd">
                <rect width="50" height="30" rx="2"></rect>
                <path fill="#fff"d="M20.745 19.773l1.537-9.537h2.458l-1.537 9.537h-2.458M32.116 10.47a6.075 6.075 0 00-2.202-.4c-2.43 0-4.14 1.295-4.154 3.148-.015 1.37 1.22 2.135 2.152 2.59.958.468 1.28.767 1.276 1.184-.007.639-.764.932-1.47.932-.985 0-1.507-.144-2.316-.5l-.316-.152-.343 2.134c.573.266 1.635.497 2.737.509 2.583 0 4.26-1.279 4.28-3.258.009-1.087-.646-1.91-2.064-2.591-.859-.442-1.386-.735-1.38-1.183 0-.396.445-.82 1.408-.82a4.31 4.31 0 011.839.366l.22.109.333-2.068M35.389 16.392c.203-.548.979-2.666.979-2.666-.015.026.202-.552.326-.91l.166.823s.472 2.276.569 2.753h-2.04zm3.031-6.146h-1.899c-.589 0-1.03.169-1.288.79l-3.65 8.74h2.582s.421-1.175.517-1.433l3.147.005c.074.333.3 1.429.3 1.429h2.28l-1.989-9.53zM18.683 10.244l-2.405 6.502-.258-1.321c-.448-1.523-1.843-3.174-3.404-4l2.2 8.34 2.602-.001 3.87-9.52h-2.605"></path>
                <path d="M14.045 10.238h-3.963l-.032.197c3.083.79 5.124 2.697 5.97 4.99l-.86-4.382c-.15-.605-.581-.784-1.115-.805" fill="#fff"></path>
            </g>
        </svg>`;
        logo.style.backgroundColor = 'transparent';
        logo.style.opacity = '1';
        tarjeta.style.backgroundImage = 'linear-gradient(90deg,#021670,#5168d1)';
        tarjeta.style.color = 'white';
        tarjetaTrasera.style.backgroundImage = 'linear-gradient(90deg,#021670,#5168d1)';
        tarjetaTrasera.style.color = 'black';
    } else if(inputValue[0] == 5){
        logo.innerHTML = `
        <svg viewBox="0 0 52 32" style="height: 35px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>Mastercard</title>
            <g id="Components---Sprint-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="assets-/-logo-/-mastercard-/-symbol">
                    <polygon id="Fill-1" fill="#FF5F00" points="18.7752605 28.537934 32.6926792 28.537934 32.6926792 3.41596003 18.7752605 3.41596003" />
                        <path d="M19.6590387,15.976947 C19.6590387,10.8803009 22.03472,6.34107274 25.7341024,3.41596003 C23.0283795,1.27638054 19.6148564,0 15.9044284,0 C7.12054904,0 0.000132546844,7.15323422 0.000132546844,15.976947 C0.000132546844,24.8006598 7.12054904,31.953894 15.9044284,31.953894 C19.6148564,31.953894 23.0283795,30.6775135 25.7341024,28.537934 C22.03472,25.6123775 19.6590387,21.0735931 19.6590387,15.976947" id="Fill-2" fill="#EB001B" />
                        <path d="M50.9714634,25.8771954 L50.9714634,25.257201 L50.8101981,25.257201 L50.6250744,25.6836968 L50.4395088,25.257201 L50.2782434,25.257201 L50.2782434,25.8771954 L50.3917919,25.8771954 L50.3917919,25.4094258 L50.5658701,25.8128438 L50.6838368,25.8128438 L50.857915,25.4085382 L50.857915,25.8771954 L50.9714634,25.8771954 Z M49.9504109,25.8771954 L49.9504109,25.3628264 L50.157184,25.3628264 L50.157184,25.2580887 L49.6314148,25.2580887 L49.6314148,25.3628264 L49.8377461,25.3628264 L49.8377461,25.8771954 L49.9504109,25.8771954 Z M51.4680723,15.9768139 C51.4680723,24.8005266 44.347214,31.9537609 35.5637764,31.9537609 C31.8533484,31.9537609 28.4393835,30.6773803 25.7341024,28.5378008 C29.4334848,25.6126881 31.8091661,21.07346 31.8091661,15.9768139 C31.8091661,10.8806116 29.4334848,6.34138341 25.7341024,3.41582689 C28.4393835,1.2762474 31.8533484,-0.000133141225 35.5637764,-0.000133141225 C44.347214,-0.000133141225 51.4680723,7.15310107 51.4680723,15.9768139 L51.4680723,15.9768139 Z" id="Fill-4" fill="#F79E1B" />
                </g>
            </g>
        </svg>`;
        logo.style.backgroundColor = 'transparent';
        logo.style.opacity = '1';
        tarjeta.style.backgroundImage = 'linear-gradient(90deg,#021670,#5168d1)';
        tarjeta.style.color = 'white';
        tarjetaTrasera.style.backgroundImage = 'linear-gradient(90deg,#021670,#5168d1)';
        tarjetaTrasera.style.color = 'black';
    }


    // Voltear la tarjeta cuando se escribe
    mostrarFrente();
})

// Input nombre de tarjeta

nombre.addEventListener('keyup', (e) =>{
    let inputValue = e.target.value;

    nombre.value = inputValue.replace(/[0-9]/g, '');

    nombreCard.textContent = inputValue;

    if(inputValue == ''){
        nombreCard.textContent = 'Jhon Doe';
    }
})

// Select del mes

for(let i = 1; i<= 12; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    mes.appendChild(option);
}

mes.addEventListener('change', (e) =>{
    mesCard.textContent = e.target.value;
    mostrarFrente();
})

// Select del año

const yearActual = new Date().getFullYear();

for(let i = yearActual; i<= yearActual + 8;i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    year.appendChild(option);
}

year.addEventListener('change', (e)=>{
    yearCard.textContent = e.target.value.slice(2);
    mostrarFrente();
})

// CCV

ccv.addEventListener('keyup', () => {
    mostrarTrasera();

    // Se borran los espacios y letras
    ccv.value = ccv.value.replace(/\s/g, '').replace(/\D/g, '');

    ccvCard.textContent = ccv.value;

    if(ccvCard.textContent == ''){
        ccvCard.textContent = '***';
    }
})

//actualizar info del carrito
function updateCartInfo(){
    let cartInfo = findCartInfo();
    carritoCounter.textContent = cartInfo.productCount;
    carritoTotal.textContent = cartInfo.total+`$`;
    paymentTotal.textContent = cartInfo.total+`$`;
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


    const divButtonCarrito = document.createElement('div');
    const buttonCarrito = document.createElement('button');
    buttonCarrito.classList.add('card-button');
    buttonCarrito.innerText = `Añadir`;
    buttonCarrito.setAttribute('id', 'add-animation');
    buttonCarrito.setAttribute('data-id', product.id);
    buttonCarrito.addEventListener('click', addToCart);
    buttonCarrito.addEventListener('click', checkProducts);

    linkImagen.appendChild(imagen);
    divCard.appendChild(linkImagen);
    linkImagen.appendChild(divButtonCarrito);
    divButtonCarrito.appendChild(buttonCarrito);
    divsubCard.appendChild(titulo);
    divsubCard.appendChild(descripcion);
    divPrecio.appendChild(precio);
    divsubCard.appendChild(divPrecio);
    divCard.appendChild(divsubCard);

    const conteinerArticulos = document.querySelector('.conteiner-articles');
    conteinerArticulos.appendChild(divCard);
}

function addToCart(e){
    checkProducts()
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
        let producto = e.target.parentElement.parentElement.parentElement;
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
        cartItem = e.target.parentElement.parentElement.previousElementSibling.lastChild.firstChild;
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
    const noHayProducto = document.querySelector('#emptyCart');
    const conteinerCarritoPagar = document.querySelector('.conteiner-carrito-pagar');
    if(products.length>=1){
        conteinerCarritoPagar.style.display = 'block';
        noHayProducto.style.display = 'none';
    }else if(products.length==0){
        conteinerCarritoPagar.style.display = 'none';
        noHayProducto.style.display = 'block';
    }
}

//Modal Payment

document.getElementById('btn-payment').addEventListener('click', ()=>{
    document.getElementById('overlay').classList.add('is-visible');
    document.getElementById('modalCarrito').classList.add('carritoClose');
    document.getElementById('modal-payment').classList.add('modal-payment-animation');
    document.getElementById('modal-payment').classList.add('is-visible');
    document.getElementById('body').classList.add('noScroll');
})

document.getElementById('closePayment').addEventListener('click', function(){
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal-payment').classList.remove('is-visible');
    document.getElementById('modal-payment').classList.remove('modal-payment-animation');
    document.getElementById('body').classList.remove('noScroll');
});

//Modal carrito


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

//Overlay
document.getElementById('overlay').addEventListener('click', function(){
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('is-visible');
    document.getElementById('modal-payment').classList.remove('is-visible');
    document.getElementById('modalCarrito').classList.remove('carritoAnimation');
    document.getElementById('modal-payment').classList.remove('modal-payment-animation');
    document.getElementById('modalCarrito').classList.add('carritoClose');
    document.getElementById('body').classList.remove('noScroll');
})

document.addEventListener( 'keydown', (event)  => {
    if (event.key == 'Escape') {
        document.getElementById('overlay').classList.remove('is-visible');
        document.getElementById('modalCarrito').classList.remove('is-visible');
        document.getElementById('modalCarrito').classList.remove('carritoAnimation');
        document.getElementById('modalCarrito').classList.add('carritoClose');
        document.getElementById('body').classList.remove('noScroll');
    }
});

function slideDown(e){
    var elem = document.getElementById(e);
    elem.style.opacity = "1";
    elem.style.maxHeight = "400px";
}

function slideUp(e){
    var elem = document.getElementById(e);
    elem.style.maxHeight= '0px';
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
    if( ((document.getElementById('discounts').style.maxHeight) > '400')){
        slideUp('discounts');
        document.getElementById('discounts').style.boxShadow = "none";
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
    if( ((document.getElementById('products').style.maxHeight) > '400')){
        slideUp('products');
        document.getElementById('products').style.boxShadow = "none";
        setTimeout(function (){
            slideDown('discounts');
            document.getElementById('discounts').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
        }, 700);
    }else{
        slideDown('discounts');
        document.getElementById('discounts').style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
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