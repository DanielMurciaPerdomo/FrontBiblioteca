import { useEffect, useState } from 'react'
import { getEjemplaresDisponibles } from '../../api/libros'
import { getApiErrorInfo } from '../../api/errors'
import type { Ejemplar } from '../../types'

interface EjemplaresDisponiblesProps {
  isbn: string
  onClose: () => void
}

function EjemplaresDisponibles({ isbn, onClose }: EjemplaresDisponiblesProps) {
  const [ejemplares, setEjemplares] = useState<Ejemplar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getEjemplaresDisponibles(isbn)
      .then((data) => setEjemplares(data))
      .catch((err) => setError(getApiErrorInfo(err).message))
      .finally(() => setLoading(false))
  }, [isbn])

  return (
    <>

      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Ejemplares Disponibles"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border rounded-3 shadow-sm">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold text-dark">Ejemplares Disponibles</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
            </div>
            <div className="modal-body">
              <p className="text-secondary small mb-3">ISBN: {isbn}</p>
              {loading && <p className="text-secondary small mb-0">Cargando ejemplares...</p>}
              {error && <div className="alert alert-danger mb-0">{error}</div>}
              {!loading && !error && ejemplares.length === 0 && (
                <p className="text-secondary mb-0">
                  No hay ejemplares disponibles para el ISBN: {isbn}
                </p>
              )}
              {!loading && !error && ejemplares.length > 0 && (
                <ul className="list-group">
                  {ejemplares.map((ejemplar) => (
                    <li
                      key={ejemplar.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span className="small text-dark">{ejemplar.codigoInventario}</span>
                      <span className="badge rounded-pill bg-success">DISPONIBLE</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer border-top-0 pt-0">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-3 px-4"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  )
}

export default EjemplaresDisponibles
