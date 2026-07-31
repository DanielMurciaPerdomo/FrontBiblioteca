import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import UsuariosPage from './pages/UsuariosPage'
import LibrosPage from './pages/LibrosPage'
import PrestamosPage from './pages/PrestamosPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container py-5" style={{ maxWidth: '1152px' }}>
        <Routes>
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/libros" element={<LibrosPage />} />
          <Route path="/prestamos" element={<PrestamosPage />} />
          <Route path="*" element={<Navigate to="/usuarios" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App


// import { useEffect, useState } from 'react'
// import { getLibros } from './api/libros'
// import type { Libro } from './types'

// export default function App() {
//   const [libros, setLibros] = useState<Libro[] | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     getLibros()
//       .then((data) => setLibros(data))
//       .catch((err) => setError(err.message || 'Error al conectar con la API'))
//   }, [])

//   return (
//     <div className="container mt-5">
//       <h2 className="fw-bold mb-3">Prueba de conexión (Fase 3): getLibros()</h2>

//       {error && (
//         <div className="alert alert-danger">
//           <strong>Error de conexión:</strong> {error}
//         </div>
//       )}

//       <div className="card p-3 shadow-sm">
//         <h5 className="mb-3">Respuesta enviada por `GET /api/libros`:</h5>
//         <pre className="bg-dark text-light p-3 rounded mb-0">
//           {libros ? JSON.stringify(libros, null, 2) : 'Cargando datos del backend...'}
//         </pre>
//       </div>
//     </div>
//   )
// }
