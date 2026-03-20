// --- LÓGICA DEL FORMULARIO ---
const formulario = document.querySelector('.formulario');

if (formulario) {
    formulario.addEventListener("submit", async function(event) {
        event.preventDefault(); 
        
        const boton = formulario.querySelector('.btn-enviar');
        const textoOriginal = boton.innerHTML;
        boton.innerHTML = "Enviando...";
        
        const data = new FormData(formulario);
        
        try {
            const response = await fetch(formulario.action, {
                method: formulario.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                window.location.href = "gracias.html";
                formulario.reset(); 
            } else {
                alert("Hubo un problema al enviar el mensaje. Por favor, revisa los datos e intenta de nuevo.");
                boton.innerHTML = textoOriginal; 
            }
        } catch (error) {
            alert("Hubo un problema de conexión. Revisa tu internet.");
            boton.innerHTML = textoOriginal; 
        }
    });
}

// --- LÓGICA PARA EL SLIDER DE TARJETAS (SOLO MÓVIL) ---
const slider = document.getElementById('slider-servicios');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.servicio-card');

if (slider && dots.length > 0 && cards.length > 0) {
    slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        
        // Calculamos el ancho de la tarjeta + los 15px de separación (gap)
        const cardWidth = cards[0].offsetWidth + 15;
        
        // Sabemos exactamente qué tarjeta se está viendo (0, 1 o 2)
        const index = Math.round(scrollLeft / cardWidth);

        // 1. Sincronizamos los puntitos
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // 2. Sincronizamos el ZOOM con la tarjeta que corresponde al puntito
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('activa'); // Le da el zoom a la que estás viendo
            } else {
                card.classList.remove('activa'); // Le quita el zoom a las demás
            }
        });
    });

    // Simulamos un mini scroll al cargar la página para que la Tarjeta 1 parta con zoom
    setTimeout(() => slider.dispatchEvent(new Event('scroll')), 100);
}
// --- 1. MOTOR DE CAL.COM (El código que pegaste) ---
(function (C, A, L) { 
    let p = function (a, ar) { a.q.push(ar); }; 
    let d = C.document; 
    C.Cal = C.Cal || function () { 
        let cal = C.Cal; 
        let ar = arguments; 
        if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
        } 
        if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
        } 
        p(cal, ar); 
    }; 
})(window, "https://app.cal.com/embed/embed.js", "init");

// --- 2. INICIALIZACIÓN CON TU NAMESPACE "60min" ---
Cal("init", "60min", {origin:"https://app.cal.com"});

// --- 3. RENDERIZADO INLINE (FIJO EN LA WEB) ---
Cal.ns["60min"]("inline", {
    elementOrSelector: "#calendario-embebido",
    calLink: "sergio-ruiz-torres-zzh8az/60min",
    config: {"layout":"month_view"}
});

// Configuración de interfaz (según tu código)
Cal.ns["60min"]("ui", {
    "hideEventTypeDetails": false,
    "layout": "month_view"
});



// --- LÓGICA DEL BOTÓN FLOTANTE DESPLEGABLE (FAB) ---
const fabToggle = document.getElementById('fab-toggle');
const fabContainer = document.querySelector('.fab-container');

if (fabToggle && fabContainer) {
    fabToggle.addEventListener('click', () => {
        fabContainer.classList.toggle('active');
    });
}