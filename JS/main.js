document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contacto form');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Evita el envío normal
      const nombre = document.getElementById('nombre').value;
      const mensaje = document.getElementById('mensaje').value;
  
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
      mostrarMensajesRecibidos();
      contenedor.style.display = (contenedor.style.display === 'none' || contenedor.style.display === '') 
        ? 'block' : 'none';
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
  });

  // Cambio de tema oscuro/claro
  document.addEventListener("DOMContentLoaded", () => {
    const bombilla = document.getElementById("bombilla");
    const cuerda = document.getElementById("cuerda");
    const themeLink = document.getElementById("theme-link");
  
    let modoOscuro = false;
  
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
    });
  });
  
  