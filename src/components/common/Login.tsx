import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';

function Login() {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!apiKey.trim()) {
            setError('Por favor ingresa tu API Key.');
            return;
        }

        try {
            await login(apiKey.trim());
            navigate('/dashboard');
        } catch (err) {
            console.error("Error en login:", err);
            setError('API Key inválida. Intenta nuevamente.');
        }
    };

    return (
        <div className="bg-white/80 flex flex-col items-center gap-4 p-6 rounded-2xl shadow-2xl w-[350px] border border-blue-800/30">
            <div className="flex flex-col items-center">
                <img src="/cat_icon.png" alt="Logo" className="w-16 h-auto" />
                <h2 className="text-lg font-bold text-blue-800">Cat-Sistema Académico</h2>
                <p className="text-xs text-gray-500">Ingresa tu API Key para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                </label>
                <input
                    id="apiKey"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring focus:ring-yellow-400 bg-white"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="•••••••••••••"
                    autoFocus
                />
                {error && (
                    <div className="text-red-600 text-sm mb-2 text-center animate-pulse">{error}</div>
                )}
                <button
                    type="submit"
                    className="cursor-pointer w-full py-2 bg-blue-800 text-white rounded-md hover:bg-yellow-400 hover:text-blue-800 transition font-medium"
                >
                    Acceder
                </button>
            </form>
        </div>
    );
}

export default Login;
