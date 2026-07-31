import { useState } from 'react'
import type { FormEvent } from 'react'
import { createUsuario, updateUsuario } from '../../api/usuarios'
import { getApiErrorInfo } from '../../api/errors'
import type { Usuario, UsuarioInput } from '../../types'

interface UsuarioFormProps {
  usuario?: Usuario | null
  onClose: () => void
  onSaved: () => void
}

function UsuarioForm({ usuario, onClose, onSaved }: UsuarioFormProps) {
  const isEdit = Boolean(usuario)
  const [form, setForm] = useState<UsuarioInput>(() => ({
    nombre: usuario?.nombre ?? '',
    apellido: usuario?.apellido ?? '',
    email: usuario?.email ?? '',
    fechaNacimiento: usuario?.fechaNacimiento ?? '',
  }))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null)

  const handleChange = (field: keyof UsuarioInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setFieldErrors(null)
    try {
      if (usuario) {
        await updateUsuario(usuario.id, form)
      } else {
        await createUsuario(form)
      }
      onSaved()
    } catch (err) {
      const info = getApiErrorInfo(err)
      setError(info.message)
      setFieldErrors(info.fields)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border rounded-3 shadow-sm">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold text-dark">
                {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className={`form-control${fieldErrors?.nombre ? ' is-invalid' : ''}`}
                    value={form.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    maxLength={100}
                    required
                  />
                  {fieldErrors?.nombre && (
                    <div className="invalid-feedback">{fieldErrors.nombre}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    type="text"
                    className={`form-control${fieldErrors?.apellido ? ' is-invalid' : ''}`}
                    value={form.apellido}
                    onChange={(e) => handleChange('apellido', e.target.value)}
                    maxLength={100}
                    required
                  />
                  {fieldErrors?.apellido && (
                    <div className="invalid-feedback">{fieldErrors.apellido}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control${fieldErrors?.email ? ' is-invalid' : ''}`}
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    maxLength={150}
                    required
                  />
                  {fieldErrors?.email && (
                    <div className="invalid-feedback">{fieldErrors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de Nacimiento
                  </label>
                  <input
                    id="fechaNacimiento"
                    type="date"
                    className={`form-control${fieldErrors?.fechaNacimiento ? ' is-invalid' : ''}`}
                    value={form.fechaNacimiento}
                    onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                    required
                  />
                  {fieldErrors?.fechaNacimiento && (
                    <div className="invalid-feedback">{fieldErrors.fechaNacimiento}</div>
                  )}
                </div>
                {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3 px-4"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary rounded-3 px-4" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  )
}

export default UsuarioForm
