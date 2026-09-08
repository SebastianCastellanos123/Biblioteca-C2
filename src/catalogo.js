// catalogo.js — catálogo de libros.
// Responsabilidad única: consultar el inventario. NUNCA crea ni modifica préstamos.

const libros = [
  { id: 'L1', titulo: 'Cien años de soledad', autor: 'García Márquez' },
  { id: 'L2', titulo: 'El Quijote', autor: 'Cervantes' },
  { id: 'L3', titulo: 'Rayuela', autor: 'Cortázar' },
  { id: 'L4', titulo: '1984', autor: 'Orwell' },
  { id: 'L5', titulo: 'La casa de los espíritus', autor: 'Allende' },
];

export function listarLibros() {
  return libros.map(l => ({ ...l }));
}

export function buscarLibro(id) {
  return libros.find(l => l.id === id) ?? null;
}
