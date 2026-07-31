import type { Usuario } from '../../types'

interface UsuarioListProps {
  usuarios: Usuario[]
  onEdit: (usuario: Usuario) => void
  onDelete: (usuario: Usuario) => void
}

function UsuarioList({ usuarios, onEdit, onDelete }: UsuarioListProps) {
  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light border-bottom">
          <tr>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">ID</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Nombre</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Apellido</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Email</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Fecha Nacimiento</th>
            <th className="text-start fw-semibold text-secondary small py-3 px-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-3 px-3 text-secondary small text-center">
                No hay usuarios registrados.
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-bottom">
                <td className="py-3 px-3 text-dark small">{usuario.id}</td>
                <td className="py-3 px-3 text-dark small">{usuario.nombre}</td>
                <td className="py-3 px-3 text-dark small">{usuario.apellido}</td>
                <td className="py-3 px-3 text-dark small">{usuario.email}</td>
                <td className="py-3 px-3 text-dark small">{usuario.fechaNacimiento}</td>
                <td className="py-3 px-3 small">
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-primary p-1 rounded-2"
                    title="Editar"
                    onClick={() => onEdit(usuario)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-danger p-1 rounded-2"
                    title="Eliminar"
                    onClick={() => onDelete(usuario)}
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

export default UsuarioList
