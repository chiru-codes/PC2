const API_BASE_URL = 'http://localhost:8080';

export async function validateApiKey(key: string) {
    const response = await fetch(`${API_BASE_URL}/validar`, {
        headers: {
            'x-api-key': key,
        },
    });

    if (!response.ok) {
        throw new Error('API Key inválida');
    }

    return response.json();
}
