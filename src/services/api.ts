import type { Student, Subject, Grade, Enrollment, Absence, Teacher,} from '../types';

const API_BASE_URL = 'http://pc2-matricula-alb-2123051620.us-east-1.elb.amazonaws.com';

export function getApiKey(): string {
    return localStorage.getItem('apiKey') || '';
}

export async function apiFetch(path: string, options: RequestInit = {}) {
    const apiKey = getApiKey();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Error de servidor' }));
        throw new Error(error.message || 'Error desconocido');
    }

    return response.json();
}

// Students
export function getStudents(): Promise<Student[]>{
    return apiFetch('/students/');
}

export function getStudentById(studentId: string): Promise<Student> {
    return apiFetch(`/students/${studentId}/`);
}

export function getStudentGrades(studentId: string): Promise<Grade[]> {
    return apiFetch(`/students/${studentId}/grades/`);
}

export function getStudentAbsenceSummary(studentId: string): Promise<Absence[]> {
    return apiFetch(`/students/${studentId}/absence_summary/`);
}

export async function getSubjectsForStudent(studentId: number): Promise<Subject[]> {
    const enrollments: Enrollment[] = await apiFetch(`/enrollments/?student_id=${studentId}`);
    const allSubjects = await getSubjects();
    return allSubjects.filter(subject =>
        enrollments.some(enr => Number(enr.subject_id) === subject.id)
    );
}

export function createStudent(data: Student) {
    return apiFetch('/students/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Subjects
export function getSubjects(): Promise<Subject[]> {
    return apiFetch('/subjects/');
}

export function createSubject(data: Subject) {
    return apiFetch('/subjects/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function getSubjectsOccupancy(): Promise<Subject[]> {
    return apiFetch('/subjects/occupancy/');
}

// Enrollments
export function getEnrollments(): Promise<Enrollment[]> {
    return apiFetch('/enrollments/');
}

export function createEnrollment(data: Enrollment) {
    return apiFetch('/enrollments/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function checkEnrollmentAvailability() {
    return apiFetch('/enrollments/check_availability/');
}

// Teachers
export function getTeachers(): Promise<Teacher[]> {
    return apiFetch('/teachers/');
}

export function createTeacher(data: Teacher) {
    return apiFetch('/teachers/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function getTeacherById(id: string): Promise<Teacher> {
    return apiFetch(`/teachers/${id}/`);
}

export function getTeacherSubjects(id: string): Promise<Subject[]> {
    return apiFetch(`/teachers/${id}/subjects/`);
}

// Grades
export function getGrades(filters: string = ''): Promise<Grade[]> {
    return apiFetch(`/grades/${filters}`);
}

export interface GradePayload {
    student_id: number;
    subject_id: number;
    score: number;
    max_score: number;
    comments: string;
}

export function createGrade(data: GradePayload) {
    return apiFetch('/grades/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Absences
export function getAbsences(): Promise<Absence[]> {
    return apiFetch('/absences/');
}

export function createAbsence(data: Absence) {
    return apiFetch('/absences/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Health
export function healthCheck() {
    return apiFetch('/');
}

export function detailedHealthCheck() {
    return apiFetch('/health');
}

// Api Key
export function resetApiKey() {
    return apiFetch('/reset_api_key/', {
        method: 'POST',
    });
}

export function validateApiKey(key: string) {
    return fetch(`${API_BASE_URL}/login`, {
        headers: {
            'x-api-key': key,
        },
    }).then((res) => {
        if (!res.ok) throw new Error('API Key inválida');
        return res.json();
    });
}
