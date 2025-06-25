import { useEffect, useState } from 'react';
import { getGrades, getStudents, getSubjects } from '../services/api';
import type { Grade, Student, Subject } from '../types';

function GradesList() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [studentFilter, setStudentFilter] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [scoreMin, setScoreMin] = useState('');
    const [scoreMax, setScoreMax] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const [gradesData, studentsData, subjectsData] = await Promise.all([
                getGrades(),
                getStudents(),
                getSubjects(),
            ]);
            setGrades(gradesData);
            setStudents(studentsData);
            setSubjects(subjectsData);
        };
        loadData();
    }, []);

    const filteredGrades = grades.filter((grade) => {
        const studentMatch = studentFilter ? grade.student_id === Number(studentFilter) : true;
        const subjectMatch = subjectFilter ? grade.subject_id === Number(subjectFilter) : true;
        const dateMatch = (!dateFrom || new Date(grade.date) >= new Date(dateFrom)) &&
            (!dateTo || new Date(grade.date) <= new Date(dateTo));
        const scoreMatch = (!scoreMin || grade.score >= Number(scoreMin)) &&
            (!scoreMax || grade.score <= Number(scoreMax));
        return studentMatch && subjectMatch && dateMatch && scoreMatch;
    });

    const getStudentName = (id: number) => {
        const student = students.find((s) => s.id === id);
        return student ? `${student.first_name} ${student.last_name}` : 'Desconocido';
    };

    const getSubjectName = (id: number) => {
        const subject = subjects.find((s) => s.id === id);
        return subject ? subject.name : 'Desconocida';
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-blue-800">Lista de Calificaciones</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select value={studentFilter} onChange={(e) => setStudentFilter(e.target.value)} className="border p-2">
                    <option value="">Todos los estudiantes</option>
                    {students.map(s => (
                        <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
                    ))}
                </select>

                <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="border p-2">
                    <option value="">Todas las materias</option>
                    {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>

                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border p-2" placeholder="Desde" />
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border p-2" placeholder="Hasta" />

                <input type="number" value={scoreMin} onChange={(e) => setScoreMin(e.target.value)} className="border p-2" placeholder="Nota mínima" />
                <input type="number" value={scoreMax} onChange={(e) => setScoreMax(e.target.value)} className="border p-2" placeholder="Nota máxima" />
            </div>

            <table className="w-full mt-4 border text-sm">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-2">Estudiante</th>
                    <th className="p-2">Materia</th>
                    <th className="p-2">Nota</th>
                    <th className="p-2">Puntaje Máx</th>
                    <th className="p-2">%</th>
                    <th className="p-2">Fecha</th>
                    <th className="p-2">Comentarios</th>
                </tr>
                </thead>
                <tbody>
                {filteredGrades.map((g) => (
                    <tr key={g.id} className="border-t">
                        <td className="p-2">{getStudentName(g.student_id)}</td>
                        <td className="p-2">{getSubjectName(g.subject_id)}</td>
                        <td className="p-2">{g.score}</td>
                        <td className="p-2">{g.max_score}</td>
                        <td className="p-2">{((g.score / g.max_score) * 100).toFixed(1)}%</td>
                        <td className="p-2">{new Date(g.date).toLocaleDateString()}</td>
                        <td className="p-2">{g.comments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default GradesList;