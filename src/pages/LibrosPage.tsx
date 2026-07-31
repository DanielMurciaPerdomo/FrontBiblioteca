import { useCallback, useEffect, useState } from 'react'
import { deleteLibro, getLibros } from '../api/libros'
import { getApiErrorInfo } from '../api/errors'
import ConfirmDialog from '../components/common/ConfirmDialog'
import EjemplaresDisponibles from '../components/libros/EjemplaresDisponibles'
import LibroForm from '../components/libros/LibroForm'
import LibroList from '../components/libros/LibroList'
import type { Libro } from '../types'

function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingLibro, setEditingLibro] = useState<Libro | null>(null)
  const [libroToDelete, setLibroToDelete] = useState<Libro | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [ejemplaresIsbn, setEjemplaresIsbn] = useState<string | null>(null)

  const loadLibros = useCallback(async () => {
    try {
      const data = await getLibros()
      setLibros(data)
      setLoadError(null)
    } catch (err) {
      const info = getApiErrorInfo(err)
      setLoadError(info.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getLibros()
      .then((data) => setLibros(data))
      .catch((err) => setLoadError(getApiErrorInfo(err).message))
      .finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditingLibro(null)
    setShowForm(true)
  }

  const openEdit = (libro: Libro) => {
    setEditingLibro(libro)
    setShowForm(true)
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditingLibro(null)
    void loadLibros()
  }

  const handleDelete = (libro: Libro) => {
    setDeleteError(null)
    setLibroToDelete(libro)
  }

  const confirmDelete = async () => {
    if (!libroToDelete) return
    const id = libroToDelete.id
    setLibroToDelete(null)
    try {
      await deleteLibro(id)
      void loadLibros()
    } catch (err) {
      const info = getApiErrorInfo(err)
      setDeleteError(info.message)
    }
  }

  const handleVerEjemplares = (libro: Libro) => {
    setEjemplaresIsbn(libro.isbn)
  }

  return (
    <section>
      <h1 className="display-6 fw-bold text-dark mb-4">Catálogo de Libros</h1>
      <div className="card border rounded-4 shadow-sm p-4">
        <div className="d-flex justify-content-end mb-3">
          <button
            type="button"
            className="btn btn-primary fw-medium px-4 py-2 rounded-3 shadow-sm"
            onClick={openCreate}
          >
            Nuevo Libro
          </button>
        </div>

        {loading && <p className="text-secondary small mb-3">Cargando libros...</p>}
        {loadError && <div className="alert alert-danger mb-3">{loadError}</div>}
        {deleteError && <div className="alert alert-danger mb-3">{deleteError}</div>}
        {!loading && !loadError && (
          <LibroList
            libros={libros}
            onEdit={openEdit}
            onDelete={handleDelete}
            onVerEjemplares={handleVerEjemplares}
          />
        )}
      </div>

      {showForm && (
        <LibroForm
          libro={editingLibro}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}

      {ejemplaresIsbn && (
        <EjemplaresDisponibles isbn={ejemplaresIsbn} onClose={() => setEjemplaresIsbn(null)} />
      )}

      <ConfirmDialog
        open={Boolean(libroToDelete)}
        title="Eliminar Libro"
        message={`¿Estás seguro de eliminar el libro "${libroToDelete?.titulo ?? ''}"?`}
        confirmLabel="Eliminar"
        onConfirm={() => void confirmDelete()}
        onCancel={() => setLibroToDelete(null)}
      />
    </section>
  )
}

export default LibrosPage
