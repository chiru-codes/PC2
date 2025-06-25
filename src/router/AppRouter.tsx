import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import GradesList from '../pages/GradesList';
import GradeFormPage from '../pages/GradeFormPage.tsx';
import StudentGrades from '../pages/StudentGrades';
import SubjectGrades from '../pages/SubjectGrades';
import GradeStatistics from '../pages/GradeStatistics';
import GradeHistory from '../pages/GradeHistory';
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
                <Route path="/grades" element={<GradesList />} />
                <Route path="/grades/new" element={<GradeFormPage />} />
                <Route path="/grades/student/:id" element={<StudentGrades />} />
                <Route path="/grades/subject/:id" element={<SubjectGrades />} />
                <Route path="/reports" element={<GradeStatistics />} />
                <Route path="/history" element={<GradeHistory />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;
