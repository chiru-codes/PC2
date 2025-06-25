import { apiFetch } from './api';
import type { Character } from './characterService';

export interface Stats {
    total: number;
    strongest: Character;
    byAnime: Record<string, number>;
}

export async function fetchStats(): Promise<Stats> {
    return apiFetch('/stats');
}
