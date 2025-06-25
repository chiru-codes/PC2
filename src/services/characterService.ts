import { apiFetch } from './api';

export interface Character {
    id: string;
    name: string;
    anime: string;
    power: number;
    ability: string;
    comment?: string;
}

export async function fetchCharacters(): Promise<Character[]> {
    return apiFetch('/characters');
}

export async function fetchCharacterById(id: string): Promise<Character> {
    return apiFetch(`/characters/${id}`);
}

export async function createCharacter(data: Omit<Character, 'id'>): Promise<Character> {
    return apiFetch('/characters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
