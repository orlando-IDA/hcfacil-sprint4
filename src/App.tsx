import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import WelcomePage from './pages/Welcome';
import LoginPage from './pages/Login';
import ForgotPasswordPage from './pages/ForgotPass';
import HomePage from './pages/Home';
import MarqueSuaConsultaPage from './pages/MarqueConsulta';
import IntegrantesPage from './pages/Integrantes';
import IntegranteDetail from './pages/IntegranteDetail';
import ContatoPage from './pages/Contato';
import FaqPage from './pages/FAQ';
import VideosPage from './pages/Video';
import SobrePage from './pages/Sobre';
import Error from './pages/Error';
import PerfilPage from './pages/Perfil';

function App() {
  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/marque-sua-consulta" element={<MarqueSuaConsultaPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/integrantes" element={<IntegrantesPage />} />
          <Route path="/integrantes/:id" element={<IntegranteDetail />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/videos" element={<VideosPage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;