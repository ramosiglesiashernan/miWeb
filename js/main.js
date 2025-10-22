// main.js (Versión Actualizada)

// --- Lógica del Formulario de Contacto (sin cambios) ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contacto form');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const mensaje = document.getElementById('mensaje').value;
  
      if (nombre.trim() === '' || mensaje.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return;
      }

      let mensajesGuardados = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
      mensajesGuardados.push({
        nombre: nombre,
        mensaje: mensaje,
        fecha: new Date().toLocaleString()
      });
      localStorage.setItem('mensajesContacto', JSON.stringify(mensajesGuardados));
  
      alert('¡Mensaje enviado! Gracias por contactarte.');
      form.reset();
  
      // Si el panel de mensajes está visible, lo actualizamos
      const contenedor = document.getElementById('mensajes-recibidos');
      if (contenedor.style.display === 'block') {
          mostrarMensajesRecibidos();
      }
    });
  
    const botonVer = document.getElementById('ver-mensajes-admin');
    const contenedor = document.getElementById('mensajes-recibidos');
  
    botonVer.addEventListener('click', function() {
      if (contenedor.style.display === 'none' || contenedor.style.display === '') {
        mostrarMensajesRecibidos();
        contenedor.style.display = 'block';
        botonVer.textContent = 'Ocultar Mensajes Recibidos (Admin)';
      } else {
        contenedor.style.display = 'none';
        botonVer.textContent = 'Ver Mensajes Recibidos (Admin)';
      }
    });
  
    function mostrarMensajesRecibidos() {
      let mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
      if (mensajes.length === 0) {
        contenedor.innerHTML = '<em>No hay mensajes guardados.</em>';
      } else {
        contenedor.innerHTML = mensajes.map(m =>
          `<div><b>${m.nombre}</b> <span style="color:#777;">[${m.fecha}]</span><br>${m.mensaje}</div>`
        ).join('');
      }
    }
});

// --- Lógica del Cambio de Tema (MODIFICADA) ---
document.addEventListener("DOMContentLoaded", () => {
    const bombilla = document.getElementById("bombilla");
    const cuerda = document.getElementById("cuerda");
  
    // Comprobar el estado guardado en localStorage
    let modoOscuro = localStorage.getItem('modoOscuro') === 'true';

    // Aplicar la clase correcta al body al cargar la página
    if (modoOscuro) {
        document.body.classList.add('dark-mode');
    }
  
    bombilla.addEventListener("click", () => {
      // Animación del tirón
      cuerda.setAttribute("y2", "100");
      setTimeout(() => cuerda.setAttribute("y2", "80"), 200);
  
      // Alternar la clase en el body
      document.body.classList.toggle('dark-mode');

      // Actualizar el estado y guardarlo en localStorage
      modoOscuro = document.body.classList.contains('dark-mode');
      localStorage.setItem('modoOscuro', modoOscuro);
    });
});


// --- Lógica del Botón Volver Arriba ---
document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById('back-to-top-btn');

    // Muestra u oculta el botón basado en la posición del scroll
    window.addEventListener('scroll', () => {
        // Muestra el botón si el usuario ha bajado más de 300px
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Hace scroll suave hacia arriba cuando se hace clic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // ¡La magia del scroll suave!
        });
    });
});