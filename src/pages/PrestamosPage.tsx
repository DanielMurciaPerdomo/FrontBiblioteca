import { useCallback, useEffect, useState } from 'react'
import { getPrestamos, devolverPrestamo } from '../api/prestamos'
import type { PrestamoFilter } from '../api/prestamos'
import { getUsuarios } from '../api/usuarios'
import { getLibros } from '../api/libros'
import { getApiErrorInfo } from '../api/errors'
import PrestamoForm from '../components/prestamos/PrestamoForm'
import PrestamoList from '../components/prestamos/PrestamoList'
import type { Libro, Prestamo, Usuario } from '../types'

function PrestamosPage() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [libros, setLibros] = useState<Libro[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [devolverError, setDevolverError] = useState<string | null>(null)
  const [filtroUsuarioId, setFiltroUsuarioId] = useState('')
  const [filtroLibroId, setFiltroLibroId] = useState('')
  const [showForm, setShowForm] = useState(false)

  const loadPrestamos = useCallback(async (params?: PrestamoFilter) => {
    try {
      const data = await getPrestamos(params)
      setPrestamos(data)
      setLoadError(null)
    } catch (err) {
      const info = getApiErrorInfo(err)
      setLoadError(info.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    Promise.all([getPrestamos(), getUsuarios(), getLibros()])
      .then(([prestamosData, usuariosData, librosData]) => {
        setPrestamos(prestamosData)
        setUsuarios(usuariosData)
        setLibros(librosData)
      })
      .catch((err) => setLoadError(getApiErrorInfo(err).message))
      .finally(() => setLoading(false))
  }, [])

  const buildParams = (usuarioId: string, libroId: string): PrestamoFilter | undefined => {
    const params: PrestamoFilter = {}
    if (usuarioId !== '') params.usuarioId = Number(usuarioId)
    if (libroId !== '') params.libroId = Number(libroId)
    return params.usuarioId !== undefined || params.libroId !== undefined ? params : undefined
  }

  const handleFiltroUsuario = (value: string) => {
    setFiltroUsuarioId(value)
    void loadPrestamos(buildParams(value, filtroLibroId))
  }

  const handleFiltroLibro = (value: string) => {
    setFiltroLibroId(value)
    void loadPrestamos(buildParams(filtroUsuarioId, value))
  }

  const refrescar = () => {
    void loadPrestamos(buildParams(filtroUsuarioId, filtroLibroId))
  }

  const handleSaved = () => {
    setShowForm(false)
    refrescar()
  }

  const handleDevolver = async (prestamo: Prestamo) => {
    setDevolverError(null)
    try {
      await devolverPrestamo(prestamo.id)
      refrescar()
    } catch (err) {
      const info = getApiErrorInfo(err)
      setDevolverError(info.message)
    }
  }

  const getUsuarioNombre = (usuarioId: number) => {
    const usuario = usuarios.find((u) => u.id === usuarioId)
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : `Usuario #${usuarioId}`
  }

  return (
    <section>
      <h1 className="display-6 fw-bold text-dark mb-4">Gestión de Préstamos</h1>
      <div className="card border rounded-4 shadow-sm p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
          <div className="d-flex flex-wrap gap-3">
            <select
              className="form-select"
              style={{ minWidth: '220px' }}
              value={filtroUsuarioId}
              onChange={(e) => handleFiltroUsuario(e.target.value)}
              aria-label="Filtrar por usuario"
            >
              <option value="">Todos los usuarios</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre} {usuario.apellido}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ minWidth: '220px' }}
              value={filtroLibroId}
              onChange={(e) => handleFiltroLibro(e.target.value)}
              aria-label="Filtrar por libro"
            >
              <option value="">Todos los libros</option>
              {libros.map((libro) => (
                <option key={libro.id} value={libro.id}>
                  {libro.titulo} (ISBN: {libro.isbn})
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary fw-medium px-4 py-2 rounded-3 shadow-sm"
            onClick={() => setShowForm(true)}
          >
            Nuevo Préstamo
          </button>
        </div>

        {loading && <p className="text-secondary small mb-3">Cargando préstamos...</p>}
        {loadError && <div className="alert alert-danger mb-3">{loadError}</div>}
        {devolverError && <div className="alert alert-danger mb-3">{devolverError}</div>}
        {!loading && !loadError && (
          <PrestamoList
            prestamos={prestamos}
            getUsuarioNombre={getUsuarioNombre}
            onDevolver={(prestamo) => void handleDevolver(prestamo)}
          />
        )}
      </div>

      {showForm && (
        <PrestamoForm
          usuarios={usuarios}
          libros={libros}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}
    </section>
  )
}

export default PrestamosPage
