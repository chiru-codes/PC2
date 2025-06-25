import { useEffect, useState } from 'react';
import { fetchStats } from '../services/statsService';
import type { Stats } from '../services/statsService';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchStats()
            .then(setStats)
            .catch((err) => {
                console.error(err);
                setError('Error al cargar estadísticas');
            });
    }, []);

    if (error) return <p className="text-red-600 text-center">{error}</p>;
    if (!stats) return <p className="text-gray-500 text-center">Cargando...</p>;

    const chartData = Object.entries(stats.byAnime).map(([anime, count]) => ({
        anime,
        count,
    }));

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-blue-800">Dashboard</h1>

            <p>🎯 Total de personajes: <strong>{stats.total}</strong></p>
            <p>💥 Más poderoso: <strong>{stats.strongest.name}</strong> ({stats.strongest.power})</p>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">📊 Personajes por Anime</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="anime" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default DashboardPage;
