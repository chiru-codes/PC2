import cat404 from '../assets/cat_404.png';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-blue-800 p-6 text-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
                style={{
                    backgroundImage:
                        "url('https://i.pinimg.com/originals/95/fe/ba/95febac8743360c665e953439d7573b2.gif')",
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <img src={cat404} alt="Gatito perdido" className="w-64 h-auto mb-6" />
                <h1 className="text-4xl font-bold text-red-600 mb-2">404 - Página no encontrada</h1>
                <p className="text-yellow-400 mb-4 font-semibold">
                    Parece que este alumno se ha perdido en el mar
                </p>
                <Link
                    to="/dashboard"
                    className="cursor-pointer bg-white text-blue-900 font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                    Regresar al inicio
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
