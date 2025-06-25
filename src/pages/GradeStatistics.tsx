import { useEffect, useState } from 'react';
import { getGrades, getStudents, getSubjects } from '../services/api';
import type { Grade, Student, Subject } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function GradeStatistics() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gradesData, studentsData, subjectsData] = await Promise.all([
                    getGrades(),
                    getStudents(),
                    getSubjects(),
                ]);
                setGrades(gradesData);
                setStudents(studentsData);
                setSubjects(subjectsData);
            } catch (error) {
                console.error('Error cargando datos de reporte', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const promediosPorEstudiante = students.map((student) => {
        const notas = grades.filter((g) => g.student_id === student.id);
        const promedio = notas.reduce((acc, g) => acc + g.score, 0) / (notas.length || 1);
        return {
            nombre: `${student.first_name} ${student.last_name}`,
            promedio: +promedio.toFixed(2),
        };
    });

    const ranking = [...promediosPorEstudiante].sort((a, b) => b.promedio - a.promedio);

    const estadisticasPorMateria = subjects.map((subject) => {
        const notas = grades.filter((g) => g.subject_id === subject.id);
        const promedio = notas.reduce((acc, g) => acc + g.score, 0) / (notas.length || 1);
        const max = Math.max(...notas.map((g) => g.score), 0);
        const min = Math.min(...notas.map((g) => g.score), 0);
        return {
            materia: subject.name,
            promedio: +promedio.toFixed(2),
            max,
            min,
        };
    });

    const distribucion = [
        { rango: '0-10', cantidad: grades.filter(g => g.score <= 10).length },
        { rango: '11-15', cantidad: grades.filter(g => g.score > 10 && g.score <= 15).length },
        { rango: '16-20', cantidad: grades.filter(g => g.score > 15).length },
    ];

    if (loading) return <div className="p-4">Cargando reportes...</div>;

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-blue-800">Reportes Académicos</h2>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Ranking de Estudiantes</h3>
                <ul className="list-disc list-inside text-blue-800">
                    {ranking.map((s, i) => (
                        <li key={s.nombre}>
                            #{i + 1} {s.nombre}: {s.promedio}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Estadísticas por Materia</h3>
                <ul className="list-disc list-inside text-gray-700">
                    {estadisticasPorMateria.map((s) => (
                        <li key={s.materia}>
                            {s.materia}: Prom. {s.promedio}, Máx. {s.max}, Mín. {s.min}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Distribución de Notas</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={distribucion}>
                        <XAxis dataKey="rango" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="cantidad" fill="#60a5fa" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GradeStatistics;
