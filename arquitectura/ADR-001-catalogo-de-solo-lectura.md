# ADR-001 · Catálogo de solo lectura

## Contexto
El sistema tiene un catálogo de libros y un módulo de préstamos. Es tentador
dejar que el catálogo, al mostrar un libro, también marque directamente si
quedó prestado o no, tocando el estado de los préstamos. Eso mezcla una
responsabilidad de consulta con una de transacción.

## Driver que manda
El catálogo solo consulta, nunca modifica los préstamos.

## Decisión
`catalogo.js` no puede importar `prestamos.js`. El catálogo expone
únicamente funciones de lectura (`listarLibros`, `buscarLibro`). Cualquier
cambio de estado de un préstamo pasa exclusivamente por `prestamos.js`,
orquestado desde `app.js`.

## Alternativa descartada
Que `catalogo.js` importara `prestamos.js` para saber en tiempo real si un
libro está disponible y actualizar su propio estado. Era más directo de
programar, pero convertía al catálogo en un módulo con dos responsabilidades
(mostrar y decidir disponibilidad transaccional), y cualquier bug en
préstamos se propagaría también a la vista del catálogo.

## Qué pagamos
El catálogo no sabe en tiempo real si un libro está prestado sin que
`app.js` se lo pregunte explícitamente a `prestamos.js` y lo cruce. Eso es
una consulta extra en cada render. Aceptamos esa pequeña redundancia a
cambio de que el catálogo nunca pueda corromper un registro de préstamo.
