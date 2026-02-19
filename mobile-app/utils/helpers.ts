import { UrgencyConfig, CategoryConfig, StatusConfig } from "@/types/ticket-type";

// ── URGENCY ──
export const getUrgencyConfig = (urgency: string): UrgencyConfig => {

    const u = urgency?.toUpperCase();
    if (u === 'HIGH') return { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', icon: 'alert-decagram', label: 'High', gradient: ['#ef4444', '#dc2626'] };
    if (u === 'MEDIUM') return { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', icon: 'alert-circle-outline', label: 'Medium', gradient: ['#f59e0b', '#d97706'] };
    return { color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0', icon: 'check-circle-outline', label: 'Low', gradient: ['#10b981', '#059669'] };
};

// ── CATEGORY ──
export const getCategoryConfig = (category: string): CategoryConfig => {
    const map: Record<string, CategoryConfig> = {
        'PLUMBING': { icon: 'water', color: '#3b82f6', bg: '#eff6ff' },
        'ELECTRICAL': { icon: 'flash', color: '#f59e0b', bg: '#fffbeb' },
        'STRUCTURAL': { icon: 'wall', color: '#8b5cf6', bg: '#f5f3ff' },
        'HEATING': { icon: 'fire', color: '#ef4444', bg: '#fef2f2' },
        'GENERAL': { icon: 'tag-outline', color: '#64748b', bg: '#f8fafc' },
    };
    return map[category?.toUpperCase()] || map['GENERAL'];
};

// ── STATUS ──
export const getStatusConfig = (status: string): StatusConfig => {
    const s = status?.toUpperCase();
    if (s === 'CLOSED') return { color: '#64748b', bg: '#f1f5f9', label: 'Closed', icon: 'check-circle' };
    return { color: '#3b82f6', bg: '#eff6ff', label: 'Open', icon: 'clock-outline' };
};

// ── CONFIDENCE ──
export const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.7) return '#10b981';
    if (confidence >= 0.4) return '#f59e0b';
    return '#ef4444';
};

// ── DATE FORMAT ──
export const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// ── SHORT DATE (for list views) ──
export const formatShortDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};
