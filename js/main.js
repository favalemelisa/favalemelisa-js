Swal.fire({
    title: "Bienvenido a Branch Online",
    text: "Te gustaría recibir novedades sobre nuevos productos?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Sí!",
    denyButtonText: `Me lo pierdo...`
}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire("Gracias por suscribirte a Branch!");
    } else if (result.isDenied) {
        Swal.fire("No recibirás novedades en tu casilla de correo");
    }
});

const divBotones = document.getElementById("botones");
const container = document.getElementById("container");
const btnCarrito = document.getElementById("btn-carrito");
const divCarrito = document.getElementById("carrito");

let mostrar = false;
const botonMostrarOcultar = document.createElement("button");
botonMostrarOcultar.innerText = "Ver Carrito"
botonMostrarOcultar.onclick = () => mostrarOcultar(mostrar);

btnCarrito.appendChild(botonMostrarOcultar);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const productoAAgregar = productos.find(el => el.id === id);
    if (carrito.some(element => element.id === productoAAgregar.id)) {
        Swal.fire({
            title: "Producto repetido",
            text: "El producto ya está en el carrito!",
            icon: "warning"
        });
        Toastify({

            text: "Producto repetido",
            gravity: 'bottom',
            position: 'right',
            duration: 3000,
            style: {
                background: 'linear-gradient(to right, #9F2B68, #FF0000)',
            },

        }).showToast();
    } else {
        divCarrito.innerHTML = "";
        carrito.push(productoAAgregar);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        carrito.forEach(el => crearCard(el, "carrito"));
        Swal.fire({
            title: "Felicitaciones!",
            text: "Producto agregado al carrito!",
            icon: "success"
        });
        Toastify({

            text: "Producto agregado",
            gravity: 'bottom',
            position: 'right',
            duration: 3000,
            style: {
                background: 'linear-gradient(to right, #9F2B68, #00FF00)',
            },

        }).showToast();
    };
};

function quitarDelCarrito(id) {
    divCarrito.innerHTML = "";
    let nuevoCarrito = carrito.filter(el => el.id !== id);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    carrito = nuevoCarrito;
    carrito.forEach(el => crearCard(el, "carrito"));
    Swal.fire({
        title: "Producto eliminado",
        text: "Quitaste un producto del carrito, podés volver a agregarlo en cualquier momento!",
        icon: "info"
    });
    Toastify({

        text: "Producto eliminado",
        gravity: 'bottom',
        position: 'right',
        duration: 3000,
        style: {
            background: 'linear-gradient(to right, #9F2B68, #FF0000)',
        },
    }).showToast();
};

function crearCard(producto, contenedor) {
    const card = document.createElement("div");
    card.className = "card";

    const modelo = document.createElement("p");
    modelo.innerText = producto.modelo;
    modelo.className = "modelo";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "img"

    const precio = document.createElement("p");
    precio.innerText = `$${producto.precio}`;
    precio.className = "modelo";

    const botonAgregar = document.createElement("button");
    botonAgregar.innerText = contenedor === "container" ? "COMPRAR" : "Quitar del carrito";
    botonAgregar.className = "btn-comprar";
    if (contenedor === "container") {
        botonAgregar.onclick = () => agregarAlCarrito(producto.id);
    } else {
        botonAgregar.onclick = () => quitarDelCarrito(producto.id);
    }

    card.appendChild(modelo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(botonAgregar);

    const nuevoContenedor = document.getElementById(contenedor)

    nuevoContenedor.appendChild(card);
};


fetch("./js/data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(el => {
            crearcard(el);
        });
    });

setTimeout(() => {
    console.log(arrayUsuarios);
}, 1000);

function filtrarPorCategoría(categoria) {
    Swal.fire({
        title: "Cargando Productos",
        text: "25% OFF en línea Vienna",
        icon: "info",
        showConfirmButton: false,
        timer: 3000
    }); { }
    setTimeout(() => {
        container.innerHTML = "";
        const productosElegidos = productos.filter(el => el.categoria === categoria);
        productosElegidos.forEach(el => crearCard(el, "container"));
    }, 3000);

    container.innerHTML = "";
    const productosElegidos = productos.filter((el => el.categoria === categoria))
    productosElegidos.forEach(el => crearCard(el, "container"));
}

const boton1 = document.createElement("button");
boton1.className = "btn-categorias";
const boton2 = document.createElement("button");
boton2.className = "btn-categorias";
const boton3 = document.createElement("button");
boton3.className = "btn-categorias";
const boton4 = document.createElement("button");
boton4.className = "btn-categorias";

boton1.innerText = "Escritorios";
boton2.innerText = "Mesas";
boton3.innerText = "Sofás";
boton4.innerText = "Sommiers";

boton1.onclick = () => filtrarPorCategoría("escritorios");
boton2.onclick = () => filtrarPorCategoría("mesas");
boton3.onclick = () => filtrarPorCategoría("sofás");
boton4.onclick = () => filtrarPorCategoría("sommiers");

divBotones.appendChild(boton1);
divBotones.appendChild(boton2);
divBotones.appendChild(boton3);
divBotones.appendChild(boton4);


function mostrarOcultar(estadoCarrito) {
    if (estadoCarrito) {
        mostrar = false;
        divCarrito.innerHTML = "";
        botonMostrarOcultar.innerText = "Ver Carrito";
    } else {
        divCarrito.innerHTML = "";
        mostrar = true;
        carrito.forEach(el => crearCard(el, "carrito"));
        botonMostrarOcultar.innerText = "Ocultar carrito";
    };
};

productos.forEach(el => crearCard(el, "container"));

carrito.forEach(el => crearCard(el, "carrito"));
