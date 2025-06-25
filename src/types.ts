export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    dni: string;
    phone: string;
    birth_date: string;
    admission_date: string;
    profile_photo_key: string;
}

export interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
    location: string;
    max_students: number;
}

export interface Grade {
    id: number;
    student_id: number;
    subject_id: number;
    score: number;
    max_score: number;
    comments: string;
    date: string;
}

export interface Enrollment {
    id: number;
    student_id: number;
    subject_id: number;
    enrollment_date: string;
}

export interface Absence {
    id: number;
    student_id: number;
    subject_id: number;
    date: string;
    reason: string;
    comment: string;
}

export interface Teacher {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    department: string;
    profile_photo_key: string;
}
