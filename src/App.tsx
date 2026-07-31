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
