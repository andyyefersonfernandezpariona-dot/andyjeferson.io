 const formulario = document.getElementById("formRegistro");
        const mensaje = document.getElementById("mensaje");

        formulario.addEventListener("submit", function(event) {
            event.preventDefault();

            mensaje.textContent =
                "Formulario validado. Falta conectar la base de datos.";

            formulario.reset();
        });