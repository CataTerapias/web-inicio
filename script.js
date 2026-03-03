// Seleccionamos el formulario usando su clase
const formulario = document.querySelector('.formulario');

// Nos aseguramos de que el formulario exista en la página antes de ejecutar el código
if (formulario) {
    formulario.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita la redirección por defecto de Formspree
        
        // Cambiamos el texto del botón mientras se envía
        const boton = formulario.querySelector('.btn-enviar');
        const textoOriginal = boton.innerHTML;
        boton.innerHTML = "Enviando...";
        
        // Recopilamos los datos ingresados
        const data = new FormData(formulario);
        
        try {
            // Enviamos los datos a Formspree de forma "invisible"
            const response = await fetch(formulario.action, {
                method: formulario.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Si Formspree responde que todo está OK, redirigimos a tu página
                window.location.href = "gracias.html";
                formulario.reset(); // Limpiamos los campos del formulario
            } else {
                alert("Hubo un problema al enviar el mensaje. Por favor, revisa los datos e intenta de nuevo.");
                boton.innerHTML = textoOriginal; // Restauramos el texto del botón
            }
        } catch (error) {
            alert("Hubo un problema de conexión. Revisa tu internet.");
            boton.innerHTML = textoOriginal; // Restauramos el texto del botón
        }
    });
}