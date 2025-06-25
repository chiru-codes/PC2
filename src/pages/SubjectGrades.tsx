import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGrades, getStudents, getSubjects } from '../services/api';
import type { Grade, Student, Subject } from '../types';

function SubjectGrades() {
    const { id } = useParams();
    const subjectId = Number(id);

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
                    getSubjects()
                ]);

                const filteredGrades = gradesData.filter(g => g.subject_id === subjectId);

                setGrades(filteredGrades);
                setStudents(studentsData);
                setSubjects(subjectsData);
            } catch (error) {
                console.error('Error al cargar datos de la materia:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isNaN(subjectId)) {
            fetchData();
        }
    }, [subjectId]);

    const getStudentName = (id: number) => {
        const student = students.find(s => s.id === id);
        return student ? `${student.first_name} ${student.last_name}` : 'Estudiante desconocido';
    };

    const getSubjectName = () => {
        return subjects.find(s => s.id === subjectId)?.name || 'Materia desconocida';
    };

    const promedio =
        grades.length > 0
            ? (
                grades.reduce((acc, g) => acc + g.score, 0) / grades.length
            ).toFixed(2)
            : 'N/A';

    if (loading) return <div className="p-4">Cargando calificaciones de la materia...</div>;

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-blue-800">
                Calificaciones de la materia: {getSubjectName()}
            </h2>
            <p className="text-lg text-gray-700">Promedio general: <span className="font-semibold">{promedio}</span></p>

            <table className="min-w-full bg-white shadow rounded">
                <thead className="bg-blue-100 text-blue-800 text-left">
                <tr>
                    <th className="p-2">Estudiante</th>
                    <th className="p-2">Nota</th>
                    <th className="p-2">Máximo</th>
                    <th className="p-2">%</th>
                    <th className="p-2">Fecha</th>
                    <th className="p-2">Comentarios</th>
                </tr>
                </thead>
                <tbody>
                {grades.map((g) => (
                    <tr key={g.id} className="border-t">
                        <td className="p-2">{getStudentName(g.student_id)}</td>
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

export default SubjectGrades;
