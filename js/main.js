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

const carrito = []


function imprimirDatosMedicamento(n){
    for(let producto of n){
        const divCard = document.createElement('div');
        divCard.classList.add('card');

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

        const buttonCarrito = document.createElement('input');
        buttonCarrito.classList.add('card-button');
        buttonCarrito.setAttribute("type", "button");
        buttonCarrito.setAttribute("value", "Añadir");
        const botones = document.querySelectorAll('.card-button');
        for(let boton of botones){
            boton.addEventListener("click", (product) =>{
                carrito.push(new Products(product.id, product.name, product.description, product.price, product.stock, product.laboratory, product.nombreComercial, product.img));
                console.log(carrito);
            })
        };

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

ordernadosPorPrecio();