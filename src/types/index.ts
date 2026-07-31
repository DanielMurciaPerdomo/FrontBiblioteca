export interface Usuario {
  id: number
  nombre: string
  apellido: string
  email: string
  fechaNacimiento: string
}

export type UsuarioInput = Omit<Usuario, 'id'>

export interface Libro {
  id: number
  titulo: string
  isbn: string
  edicion: string | null
  fechaPublicacion: string | null
  autor: string
  cantidadEjemplares: number
}

export type LibroInput = Omit<Libro, 'id'>

export interface Ejemplar {
  id: number
  libroId: number
  codigoInventario: string
  estado: 'DISPONIBLE' | 'PRESTADO'
}

export interface Prestamo {
  id: number
  usuarioId: number
  ejemplarId: number
  fechaPrestamo: string
  fechaDevolucionEsperada: string
  fechaDevolucionReal: string | null
  estado: 'ACTIVO' | 'DEVUELTO' | 'VENCIDO'
}

export interface PrestamoInput {
  usuarioId: number
  isbn: string
  diasPrestamo?: number
}
