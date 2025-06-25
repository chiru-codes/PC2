import { useEffect, useState } from 'react';
import { getGrades, getStudents } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Grade, Student } from '../types';

export default function DashboardPage() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [gradesData, studentsData] = await Promise.all([
                    getGrades(),
                    getStudents(),
                ]);

                setGrades(gradesData);
                setStudents(studentsData);
            } catch (error) {
                console.error('Error al cargar datos del dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const promedio = (
        grades.reduce((acc, g) => acc + g.score, 0) / (grades.length || 1)
    ).toFixed(2);

    const distribucion = [
        { rango: '0-10', cantidad: grades.filter(g => g.score <= 10).length },
        { rango: '11-15', cantidad: grades.filter(g => g.score > 10 && g.score <= 15).length },
        { rango: '16-20', cantidad: grades.filter(g => g.score > 15).length },
    ];

    const promediosPorEstudiante = students.map((s) => {
        const notas = grades.filter((g) => g.student_id === s.id);
        const promedio =
            notas.reduce((acc, g) => acc + g.score, 0) / (notas.length || 1);
        return { nombre: s.first_name, promedio: +promedio.toFixed(2) };
    });

    const top3 = [...promediosPorEstudiante]
        .sort((a, b) => b.promedio - a.promedio)
        .slice(0, 3);
    const bottom3 = [...promediosPorEstudiante]
        .sort((a, b) => a.promedio - b.promedio)
        .slice(0, 3);

    if (loading) return <div className="p-4">Cargando estadísticas...</div>;

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-800">Dashboard Académico</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total de calificaciones</h3>
                    <p className="text-2xl text-blue-800">{grades.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Promedio general</h3>
                    <p className="text-2xl text-blue-800">{promedio}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Distribución por rangos</h3>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={distribucion}>
                            <XAxis dataKey="rango" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="cantidad" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Top 3 Estudiantes</h3>
                    <ul className="list-disc list-inside text-blue-800">
                        {top3.map((s) => (
                            <li key={s.nombre}>{s.nombre}: {s.promedio}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Bottom 3 Estudiantes</h3>
                    <ul className="list-disc list-inside text-red-600">
                        {bottom3.map((s) => (
                            <li key={s.nombre}>{s.nombre}: {s.promedio}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
