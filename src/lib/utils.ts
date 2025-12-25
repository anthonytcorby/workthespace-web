import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getPlayerDisplayNames(players: { id: number; name: string }[]): Record<number, string> {
    const surnameCounts: Record<string, number> = {};
    if (!players) return {};

    const getSurname = (name: string) => {
        const parts = name.trim().split(' ');
        return parts.length > 1 ? parts[parts.length - 1] : name;
    };

    // Count surnames
    players.forEach(p => {
        const surname = getSurname(p.name);
        surnameCounts[surname] = (surnameCounts[surname] || 0) + 1;
    });

    const displayNames: Record<number, string> = {};
    players.forEach(p => {
        const surname = getSurname(p.name);
        if (surnameCounts[surname] > 1) {
            displayNames[p.id] = `${p.name.charAt(0)}. ${surname}`;
        } else {
            displayNames[p.id] = surname;
        }
    });

    return displayNames;
}
