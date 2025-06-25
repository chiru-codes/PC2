import { useState, useEffect } from 'react';

export function useAuth() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false); // 👈 NUEVO

    useEffect(() => {
        const storedKey = localStorage.getItem('apiKey');
        if (storedKey) {
            setApiKey(storedKey);
            setIsLogged(true);
        }
        setLoaded(true);
    }, []);

    const login = async (key: string) => {
        const response = await fetch('http://localhost:8080/validar', {
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
