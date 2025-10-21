// main.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contacto form');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Evita el envío normal
      const nombre = document.getElementById('nombre').value;
      const mensaje = document.getElementById('mensaje').value;
  
      if (nombre.trim() === '' || mensaje.trim() === '') {
        alert('Por favor, completa todos los campos.');
        return;
      }

      // Guardar en LocalStorage
      let mensajesGuardados = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
      mensajesGuardados.push({
        nombre: nombre,
        mensaje: mensaje,
        fecha: new Date().toLocaleString()
      });
      localStorage.setItem('mensajesContacto', JSON.stringify(mensajesGuardados));
  
      alert('¡Mensaje enviado! Gracias por contactarte.');
      form.reset();
  
      mostrarMensajesRecibidos();
    });
  
    // Botón para ver mensajes guardados
    const botonVer = document.getElementById('ver-mensajes-admin');
    const contenedor = document.getElementById('mensajes-recibidos');
  
    botonVer.addEventListener('click', function() {
      // Alternar el texto del botón
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
          `<div style="margin-bottom:10px;">
            <b>${m.nombre}</b> <span style="color:#777;">[${m.fecha}]</span><br>${m.mensaje}
          </div>`
        ).join('');
      }
    }

    // Inicializar el estado del botón y del contenedor al cargar
    if (contenedor.style.display === 'none' || contenedor.style.display === '') {
      botonVer.textContent = 'Ver Mensajes Recibidos (Admin)';
    } else {
      botonVer.textContent = 'Ocultar Mensajes Recibidos (Admin)';
      mostrarMensajesRecibidos(); // Mostrar mensajes si el contenedor ya está visible (aunque lo ocultamos por defecto en el HTML)
    }
});

// Cambio de tema oscuro/claro
document.addEventListener("DOMContentLoaded", () => {
    const bombilla = document.getElementById("bombilla");
    const cuerda = document.getElementById("cuerda");
    const themeLink = document.getElementById("theme-link");
  
    // Obtener el estado del modo oscuro de localStorage si existe
    let modoOscuro = localStorage.getItem('modoOscuro') === 'true';

    // Aplicar el tema al cargar la página
    if (modoOscuro) {
        themeLink.setAttribute("href", "css/estiloOscuro.css");
    } else {
        themeLink.setAttribute("href", "css/estilos.css");
    }
  
    bombilla.addEventListener("click", () => {
      // Animación del tirón
      cuerda.setAttribute("y2", "100");
      setTimeout(() => cuerda.setAttribute("y2", "80"), 200);
  
      // Cambiar tema
      modoOscuro = !modoOscuro;
      if (modoOscuro) {
        themeLink.setAttribute("href", "css/estiloOscuro.css");
      } else {
        themeLink.setAttribute("href", "css/estilos.css");
      }
      // Guardar el estado del modo oscuro en localStorage
      localStorage.setItem('modoOscuro', modoOscuro);
    });
});