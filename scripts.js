document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE CARRUSEL ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    slides.forEach(slide => {
        const bg = slide.getAttribute('data-bg');
        if (bg) {
            slide.style.backgroundImage = `url('${bg}')`;
        }
    });

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // --- MODAL DE INFORMACIÓN/COLECCIONES ---
    const modal = document.getElementById('modal-coleccion');
    const modalClose = document.querySelector('#modal-coleccion .modal-close');
    const botonesModal = document.querySelectorAll('.btn-modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalExtraInfo = document.getElementById('modal-extra-info');
    const vistaInfo = document.getElementById('vista-info');
    const vistaCatalogo = document.getElementById('vista-catalogo');
    const btnVerCatalogo = document.getElementById('btn-ver-catalogo');
    const btnVolverInfo = document.getElementById('btn-volver-info');

    const contenidoColecciones = {
        citricas: {
            titulo: "Colección Cítricas y Frescas",
            descripcion: "Diseñadas para despertar los sentidos con una explosión de energía limpia. Notas dominantes de bergamota italiana y limón.",
            extra: "Ideal para uso diario y climas cálidos."
        },
        orientales: {
            titulo: "Colección Orientales y Cálidas",
            descripcion: "Una experiencia olfativa profunda y magnética con resinas preciosas y vainilla de Madagascar.",
            extra: "Perfecta para ocasiones nocturnas y eventos especiales."
        },
        amaderadas: {
            titulo: "Colección Amaderadas y Elegantes",
            descripcion: "El máximo exponente de la distinción con maderas nobles como cedro, sándalo y vetiver.",
            extra: "Transmite fuerza, sofisticación y distinción absoluta."
        }
    };

    const detallesPerfumes = {
        "royal-wood": {
            titulo: "Royal Wood Sándalo",
            descripcion: "El favorito indiscutible de la temporada por su elegancia inigualable.",
            extra: "Notas principales: Sándalo noble, cedro y toques especiados. Presentación de 100ml Eau de Parfum."
        },
        "floral-velvet": {
            titulo: "Floral Velvet",
            descripcion: "Una fragancia cautivadora que arrasa en ventas cada semana gracias a su delicada combinación de flores silvestres.",
            extra: "Notas principales: Rosa de Bulgaria, jazmín blanco y almizcle suave. Presentación de 90ml."
        },
        "citric-energy": {
            titulo: "Citric Energy Gold",
            descripcion: "Frescura superior elegida por miles de clientes satisfechos que buscan vitalidad durante todo el día.",
            extra: "Notas principales: Mandarina, bergamota y fondo de ámbar blanco. Presentación de 100ml."
        }
    };

    // Funcionalidad para los 4 botones de campañas (Inicio)
    const botonesCampana = document.querySelectorAll('.btn-campana');
    botonesCampana.forEach(boton => {
        boton.addEventListener('click', () => {
            const accion = boton.getAttribute('data-accion');
            
            if (accion === 'belleza') {
                modalTitulo.textContent = "Manifiesto de Belleza";
                modalDescripcion.textContent = "Celebremos la diversidad de aromas con nuestra nueva línea inclusiva y sostenible.";
                if(modalExtraInfo) modalExtraInfo.textContent = "Edición limitada dermatológicamente probada.";
                if(vistaInfo) vistaInfo.style.display = "block";
                if(vistaCatalogo) vistaCatalogo.style.display = "none";
                if(btnVerCatalogo) btnVerCatalogo.style.display = "none";
                modal.classList.add('active');
            } else if (accion === 'coleccion') {
                cambiarSeccion('seccion-colecciones');
            } else if (accion === 'novedad') {
                modalTitulo.textContent = "Novedad: Colección Aurora";
                modalDescripcion.textContent = "Frescura y elegancia para todos los días con extractos florales puros.";
                if(modalExtraInfo) modalExtraInfo.textContent = "Disponible en presentación exclusiva de 100ml.";
                if(vistaInfo) vistaInfo.style.display = "block";
                if(vistaCatalogo) vistaCatalogo.style.display = "none";
                if(btnVerCatalogo) btnVerCatalogo.style.display = "none";
                modal.classList.add('active');
            } else if (accion === 'oferta') {
                cambiarSeccion('seccion-ofertas');
            }
        });
    });

    const navLinks = document.querySelectorAll(".nav-links a");
    const vistas = document.querySelectorAll(".vista-seccion");

    function cambiarSeccion(targetId, guardarEnStorage = true) {
        navLinks.forEach(item => {
            if(item.getAttribute('data-target') === targetId) {
                item.classList.add('active-nav');
            } else {
                item.classList.remove('active-nav');
            }
        });

        vistas.forEach(vista => {
            vista.style.display = "none";
            vista.classList.remove("activa");
        });

        const vistaSeleccionada = document.getElementById(targetId);
        if (vistaSeleccionada) {
            vistaSeleccionada.style.display = "block";
            setTimeout(() => {
                vistaSeleccionada.classList.add("activa");
            }, 10);

            if (guardarEnStorage) {
                localStorage.setItem('seccionActiva', targetId);
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const seccionGuardada = localStorage.getItem('seccionActiva') || 'seccion-inicio';
    cambiarSeccion(seccionGuardada, false);

    botonesModal.forEach(boton => {
        boton.addEventListener('click', () => {
            const tipo = boton.getAttribute('data-coleccion');
            if (contenidoColecciones[tipo]) {
                modalTitulo.textContent = contenidoColecciones[tipo].titulo;
                modalDescripcion.textContent = contenidoColecciones[tipo].descripcion;
                if(modalExtraInfo) modalExtraInfo.textContent = contenidoColecciones[tipo].extra;
                if(vistaInfo) vistaInfo.style.display = "block";
                if(vistaCatalogo) vistaCatalogo.style.display = "none";
                if(btnVerCatalogo) btnVerCatalogo.style.display = "inline-block";
                modal.classList.add('active');
            }
        });
    });

    const botonesDetalles = document.querySelectorAll('.btn-detalles');
    botonesDetalles.forEach(boton => {
        boton.addEventListener('click', () => {
            const idPerfume = boton.getAttribute('data-perfume');
            if (detallesPerfumes[idPerfume]) {
                const info = detallesPerfumes[idPerfume];
                modalTitulo.textContent = info.titulo;
                modalDescripcion.textContent = info.descripcion;
                if(modalExtraInfo) modalExtraInfo.textContent = info.extra;
                if(vistaInfo) vistaInfo.style.display = "block";
                if(vistaCatalogo) vistaCatalogo.style.display = "none";
                if(btnVerCatalogo) btnVerCatalogo.style.display = "none";
                modal.classList.add('active');
            }
        });
    });

    if (btnVerCatalogo) {
        btnVerCatalogo.addEventListener('click', () => {
            vistaInfo.style.display = 'none';
            vistaCatalogo.style.display = 'block';
        });
    }

    if (btnVolverInfo) {
        btnVolverInfo.addEventListener('click', () => {
            vistaCatalogo.style.display = 'none';
            vistaInfo.style.display = 'block';
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-target");
            cambiarSeccion(targetId);
        });
    });

    // --- LÓGICA DEL CARRITO DE COMPRAS CON PERSISTENCIA ---
    let carrito = JSON.parse(localStorage.getItem('carritoPerfumeria')) || [];
    
    const contadorCarrito = document.getElementById('contador-carrito');
    const iconoCarritoHeader = document.getElementById('icono-carrito-header');
    const modalCarrito = document.getElementById('modal-carrito');
    const cerrarModalCarrito = document.getElementById('cerrar-modal-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const precioTotalCarrito = document.getElementById('precio-total-carrito');
    const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');

    function guardarYActualizarCarrito() {
        localStorage.setItem('carritoPerfumeria', JSON.stringify(carrito));
        actualizarUI();
    }

    function actualizarUI() {
        // Actualizar contador visual
        const totalItems = carrito.length;
        if (contadorCarrito) {
            contadorCarrito.textContent = totalItems;
            contadorCarrito.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }

        // Generar HTML de productos en el modal
        if (listaCarrito) {
            if (carrito.length === 0) {
                listaCarrito.innerHTML = '<p class="carrito-vacio-texto">Tu carrito está vacío.</p>';
            } else {
                listaCarrito.innerHTML = '';
                carrito.forEach((prod, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'item-carrito';
                    itemDiv.innerHTML = `
                        <div class="item-carrito-info">
                            <span class="item-carrito-nombre">${prod.nombre}</span>
                            <span class="item-carrito-precio">${prod.precio}</span>
                        </div>
                        <button class="btn-eliminar-item" data-index="${index}" title="Quitar producto">&times;</button>
                    `;
                    listaCarrito.appendChild(itemDiv);
                });

                // Añadir evento eliminar a los botones "X"
                const botonesEliminar = listaCarrito.querySelectorAll('.btn-eliminar-item');
                botonesEliminar.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const index = parseInt(e.target.getAttribute('data-index'));
                        eliminarDelCarrito(index);
                    });
                });
            }
        }

        // Calcular precio total
        let total = 0;
        carrito.forEach(p => {
            const numero = parseFloat(p.precio.replace('$', '').trim());
            if (!isNaN(numero)) total += numero;
        });

        if (precioTotalCarrito) {
            precioTotalCarrito.textContent = `$${total.toFixed(2)}`;
        }
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        guardarYActualizarCarrito();
    }

    // Botones Añadir al Carrito
    const botonesAnadirCarrito = document.querySelectorAll('.btn-comprar-mini');
    botonesAnadirCarrito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.stopPropagation();

            const tarjeta = boton.closest('.categoria-card') || boton.closest('.perfume-mini-card');
            let nombreProducto = "Producto";
            let precioProducto = "$0.00";

            if (tarjeta) {
                const tituloH3 = tarjeta.querySelector('h3, h4');
                if (tituloH3) nombreProducto = tituloH3.textContent;

                const elementoPrecio = tarjeta.querySelector('strong, .perfume-precio');
                if (elementoPrecio) precioProducto = elementoPrecio.textContent;
            }

            carrito.push({ nombre: nombreProducto, precio: precioProducto });
            guardarYActualizarCarrito();

            const textoOriginal = boton.textContent;
            boton.textContent = "¡AÑADIDO!";
            boton.style.backgroundColor = "#2e7d32";

            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.backgroundColor = "";
            }, 1500);

            mostrarNotificacion(`¡Se ha añadido "${nombreProducto}" al carrito!`);
        });
    });

    // Eventos para el Modal del Carrito
    if (iconoCarritoHeader) {
        iconoCarritoHeader.addEventListener('click', () => {
            actualizarUI();
            modalCarrito.classList.add('active');
        });
    }

    if (cerrarModalCarrito) {
        cerrarModalCarrito.addEventListener('click', () => {
            modalCarrito.classList.remove('active');
        });
    }

    if (modalCarrito) {
        modalCarrito.addEventListener('click', (e) => {
            if (e.target === modalCarrito) {
                modalCarrito.classList.remove('active');
            }
        });
    }

    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener('click', () => {
            if (carrito.length > 0) {
                carrito = [];
                guardarYActualizarCarrito();
            }
        });
    }

    function mostrarNotificacion(mensaje) {
        const alertaExistente = document.querySelector('.alerta-carrito-flotante');
        if (alertaExistente) alertaExistente.remove();

        const alerta = document.createElement('div');
        alerta.className = 'alerta-carrito-flotante';
        alerta.textContent = mensaje;
        alerta.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background-color: #1a1a1a;
            color: #fff;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            font-size: 14px;
            animation: fadeInOut 2.5s ease forwards;
        `;

        document.body.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2500);
    }

    // --- BÚSQUEDA ---
    const listaPerfumes = [
        { nombre: "Beauty Rose Edición", img: "img/Beauty_Rose.jpg", precio: "$45.00" },
        { nombre: "Aurora Summer Breeze", img: "img/Aurora.jpg", precio: "$52.00" },
        { nombre: "Royal Wood Sándalo", img: "img/Esencia.jpg", precio: "$60.00" },
        { nombre: "Beauty Rose Edición Especial", img: "img/Beauty_Rose.jpg", precio: "$45.50" },
        { nombre: "Esencia Noir Intense", img: "img/Esencia.jpg", precio: "$48.00" },
        { nombre: "Floral Velvet", img: "img/Beauty_Rose.jpg", precio: "$52.00" },
        { nombre: "Citric Energy Gold", img: "img/Aurora.jpg", precio: "$45.00" }
    ];

    const inputBuscador = document.getElementById('input-buscador');
    const resultadosBusqueda = document.getElementById('resultados-busqueda');

    if (inputBuscador && resultadosBusqueda) {
        inputBuscador.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase().trim();
            resultadosBusqueda.innerHTML = '';

            if (texto === '') {
                resultadosBusqueda.style.display = 'none';
                return;
            }

            const filtrados = listaPerfumes.filter(p => p.nombre.toLowerCase().includes(texto));

            if (filtrados.length > 0) {
                resultadosBusqueda.style.display = 'block';
                filtrados.forEach(perfume => {
                    const item = document.createElement('div');
                    item.classList.add('resultado-item');
                    item.innerHTML = `
                        <img src="${perfume.img}" alt="${perfume.nombre}">
                        <div>
                            <span>${perfume.nombre}</span><br>
                            <small style="color: #b71c1c; font-weight: bold;">${perfume.precio}</small>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        inputBuscador.value = perfume.nombre;
                        resultadosBusqueda.style.display = 'none';
                    });
                    resultadosBusqueda.appendChild(item);
                });
            } else {
                resultadosBusqueda.style.display = 'block';
                resultadosBusqueda.innerHTML = '<div style="padding: 10px 15px; font-size: 13px; color: #777;">No se encontraron perfumes</div>';
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                resultadosBusqueda.style.display = 'none';
            }
        });
    }

    // Inicializar la interfaz del carrito al cargar
    actualizarUI();
});