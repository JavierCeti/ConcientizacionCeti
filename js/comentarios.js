document.addEventListener("DOMContentLoaded", function () {
  const API_URL = 'https://mintcream-mallard-121470.hostingersite.com/default.php';

  const form = document.getElementById('foroForm');
  const comentariosDiv = document.getElementById('comentarios');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      nombre: document.getElementById('nombre').value,
      ubicacion: document.getElementById('ubicacion').value,
      comentario: document.getElementById('comentario').value
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Error al enviar comentario');
      form.reset();
      cargarComentarios();
    } catch (err) {
      alert('Hubo un error al enviar tu comentario.');
      console.error(err);
    }
  });

  async function cargarComentarios() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al cargar comentarios');

      const comentarios = await res.json();

      comentariosDiv.innerHTML = '<h3 class="fs-4">Comentarios recientes</h3>' +
        comentarios.map(c => `
          <div class="border rounded p-2 my-2">
            <strong>${c.nombre}</strong> <span class="text-muted">(${c.ubicacion})</span><br>
            <p class="mb-0">${c.comentario}</p>
          </div>
        `).join('');
    } catch (err) {
      comentariosDiv.innerHTML = '<p class="text-danger">No se pudieron cargar los comentarios.</p>';
      console.error(err);
    }
  }

  cargarComentarios();
});
