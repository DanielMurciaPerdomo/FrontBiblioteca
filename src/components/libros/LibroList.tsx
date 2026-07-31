import type { Libro } from '../../types'

interface LibroListProps {
  libros: Libro[]
  onEdit: (libro: Libro) => void
  onDelete: (libro: Libro) => void
  onVerEjemplares: (libro: Libro) => void
}

function LibroList({ libros, onEdit, onDelete, onVerEjemplares }: LibroListProps) {
  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light border-bottom">
          <tr>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">ID</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Título</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">ISBN</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Edición</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Fecha Publicación</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Autor</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Ejemplares</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-3 px-3 text-secondary small text-center">
                No hay libros registrados.
              </td>
            </tr>
          ) : (
            libros.map((libro) => (
              <tr key={libro.id} className="border-bottom">
                <td className="py-3 px-3 text-dark small">{libro.id}</td>
                <td className="py-3 px-3 text-dark small">{libro.titulo}</td>
                <td className="py-3 px-3 text-dark small">{libro.isbn}</td>
                <td className="py-3 px-3 text-dark small">{libro.edicion ?? '—'}</td>
                <td className="py-3 px-3 text-dark small">{libro.fechaPublicacion ?? '—'}</td>
                <td className="py-3 px-3 text-dark small">{libro.autor}</td>
                <td className="py-3 px-3 small">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary rounded-3"
                    title="Ver Ejemplares Disponibles"
                    onClick={() => onVerEjemplares(libro)}
                  >
                    Ver Ejemplares Disponibles
                  </button>
                </td>
                <td className="py-3 px-3 small">
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-primary p-1 rounded-2"
                    title="Editar"
                    onClick={() => onEdit(libro)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-danger p-1 rounded-2"
                    title="Eliminar"
                    onClick={() => onDelete(libro)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default LibroList
