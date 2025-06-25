import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById, getStudentGrades, getSubjects } from '../services/api';
import type { Grade, Student, Subject } from '../types';

function StudentGrades() {
    const { id } = useParams();
    const studentId = Number(id);

    const [student, setStudent] = useState<Student | null>(null);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentData, gradesData, subjectsData] = await Promise.all([
                    getStudentById(String(studentId)),
                    getStudentGrades(String(studentId)),
                    getSubjects(),
                ]);
                setStudent(studentData);
                setGrades(gradesData);
                setSubjects(subjectsData);
            } catch (error) {
                console.error('Error al cargar datos del estudiante:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isNaN(studentId)) {
            fetchData();
        }
    }, [studentId]);

    const getSubjectName = (subjectId: number) => {
        return subjects.find((s) => s.id === subjectId)?.name || 'Materia desconocida';
    };

    const promedio =
        grades.length > 0
            ? (
                grades.reduce((acc, g) => acc + g.score, 0) / grades.length
            ).toFixed(2)
            : 'N/A';

    if (loading) return <div className="p-4">Cargando calificaciones...</div>;
    if (!student) return <div className="p-4 text-red-600">Estudiante no encontrado.</div>;

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-blue-800">
                Calificaciones de {student.first_name} {student.last_name}
            </h2>
            <p className="text-lg text-gray-700">Promedio general: <span className="font-semibold">{promedio}</span></p>

            <table className="min-w-full bg-white shadow rounded">
                <thead>
                <tr className="bg-blue-100 text-blue-800 text-left">
                    <th className="p-2">Materia</th>
                    <th className="p-2">Nota</th>
                    <th className="p-2">Puntaje Máximo</th>
                    <th className="p-2">%</th>
                    <th className="p-2">Fecha</th>
                    <th className="p-2">Comentarios</th>
                </tr>
                </thead>
                <tbody>
                {grades.map((g) => (
                    <tr key={g.id} className="border-t">
                        <td className="p-2">{getSubjectName(g.subject_id)}</td>
                        <td className="p-2">{g.score}</td>
                        <td className="p-2">{g.max_score}</td>
                        <td className="p-2">{((g.score / g.max_score) * 100).toFixed(1)}%</td>
                        <td className="p-2">{g.date}</td>
                        <td className="p-2">{g.comments || '-'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentGrades;
