import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/usuarios', label: 'Usuarios' },
  { path: '/libros', label: 'Libros' },
  { path: '/prestamos', label: 'Préstamos' },
]

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-4 px-lg-5 py-0">
        <span className="navbar-brand d-flex align-items-center fw-bold fs-4 text-dark mb-0 py-3 ms-5 me-4">
          Sistema de Gestión de Biblioteca
        </span>

        <ul className="nav align-self-stretch">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item d-flex">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link nav-tab-active d-flex align-items-center px-3 text-primary fw-semibold border-bottom border-primary border-2'
                    : 'nav-link d-flex align-items-center px-3 text-secondary'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
    </nav>
  )
}

export default Navbar
