import client from './client'
import type { Ejemplar, Libro, LibroInput } from '../types'

export const getLibros = () => client.get<Libro[]>('/libros').then((r) => r.data)
export const getLibro = (id: number) => client.get<Libro>(`/libros/${id}`).then((r) => r.data)
export const createLibro = (data: LibroInput) => client.post<Libro>('/libros', data).then((r) => r.data)
export const updateLibro = (id: number, data: LibroInput) => client.put<Libro>(`/libros/${id}`, data).then((r) => r.data)
export const deleteLibro = (id: number) => client.delete(`/libros/${id}`)
export const getEjemplaresDisponibles = (isbn: string) =>
  client.get<Ejemplar[]>(`/libros/${isbn}/ejemplares-disponibles`).then((r) => r.data)
