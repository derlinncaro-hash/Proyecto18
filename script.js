const lenguaje = document.getElementById("lenguaje");
const mensaje = document.getElementById("mensaje");
const repositorio = document.getElementById("repositorio");
const boton = document.getElementById("boton");

// Muestra un mensaje (vacío, cargando o error) y oculta el repositorio
function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + color;
    mensaje.hidden = false;
    repositorio.hidden = true;
    boton.hidden = true;
}

async function buscar() {
    // Estado vacío
    if (lenguaje.value === "") {
        mostrarMensaje("Por favor selecciona un lenguaje", "gris");
        return;
    }

    // Estado cargando
    mostrarMensaje("Cargando, por favor espera...", "gris");

    try {
        const url =
            "https://api.github.com/search/repositories?q=language:" +
            encodeURIComponent(lenguaje.value) +
            "&sort=stars&per_page=100";

        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("Error en la consulta");
        }

        const datos = await respuesta.json();

        // Elegir uno al azar
        const repo = datos.items[Math.floor(Math.random() * datos.items.length)];

        // Mostrar sus datos
        document.getElementById("nombre").textContent = repo.name;
        document.getElementById("nombre").href = repo.html_url;
        document.getElementById("descripcion").textContent = repo.description || "Sin descripción";
        document.getElementById("estrellas").textContent = repo.stargazers_count;
        document.getElementById("forks").textContent = repo.forks_count;
        document.getElementById("issues").textContent = repo.open_issues_count;

        // Estado éxito: aparece el repositorio y el botón "Actualizar"
        mensaje.hidden = true;
        repositorio.hidden = false;
        boton.textContent = "Actualizar";
        boton.className = "negro";
        boton.hidden = false;
    } catch (error) {
        // Estado error: aparece el botón para reintentar
        mostrarMensaje("Error al obtener los repositorios", "rosa");
        boton.textContent = "Haz clic para reintentar";
        boton.className = "rojo";
        boton.hidden = false;
    }
}

lenguaje.addEventListener("change", buscar);
boton.addEventListener("click", buscar);