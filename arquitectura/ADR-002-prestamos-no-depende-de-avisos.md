# ADR-002 · Préstamos no depende de avisos

## Contexto
Cuando un socio pide un libro prestado, el sistema también le manda un
aviso (piénsenlo como un correo). El camino obvio es que, dentro de
`prestarLibro()`, el módulo de préstamos llame directamente al módulo de
avisos antes de devolver el resultado. Eso es justo la llamada directa que
vimos hoy en el simulador: si el que avisa falla, se cae toda la cadena.

## Driver que manda
Si el correo se cae, el préstamo no se puede caer con él.

## Decisión
`prestamos.js` no puede importar `avisos.js`. El único módulo que conoce a
ambos es `app.js`: primero llama a `prestarLibro()`, y solo si eso responde
`ok`, llama por su cuenta a `enviarAviso()`. Si el aviso falla, el préstamo
ya quedó registrado y no se revierte.

## Alternativa descartada
Que `prestamos.js` importara y llamara a `enviarAviso()` internamente,
como pedía el prompt original de "llamadas directas". Era la ruta más
rápida de construir, pero acoplaba la transacción de negocio (el préstamo)
a un servicio secundario (el aviso) que puede fallar por razones que no
tienen nada que ver con la biblioteca.

## Qué pagamos
`app.js` tiene que orquestar dos llamadas en vez de una, y si mañana
agregamos un tercer canal de aviso (SMS, por ejemplo), `app.js` crece con
esa lógica de coordinación en lugar de que `prestamos.js` lo resuelva solo.
Aceptamos ese acoplamiento extra en el orquestador a cambio de que un
préstamo nunca dependa de que el aviso funcione.
