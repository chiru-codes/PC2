import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-800 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <img src="/cat_icon.png" alt="Logo" className="w-8 h-auto" />
                <h1 className="text-lg font-semibold">CatCharacter</h1>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
                Cerrar sesión
            </button>
        </nav>
    );
}

export default Navbar;
