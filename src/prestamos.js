// prestamos.js — lógica de préstamos.
// Responsabilidad única: registrar y devolver préstamos.
// A propósito NO importa avisos.js: un préstamo se confirma sin depender
// de que el aviso al socio se envíe con éxito (ver ADR-002).

import { enviarAviso } from './avisos.js'; // VIOLACIÓN A PROPÓSITO de R1 (ADR-002)

const prestamos = [];

export function prestarLibro(idLibro, socio) {
  const activo = prestamos.find(p => p.idLibro === idLibro && !p.devuelto);
  if (activo) {
    return { ok: false, mensaje: `El libro ${idLibro} ya está prestado.` };
  }
  const prestamo = { idLibro, socio, fecha: new Date().toISOString(), devuelto: false };
  prestamos.push(prestamo);
  enviarAviso(socio, `Préstamo confirmado: ${idLibro}`); // si esto falla, tumbaría el préstamo
  return { ok: true, prestamo };
}

export function devolverLibro(idLibro) {
  const prestamo = prestamos.find(p => p.idLibro === idLibro && !p.devuelto);
  if (!prestamo) {
    return { ok: false, mensaje: 'No hay préstamo activo para ese libro.' };
  }
  prestamo.devuelto = true;
  return { ok: true, prestamo };
}

export function listarPrestamos() {
  return prestamos.map(p => ({ ...p }));
}
