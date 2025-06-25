const API_BASE_URL = 'http://pc2-matricula-alb-2123051620.us-east-1.elb.amazonaws.com';

export async function validateApiKey(key: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        headers: {
            'x-api-key': key,
        },
    });

    if (!response.ok) {
        throw new Error('API Key inválida');
    }

    return response.json();
}
