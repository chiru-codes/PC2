import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
                <img src="/cat_icon.png" alt="Logo" className="w-8 h-auto" />
                <h1 className="text-lg font-semibold">CatCharacter</h1>
                <ul className="flex gap-4 ml-6 text-sm">
                    <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                    <li><Link to="/grades" className="hover:underline">Calificaciones</Link></li>
                    <li><Link to="/grades/new" className="hover:underline">Nueva Calificación</Link></li>
                    <li><Link to="/reports" className="hover:underline">Reportes</Link></li>
                    <li><Link to="/history" className="hover:underline">Historial</Link></li>
                    <li><Link to="/subjects" className="hover:underline">Materias</Link></li>
                    <li><Link to="/students" className="hover:underline">Estudiantes</Link></li>
                </ul>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
            >
                Cerrar sesión
            </button>
        </nav>
    );
}

export default Navbar;
