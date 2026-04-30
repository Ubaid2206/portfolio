import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/layout/Layout'
import HomePage from './components/pages/HomePage'
import AboutPage from './components/pages/AboutPage'
import ProjectsPage from './components/pages/ProjectsPage'
import ContactPage from './components/pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<Navigate to="/about/personal" replace />} />
          <Route path="/about/:section" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <ToastContainer theme="dark" position="top-center" />
    </BrowserRouter>
  )
}
