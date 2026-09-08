// app.js — orquestador de la interfaz.
// Es el único módulo que conoce tanto prestamos.js como avisos.js:
// coordina el flujo, pero prestamos.js nunca importa avisos.js directamente.

import { listarLibros, buscarLibro } from './catalogo.js';
import { prestarLibro, listarPrestamos } from './prestamos.js';
import { enviarAviso } from './avisos.js';

function renderCatalogo() {
  const cont = document.getElementById('catalogo');
  cont.innerHTML = '';
  listarLibros().forEach(libro => {
    const div = document.createElement('div');
    div.className = 'libro';
    div.innerHTML = `<strong>${libro.titulo}</strong> — ${libro.autor}
      <button data-id="${libro.id}" class="btn-prestar">Prestar</button>`;
    cont.appendChild(div);
  });
}

function renderHistorial() {
  const cont = document.getElementById('historial');
  cont.innerHTML = listarPrestamos()
    .map(p => `<li>${p.idLibro} → ${p.socio}${p.devuelto ? ' (devuelto)' : ''}</li>`)
    .join('');
}

document.getElementById('catalogo').addEventListener('click', (e) => {
  if (!e.target.classList.contains('btn-prestar')) return;
  const id = e.target.dataset.id;
  const socio = document.getElementById('socio').value.trim() || 'anónimo';

  const resultado = prestarLibro(id, socio);
  const estado = document.getElementById('estado');

  if (resultado.ok) {
    const libro = buscarLibro(id);
    // El préstamo YA se confirmó. El aviso es un intento aparte:
    // si falla, no revertimos el préstamo.
    const aviso = enviarAviso(socio, `Préstamo confirmado: ${libro.titulo}`);
    estado.textContent = aviso.ok
      ? `Prestado a ${socio}. Aviso enviado.`
      : `Prestado a ${socio}. (El aviso falló, pero el préstamo quedó registrado.)`;
  } else {
    estado.textContent = resultado.mensaje;
  }
  renderHistorial();
});

renderCatalogo();
renderHistorial();
