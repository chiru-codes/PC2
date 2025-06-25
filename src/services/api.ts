const API_BASE_URL = 'http://localhost:8080';

export function getApiKey(): string {
    return localStorage.getItem('apiKey') || '';
}

export async function apiFetch(path: string, options: RequestInit = {}) {
    const apiKey = getApiKey();

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'x-api-key': apiKey,
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Error de servidor' }));
        throw new Error(error.message || 'Error desconocido');
    }

    return response.json();
}
