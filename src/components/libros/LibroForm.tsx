import { useState } from 'react'
import type { FormEvent } from 'react'
import { createLibro, updateLibro } from '../../api/libros'
import { getApiErrorInfo } from '../../api/errors'
import type { Libro, LibroInput } from '../../types'

interface LibroFormProps {
  libro?: Libro | null
  onClose: () => void
  onSaved: () => void
}

type TextField = 'titulo' | 'isbn' | 'edicion' | 'fechaPublicacion' | 'autor'

function LibroForm({ libro, onClose, onSaved }: LibroFormProps) {
  const isEdit = Boolean(libro)
  const [form, setForm] = useState<LibroInput>(() => ({
    titulo: libro?.titulo ?? '',
    isbn: libro?.isbn ?? '',
    edicion: libro?.edicion ?? '',
    fechaPublicacion: libro?.fechaPublicacion ?? '',
    autor: libro?.autor ?? '',
    cantidadEjemplares: libro?.cantidadEjemplares ?? 1,
  }))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null)

  const handleChange = (field: TextField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setFieldErrors(null)
    const edicion = form.edicion?.trim() ?? ''
    const payload: LibroInput = {
      ...form,
      edicion: edicion === '' ? null : edicion,
      fechaPublicacion: form.fechaPublicacion === '' ? null : form.fechaPublicacion,
    }
    try {
      if (libro) {
        await updateLibro(libro.id, payload)
      } else {
        await createLibro(payload)
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
        aria-label={isEdit ? 'Editar Libro' : 'Nuevo Libro'}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border rounded-3 shadow-sm">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold text-dark">
                {isEdit ? 'Editar Libro' : 'Nuevo Libro'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Título
                  </label>
                  <input
                    id="titulo"
                    type="text"
                    className={`form-control${fieldErrors?.titulo ? ' is-invalid' : ''}`}
                    value={form.titulo}
                    onChange={(e) => handleChange('titulo', e.target.value)}
                    maxLength={200}
                    required
                  />
                  {fieldErrors?.titulo && (
                    <div className="invalid-feedback">{fieldErrors.titulo}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="isbn" className="form-label">
                    ISBN
                  </label>
                  <input
                    id="isbn"
                    type="text"
                    className={`form-control${fieldErrors?.isbn ? ' is-invalid' : ''}`}
                    value={form.isbn}
                    onChange={(e) => handleChange('isbn', e.target.value)}
                    maxLength={20}
                    required
                  />
                  {fieldErrors?.isbn && <div className="invalid-feedback">{fieldErrors.isbn}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="edicion" className="form-label">
                    Edición
                  </label>
                  <input
                    id="edicion"
                    type="text"
                    className={`form-control${fieldErrors?.edicion ? ' is-invalid' : ''}`}
                    value={form.edicion ?? ''}
                    onChange={(e) => handleChange('edicion', e.target.value)}
                    maxLength={50}
                  />
                  {fieldErrors?.edicion && (
                    <div className="invalid-feedback">{fieldErrors.edicion}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaPublicacion" className="form-label">
                    Fecha de Publicación
                  </label>
                  <input
                    id="fechaPublicacion"
                    type="date"
                    className={`form-control${fieldErrors?.fechaPublicacion ? ' is-invalid' : ''}`}
                    value={form.fechaPublicacion ?? ''}
                    onChange={(e) => handleChange('fechaPublicacion', e.target.value)}
                  />
                  {fieldErrors?.fechaPublicacion && (
                    <div className="invalid-feedback">{fieldErrors.fechaPublicacion}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="autor" className="form-label">
                    Autor
                  </label>
                  <input
                    id="autor"
                    type="text"
                    className={`form-control${fieldErrors?.autor ? ' is-invalid' : ''}`}
                    value={form.autor}
                    onChange={(e) => handleChange('autor', e.target.value)}
                    maxLength={150}
                    required
                  />
                  {fieldErrors?.autor && <div className="invalid-feedback">{fieldErrors.autor}</div>}
                </div>
                {!isEdit && (
                  <div className="mb-3">
                    <label htmlFor="cantidadEjemplares" className="form-label">
                      Cantidad de Ejemplares
                    </label>
                    <input
                      id="cantidadEjemplares"
                      type="number"
                      min={1}
                      className={`form-control${fieldErrors?.cantidadEjemplares ? ' is-invalid' : ''}`}
                      value={form.cantidadEjemplares}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, cantidadEjemplares: Number(e.target.value) }))
                      }
                      required
                    />
                    {fieldErrors?.cantidadEjemplares && (
                      <div className="invalid-feedback">{fieldErrors.cantidadEjemplares}</div>
                    )}
                  </div>
                )}
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

export default LibroForm
