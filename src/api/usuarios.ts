import client from './client'
import type { Usuario, UsuarioInput } from '../types'

export const getUsuarios = () => client.get<Usuario[]>('/usuarios').then((r) => r.data)
export const getUsuario = (id: number) => client.get<Usuario>(`/usuarios/${id}`).then((r) => r.data)
export const createUsuario = (data: UsuarioInput) => client.post<Usuario>('/usuarios', data).then((r) => r.data)
export const updateUsuario = (id: number, data: UsuarioInput) => client.put<Usuario>(`/usuarios/${id}`, data).then((r) => r.data)
export const deleteUsuario = (id: number) => client.delete(`/usuarios/${id}`)
