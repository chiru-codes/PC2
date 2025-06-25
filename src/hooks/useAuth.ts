import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://pc2-matricula-alb-2123051620.us-east-1.elb.amazonaws.com';

export function useAuth() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const storedKey = localStorage.getItem('apiKey');
        if (storedKey) {
            setApiKey(storedKey);
            setIsLogged(true);
        }
        setLoaded(true);
    }, []);

    const login = async (key: string) => {
        const response = await fetch(`${API_BASE_URL}/students/`, {
            headers: {
                'x-api-key': key,
            },
        });

        if (!response.ok) {
            throw new Error('API Key inválida');
        }

        localStorage.setItem('apiKey', key);
        setApiKey(key);
        setIsLogged(true);
    };

    const logout = () => {
        localStorage.removeItem('apiKey');
        setApiKey('');
        setIsLogged(false);
    };

    return {
        isLogged,
        apiKey,
        login,
        logout,
        loaded,
    };
}
