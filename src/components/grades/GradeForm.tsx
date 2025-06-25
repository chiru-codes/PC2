import { useEffect, useState } from 'react';
import { getStudents, getSubjectsForStudent, createGrade } from '../../services/api';
import type { Student, Subject } from '../../types';

export default function GradeForm() {
    const [step, setStep] = useState(1);

    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

    const [score, setScore] = useState<number>(0);
    const [maxScore, setMaxScore] = useState<number>(20);
    const [comments, setComments] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await getStudents();
                setStudents(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            if (selectedStudent !== null) {
                try {
                    const res = await getSubjectsForStudent(selectedStudent);
                    setSubjects(res);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchSubjects();
    }, [selectedStudent]);

    const handleSubmit = async () => {
        if (score < 0 || score > maxScore) {
            setError('La nota debe estar entre 0 y el puntaje máximo');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await createGrade({
                student_id: selectedStudent!,
                subject_id: selectedSubject!,
                score,
                max_score: maxScore,
                comments,
            });
            setSuccess(true);
            setStep(1);
            setSelectedStudent(null);
            setSelectedSubject(null);
            setScore(0);
            setMaxScore(20);
            setComments('');
        } catch (err) {
            console.error(err);
            setError('Error al registrar la calificación.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Registrar Calificación</h2>

            {success && <div className="text-green-600 mb-4">Calificación registrada correctamente.</div>}

            {step === 1 && (
                <div className="space-y-4">
                    <label className="block">
                        Selecciona un estudiante:
                        <select
                            className="mt-1 block w-full border px-2 py-1"
                            value={selectedStudent ?? ''}
                            onChange={(e) => {
                                setSelectedStudent(Number(e.target.value));
                                setStep(2);
                            }}
                        >
                            <option value="" disabled>-- Seleccionar --</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.first_name} {s.last_name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <label className="block">
                        Selecciona una materia:
                        <select
                            className="mt-1 block w-full border px-2 py-1"
                            value={selectedSubject ?? ''}
                            onChange={(e) => {
                                setSelectedSubject(Number(e.target.value));
                                setStep(3);
                            }}
                        >
                            <option value="" disabled>-- Seleccionar --</option>
                            {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <label className="block">
                        Nota obtenida:
                        <input
                            type="number"
                            className="mt-1 w-full border px-2 py-1"
                            value={score}
                            onChange={(e) => setScore(Number(e.target.value))}
                        />
                    </label>
                    <label className="block">
                        Puntaje máximo:
                        <input
                            type="number"
                            className="mt-1 w-full border px-2 py-1"
                            value={maxScore}
                            onChange={(e) => setMaxScore(Number(e.target.value))}
                        />
                    </label>
                    <label className="block">
                        Comentarios:
                        <textarea
                            className="mt-1 w-full border px-2 py-1"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        ></textarea>
                    </label>
                    {error && <div className="text-red-600">{error}</div>}
                    <button
                        onClick={() => setStep(4)}
                        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Siguiente
                    </button>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-4">
                    <p>Estás a punto de registrar esta calificación. ¿Deseas continuar?</p>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Confirmar y Registrar
                    </button>
                    <button
                        onClick={() => setStep(3)}
                        className="text-blue-600 underline"
                    >
                        Volver
                    </button>
                </div>
            )}
        </div>
    );
}
