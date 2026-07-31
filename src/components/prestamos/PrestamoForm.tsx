import { useState } from 'react'
import type { FormEvent } from 'react'
import { crearPrestamo } from '../../api/prestamos'
import { getEjemplaresDisponibles } from '../../api/libros'
import { getApiErrorInfo } from '../../api/errors'
import type { Libro, Usuario } from '../../types'

interface PrestamoFormProps {
  usuarios: Usuario[]
  libros: Libro[]
  onClose: () => void
  onSaved: () => void
}

function PrestamoForm({ usuarios, libros, onClose, onSaved }: PrestamoFormProps) {
  const [usuarioId, setUsuarioId] = useState('')
  const [isbn, setIsbn] = useState('')
  const [diasPrestamo, setDiasPrestamo] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setFieldErrors(null)
    try {
      const disponibles = await getEjemplaresDisponibles(isbn)
      if (disponibles.length === 0) {
        setError(`No hay ejemplares disponibles para el ISBN: ${isbn}`)
        return
      }
      const dias = diasPrestamo === '' ? undefined : Number(diasPrestamo)
      await crearPrestamo({ usuarioId: Number(usuarioId), isbn, diasPrestamo: dias })
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
        aria-label="Nuevo Préstamo"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border rounded-3 shadow-sm">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold text-dark">Nuevo Préstamo</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label">
                    Usuario
                  </label>
                  <select
                    id="usuario"
                    className={`form-select${fieldErrors?.usuarioId ? ' is-invalid' : ''}`}
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </option>
                    ))}
                  </select>
                  {fieldErrors?.usuarioId && (
                    <div className="invalid-feedback">{fieldErrors.usuarioId}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="isbn" className="form-label">
                    ISBN
                  </label>
                  <select
                    id="isbn"
                    className={`form-select${fieldErrors?.isbn ? ' is-invalid' : ''}`}
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un ISBN</option>
                    {libros.map((libro) => (
                      <option key={libro.id} value={libro.isbn}>
                        {libro.titulo} (ISBN: {libro.isbn})
                      </option>
                    ))}
                  </select>
                  {fieldErrors?.isbn && <div className="invalid-feedback">{fieldErrors.isbn}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="diasPrestamo" className="form-label">
                    Días de Préstamo
                  </label>
                  <input
                    id="diasPrestamo"
                    type="number"
                    min={1}
                    className={`form-control${fieldErrors?.diasPrestamo ? ' is-invalid' : ''}`}
                    value={diasPrestamo}
                    onChange={(e) => setDiasPrestamo(e.target.value)}
                    placeholder="min 1, vacio = 15 (por defecto)"
                  />
                  {fieldErrors?.diasPrestamo && (
                    <div className="invalid-feedback">{fieldErrors.diasPrestamo}</div>
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

export default PrestamoForm
