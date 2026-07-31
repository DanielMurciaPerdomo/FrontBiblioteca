import axios from 'axios'

export interface ApiErrorInfo {
  message: string
  fields: Record<string, string> | null
}

export function getApiErrorInfo(error: unknown): ApiErrorInfo {
  if (axios.isAxiosError<{ message?: string; fields?: Record<string, string> }>(error)) {
    const { status, data } = error.response ?? {}
    if (status === 400 && data?.fields) {
      return { message: 'Verifica los campos del formulario.', fields: data.fields }
    }
    if (data?.message) {
      return { message: data.message, fields: null }
    }
  }
  return { message: 'Error inesperado. Intenta de nuevo.', fields: null }
}
