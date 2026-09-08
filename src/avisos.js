// avisos.js — notificaciones a los socios (simula un correo).
// Responsabilidad única: intentar avisar. Puede fallar sin tumbar nada más.

export function enviarAviso(socio, mensaje) {
  const falla = Math.random() < 0.3; // simula que el correo se cae ~30% de las veces
  if (falla) {
    console.warn(`[avisos] FALLÓ el envío a ${socio}: "${mensaje}"`);
    return { ok: false, mensaje: 'No se pudo enviar el aviso.' };
  }
  console.log(`[avisos] Enviado a ${socio}: "${mensaje}"`);
  return { ok: true };
}
