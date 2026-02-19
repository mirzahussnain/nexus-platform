import { MaterialCommunityIcons } from '@expo/vector-icons';

// ── TYPES ──
export interface TicketResponse {
    id: number;
    ticketNumber: string;
    description: string;
    status: string;
    urgency: string;
    category: string;
    confidence: number;
    score: number;
    recommendedAction: string;
    explanationJson: string;
    createdAt: string;
}

export interface UrgencyConfig {
    color: string;
    bg: string;
    border: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    gradient: readonly [string, string];
}

export interface CategoryConfig {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    bg: string;
}

export interface StatusConfig {
    color: string;
    bg: string;
    label: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
}