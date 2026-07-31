import client from './client'
import type { Prestamo, PrestamoInput } from '../types'

export interface PrestamoFilter {
  usuarioId?: number
  libroId?: number
}

export const crearPrestamo = (data: PrestamoInput) =>
  client.post<Prestamo>('/prestamos', data).then((r) => r.data)

export const getPrestamos = (params?: PrestamoFilter) =>
  client.get<Prestamo[]>('/prestamos', { params }).then((r) => r.data)

export const getPrestamosPorUsuario = (usuarioId: number) => getPrestamos({ usuarioId })

export const getPrestamosPorLibro = (libroId: number) => getPrestamos({ libroId })

export const devolverPrestamo = (id: number) =>
  client.put<Prestamo>(`/prestamos/${id}/devolver`).then((r) => r.data)
