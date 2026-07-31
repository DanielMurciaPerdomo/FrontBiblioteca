import type { Prestamo } from '../../types'

interface PrestamoListProps {
  prestamos: Prestamo[]
  getUsuarioNombre: (usuarioId: number) => string
  onDevolver: (prestamo: Prestamo) => void
}

const badgeClass: Record<Prestamo['estado'], string> = {
  ACTIVO: 'bg-success',
  DEVUELTO: 'bg-secondary',
  VENCIDO: 'bg-danger',
}

function PrestamoList({ prestamos, getUsuarioNombre, onDevolver }: PrestamoListProps) {
  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light border-bottom">
          <tr>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">ID</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Usuario</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Libro</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Fecha Préstamo</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Devolución Esperada</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Devolución Real</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Estado</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-3 px-3 text-secondary small text-center">
                No hay préstamos registrados.
              </td>
            </tr>
          ) : (
            prestamos.map((prestamo) => (
              <tr key={prestamo.id} className="border-bottom">
                <td className="py-3 px-3 text-dark small">{prestamo.id}</td>
                <td className="py-3 px-3 text-dark small">{getUsuarioNombre(prestamo.usuarioId)}</td>
                <td className="py-3 px-3 text-dark small">Ejemplar #{prestamo.ejemplarId}</td>
                <td className="py-3 px-3 text-dark small">{prestamo.fechaPrestamo}</td>
                <td className="py-3 px-3 text-dark small">{prestamo.fechaDevolucionEsperada}</td>
                <td className="py-3 px-3 text-dark small">{prestamo.fechaDevolucionReal ?? '—'}</td>
                <td className="py-3 px-3 small">
                  <span className={`badge rounded-pill ${badgeClass[prestamo.estado]}`}>
                    {prestamo.estado}
                  </span>
                </td>
                <td className="py-3 px-3 small">
                  {prestamo.estado !== 'DEVUELTO' && (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary rounded-3"
                      onClick={() => onDevolver(prestamo)}
                    >
                      Marcar como devuelto
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PrestamoList
