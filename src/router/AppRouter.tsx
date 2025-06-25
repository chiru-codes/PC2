import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CharacterListPage from '../pages/CharacterListPage';
import CharacterFormPage from '../pages/CharacterFormPage';
import CharacterDetailPage from '../pages/CharacterDetailPage';
import ProtectedRoute from './ProtectedRoutes';
import ProtectedLayout from '../layouts/ProtectedLayout';
import NotFoundPage from "../pages/NotFoundPage.tsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />

            <Route
                element={
                    <ProtectedRoute>
                        <ProtectedLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/characters" element={<CharacterListPage />} />
                <Route path="/characters/new" element={<CharacterFormPage />} />
                <Route path="/characters/:id" element={<CharacterDetailPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;
