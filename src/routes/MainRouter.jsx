import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginView from '../views/Login/Login';
import RegisterView from '../views/Register/Register';
import RecoverPasswordView from '../views/RecoverPassword/RecoverPassword';
import DashboardView from '../views/Dashboard/Dashboard';
import VotingView from "../views/Voting/Voting";

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Componente para redireccionar rutas públicas cuando el usuario está autenticado
const PublicRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

const MainRouter = () => {
    // Estado para verificar si la aplicación ha comprobado la autenticación
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // Aquí podrías verificar la validez del token con tu API
        // Por ahora, simplemente marcamos que se ha verificado
        setAuthChecked(true);
    }, []);

    // Mostrar un loader mientras se verifica la autenticación
    if (!authChecked) {
        return <div>Cargando...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas - redirigen al dashboard si ya está autenticado */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginView />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterView />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/recover-password"
                    element={
                        <PublicRoute>
                            <RecoverPasswordView />
                        </PublicRoute>
                    }
                />

                {/* Rutas protegidas - requieren autenticación */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardView />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/voting"
                    element={
                        <ProtectedRoute>
                            <VotingView />
                        </ProtectedRoute>
                    }
                />

                {/* Redirección por defecto */}
                <Route
                    path="/"
                    element={
                        localStorage.getItem('isAuthenticated') === 'true' ?
                            <Navigate to="/dashboard" replace /> :
                            <Navigate to="/login" replace />
                    }
                />

                {/* Ruta para páginas no encontradas */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;