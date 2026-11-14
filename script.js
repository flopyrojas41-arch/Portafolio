// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ---- PORTADA ----
  const portada = document.getElementById("portada");
  const btnComenzar = document.getElementById("btn-comenzar");
  const recorrido = document.getElementById("recorrido");

  btnComenzar.addEventListener("click", () => {
    portada.style.opacity = "0";
    setTimeout(() => {
      portada.style.display = "none";
      recorrido.hidden = false;
      requestAnimationFrame(() => recorrido.classList.add("visible"));
    }, 1200);
  // Copiar el correo al portapapeles
  const btnCopiar = document.getElementById("copiar-mail");
  if (btnCopiar) {
    btnCopiar.addEventListener("click", () => {
      navigator.clipboard.writeText("bflorenciarojas@gmail.com").then(() => {
        btnCopiar.textContent = "¡Copiado!";
      });
    });
  }
  });

  // ---- SECCIONES DEL PAISAJE ----
  // Cada zona abre una sección. Para agregar una nueva, sumá una línea acá.
  const secciones = {
   "sobre-mi": document.getElementById("reflejo"),
    "librarian": document.getElementById("proyecto-librarian"),
    "cerca": document.getElementById("proyecto-cerca"),
    "arbol": document.getElementById("seccion-arbol"),
    "camino": document.getElementById("seccion-camino"),
    "medanos": document.getElementById("seccion-medanos"),
    "lupinos": document.getElementById("proyecto-escaneo"),
    "contacto": document.getElementById("seccion-contacto")
  };

  let zonaActiva = null; // para volver al mismo lugar al cerrar

  function abrirSeccion(seccion, zona) {
    zonaActiva = zona;
    seccion.hidden = false;
    // Doble requestAnimationFrame: asegura que la transición de opacidad se note
    requestAnimationFrame(() => requestAnimationFrame(() => {
      seccion.classList.add("visible");
    }));
    // Foco al botón de cerrar, para teclado y lectores de pantalla
    seccion.querySelector(".btn-cerrar").focus();
  }

  function cerrarSeccion(seccion) {
    seccion.classList.remove("visible");
    setTimeout(() => { seccion.hidden = true; }, 800);
    // Devuelve el foco a la zona que se tocó
    if (zonaActiva) zonaActiva.focus();
  }

  // Zonas clicables
  document.querySelectorAll(".zona").forEach((zona) => {
    const seccion = secciones[zona.dataset.seccion];
    if (!seccion) return; // zonas sin contenido todavía no hacen nada
    zona.addEventListener("click", () => abrirSeccion(seccion, zona));
  });

  // Botones Cerrar
  document.querySelectorAll(".btn-cerrar").forEach((boton) => {
    const seccion = document.getElementById(boton.dataset.cerrar);
    boton.addEventListener("click", () => cerrarSeccion(seccion));
  });

  // Tecla Escape cierra la sección abierta
  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;
    Object.values(secciones).forEach((seccion) => {
      if (!seccion.hidden) cerrarSeccion(seccion);
    });
  });
});

