import { useCallback, useEffect, useState } from 'react'
import { deleteUsuario, getUsuarios } from '../api/usuarios'
import { getApiErrorInfo } from '../api/errors'
import ConfirmDialog from '../components/common/ConfirmDialog'
import UsuarioForm from '../components/usuarios/UsuarioForm'
import UsuarioList from '../components/usuarios/UsuarioList'
import type { Usuario } from '../types'

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [usuarioToDelete, setUsuarioToDelete] = useState<Usuario | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const loadUsuarios = useCallback(async () => {
    try {
      const data = await getUsuarios()
      setUsuarios(data)
      setLoadError(null)
    } catch (err) {
      const info = getApiErrorInfo(err)
      setLoadError(info.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUsuarios()
      .then((data) => setUsuarios(data))
      .catch((err) => setLoadError(getApiErrorInfo(err).message))
      .finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditingUsuario(null)
    setShowForm(true)
  }

  const openEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario)
    setShowForm(true)
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditingUsuario(null)
    void loadUsuarios()
  }

  const handleDelete = (usuario: Usuario) => {
    setDeleteError(null)
    setUsuarioToDelete(usuario)
  }

  const confirmDelete = async () => {
    if (!usuarioToDelete) return
    const id = usuarioToDelete.id
    setUsuarioToDelete(null)
    try {
      await deleteUsuario(id)
      void loadUsuarios()
    } catch (err) {
      const info = getApiErrorInfo(err)
      setDeleteError(info.message)
    }
  }

  return (
    <section>
      <h1 className="display-6 fw-bold text-dark mb-4">Gestión de Usuarios</h1>
      <div className="card border rounded-4 shadow-sm p-4">
        <div className="d-flex justify-content-end mb-3">
          <button
            type="button"
            className="btn btn-primary fw-medium px-4 py-2 rounded-3 shadow-sm"
            onClick={openCreate}
          >
            Nuevo Usuario
          </button>
        </div>

        {loading && <p className="text-secondary small mb-3">Cargando usuarios...</p>}
        {loadError && <div className="alert alert-danger mb-3">{loadError}</div>}
        {deleteError && <div className="alert alert-danger mb-3">{deleteError}</div>}
        {!loading && !loadError && (
          <UsuarioList usuarios={usuarios} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </div>

      {showForm && (
        <UsuarioForm
          usuario={editingUsuario}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}

      <ConfirmDialog
        open={Boolean(usuarioToDelete)}
        title="Eliminar Usuario"
        message={`¿Estás seguro de eliminar a ${usuarioToDelete?.nombre ?? ''} ${usuarioToDelete?.apellido ?? ''}?`}
        confirmLabel="Eliminar"
        onConfirm={() => void confirmDelete()}
        onCancel={() => setUsuarioToDelete(null)}
      />
    </section>
  )
}

export default UsuariosPage
