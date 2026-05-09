import React, { useState, useEffect, useRef } from 'react';
import { Activity, Eraser, MousePointerClick, AlertTriangle, Eye, EyeOff, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Droplet, Zap, Sparkles, Copy, X, Plus, CornerUpLeft, Settings2, Save, ArrowLeftFromLine, Trash2, Menu, Scan, Palette, Syringe, User, Target, Maximize, Settings, PanelTop, PanelBottom, PanelRight, PanelLeft, ClipboardList, MapPin, Camera, History, Undo2, Redo2 } from 'lucide-react';

// --- UTILIDADES DE INTEGRACIÓN FRAPPE ---
const getFrappe = () => {
    if (typeof window !== 'undefined' && window.frappe) return window.frappe;
    if (typeof window !== 'undefined' && window.parent && window.parent.frappe) return window.parent.frappe;
    return null;
};

const getForm = () => {
    if (typeof window !== 'undefined' && window.formulario_activo) return window.formulario_activo;
    if (typeof window !== 'undefined' && window.parent && window.parent.formulario_activo) return window.parent.formulario_activo;
    if (typeof window !== 'undefined' && window.cur_frm) return window.cur_frm;
    if (typeof window !== 'undefined' && window.parent && window.parent.cur_frm) return window.parent.cur_frm;
    return null;
};

// --- MOTOR DE COLORES (PALETA ERPNEXT DARK THEME) ---
const hexToRgba = (hex, alpha) => {
    if (!hex || typeof hex !== 'string') return `rgba(0, 0, 0, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const THEME = {
    bgApp: '#171717',
    bgSidebar: '#1C1C1C',
    bgSurface: '#262626',
    bgHover: '#333333',
    border: '#404040',
    textMain: '#F5F5F5',
    textMuted: '#A3A3A3',

    green: '#10B981', yellow: '#F59E0B', orange: '#F97316', red: '#EF4444',
    cyan: '#06B6D4', blue: '#3B82F6', black: '#000000', grey: '#6B7280', purple: '#8B5CF6',

    unmapped: '#525252',
    unmappedAlt: '#333333',
    perfAboveKnee: '#737373',
    perfBelowKnee: '#737373'
};

const UI_CLASSES = {
    primaryBtn: "w-full py-3.5 bg-yellow-500 text-[#171717] border border-yellow-400 hover:bg-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] rounded-xl font-bold text-[13px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2",
    secondaryBtn: "bg-[#262626] text-gray-400 border border-[#404040] hover:border-gray-500 hover:text-white shadow-inner font-bold transition-all active:scale-95",
    modal: "w-full max-w-sm rounded-3xl shadow-2xl border",
    modalOverlay: "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md",
    input: "w-full rounded-xl py-3 text-center text-xl font-mono font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black/30 border",
    card: "p-4 rounded-2xl bg-white/5 border shadow-inner",
    sidebarTitle: "text-[10px] uppercase tracking-widest text-center font-bold text-gray-400"
};

// --- ICONOS ARTERIALES (Hemodinámicos y Morfológicos) ---
const IconMultiphasic = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2" stroke="currentColor" />
        <path d="M 2 16 L 7 5 Q 9 1, 11 5 L 14 16 Q 16 22, 18 16 Q 19 12, 21 16 L 22 16" strokeWidth="2.5" />
    </svg>
);
const IconMultiphasicBroad = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2" stroke="currentColor" />
        <path d="M 3.8 12 L 7 5 Q 9 1, 11 5 L 13 12 Q 8.4 9, 3.8 12 Z" fill="currentColor" stroke="none" />
        <path d="M 2 16 L 7 5 Q 9 1, 11 5 L 14 16 Q 16 22, 18 16 Q 19 12, 21 16 L 22 16" strokeWidth="2.5" />
    </svg>
);
const IconMonophasic = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2" stroke="currentColor" />
        <path d="M 3 16 C 6 16, 7 4, 11 4 C 15 4, 16 16, 19 16 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" />
    </svg>
);
const IconMonophasicAntero = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2" stroke="currentColor" />
        <path d="M 2 10 Q 4 8, 6 10 T 10 10 T 14 10 T 18 10 T 22 10 L 22 16 L 2 16 Z" fill="currentColor" stroke="none" />
    </svg>
);
const IconTardusParvus = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2" stroke="currentColor" />
        <path d="M 2 16 C 6 16, 8 12, 12 12 C 16 12, 18 16, 22 16" strokeWidth="2.5" />
    </svg>
);

const IconLowRes = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 2 16 L 6 8 L 10 12 L 14 6 L 18 10 L 22 14" /></svg>;
const IconHighRes = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 2 12 L 6 4 L 10 14 L 14 12 L 18 12 L 22 12" /></svg>;
const IconInverted = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 2 12 L 6 20 L 10 14 L 14 18 L 18 12 L 22 12" /></svg>;

const IconOccludedFlow = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className} style={style}><line x1="2" y1="12" x2="22" y2="12" /></svg>;

const IconStenosisMild = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M 6 2 L 6 8 C 10 10, 10 14, 6 16 L 6 22" />
        <path d="M 18 2 L 18 8 C 14 10, 14 14, 18 16 L 18 22" />
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3 3" strokeWidth="1.5" />
    </svg>
);

const IconPlaqueCalcifiedFilled = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="2" x2="2" y2="22" />
        <line x1="22" y1="2" x2="22" y2="22" />
        <path d="M 2 6 A 6 6 0 0 1 2 18 Z" fill="currentColor" />
        <path d="M 22 6 A 6 6 0 0 0 22 18 Z" fill="currentColor" />
    </svg>
);

const IconExtCompression = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="12" y1="2" x2="12" y2="22" strokeWidth="2.5" />
        <polygon points="1,8 1,16 6,12" fill="currentColor" />
        <polygon points="23,8 23,16 18,12" fill="currentColor" />
    </svg>
);

const IconOcclusion = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className} style={style}>
        <path d="M 24 0 A 12 12 0 0 0 24 24 Z" />
    </svg>
);

const IconPlaqueSoft = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="2" x2="2" y2="22" />
        <line x1="22" y1="2" x2="22" y2="22" />
        <path d="M 2 6 A 6 6 0 0 1 2 18 Z" fill="none" />
        <path d="M 22 6 A 6 6 0 0 0 22 18 Z" fill="none" />
    </svg>
);
const IconPlaqueCalcified = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="3 4" strokeLinecap="butt" className={className} style={style}><path d="M 2 8 C 8 8, 10 12, 12 12 C 14 12, 16 8, 22 8 M 2 16 C 8 16, 10 12, 12 12 C 14 12, 16 16, 22 16" /></svg>;
const IconPlaqueUlcerated = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="2" x2="2" y2="22" />
        <line x1="22" y1="2" x2="22" y2="22" />
        <path d="M 2 6 A 6 6 0 0 1 6.5 8 L 2 12 L 6.5 16 A 6 6 0 0 1 2 18 Z" fill="currentColor" />
        <path d="M 22 6 A 6 6 0 0 0 22 18 Z" fill="currentColor" />
    </svg>
);
const IconGIM = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><line x1="2" y1="10" x2="22" y2="10" /><line x1="2" y1="14" x2="22" y2="14" /></svg>;

const IconAneurysm = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><circle cx="12" cy="12" r="7" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /></svg>;
const IconPseudo = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><circle cx="12" cy="7" r="5" /><path d="M 12 12 L 12 16" /><line x1="2" y1="16" x2="22" y2="16" /></svg>;

const IconModoBPlus = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M 3 7 V 5 a 2 2 0 0 1 2 -2 h 2" />
        <path d="M 17 3 h 2 a 2 2 0 0 1 2 2 v 2" />
        <path d="M 21 17 v 2 a 2 2 0 0 1 -2 2 h -2" />
        <path d="M 7 21 H 5 a 2 2 0 0 1 -2 -2 v -2" />
        <line x1="12" y1="9" x2="12" y2="15" />
        <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
);

const IconScalpel = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M 21 3 L 13 11" strokeWidth="4" />
        <path d="M 13 11 L 4 20 Q 12 18 13 11 Z" fill="currentColor" strokeWidth="1" />
    </svg>
);

const IconDissection = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 4 12 C 8 8, 16 16, 20 12" /><path d="M 12 12 C 14 10, 16 10, 18 12" strokeWidth="1.5" strokeDasharray="2 2" /></svg>;
const IconKinking = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 4 20 C 4 10, 20 10, 20 20 C 20 5, 4 5, 4 20" /></svg>;
const IconAVFistula = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 4 8 L 20 8 M 4 16 L 20 16" /><path d="M 10 8 L 14 16 M 14 8 L 10 16" stroke="red" /></svg>;
const IconMixedPlaque = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="2" x2="2" y2="22" stroke="#F59E0B" />
        <line x1="22" y1="2" x2="22" y2="22" stroke="#3B82F6" />
        <path d="M 2 6 A 6 6 0 0 1 2 18 Z" fill="none" stroke="#F59E0B" />
        <path d="M 22 6 A 6 6 0 0 0 22 18 Z" fill="#3B82F6" stroke="#3B82F6" />
    </svg>
);
const IconBiphasic = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2" stroke="currentColor" />
        <path d="M 3 16 L 8 6 Q 10 2, 12 6 L 15 16 Q 18 23, 21 16" strokeWidth="2.5" />
    </svg>
);
const IconReversedFlow = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="2" y1="8" x2="22" y2="8" strokeWidth="2" stroke="currentColor" />
        <path d="M 3 8 L 8 18 Q 10 22, 12 18 L 15 8 Q 18 1, 21 8" strokeWidth="2.5" strokeDasharray="3 2" />
    </svg>
);
const IconTurbulence = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 4 12 C 6 8, 10 16, 12 12 C 14 8, 18 16, 20 12" /><path d="M 4 16 C 6 12, 10 20, 12 16 C 14 12, 18 20, 20 16" opacity="0.5" /></svg>;
const IconVDuplicated = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 6 4 C 6 10, 10 12, 10 20 M 18 4 C 18 10, 14 12, 14 20" /></svg>;
const IconAcuteThrombus = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="8" fill="#333" strokeDasharray="3 3" /></svg>;
const IconIVCFilter = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 12 4 L 12 20 M 6 8 L 12 14 L 18 8 M 8 16 L 12 20 L 16 16" /></svg>;

// --- ICONOS VENOSOS (HEMODINÁMICOS Y MORFOLÓGICOS) ---
const IconVCompetent = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} style={style}><line x1="12" y1="4" x2="12" y2="20" /><polyline points="8,8 12,4 16,8" /></svg>;
const IconVIncompetent = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} style={style}><line x1="12" y1="4" x2="12" y2="20" /><polyline points="8,16 12,20 16,16" /><polyline points="8,8 12,4 16,8" /></svg>;
const IconVThrombosed = ({ className, style }) => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className={className} style={style}><rect x="9" y="4" width="6" height="16" rx="3" /></svg>;
const IconFlowNormal = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} style={style}><line x1="12" y1="4" x2="12" y2="20" /><polyline points="8,16 12,20 16,16" /></svg>;
const IconFreeVarices = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 6 4 C 8 10, 16 14, 18 20 M 12 12 C 14 16, 10 18, 12 22 M 16 6 C 14 8, 18 10, 16 14" stroke="#F97316" /></svg>;

const IconContinuousFlow = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <rect x="2" y="4" width="20" height="16" rx="3" strokeWidth="1.5" opacity="0.4" />
        <line x1="5" y1="10" x2="19" y2="10" strokeWidth="2.5" />
        <line x1="5" y1="16" x2="19" y2="16" strokeWidth="1.5" strokeDasharray="2 3" />
    </svg>
);

const IconPulsatileFlow = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M 20.84 4.61 a 5.5 5.5 0 0 0 -7.78 0 L 12 5.67 l -1.06 -1.06 a 5.5 5.5 0 0 0 -7.78 7.78 l 1.06 1.06 L 12 21.23 l 7.78 -7.78 l 1.06 -1.06 a 5.5 5.5 0 0 0 0 -7.78 z" fill="currentColor" fillOpacity="0.2" />
        <path d="M 3 12 L 7 12 L 9 6 L 13 18 L 15 12 L 21 12" stroke="currentColor" strokeWidth="2.5" />
    </svg>
);

const IconVHypoplastic = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} style={style}><line x1="12" y1="4" x2="12" y2="10" /><line x1="12" y1="14" x2="12" y2="20" /></svg>;
const IconVAplastic = ({ className, style }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}><circle cx="12" cy="4" r="2.5" /><circle cx="12" cy="12" r="2.5" /><circle cx="12" cy="20" r="2.5" /></svg>;
const IconVAdhesions = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} style={style}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>;
const IconVThickening = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className} style={style}><line x1="8" y1="2" x2="8" y2="22" /><line x1="16" y1="2" x2="16" y2="22" /></svg>;

const IconVGulf = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><line x1="12" y1="2" x2="12" y2="8" /><circle cx="12" cy="12" r="4" fill="currentColor" /><line x1="12" y1="16" x2="12" y2="22" /></svg>;
const IconPerfIncomp = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className} style={style}><circle cx="12" cy="12" r="8" /><line x1="12" y1="12" x2="12" y2="2" /><polyline points="8,6 12,2 16,6" /></svg>;

const IconPerfMetrics = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M 3 9 L 21 9 M 9 21 L 9 9 M 15 21 L 15 9" /></svg>;
const IconPerfC5C6 = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.5" /><path d="M 12 2 L 12 6 M 12 18 L 12 22 M 2 12 L 6 12 M 18 12 L 22 12" /></svg>;



const IconVarices = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M 12 2 C 22 6, 2 10, 12 12 C 22 14, 2 18, 12 22" />
    </svg>
);

const IconFreeVarices = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M 7 3 C 10 8, 4 12, 9 16 C 13 20, 6 22, 8 23" />
        <path d="M 14 2 C 18 6, 11 10, 16 15 C 20 20, 13 22, 15 23" />
        <circle cx="9" cy="16" r="2" fill="currentColor" />
        <circle cx="16" cy="15" r="2.5" fill="currentColor" />
    </svg>
);

// --- OVALOS (ESTRUCTURAS EXTERNAS) ---
const IconOvalNerve = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><ellipse cx="12" cy="12" rx="8" ry="5" fill={THEME.yellow} stroke={THEME.yellow} /></svg>;
const IconOvalGanglion = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><ellipse cx="12" cy="12" rx="8" ry="5" fill={THEME.green} stroke={THEME.green} /></svg>;
const IconOvalNonVasc = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><ellipse cx="12" cy="12" rx="8" ry="5" fill={THEME.blue} stroke={THEME.blue} /></svg>;

// --- INTERVENCIONES QUIRÚRGICAS ---
const IconBypass = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 4" className={className} style={style}><path d="M 4 12 C 8 2, 16 2, 20 12" /></svg>;
const IconStent = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} style={style}><rect x="4" y="8" width="16" height="8" /><path d="M 6 8 L 10 16 M 10 8 L 14 16 M 14 8 L 18 16 M 18 8 L 22 16 M 6 16 L 10 8 M 10 16 L 14 8 M 14 16 L 18 8 M 18 16 L 22 8" /></svg>;
const IconEndarterectomy = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={style}><path d="M 2 12 L 22 12 M 6 8 L 10 16 M 14 8 L 18 16" /></svg>;
const IconAngioplasty = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 3" className={className} style={style}><path d="M 2 12 C 6 12, 8 6, 12 6 C 16 6, 18 12, 22 12 M 2 12 C 6 12, 8 18, 12 18 C 16 18, 18 12, 22 12" /></svg>;
const IconSaphenectomy = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className} style={style}><line x1="4" y1="12" x2="20" y2="12" /><line x1="8" y1="8" x2="8" y2="16" /><line x1="16" y1="8" x2="16" y2="16" /></svg>;
const IconLaser = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter" className={className} style={style}>
        <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1.5" opacity="0.5" />
        <path d="M 12 2 L 17 6 L 7 10 L 17 14 L 7 18 L 12 22" strokeWidth="2.5" />
    </svg>
);
const IconFoam = ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="10" y="8" width="4" height="10" rx="1" /><path d="M12 22 L12 18" /><path d="M10 4 L14 4 M12 4 L12 8" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="10" y1="11" x2="14" y2="11" /><line x1="10" y1="14" x2="14" y2="14" /></svg>;

const IconModoBMode = ({ className, style, page = 0 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <g transform={page > 0 ? "translate(0, 4) scale(0.72)" : ""}>
            <path d="M 3 7 V 5 a 2 2 0 0 1 2 -2 h 2" />
            <path d="M 17 3 h 2 a 2 2 0 0 1 2 2 v 2" />
            <path d="M 21 17 v 2 a 2 2 0 0 1 -2 2 h -2" />
            <path d="M 7 21 H 5 a 2 2 0 0 1 -2 -2 v -2" />
        </g>
        {page >= 1 && (
            <path d="M 20.5 6.5 v 5 M 18 9 h 5" strokeWidth="2" stroke="currentColor" />
        )}
        {page >= 2 && (
            <path d="M 20.5 15 v 5 M 18 17.5 h 5" strokeWidth="2" stroke="currentColor" />
        )}
    </svg>
);

const IconEspectralMode = ({ className, style, page = 0 }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <g transform={page > 0 ? "translate(0, 3) scale(0.8)" : ""}>
            <path d="M 22 12 h -4 l -3 9 L 9 3 l -3 9 H 2" />
        </g>
        {page >= 1 && (
            <path d="M 16 2.5 v 4 M 14 4.5 h 4" strokeWidth="2" stroke="currentColor" />
        )}
        {page >= 2 && (
            <path d="M 21.5 2.5 v 4 M 19.5 4.5 h 4" strokeWidth="2" stroke="currentColor" />
        )}
    </svg>
);

const IconTimer = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="10" y1="2" x2="14" y2="2" />
        <line x1="12" y1="14" x2="15" y2="11" />
        <circle cx="12" cy="14" r="8" />
    </svg>
);

const IconCross1 = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} style={style}>
        <path d="M 12 6 L 12 18 M 6 12 L 18 12" />
    </svg>
);
const IconCross2 = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} style={style}>
        <path d="M 8 6 L 8 18 M 4 12 L 12 12" />
        <path d="M 16 6 L 16 18 M 12 12 L 20 12" />
    </svg>
);
const IconCross3 = ({ className, style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className} style={style}>
        <path d="M 5 7 L 5 17 M 2 12 L 8 12" />
        <path d="M 12 7 L 12 17 M 9 12 L 15 12" />
        <path d="M 19 7 L 19 17 M 16 12 L 22 12" />
    </svg>
);

const VIEW_COLORS = {
    'Anterior': '#10B981', // Green
    'Medial': '#8B5CF6',   // Violet
    'Lateral': '#3B82F6',  // Blue
    'Posterior': '#EC4899' // Pink
};

const SUPERFICIAL_SYSTEMS = {
    'perf_inguinal': 'MAGNA',
    'perf_fem_sup': 'MAGNA',
    'perf_hunter': 'MAGNA',
    'perf_dodd': 'MAGNA',
    'perf_boyd': 'MAGNA',
    'perf_sherman': 'MAGNA',
    'perf_tib_post_sup': 'MAGNA',
    'perf_tib_post_med': 'MAGNA',
    'perf_tib_post_inf': 'MAGNA',
    'perf_ant_muslo': 'MAGNA',
    'perf_ant_pierna': 'MAGNA',
    'perf_pudenda': 'MAGNA',
    'perf_lat_muslo': 'MAGNA',
    'perf_lat_ant_1': 'MAGNA',
    'perf_lat_ant_2': 'MAGNA',
    'perf_lat_ant_3': 'MAGNA',
    'perf_lat_ant_4': 'MAGNA',
    'perf_poplitea': 'PARVA',
    'perf_gastro': 'PARVA',
    'perf_bassi': 'PARVA',
    'perf_kuster': 'PARVA',
    'perf_glutea': 'PARVA',
    'perf_peronea': 'PARVA',
    'perf_lat_rodilla': 'PARVA'
};

const SUPERFICIAL_COLORS = {
    'MAGNA': '#FACC15', // Yellow
    'PARVA': '#2DD4BF'  // Teal
};

// --- DICCIONARIOS UNIFICADOS DE HERRAMIENTAS ---
const MASTER_TOOLS = [
    // Patrones Espectrales Arteriales
    { id: 'multiphasic', name: 'Patrón Multifásico', icon: IconMultiphasic, hex: '#DC2626', category: 'focal' },
    { id: 'multiphasic_broad', name: 'Espectro Ancho', icon: IconMultiphasicBroad, hex: '#F87171', category: 'focal' },
    { id: 'biphasic', name: 'Patrón Bifásico', icon: IconBiphasic, hex: '#F472B6', category: 'focal' },
    { id: 'monophasic', name: 'Patrón Monofásico', icon: IconMonophasic, hex: '#FBCFE8', category: 'focal' },
    { id: 'monophasic_antero', name: 'Patrón Monofás. Anterógrado', icon: IconMonophasicAntero, hex: '#FDF2F8', category: 'focal' },
    { id: 'tardus', name: 'Patrón Tardus Parvus', icon: IconTardusParvus, hex: '#9333EA', category: 'focal' },
    { id: 'reversed_flow', name: 'Patrón Reversado', icon: IconReversedFlow, hex: '#E879F9', category: 'spectral_extra' },
    { id: 'turbulence', name: 'Patrón Turbulento (Aliasing)', icon: IconTurbulence, hex: '#818CF8', category: 'spectral_extra' },
    
    // Flujos Color Arteriales
    { id: 'flow_normal', name: 'Flujo Normal', icon: IconFlowNormal, hex: '#DC2626', category: 'color' },
    { id: 'flow_mild', name: 'Flujo Obstructivo Leve', icon: IconFlowNormal, hex: '#F87171', category: 'color' },
    { id: 'flow_mod', name: 'Flujo Obstructivo Moderado', icon: IconFlowNormal, hex: '#F472B6', category: 'color' },
    { id: 'flow_sev', name: 'Flujo Obstructivo Severo', icon: IconFlowNormal, hex: '#FBCFE8', category: 'color' },
    { id: 'flow_absent', name: 'Ausencia de Flujo', icon: IconOccludedFlow, hex: '#000000', category: 'color' },
    { id: 'cross_cycle', name: 'Intensidad de Flujo', icon: IconCross1, hex: '#FFFFFF', category: 'focal_cycle' },
    { id: 'cross_1', name: 'Intensidad +', icon: IconCross1, hex: '#FFFFFF', category: 'focal' },
    { id: 'cross_2', name: 'Intensidad ++', icon: IconCross2, hex: '#FFFFFF', category: 'focal' },
    { id: 'cross_3', name: 'Intensidad +++', icon: IconCross3, hex: '#FFFFFF', category: 'focal' },

    // Flujos Venosos (Color)
    { id: 'v_competent', name: 'Flujo Competente', icon: IconVCompetent, hex: THEME.blue, category: 'color' },
    { id: 'v_incompetent', name: 'Flujo Incompetente (Reflujo)', icon: IconVIncompetent, hex: THEME.red, category: 'color' },
    { id: 'v_thrombosed', name: 'Ausencia Flujo (Trombosis)', icon: IconVThrombosed, hex: '#000000', category: 'color' },
    { id: 'v_ablated', name: 'Ablacionada', icon: IconLaser, hex: THEME.grey, category: 'intervention' },
    { id: 'varicose_source', name: 'Fuente Varicosa', icon: IconFreeVarices, hex: THEME.cyan, category: 'focal_extra' },

    // Patrones Espectrales Venosos
    { id: 'v_continuous', name: 'Patrón Continuo', icon: IconContinuousFlow, hex: '#06B6D4', category: 'focal' },
    { id: 'v_pulsatile', name: 'Patrón Pulsátil', icon: IconPulsatileFlow, hex: '#0EA5E9', category: 'focal' },

    // Pared
    { id: 'gim', name: 'GIM Aumentado', icon: IconGIM, hex: '#84CC16', category: 'trayecto_extra' },
    { id: 'soft', name: 'Placa Blanda', icon: IconPlaqueSoft, hex: '#F59E0B', category: 'trayecto' },
    { id: 'calcified', name: 'Placa Cálcica', icon: IconPlaqueCalcifiedFilled, hex: '#3B82F6', category: 'trayecto' },
    { id: 'mixed_plaque', name: 'Placa Mixta', icon: IconMixedPlaque, hex: '#FFFFFF', category: 'trayecto_extra' },
    { id: 'ulcerated', name: 'Placa Ulcerada', icon: IconPlaqueUlcerated, hex: '#EF4444', category: 'trayecto_extra' },
    { id: 'dissection', name: 'Disección (Flap)', icon: IconDissection, hex: '#E11D48', category: 'trayecto_extra' },
    { id: 'kinking', name: 'Kinking / Tortuosidad', icon: IconKinking, hex: '#8B5CF6', category: 'trayecto_extra' },

    { id: 'v_hypoplastic', name: 'Vía Hipoplásica', icon: IconVHypoplastic, hex: '#FFFFFF', category: 'trayecto_extra' },
    { id: 'v_aplastic', name: 'Aplasia/Agenesia', icon: IconVAplastic, hex: '#FFFFFF', category: 'trayecto_extra' },
    { id: 'v_adhesions', name: 'Sinequias/Post-Tromb.', icon: IconVAdhesions, hex: '#00FF00', category: 'trayecto' },
    { id: 'v_thickening', name: 'Engrosamiento Parietal', icon: IconVThickening, hex: '#7E22CE', category: 'trayecto' },
    { id: 'v_gulf', name: 'Golfo Venoso', icon: IconVGulf, hex: '#4F46E5', category: 'trayecto_extra' },
    { id: 'v_duplicated', name: 'Vena Duplicada', icon: IconVDuplicated, hex: '#BE185D', category: 'trayecto_extra' },
    { id: 'acute_thrombus', name: 'Trombosis Aguda', icon: IconAcuteThrombus, hex: '#000000', category: 'color' },

    // Focal
    { id: 'varices', name: 'Varices / Colat.', icon: IconVarices, hex: THEME.red, category: 'color' },
    { id: 'aneurysm', name: 'Aneurisma', icon: IconAneurysm, hex: '#C084FC', category: 'focal' },
    { id: 'pseudo', name: 'Pseudoaneur.', icon: IconPseudo, hex: '#F0ABFC', category: 'focal_extra' },
    { id: 'av_fistula', name: 'Fístula A.V.', icon: IconAVFistula, hex: '#5EEAD4', category: 'focal_extra' },
    { id: 'occlusion', name: 'Suboclusión', icon: IconOcclusion, hex: '#000000', category: 'trayecto' },
    { id: 'v_ext_comp', name: 'Compresión Extrínseca', icon: IconExtCompression, hex: '#A78BFA', category: 'focal' },
    { id: 'perf_incompetent', name: 'Perf. Incomp.', icon: IconPerfIncomp, hex: THEME.red, category: 'color' },
    { id: 'perf_competent', name: 'Perf. Competente', icon: IconPerfIncomp, hex: THEME.blue, category: 'color' },
    { id: 'perf_no_criteria', name: 'Perf. No Criterios', icon: IconPerfIncomp, hex: THEME.orange, category: 'color' },
    { id: 'perf_ulcer', name: 'Úlcera', icon: IconPerfC5C6, hex: '#FFFFFF', category: 'focal' },
    { id: 'perf_metrics', name: 'Métricas', icon: ClipboardList, hex: THEME.green, category: 'action' },

    // Óvalos
    { id: 'oval_nerve', name: 'Nervios', icon: IconOvalNerve, hex: THEME.yellow, category: 'focal_extra' },
    { id: 'oval_ganglion', name: 'Ganglios', icon: IconOvalGanglion, hex: THEME.green, category: 'focal_extra' },
    { id: 'oval_nonvasc', name: 'No Vasculares', icon: IconOvalNonVasc, hex: THEME.blue, category: 'focal_extra' },

    // Cirugías
    { id: 'bypass', name: 'Bypass', icon: IconBypass, hex: '#10B981', category: 'intervention' },
    { id: 'angioplasty', name: 'Angioplastia', icon: IconAngioplasty, hex: '#06B6D4', category: 'intervention' },
    { id: 'stent', name: 'Stent', icon: IconStent, hex: '#3B82F6', category: 'intervention' },
    { id: 'endarterectomy', name: 'Endarterectomía', icon: IconEndarterectomy, hex: '#84CC16', category: 'intervention' },
    { id: 'saphenectomy', name: 'Safenectomía', icon: IconSaphenectomy, hex: '#059669', category: 'intervention' },
    { id: 'foam_sclero', name: 'Escleroterapia', icon: IconFoam, hex: '#0EA5E9', category: 'intervention' },
    { id: 'ivc_filter', name: 'Filtro V.C.', icon: IconIVCFilter, hex: '#6366F1', category: 'intervention' },

    // Acciones
    { id: 'free_varices', name: 'Trazar Várices Libres', icon: MousePointerClick, hex: THEME.orange, category: 'action' },
    { id: 'clear_segment', name: 'Borrar Todo', icon: Trash2, hex: THEME.red, category: 'action' },
    { id: 'upload_spectrum', name: 'Subir Espectro', icon: Camera, hex: THEME.cyan, category: 'spectral_extra' },
    { id: 'upload_reflux', name: 'Subir Reflujo', icon: Camera, hex: THEME.red, category: 'color' },

    // Medidas
    { id: 'medidas_dimensiones', name: 'Dimensiones', icon: ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 2 12 h 20 m -2 -2 l 2 2 l -2 2 M 4 10 l -2 2 l 2 2" /><path d="M 12 2 v 20 m -2 -2 l 2 2 l 2 -2 M 10 4 l 2 -2 l 2 2" opacity="0.5" /></svg>, hex: '#38BDF8', category: 'medicion' },
    { id: 'medidas_velocidades', name: 'Velocidades', icon: ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 3 14 L 7 6 L 11 14 L 15 8 L 19 14" /><line x1="2" y1="16" x2="22" y2="16" strokeDasharray="3 3" opacity="0.6"/></svg>, hex: '#2DD4BF', category: 'medicion' },
    { id: 'medidas_ta', name: 'T.A. / Vel.', icon: ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M 3 21 L 9 9 L 15 15 L 21 3" /><line x1="3" y1="21" x2="21" y2="21" strokeDasharray="2 2"/></svg>, hex: '#818CF8', category: 'medicion' },
    { id: 'medidas_ratio', name: 'Ratio de Veloc.', icon: ({ className, style }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="10" /><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></svg>, hex: '#C084FC', category: 'medicion' },
    { id: 'medidas_reflux', name: 'T. Reflujo', icon: IconTimer, hex: '#FB7185', category: 'medicion' },

    // (Filtros de Vista para Perforantes removidos)
];

const TOOLS_MAP = MASTER_TOOLS.reduce((acc, t) => ({ ...acc, [t.id]: t }), {});

const DEFAULT_TOOL_GRIDS = {
    PIERNA: ['multiphasic', 'multiphasic_broad', 'biphasic', 'monophasic', 'monophasic_antero', 'tardus', 'reversed_flow', 'turbulence', 'medidas_ta', 'medidas_velocidades', 'medidas_ratio', 'upload_spectrum', 'soft', 'calcified', 'ulcerated', 'mixed_plaque', 'gim', 'dissection', 'kinking', 'occlusion', 'medidas_dimensiones', 'flow_normal', 'flow_mild', 'flow_mod', 'flow_sev', 'flow_absent', 'cross_cycle', 'aneurysm', 'pseudo', 'av_fistula', 'oval_nerve', 'oval_ganglion', 'oval_nonvasc', 'bypass', 'angioplasty', 'stent'],
    CAROTIDA: ['multiphasic', 'multiphasic_broad', 'biphasic', 'monophasic', 'monophasic_antero', 'tardus', 'reversed_flow', 'turbulence', 'medidas_ta', 'medidas_velocidades', 'medidas_ratio', 'upload_spectrum', 'soft', 'calcified', 'ulcerated', 'mixed_plaque', 'gim', 'dissection', 'kinking', 'occlusion', 'medidas_dimensiones', 'flow_normal', 'flow_mild', 'flow_mod', 'flow_sev', 'flow_absent', 'cross_cycle', 'aneurysm', 'pseudo', 'av_fistula', 'oval_nerve', 'oval_ganglion', 'oval_nonvasc', 'endarterectomy', 'stent'],
    VENOSO: ['varicose_source', 'free_varices', 'upload_reflux', 'v_continuous', 'v_pulsatile', 'medidas_reflux', 'v_competent', 'v_incompetent', 'perf_incompetent', 'v_thrombosed', 'acute_thrombus', 'v_ablated', 'saphenectomy', 'foam_sclero', 'ivc_filter', 'v_adhesions', 'v_thickening', 'v_ext_comp', 'v_gulf', 'v_hypoplastic', 'v_aplastic', 'v_duplicated', 'occlusion', 'medidas_dimensiones', 'av_fistula', 'oval_nerve', 'oval_ganglion', 'oval_nonvasc'],
    PERF: ['perf_incompetent', 'perf_competent', 'perf_no_criteria', 'perf_ulcer', 'perf_metrics']
};

// ============================================================================
// GEOMETRÍA SVG Y CÁLCULOS MATEMÁTICOS (ESTRUCTURA PURA)
// ============================================================================

const parsePathData = (pathString) => {
    if (!pathString) return null;
    const matchL = pathString.match(/M\s+([0-9.\-]+)\s+([0-9.\-]+)\s+L\s+([0-9.\-]+)\s+([0-9.\-]+)/);
    if (matchL) return { type: 'L', coords: matchL.slice(1).map(Number) };

    const matchC = pathString.match(/M\s+([0-9.\-]+)\s+([0-9.\-]+)\s+C\s+([0-9.\-]+)\s+([0-9.\-]+),\s*([0-9.\-]+)\s+([0-9.\-]+),\s*([0-9.\-]+)\s+([0-9.\-]+)/);
    if (matchC) return { type: 'C', coords: matchC.slice(1).map(Number) };
    return null;
};

const getPointsAlongParsedPath = (parsedPath, fractions) => {
    let points = [];
    if (!parsedPath) return points;

    if (parsedPath.type === 'L') {
        const [x1, y1, x2, y2] = parsedPath.coords;
        fractions.forEach(f => points.push({ x: x1 + (x2 - x1) * f, y: y1 + (y2 - y1) * f, angle: Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) }));
    } else if (parsedPath.type === 'C') {
        const [x0, y0, x1, y1, x2, y2, x3, y3] = parsedPath.coords;
        fractions.forEach(f => {
            const mt = 1 - f;
            const x = mt * mt * mt * x0 + 3 * mt * mt * f * x1 + 3 * mt * f * f * x2 + f * f * f * x3;
            const y = mt * mt * mt * y0 + 3 * mt * mt * f * y1 + 3 * mt * f * f * y2 + f * f * f * y3;
            const dx = 3 * mt * mt * (x1 - x0) + 6 * mt * f * (x2 - x1) + 3 * f * f * (x3 - x2);
            const dy = 3 * mt * mt * (y1 - y0) + 6 * mt * f * (y2 - y1) + 3 * f * f * (y3 - y2);
            points.push({ x, y, angle: Math.atan2(dy, dx) * (180 / Math.PI) });
        });
    }
    return points;
};

const getParsedPathLength = (parsedPath) => {
    if (!parsedPath) return 0;
    if (parsedPath.type === 'L') {
        const [x1, y1, x2, y2] = parsedPath.coords;
        return Math.hypot(x2 - x1, y2 - y1);
    } else if (parsedPath.type === 'C') {
        let len = 0;
        let prevX = parsedPath.coords[0], prevY = parsedPath.coords[1];
        const [x0, y0, x1, y1, x2, y2, x3, y3] = parsedPath.coords;
        for (let i = 1; i <= 10; i++) {
            const f = i / 10;
            const mt = 1 - f;
            const x = mt * mt * mt * x0 + 3 * mt * mt * f * x1 + 3 * mt * f * f * x2 + f * f * f * x3;
            const y = mt * mt * mt * y0 + 3 * mt * mt * f * y1 + 3 * mt * f * f * y2 + f * f * f * y3;
            len += Math.hypot(x - prevX, y - prevY);
            prevX = x; prevY = y;
        }
        return len;
    }
    return 0;
};

const generateToolPath = (parsedPath, offset, isWavy, customWaves = 4) => {
    if (!parsedPath) return "";
    const steps = 30;
    const fractions = Array.from({ length: steps + 1 }, (_, i) => i / steps);
    const points = getPointsAlongParsedPath(parsedPath, fractions);
    if (points.length < 2) return "";
    let outPath = "";
    const amplitude = 3;
    for (let i = 0; i < points.length; i++) {
        let dx, dy;
        if (i < points.length - 1) { dx = points[i + 1].x - points[i].x; dy = points[i + 1].y - points[i].y; }
        else { dx = points[i].x - points[i - 1].x; dy = points[i].y - points[i - 1].y; }
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len, ny = dx / len;
        let finalOffset = offset;
        if (isWavy) finalOffset += Math.sin((i / steps) * Math.PI * 2 * customWaves) * amplitude;
        outPath += i === 0 ? `M ${points[i].x + nx * finalOffset} ${points[i].y + ny * finalOffset}` : ` L ${points[i].x + nx * finalOffset} ${points[i].y + ny * finalOffset}`;
    }
    return outPath;
};



// ============================================================================
// DATOS ANATÓMICOS (LIMPIEZA DE 'cdy' PARA VECTORES 100% HORIZONTALES)
// ============================================================================

const ARTERIAL_SEGMENTS = [
    { id: 'femoral_comun', name: 'Femoral Común', label: 'AFC', align: 'right', type: 'macro', path: 'M 250 40 L 250 120', parentId: null },
    { id: 'femoral_profunda', name: 'Femoral Profunda', label: 'AFP', align: 'left', type: 'branch', path: 'M 250 120 C 180 160, 160 260, 160 400', altBase: true, parentId: 'femoral_comun' },
    { id: 'afs_prox', name: 'AFS Proximal', label: 'AFS\nprox', align: 'right', type: 'macro', path: 'M 250 120 L 250 240', altBase: true, parentId: 'femoral_comun' },
    { id: 'afs_med', name: 'AFS Media', label: 'AFS\nmed', align: 'right', type: 'macro', path: 'M 250 240 L 250 380', parentId: 'afs_prox' },
    { id: 'afs_dist', name: 'AFS Distal', label: 'AFS\ndist', align: 'right', type: 'macro', path: 'M 250 380 L 250 520', altBase: true, parentId: 'afs_med' },
    { id: 'pop_supra', name: 'Poplítea Supragenicular', label: 'POP\nsupra', align: 'right', type: 'macro', path: 'M 250 520 L 250 580', parentId: 'afs_dist' },
    { id: 'pop_retro', name: 'Poplítea Retrogenicular', label: 'POP\nretro', align: 'right', offsetX: 50, type: 'macro', path: 'M 250 580 L 250 640', altBase: true, parentId: 'pop_supra' },
    { id: 'pop_infra', name: 'Poplítea Infragenicular', label: 'POP\ninfra', align: 'right', type: 'macro', path: 'M 250 640 L 250 700', parentId: 'pop_retro' },
    { id: 'tibial_ant', name: 'Tibial Anterior', label: 'ATA', align: 'right', type: 'distal', path: 'M 250 700 C 310 740, 330 840, 330 940', altBase: true, parentId: 'pop_infra' },
    { id: 'tronco_tp', name: 'Tronco T-P', label: 'TTP', align: 'left', type: 'macro', path: 'M 250 700 L 230 740', altBase: true, parentId: 'pop_infra' },
    { id: 'tibial_post', name: 'Tibial Posterior', label: 'ATP', align: 'left', focalFraction: 0.3, type: 'distal', path: 'M 230 740 L 230 940', parentId: 'tronco_tp' },
    { id: 'peronea', name: 'Peronea', label: 'PER', align: 'left', focalFraction: 0.7, type: 'distal', path: 'M 230 740 C 270 780, 280 870, 280 940', altBase: true, parentId: 'tronco_tp' },
    { id: 'pedia', name: 'Arteria Pedia', label: 'DP', align: 'right', type: 'distal', path: 'M 330 940 L 330 990', parentId: 'tibial_ant' },
].map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

const CAROTID_SEGMENTS = [
    { id: 'subclavia', name: 'Arteria Subclavia', label: 'SUB', align: 'left', type: 'macro', path: 'M 100 850 L 350 850', altBase: true, parentId: null },
    { id: 'vertebral_prox', name: 'Vertebral Proximal', label: 'VERT\nprox', align: 'left', type: 'distal', path: 'M 160 850 L 160 550', parentId: 'subclavia' },
    { id: 'vertebral_dist', name: 'Vertebral Distal', label: 'VERT\ndist', align: 'left', focalFraction: 0.2, type: 'distal', path: 'M 160 550 L 160 250', altBase: true, parentId: 'vertebral_prox' },
    { id: 'cca_prox', name: 'Carótida Común Prox.', label: 'ACC\nprox', align: 'right', type: 'macro', path: 'M 300 850 L 300 650', altBase: true, parentId: null },
    { id: 'cca_dist', name: 'Carótida Común Dist.', label: 'ACC\ndist', align: 'right', type: 'macro', path: 'M 300 650 L 300 520', parentId: 'cca_prox' },
    { id: 'bulbo', name: 'Bulbo Carotídeo', label: 'BULBO', align: 'right', type: 'macro', path: 'M 300 520 C 275 485, 275 485, 300 450', altBase: true, parentId: 'cca_dist' },
    { id: 'ica_prox', name: 'Carótida Interna Prox.', label: 'ACI\nprox', align: 'right', type: 'macro', path: 'M 300 450 L 300 300', parentId: 'bulbo' },
    { id: 'ica_dist', name: 'Carótida Interna Dist.', label: 'ACI\ndist', align: 'right', type: 'macro', path: 'M 300 300 L 300 150', altBase: true, parentId: 'ica_prox' },
    { id: 'eca', name: 'Carótida Externa', label: 'ACE', align: 'left', focalFraction: 0.7, type: 'branch', path: 'M 300 500 C 230 450, 220 350, 220 150', parentId: 'bulbo' },
].map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

const USF_SEGMENTS = [
    // --- 1. CAPA MEDIA: TRIBUTARIAS Y COLATERALES (Se dibujan primero para quedar detrás) ---
    { id: 'v_epigastrica', name: 'V. Epigástrica Superficial', label: 'VES', align: 'left', type: 'branch', focalFraction: 0.90, offsetX: 60, path: 'M 250 150 L 140 35', altBase: true, parentId: 'sfj', faceTarget: 'anterior' },
    { id: 'v_pudenda', name: 'V. Pudenda Externa', label: 'VPE', align: 'left', type: 'branch', focalFraction: 0.8, offsetX: 60, path: 'M 250 150 L 90 150', altBase: true, parentId: 'sfj', faceTarget: 'anterior' },
    { id: 'v_circunfleja', name: 'V. Circunfleja Ilíaca Superf.', label: 'VCIS', align: 'right', type: 'branch', focalFraction: 0.945, offsetX: 60, path: 'M 250 150 L 310 40', altBase: true, parentId: 'sfj', faceTarget: 'lateral' },
    { id: 'vsaa', name: 'V. Safena Accesoria Anterior', label: 'VSAA', align: 'left', type: 'branch', focalFraction: 1, offsetX: 60, path: 'M 250 150 C 180 200, 180 340, 190 422', altBase: true, parentId: 'vsm_muslo_prox', faceTarget: 'anterior' },
    { id: 'vsap', name: 'V. Safena Accesoria Posterior', label: 'VSAP', align: 'right', type: 'branch', focalFraction: 0.85, offsetX: 60, path: 'M 250 270 C 390 290, 390 350, 370 370', parentId: 'vsm_muslo_prox', faceTarget: 'posterior' },
    { id: 'vap', name: 'Vena Arqueada Posterior de la Pierna (Leonardo)', label: 'VARPI', align: 'left', type: 'branch', focalFraction: 0.30, offsetX: 60, path: 'M 290 670 C 180 700, 180 950, 200 1100', altBase: true, parentId: 'tronco_accesorio' },
    { id: 'v_ant_pierna', name: 'Tributaria Ant. de la Pierna', label: 'VANPI', align: 'right', type: 'branch', focalFraction: 0.20, offsetX: 60, path: 'M 290 670 C 330 700, 330 950, 310 1100', altBase: true, parentId: 'tronco_accesorio' },

    // --- 2. CAPA SUPERIOR: TRONCO SAFENA Y SFJ ---
    { id: 'tronco_accesorio', name: 'Tronco Tributario Accesorio', label: 'TTA', align: 'right', type: 'branch', focalFraction: 0.553, offsetX: 60, path: 'M 250 150 C 280 170, 290 200, 290 250 L 290 670', altBase: true, parentId: 'sfj' },
    { id: 'vsm_muslo_prox', name: 'VSM Muslo Proximal', label: 'VSM-P', align: 'right', focalFraction: 0.847, type: 'macro', offsetX: 60, path: 'M 250 150 L 250 300', altBase: true, parentId: 'sfj' },
    { id: 'vsm_muslo_med', name: 'VSM Muslo Media', label: 'VSM-M', align: 'right', focalFraction: 0.923, type: 'macro', offsetX: 60, path: 'M 250 300 L 250 450', parentId: 'vsm_muslo_prox' },
    { id: 'vsm_muslo_dist', name: 'VSM Muslo Distal', label: 'VSM-D', align: 'right', focalFraction: 0.43, type: 'macro', offsetX: 60, path: 'M 250 450 L 250 600', altBase: true, parentId: 'vsm_muslo_med' },
    { id: 'vsm_pierna_prox', name: 'VSM Pierna Proximal', label: 'VSM-PP', align: 'right', focalFraction: 0.34, type: 'macro', offsetX: 60, path: 'M 250 600 L 250 700', parentId: 'vsm_muslo_dist' },
    { id: 'vsm_pierna_med', name: 'VSM Pierna Media', label: 'VSM-PM', align: 'right', focalFraction: 0.60, type: 'macro', offsetX: 60, path: 'M 250 700 L 250 874', altBase: true, parentId: 'vsm_pierna_prox' },
    { id: 'vsm_pierna_dist', name: 'VSM Pierna Distal', label: 'VSM-PD', align: 'right', focalFraction: 0.32, type: 'macro', offsetX: 60, path: 'M 250 874 L 250 1124', parentId: 'vsm_pierna_med' },

    // --- 3. CAPA INFERIOR: PERFORANTES ---
    { id: 'perf_inguinal', name: 'Perf. Inguinal', label: 'PING', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 180 149 L 110 212', parentId: 'v_pudenda', faceTarget: 'anterior' },
    { id: 'perf_fem_sup', name: 'Perf. Femoral Superior', label: 'PFS', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 180 367 L 110 367', parentId: 'vsaa', faceTarget: 'anterior' },
    { id: 'perf_hunter', name: 'Perf. de Hunter', label: 'PHUM', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 296 478 L 390 478', parentId: 'tronco_accesorio' },
    { id: 'perf_dodd', name: 'Perf. de Dodd', label: 'PDOD', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 296 553 L 390 553', parentId: 'tronco_accesorio' },
    { id: 'perf_boyd', name: 'Perf. de Boyd', label: 'PBOY', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 324 749 L 390 749', parentId: 'v_ant_pierna' },
    { id: 'perf_sherman', name: 'Perf. de Sherman', label: 'SHE', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 180 850 L 110 850', parentId: 'vap' },
    { id: 'perf_tib_post_sup', name: 'Perf. de Cockett III', label: 'PC-III', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 190 930 L 110 930', parentId: 'vap' },
    { id: 'perf_tib_post_med', name: 'Perf. de Cockett II', label: 'PC-II', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 189 1007 L 110 1007', parentId: 'vap' },
    { id: 'perf_tib_post_inf', name: 'Perf. de Cockett I', label: 'PC-I', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 194 1084 L 110 1084', parentId: 'vap' },
    { id: 'perf_ant_muslo', name: 'Perf. Ant. del Muslo', label: 'PANM', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 180 289 L 110 289', parentId: 'vsaa', faceTarget: 'anterior' },
    { id: 'perf_lat_ant_4', name: 'Perf. Lateral IV (Ant)', label: 'PL-IV', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 326 830 L 388 830', parentId: 'v_ant_pierna', faceTarget: 'lateral' },
    { id: 'perf_lat_ant_3', name: 'Perf. Lateral III (Ant)', label: 'PL-III', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 326 902 L 388 902', parentId: 'v_ant_pierna', faceTarget: 'lateral' },
    { id: 'perf_lat_ant_2', name: 'Perf. Lateral II (Ant)', label: 'PL-II', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 324 994 L 388 994', parentId: 'v_ant_pierna', faceTarget: 'lateral' },
    { id: 'perf_lat_ant_1', name: 'Perf. Lateral I (Ant)', label: 'PL-I', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 320 1068 L 388 1068', parentId: 'v_ant_pierna', faceTarget: 'lateral' },

    { id: 'perf_pudenda', name: 'Perf. Pudenda/Pélvica', label: 'PPP', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 170 150 L 110 90', parentId: 'v_pudenda', faceTarget: 'anterior' },
    { id: 'perf_lat_muslo', name: 'Perf. Lateral del Muslo', label: 'PALM', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 283 90 L 378 90', parentId: 'v_circunfleja', faceTarget: 'lateral' },

    // --- RENDERIZADO FINAL: NODO PRINCIPAL SOBRE TODAS LAS VENAS ---
    { id: 'sfj', name: 'Unión Safeno-Femoral', label: 'USF', align: 'right', type: 'macro', focalFraction: 0.8, offsetX: 60, path: 'M 215 80 C 240 80, 250 110, 250 150', parentId: null }
].map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

const ANT_SEGMENTS = [
    // --- 1. CAPA SUPERIOR: TRONCO VSAA ---
    { id: 'vsaa', name: 'V. Safena Accesoria Anterior', label: 'VSAA', align: 'left', type: 'macro', focalFraction: 0.65, offsetX: 60, path: 'M 310 200 L 310 600', altBase: true, parentId: 'sfj' },

    // --- 2. CAPA MEDIA: TRIBUTARIAS SUPERIORES ---
    { id: 'v_epigastrica', name: 'V. Epigástrica Superficial', label: 'VES', align: 'left', type: 'branch', focalFraction: 0.86, offsetX: 60, path: 'M 310 150 L 200 10', altBase: true, parentId: 'sfj' },
    { id: 'v_pudenda', name: 'V. Pudenda Externa', label: 'VPE', align: 'left', type: 'branch', focalFraction: 0.8, offsetX: 60, path: 'M 310 150 L 150 150', altBase: true, parentId: 'sfj' },

    // --- 3. CAPA INFERIOR: PERFORANTES ---
    { id: 'perf_inguinal', name: 'Perf. Inguinal', label: 'PING', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 240 157 L 170 220', parentId: 'v_pudenda' },
    { id: 'perf_fem_sup', name: 'Perf. Femorales Superiores', label: 'PFS', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 310 390 L 170 390', parentId: 'vsaa' },
    { id: 'perf_ant_muslo', name: 'Perf. Ant. del Muslo', label: 'PANM', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 310 305 L 170 305', parentId: 'vsaa' },

    { id: 'perf_pudenda', name: 'Perf. Pudenda/Pélvica', label: 'PPP', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 230 150 L 170 90', parentId: 'v_pudenda' },
    
    // --- RENDERIZADO FINAL: NODO PRINCIPAL (MEDIAL) ---
    { id: 'sfj', name: 'Unión Safeno-Femoral', label: '', hideNode: true, align: 'right', type: 'macro', focalFraction: 0.8, customRadius: 31, offsetX: 60, path: 'M 275 80 C 300 80, 310 150, 310 200', parentId: null, faceTarget: 'medial' }
].map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

const USP_SEGMENTS = [
    // --- 0. SEGMENTOS AISLADOS (CONEXIÓN VSM) ---
    { id: 'vsap', name: 'V. Safena Accesoria Posterior', label: 'VSAP', align: 'left', type: 'macro', offsetX: 40, focalFraction: 0.5, path: 'M 150 50 L 150 200', parentId: null, faceTarget: 'medial' },

    // --- 1. CAPA SUPERIOR: TRONCO SAFENA PARVA ---
    { id: 'usp', name: 'Unión Safeno-Poplítea', label: 'USP', align: 'right', type: 'macro', focalFraction: 0.5, offsetX: 60, customRadius: 31, path: 'M 215 250 C 240 250, 250 280, 250 320', parentId: null },
    { id: 'vsp_prox', name: 'VSP Proximal', label: 'VSP-P', align: 'left', focalFraction: 0.475, offsetX: 40, type: 'macro', path: 'M 250 320 L 250 590', altBase: true, parentId: 'usp' },
    { id: 'vsp_med', name: 'VSP Media', label: 'VSP-M', align: 'left', type: 'macro', offsetX: 40, path: 'M 250 590 L 250 860', parentId: 'vsp_prox' },
    { id: 'vsp_dist', name: 'VSP Distal', label: 'VSP-D', align: 'left', focalFraction: 0.68, offsetX: 40, type: 'macro', path: 'M 250 860 L 250 1104', altBase: true, parentId: 'vsp_med' },

    // --- 2. CAPA MEDIA: TRIBUTARIAS Y COLATERALES ---
    { id: 'ext_craneal', name: 'Extensión Craneal (V. Giacomini)', label: 'VEC', align: 'right', type: 'branch', focalFraction: 0.7, offsetX: 60, path: 'M 250 355 C 250 315, 250 185, 250 85', altBase: true, parentId: 'usp' },
    { id: 'v_gemelar', name: 'Venas Gemelares', label: 'VGEM', align: 'left', type: 'branch', focalFraction: 0.43, offsetX: 40, path: 'M 215 248 C 180 268, 160 323, 160 423', altBase: true, parentId: 'usp' },
    { id: 'v_intersafena', name: 'Vena Intersafena', label: 'VINT', align: 'right', type: 'branch', focalFraction: 0.6, offsetX: 60, path: 'M 250 650 C 300 650, 340 600, 380 600', altBase: true, parentId: 'vsp_med', faceTarget: 'medial' },
    { id: 'v_lateral_pierna', name: 'Vena Lateral de la Pierna', label: 'VLAPI', align: 'right', type: 'branch', focalFraction: 0.80, offsetX: 60, path: 'M 250 320 C 310 350, 310 800, 310 905', altBase: true, parentId: 'usp', faceTarget: 'lateral' },

    // --- 3. CAPA INFERIOR: PERFORANTES ---
    { id: 'perf_kuster', name: 'Perf. de May-Kuster', label: 'PMAY', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 310 675 L 380 675', parentId: 'v_lateral_pierna', faceTarget: 'lateral' },
    { id: 'perf_poplitea', name: 'Perf. de Fosa Poplítea', label: 'PFP', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 277 360 L 380 360', parentId: 'v_lateral_pierna' },
    { id: 'perf_gastro', name: 'Perf. Gemelares', label: 'PGAS', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 160 355 L 90 355', parentId: 'v_gemelar' },
    { id: 'perf_bassi', name: 'Perf. de Bassi', label: 'PBAS', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 254 1000 L 380 1000', parentId: 'vsp_dist', faceTarget: 'lateral' },
    { id: 'perf_glutea', name: 'Perf. Glútea', label: 'PGLU', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 260 130 L 380 130', parentId: 'ext_craneal' },
    { id: 'perf_lat_rodilla', name: 'Perf. Lateral de Rodilla', label: 'PLAR', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 307 500 L 380 500', parentId: 'v_lateral_pierna', faceTarget: 'lateral' },
    { id: 'perf_peronea', name: 'Perf. Peronea (Lateral)', label: 'PPER', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 314 880 L 380 880', parentId: 'v_lateral_pierna', faceTarget: 'lateral' },
].map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

const SVP_SEGMENTS = [
    { id: 'vfc', name: 'Vena Femoral Común', label: 'VFC', align: 'right', type: 'macro', path: 'M 250 35 L 250 133', parentId: null },
    { id: 'vfp', name: 'Vena Femoral Profunda', label: 'VFP', align: 'left', type: 'branch', path: 'M 250 133 C 180 182, 160 305, 160 477', altBase: true, parentId: 'vfc' },
    { id: 'vf_prox', name: 'Vena Femoral Proximal', label: 'VF-P', align: 'right', type: 'macro', path: 'M 250 133 L 250 280', altBase: true, parentId: 'vfc' },
    { id: 'vf_med', name: 'Vena Femoral Media', label: 'VF-M', align: 'right', type: 'macro', path: 'M 250 280 L 250 432', parentId: 'vf_prox' },
    { id: 'vf_dist', name: 'Vena Femoral Distal', label: 'VF-D', align: 'right', type: 'macro', path: 'M 250 432 L 250 579', altBase: true, parentId: 'vf_med' },
    { id: 'v_pop_supra', name: 'V. Poplítea Supragenicular', label: 'POP-S', align: 'right', type: 'macro', path: 'M 250 579 L 250 652', parentId: 'vf_dist' },
    { id: 'v_pop_retro', name: 'V. Poplítea Retrogenicular', label: 'POP-R', align: 'right', type: 'macro', path: 'M 250 652 L 250 726', altBase: true, parentId: 'v_pop_supra' },
    { id: 'v_gemelares', name: 'Venas Gemelares', label: 'VGEM', align: 'left', type: 'branch', focalFraction: 0.46, path: 'M 250 645 C 180 682, 170 792, 170 915', altBase: true, parentId: 'v_pop_supra' },
    { id: 'v_pop_infra', name: 'V. Poplítea Infragenicular', label: 'POP-I', align: 'right', type: 'macro', path: 'M 250 726 L 250 799', parentId: 'v_pop_retro' },
    { id: 'v_tibial_ant', name: 'Venas Tibiales Anteriores', label: 'VTA', align: 'right', type: 'distal', path: 'M 250 759 C 310 808, 330 931, 330 1054', altBase: true, parentId: 'v_pop_infra' },
    { id: 'tronco_tp_v', name: 'Tronco Tibio-Peroneo Venoso', label: 'TTP', align: 'left', type: 'macro', path: 'M 250 799 L 230 860', altBase: true, parentId: 'v_pop_infra' },
    { id: 'v_tibial_post', name: 'Venas Tibiales Posteriores', label: 'VTP', align: 'right', focalFraction: 0.418, type: 'distal', path: 'M 230 860 L 230 1106', parentId: 'tronco_tp_v' },
    { id: 'v_peronea', name: 'Venas Peroneas', label: 'VPER', align: 'right', focalFraction: 0.85, type: 'distal', path: 'M 240 847 C 270 896, 280 1007, 280 1093', altBase: true, parentId: 'tronco_tp_v' },
    { id: 'v_soleal_2', name: 'Vena Soleal 2', label: 'VSOL2', align: 'left', type: 'branch', focalFraction: 0.8, path: 'M 230 910 C 180 946, 160 972, 160 1009', altBase: true, parentId: 'v_tibial_post' },
    { id: 'v_soleal_1', name: 'Vena Soleal 1', label: 'VSOL1', align: 'left', type: 'branch', focalFraction: 0.8, path: 'M 230 1000 C 180 1037, 160 1067, 160 1098', altBase: true, parentId: 'v_tibial_post' },
].map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

const LATERAL_SEGMENTS = [
    // --- EJES PRINCIPALES ---
    { id: 'v_circunfleja', name: 'V. Circunfleja Ilíaca Superf.', label: 'VCIS', align: 'left', type: 'macro', path: 'M 200 50 C 230 50, 250 80, 250 130 L 250 450', parentId: null },
    { id: 'v_lateral_pierna', name: 'Vena Lateral de la Pierna', label: 'VLAPI', align: 'left', type: 'macro', focalFraction: 0.47, path: 'M 250 400 L 250 1042', altBase: true, parentId: 'v_circunfleja' },
    
    // --- PERFORANTES ---
    { id: 'perf_lat_muslo', name: 'Perf. Lateral del Muslo', label: 'PALM', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 247 200 L 150 200', parentId: 'v_circunfleja' },
    { id: 'perf_lat_rodilla', name: 'Perf. Lateral de Rodilla', label: 'PLAR', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'above', path: 'M 247 450 L 150 450', parentId: 'v_lateral_pierna' },
    { id: 'perf_lat_ant_4', name: 'Perf. Lateral IV (Ant)', label: 'PL-IV', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 250 500 L 350 500', parentId: 'v_lateral_pierna' },
    { id: 'perf_peronea', name: 'Perf. Peronea (Lateral)', label: 'PPER', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 258 600 L 380 600', parentId: 'v_lateral_pierna' },
    { id: 'perf_lat_ant_3', name: 'Perf. Lateral III (Ant)', label: 'PL-III', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 250 680 L 350 680', parentId: 'v_lateral_pierna' },
    { id: 'perf_bassi', name: 'Perf. Lateral de la Pierna (Bassi)', label: 'PBAS', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 250 750 L 150 750', parentId: 'v_lateral_pierna' },
    { id: 'perf_lat_ant_2', name: 'Perf. Lateral II (Ant)', label: 'PL-II', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 253 860 L 350 860', parentId: 'v_lateral_pierna' },
    { id: 'perf_kuster', name: 'Perf. Maleolar Lateral (Kuster)', label: 'PMAY', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 247 900 L 150 900', parentId: 'v_lateral_pierna' },
    { id: 'perf_lat_ant_1', name: 'Perf. Lateral I (Ant)', label: 'PL-I', align: 'perforator', focalFraction: 1, type: 'branch', isPerforator: true, level: 'below', path: 'M 250 1042 L 350 1042', parentId: 'v_lateral_pierna' }
].map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

const perforatorsData = [
  // --- ANTERIOR ---
  { id: 'perf_inguinal', y: -30, level: 'above', name: 'Perf. Inguinal', label: 'Inguinal', acronym: 'PING', sup: 'V. Pudenda Externa', supLabel: 'VPE', deep: 'V. Femoral Común', deepLabel: 'VFC' },
  { id: 'perf_pudenda', y: 21, level: 'above', name: 'Perf. Pudenda/Pélvica', label: 'Pudenda', acronym: 'PPP', sup: 'V. Pudenda Externa', supLabel: 'VPE', deep: 'Venas Pélvicas', deepLabel: 'VPEL' },
  { id: 'perf_fem_sup', y: 72, level: 'above', name: 'Perf. Femorales Superiores', label: 'Fem. Sup.', acronym: 'PFS', sup: 'V. Safena Accesoria Ant.', supLabel: 'VSAA', deep: 'V. Femoral Profunda', deepLabel: 'VFP' },
  { id: 'perf_ant_muslo', y: 123, level: 'above', name: 'Perf. Ant. del Muslo', label: 'Ant. Muslo', acronym: 'PANM', sup: 'V. Safena Accesoria Ant.', supLabel: 'VSAA', deep: 'V. Femoral', deepLabel: 'VF' },
  { id: 'perf_lat_ant_4', y: 174, level: 'below', name: 'Perf. Lateral IV', label: 'Lateral IV', acronym: 'PL-IV', sup: 'Trib. Ant. Pierna', supLabel: 'VANPI', deep: 'Venas Tibiales Ant.', deepLabel: 'VTA' },
  { id: 'perf_lat_ant_3', y: 225, level: 'below', name: 'Perf. Lateral III', label: 'Lateral III', acronym: 'PL-III', sup: 'Trib. Ant. Pierna', supLabel: 'VANPI', deep: 'Venas Tibiales Ant.', deepLabel: 'VTA' },
  { id: 'perf_lat_ant_2', y: 276, level: 'below', name: 'Perf. Lateral II', label: 'Lateral II', acronym: 'PL-II', sup: 'Trib. Ant. Pierna', supLabel: 'VANPI', deep: 'Venas Tibiales Ant.', deepLabel: 'VTA' },
  { id: 'perf_lat_ant_1', y: 327, level: 'below', name: 'Perf. Lateral I', label: 'Lateral I', acronym: 'PL-I', sup: 'Trib. Ant. Pierna', supLabel: 'VANPI', deep: 'Venas Tibiales Ant.', deepLabel: 'VTA' },
  
  // --- MEDIAL ---
  { id: 'perf_hunter', y: 378, level: 'above', name: 'Perf. Medial (Hunter)', label: 'Hunter', acronym: 'PHUM', sup: 'Tronco Tributario Acc.', supLabel: 'TTA', deep: 'Vena Femoral', deepLabel: 'VF' },
  { id: 'perf_dodd', y: 429, level: 'above', name: 'Perf. Medial (Dodd)', label: 'Dodd', acronym: 'PDOD', sup: 'Tronco Tributario Acc.', supLabel: 'TTA', deep: 'Vena Femoral', deepLabel: 'VF' },
  { id: 'perf_boyd', y: 480, level: 'below', name: 'Perf. Paratibial Superior (Boyd)', label: 'Boyd', acronym: 'PBOY', sup: 'Trib. Ant. Pierna', supLabel: 'VANPI', deep: 'V. Tibial Posterior', deepLabel: 'VTP' },
  { id: 'perf_sherman', y: 531, level: 'below', name: 'Perf. Paratibial Medial (Sherman)', label: 'Sherman', acronym: 'SHE', sup: 'V. Arqueada Posterior', supLabel: 'VARPI', deep: 'V. Tibial Posterior', deepLabel: 'VTP' },
  { id: 'perf_tib_post_sup', y: 582, level: 'below', name: 'Perf. Tibial Posterior Superior', label: 'Tib. Post. Sup.', acronym: 'PC-III', sup: 'V. Arqueada Posterior', supLabel: 'VARPI', deep: 'V. Tibial Posterior', deepLabel: 'VTP' },
  { id: 'perf_tib_post_med', y: 633, level: 'below', name: 'Perf. Tibial Posterior Media', label: 'Tib. Post. Med.', acronym: 'PC-II', sup: 'V. Arqueada Posterior', supLabel: 'VARPI', deep: 'V. Tibial Posterior', deepLabel: 'VTP' },
  { id: 'perf_tib_post_inf', y: 684, level: 'below', name: 'Perf. Tibial Posterior Inferior', label: 'Tib. Post. Inf.', acronym: 'PC-I', sup: 'V. Arqueada Posterior', supLabel: 'VARPI', deep: 'V. Tibial Posterior', deepLabel: 'VTP' },
  
  // --- LATERAL ---
  { id: 'perf_lat_muslo', y: 735, level: 'above', name: 'Perf. Lateral del Muslo', label: 'Lat. Muslo', acronym: 'PALM', sup: 'V. Circunfleja Ilíaca', supLabel: 'VCIS', deep: 'V. Femoral Profunda', deepLabel: 'VFP' },
  { id: 'perf_lat_rodilla', y: 786, level: 'above', name: 'Perf. Lateral de Rodilla', label: 'Lat. Rodilla', acronym: 'PLAR', sup: 'V. Lateral Pierna', supLabel: 'VLAPI', deep: 'Vena Poplítea', deepLabel: 'VPOP' },
  { id: 'perf_peronea', y: 837, level: 'below', name: 'Perf. Peronea (Lateral)', label: 'Peronea', acronym: 'PPER', sup: 'V. Lateral Pierna', supLabel: 'VLAPI', deep: 'Venas Peroneas', deepLabel: 'VPER' },
  { id: 'perf_bassi', y: 888, level: 'below', name: 'Perf. Lateral de la Pierna (Bassi)', label: 'Lat. Pierna', acronym: 'PBAS', sup: 'VSP Distal / V. Lateral', supLabel: 'VSP-D / VLAPI', deep: 'Venas Peroneas', deepLabel: 'VPER' },
  { id: 'perf_kuster', y: 939, level: 'below', name: 'Perf. Maleolar Lateral (Kuster)', label: 'Maleolar Lat.', acronym: 'PMAY', sup: 'V. Lateral Pierna', supLabel: 'VLAPI', deep: 'Venas Peroneas distales', deepLabel: 'VPER' },
  
  // --- POSTERIOR ---
  { id: 'perf_glutea', y: 990, level: 'above', name: 'Perf. Glútea', label: 'Glútea', acronym: 'PGLU', sup: 'Extensión Craneal', supLabel: 'VEC', deep: 'Venas Glúteas', deepLabel: 'VGL' },
  { id: 'perf_poplitea', y: 1041, level: 'above', name: 'Perf. de la Fosa Poplítea', label: 'Poplítea', acronym: 'PFP', sup: 'V. Lateral Pierna', supLabel: 'VLAPI', deep: 'Vena Poplítea', deepLabel: 'VPOP' },
  { id: 'perf_gastro', y: 1092, level: 'below', name: 'Perf. Gastrocnemia (Medial/Lateral)', label: 'Gastrocnemia', acronym: 'PGAS', sup: 'Venas Gemelares', supLabel: 'VGEM', deep: 'VV. Gastrocnemias', deepLabel: 'VGAS' },
];

const PERFORATOR_VIEWS = {
    'perf_inguinal': 'Anterior',
    'perf_pudenda': 'Anterior',
    'perf_glutea': 'Posterior',
    'perf_lat_muslo': 'Lateral',
    'perf_fem_sup': 'Anterior',
    'perf_ant_muslo': 'Anterior',
    'perf_hunter': 'Medial',
    'perf_dodd': 'Medial',
    'perf_poplitea': 'Posterior',
    'perf_lat_rodilla': 'Lateral',
    'perf_boyd': 'Medial',
    'perf_sherman': 'Medial',
    'perf_tib_post_sup': 'Medial',
    'perf_tib_post_med': 'Medial',
    'perf_gastro': 'Posterior',
    'perf_tib_post_inf': 'Medial',
    'perf_lat_ant_1': 'Anterior',
    'perf_lat_ant_2': 'Anterior',
    'perf_lat_ant_3': 'Anterior',
    'perf_lat_ant_4': 'Anterior',
    'perf_peronea': 'Lateral',
    'perf_bassi': 'Lateral',
    'perf_kuster': 'Lateral'
};

const ULTRASOUND_GUIDELINES = {
    'perf_inguinal': {
        position: 'Bipedestación, extremidad en ligera rotación externa. Peso sobre la pierna contralateral.',
        transducer: 'Lineal de alta frecuencia (7-12 MHz). Orientación transversal y luego longitudinal.',
        landmarks: 'Región inguinal medial. Fascia cribiforme y cayado safenofemoral.',
        technique: 'Desde la unión safenofemoral, deslice medialmente y caudalmente 2-3 cm. Busque la disrupción fascial donde ramas pudendas o circunflejas perforan hacia la VFC. Valore reflujo con maniobras.',
        settings: 'PRF bajo (5-10 cm/s), filtro de pared muy bajo, alta ganancia de color.'
    },
    'perf_glutea': {
        position: 'Decúbito prono o bipedestación de espaldas.',
        transducer: 'Lineal o Convexo (dependiendo del panículo adiposo). Exploración transversal.',
        landmarks: 'Pliegue glúteo inferior y cara posterior del muslo proximal.',
        technique: 'Valore la conexión entre el sistema venoso profundo pélvico/glúteo y la red superficial posterior (Extensión Craneal o Vena de Giacomini).',
        settings: 'PRF intermedio. Utilice maniobras de Valsalva para evaluar reflujo pélvico.'
    },
    'perf_pudenda': {
        position: 'Bipedestación o decúbito supino.',
        transducer: 'Lineal de alta frecuencia (7-12 MHz).',
        landmarks: 'Región inguinal medial, cerca del pubis.',
        technique: 'Valore las ramas pudendas externas desde la USF hacia la zona pélvica/genital buscando puntos de fuga pélvica.',
        settings: 'PRF bajo, evaluar con Valsalva.'
    },
    'perf_lat_muslo': {
        position: 'Decúbito lateral o bipedestación.',
        transducer: 'Lineal o Convex.',
        landmarks: 'Cara lateral proximal del muslo.',
        technique: 'Siga el sistema circunflejo lateral buscando conexiones transfasciales con la Vena Femoral Profunda.',
        settings: 'Alta ganancia, ajustar profundidad según panículo adiposo.'
    },
    'perf_fem_sup': {
        position: 'Bipedestación, rotación externa de cadera. Posición de rana modificada.',
        transducer: 'Lineal (7-12 MHz). Exploración transversal.',
        landmarks: 'Tercio proximal del muslo. Músculo sartorio y trayecto de la VSA (Vena Safena Accesoria Anterior).',
        technique: 'Siga el trayecto de la VSAA desde el muslo proximal hacia distal. Estas perforantes comunican directamente con la Vena Femoral Profunda. Preste atención al ojal aponeurótico.',
        settings: 'PRF intermedio. Compresión manual distal para evaluar la competencia de la válvula fascial.'
    },
    'perf_ant_muslo': {
        position: 'Bipedestación, pierna relajada.',
        transducer: 'Lineal de alta frecuencia transversal.',
        landmarks: 'Cara anterior del muslo, trayecto de la VSAA.',
        technique: 'Evalúe el ojal aponeurótico directo hacia el sistema femoral profundo o superficial.',
        settings: 'Compresión distal para comprobar reflujo.'
    },
    'perf_hunter': {
        position: 'Bipedestación, rotación externa y ligera flexión de rodilla.',
        transducer: 'Lineal (7-12 MHz) transversal.',
        landmarks: 'Tercio medio del muslo medial. Canal de Hunter (Aductores) bajo el borde del músculo sartorio.',
        technique: 'Localice la VSM en el muslo medio. Incline el transductor medialmente hacia los aductores. Ubique el paso de la perforante hacia la Vena Femoral superficial antes de que esta entre al hiato aductor.',
        settings: 'Ajuste el foco a nivel del plano fascial (3-4 cm). Maniobra de Parana o compresión de pantorrilla.'
    },
    'perf_dodd': {
        position: 'Bipedestación con la rodilla levemente flexionada para relajar la musculatura.',
        transducer: 'Lineal transversal.',
        landmarks: 'Tercio distal del muslo, cara medial. Unión del vasto medial y tendón del aductor mayor.',
        technique: 'Descienda desde Hunter hasta el muslo distal. Localice el "signo del ojo de cerradura" (keyhole) donde la perforante de Dodd atraviesa el vasto medial hacia el segmento poplíteo superior.',
        settings: 'Inclinación (heel-toe) en longitudinal para alinear el ángulo Doppler espectral a <60° y medir el tiempo de reflujo exacto.'
    },
    'perf_boyd': {
        position: 'Bipedestación o sentado con las piernas colgando.',
        transducer: 'Lineal alta frecuencia.',
        landmarks: 'Cara medial de la pierna proximal, a un través de mano (aprox. 10 cm) bajo la interlínea articular.',
        technique: 'Identifique el punto donde convergen la VSM y la Vena de Leonardo (Arco Posterior). Siga la penetración vertical hacia las Venas Tibiales Posteriores proximales a través de la fascia crural.',
        settings: 'PRF bajo (5 cm/s). Realice compresión manual distal y observe la duración del reflujo inverso en diástole.'
    },
    'perf_sherman': {
        position: 'Bipedestación o sentado al borde de la camilla.',
        transducer: 'Lineal alta frecuencia.',
        landmarks: 'Tercio medio de la pierna medial, a mitad de distancia entre la rodilla y el maléolo medial.',
        technique: 'Trace el tronco de la VSM o Vena de Leonardo transversalmente hacia abajo. Localice el ojal aponeurótico directo hacia las venas tibiales posteriores.',
        settings: 'Doppler color con caja optimizada (pequeña) sobre el defecto fascial. Medir diámetro exacto del orificio aponeurótico (>3.5mm = patológico).'
    },
    'perf_tib_post_sup': {
        position: 'Bipedestación, ligero apoyo en una baranda.',
        transducer: 'Lineal (10-14 MHz).',
        landmarks: 'Cara posteromedial, tercio superior. Borde medial del gastrocnemio y hueso tibial.',
        technique: 'Históricamente llamadas Cockett III. Siga la Vena del Arco Posterior hacia el borde del hueso tibial. La perforante entra perpendicularmente a la fascia conectando con las venas tibiales posteriores.',
        settings: 'PRF muy bajo. Las perforantes aquí son de bajo flujo, requiere alta sensibilidad color.'
    },
    'perf_tib_post_med': {
        position: 'Bipedestación.',
        transducer: 'Lineal (10-14 MHz) transversal.',
        landmarks: 'Tercio medio inferior posteromedial. (Cockett II, ~10-15 cm sobre maléolo).',
        technique: 'Buscar la Vena del Arco Posterior. Evaluar el paso transversal a través de la fascia crural hacia los senos soleos y tibiales posteriores.',
        settings: 'Evaluar cuidadosamente si hay úlceras (Topografía C5/C6), utilice abundante gel sin presionar la piel.'
    },
    'perf_tib_post_inf': {
        position: 'Bipedestación.',
        transducer: 'Lineal alta frecuencia o "palo de hockey".',
        landmarks: 'Tercio inferior posteromedial. (Cockett I, ~5-10 cm sobre maléolo medial).',
        technique: 'Mismo abordaje que TPS/TPM. Alta asociación con lipodermatoesclerosis o úlceras venosas supramaleolares.',
        settings: 'Si hay edema severo o piel endurecida, baje la frecuencia (ej. 7 MHz) para mejorar la penetración.'
    },
    'perf_poplitea': {
        position: 'Decúbito prono con rodilla flex. 20°, o bipedestación de espaldas al operador.',
        transducer: 'Lineal o Convex (si hay mucha adiposidad). Transversal.',
        landmarks: 'Fosa poplítea central y unión safenopoplítea (USP).',
        technique: 'Evalúe la terminación de la Vena Safena Menor (VSm) o la Extensión Craneal. Busque perforantes independientes que conectan directo a la Vena Poplítea fuera de la USP.',
        settings: 'Ajuste la profundidad a 4-6 cm. Compresión de gemelos para provocar el flujo cefálico y soltar para ver reflujo.'
    },
    'perf_lat_rodilla': {
        position: 'Decúbito lateral o prono.',
        transducer: 'Lineal de alta frecuencia.',
        landmarks: 'Cara lateral externa de la articulación de la rodilla.',
        technique: 'Identifique tributarias laterales y siga su curso a través de la fascia hacia la vena poplítea lateral o red profunda.',
        settings: 'Ajustar ganancia y profundidad superficial para no perder el defecto fascial corto.'
    },
    'perf_gastro': {
        position: 'Bipedestación de espaldas o decúbito prono.',
        transducer: 'Lineal (7-12 MHz).',
        landmarks: 'Vientres musculares de los gastrocnemios medial y lateral.',
        technique: 'Rastree la red tributaria posterior. Identifique perforantes indirectas que penetran la fascia e ingresan al músculo para drenar en las venas gastrocnemias (venas musculares gemelares).',
        settings: 'Diferenciar entre venas musculares dilatadas normales y perforantes con flujo bidireccional anómalo.'
    },
    'perf_peronea': {
        position: 'Bipedestación o decúbito lateral con la rodilla levemente flexionada.',
        transducer: 'Lineal de alta frecuencia transversal.',
        landmarks: 'Compartimento lateral de la pierna, sobre los músculos peroneos.',
        technique: 'Localice la tributaria lateral peronea y siga su trayecto a través de la fascia crural profunda conectando con las venas peroneas (fibulares).',
        settings: 'PRF bajo, compresión manual distal para evaluar reflujo inverso.'
    },
    'perf_bassi': {
        position: 'Bipedestación, pierna en ligera rotación interna, peso en contralateral.',
        transducer: 'Lineal (10-14 MHz).',
        landmarks: 'Cara lateral/posterolateral del tercio medio e inferior de la pierna.',
        technique: 'Siga el trayecto de la VSm o ramas anterolaterales de la pierna hacia el compartimento lateral. La perforante cruza el compartimento peroneal hacia las venas peroneas.',
        settings: 'PRF bajo, evaluar la competencia fascial perpendicular a la pantalla.'
    },
    'perf_kuster': {
        position: 'Bipedestación o sentado.',
        transducer: 'Lineal alta frecuencia, usar gel abundante (stand-off pad).',
        landmarks: 'Región retromaleolar lateral (detrás del maléolo externo).',
        technique: 'Evalue el plexo venoso retromaleolar externo. La perforante de Kuster o de la zona de los tendones peroneos drena hacia las venas peroneas distales.',
        settings: 'Transductor "flotando" sobre el gel grueso para no comprimir las delicadas venas supramaleolares.'
    },
    'perf_ant_pierna': {
        position: 'Bipedestación.',
        transducer: 'Lineal de alta frecuencia transversal.',
        landmarks: 'Compartimento anterior de la pierna, paralelo a la cresta tibial.',
        technique: 'Identifique tributarias que cruzan la fascia hacia las venas tibiales anteriores.',
        settings: 'PRF muy bajo, flujo suele ser lento.'
    }
};

const PERFORANTES_SEGMENTS = perforatorsData.flatMap((p, index) => {
  const getFreq = (id) => {
      if (['perf_tib_post_sup', 'perf_tib_post_med', 'perf_tib_post_inf'].includes(id)) return 3;
      if (['perf_boyd', 'perf_sherman'].includes(id)) return 2;
      if (['perf_dodd', 'perf_hunter'].includes(id)) return 1;
      return 0;
  };
  const getUlcerDots = (id) => {
      if (id === 'perf_tib_post_inf') return 3; // Cockett I (más distal, 3 puntos)
      if (id === 'perf_tib_post_med') return 2; // Cockett II
      if (id === 'perf_tib_post_sup') return 1; // Cockett III
      return 0;
  };
  const offset = index % 2 === 1 ? 50 : 10;
  const perfFocal = index % 2 === 1 ? 0.8 : 0.2;
  return [
      { id: `ghost_sup_${p.id}`, name: p.sup, label: p.supLabel, acronym: p.supLabel, align: 'left', offsetX: offset, type: 'branch', path: `M 150 ${p.y} L 150.01 ${p.y}`, isGhost: true, parentId: null },
      { id: `ghost_deep_${p.id}`, name: p.deep, label: p.deepLabel, acronym: p.deepLabel, align: 'right', offsetX: offset, type: 'branch', path: `M 350 ${p.y} L 350.01 ${p.y}`, isGhost: true, parentId: null, frequency: getFreq(p.id), ulcerDots: getUlcerDots(p.id) },
      { id: p.id, name: p.name, label: p.label, acronym: p.acronym, align: 'perforator', type: 'distal', path: `M 150 ${p.y} L 350 ${p.y}`, focalFraction: perfFocal, parentId: null, isPerforator: true, level: p.level }
  ];
}).map(seg => {
    const parsed = parsePathData(seg.path);
    return { ...seg, parsedPath: parsed, focalPoint: getPointsAlongParsedPath(parsed, [seg.focalFraction || 0.5])[0] || { x: 250, y: 0, angle: 0 } };
});

// ============================================================================
// SOLUCIÓN DE RENDIMIENTO 1: ENTRADAS DE TEXTO LOCALES (NO LAG)
// ============================================================================
const SmartInput = ({ value, onChange, placeholder, className, style, type = "text", step, inputMode }) => {
    const [localVal, setLocalVal] = useState(value || '');

    useEffect(() => { setLocalVal(value || ''); }, [value]);

    return (
        <input
            type={type}
            step={step}
            inputMode={inputMode}
            value={localVal}
            onChange={e => setLocalVal(e.target.value)}
            onBlur={() => { if (localVal !== (value || '')) onChange(localVal); }}
            placeholder={placeholder}
            className={className}
            style={style}
        />
    );
};

// ============================================================================
// COMPONENTES DE INTERFAZ Y RENDERIZADO
// ============================================================================

const SidebarLeft = ({ state, actions }) => {
    const { activeSystem, cartography, isLeftHanded, thumbOffset, activeElement, arteryStates, toolPage, customGrids, isEditingGrid, toolToSwap, isMobile, leg, isGeneratingReport, currentSegments, hiddenTools } = state;
    const { setIsLeftHanded, setThumbOffset, handleToolClick, setToolPage, setIsEditingGrid, handleToolSwap, generateAIReport, handleSegmentClick, setIsLegendModalOpen, setIsPerfModalOpen, setIsRightSidebarOpen, setLegendSystem } = actions;

    const [pressedTool, setPressedTool] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [toolMode, setToolMode] = useState('ModoB');
    const [toolbarSubPage, setToolbarSubPage] = useState(0);
    const [findingsPageLeft, setFindingsPageLeft] = useState(0);
    
    React.useEffect(() => { setFindingsPageLeft(0); }, [activeElement?.id]);

    const handleNextPrev = (direction) => {
        if (!currentSegments || !currentSegments.length) return;
        const idx = currentSegments.findIndex(s => s.id === activeElement?.id);
        let nextIdx;
        if (direction === 'next') {
            nextIdx = idx !== -1 && idx < currentSegments.length - 1 ? idx + 1 : 0;
        } else {
            nextIdx = idx > 0 ? idx - 1 : currentSegments.length - 1;
        }
        handleSegmentClick(currentSegments[nextIdx].id);
    };

    const activeSegmentName = currentSegments.find(s => s.id === activeElement?.id)?.name || activeSystem;
    const activeToolInfo = pressedTool && pressedTool !== 'NEXT_PAGE' && pressedTool !== 'PREV_PAGE' ? TOOLS_MAP[pressedTool] : null;

    const currentSystemKey = cartography === 'PERF' ? 'PERF' : (activeSystem === 'VENOSO' ? 'VENOSO' : cartography);
    const activeSystemTools = customGrids[currentSystemKey] || DEFAULT_TOOL_GRIDS[currentSystemKey];

    const spectralIds = ['multiphasic', 'multiphasic_broad', 'biphasic', 'monophasic', 'monophasic_antero', 'tardus', 'v_continuous', 'v_pulsatile', 'medidas_ta', 'medidas_ratio', 'medidas_velocidades', 'medidas_reflux'];

    const filteredTools = activeSystemTools.filter(toolId => {
        const tool = TOOLS_MAP[toolId];
        if (!tool) return false;
        if (hiddenTools.includes(tool.id) && tool.category !== 'action') return false;

        if (toolMode === 'ModoB') {
            return (tool.category === 'trayecto' || tool.category === 'focal' || tool.category === 'global' || tool.category === 'draw_point' || tool.category === 'medicion' || tool.category === 'trayecto_extra' || tool.category === 'focal_extra') && !spectralIds.includes(tool.id) && tool.category !== 'other' && tool.category !== 'spectral_extra';
        }
        if (toolMode === 'Doppler') {
            return tool.category === 'color';
        }
        if (toolMode === 'Espectral') {
            return spectralIds.includes(tool.id) || tool.category === 'spectral_extra' || tool.category === 'focal_cycle';
        }
        if (toolMode === 'QX') {
            return (tool.category === 'intervention' || tool.category === 'action');
        }
        return true;
    });

    const handleModeClick = (mode) => {
        if (toolMode !== mode) {
            setToolMode(mode);
            setToolbarSubPage(0);
        } else {
            setToolbarSubPage(prev => prev + 1);
        }
    };

    const toolsPerPage = 6;
    const totalPages = Math.max(1, Math.ceil(filteredTools.length / toolsPerPage));
    const activeSubPage = toolbarSubPage % totalPages;

    let displayFiltered = filteredTools.slice(activeSubPage * toolsPerPage, (activeSubPage + 1) * toolsPerPage);

    const MODE_BUTTONS = [
        { 
            id: 'ModoB', 
            name: 'Modo B', 
            icon: (props) => <IconModoBMode {...props} page={toolMode === 'ModoB' ? activeSubPage : 0} />, 
            hex: THEME.textMain, 
            isActive: toolMode === 'ModoB',
            action: () => handleModeClick('ModoB')
        },
        { 
            id: 'Espectral', 
            name: 'Espectral', 
            icon: (props) => <IconEspectralMode {...props} page={toolMode === 'Espectral' ? activeSubPage : 0} />, 
            hex: THEME.cyan,
            isActive: toolMode === 'Espectral',
            action: () => handleModeClick('Espectral')
        },
        { 
            id: 'Doppler', 
            name: 'Color', 
            icon: Palette, 
            hex: THEME.red,
            isActive: toolMode === 'Doppler',
            action: () => handleModeClick('Doppler')
        },
        { 
            id: 'QX', 
            name: 'Cirugía', 
            icon: IconScalpel, 
            hex: THEME.yellow,
            isActive: toolMode === 'QX',
            action: () => handleModeClick('QX')
        }
    ];

    let displaySlots = [];
    const activeSegmentDetails = activeElement ? currentSegments.find(s => s.id === activeElement.id) : null;
    const isPerforatorSelected = activeSegmentDetails?.isPerforator;

    if (cartography === 'PERF' || isPerforatorSelected) {
        const createSlot = (id) => {
            let toolDef = { ...TOOLS_MAP[id] };
            if (id === 'perf_metrics' && activeElement) {
                const stateColor = (arteryStates[activeElement.id] || {}).color;
                if (stateColor === 'perf_incompetent') toolDef.hex = THEME.red;
                else if (stateColor === 'perf_competent') toolDef.hex = THEME.blue;
                else if (stateColor === 'perf_no_criteria') toolDef.hex = THEME.orange;
            }
            return {
                ...toolDef,
                action: () => {
                    if (id === 'perf_metrics') {
                        if (activeElement) setIsPerfModalOpen(true);
                        else alert("Selecciona primero una perforante.");
                    } else if (toolDef.category === 'view_filter') {
                        const viewMap = { 'view_anterior': 'Anterior', 'view_medial': 'Medial', 'view_lateral': 'Lateral', 'view_posterior': 'Posterior' };
                        actions.togglePerfView(viewMap[id]);
                    } else {
                        handleToolClick(id);
                    }
                }, 
                isActive: toolDef.category === 'view_filter' ? (state.activePerfViews === 'ALL' || state.activePerfViews === { 'view_anterior': 'Anterior', 'view_medial': 'Medial', 'view_lateral': 'Lateral', 'view_posterior': 'Posterior' }[id]) : (activeElement ? ((arteryStates[activeElement.id] || {}).focal || []).includes(id) || (arteryStates[activeElement.id] || {}).color === id : false) 
            };
        };
        const perfTools = cartography === 'PERF' 
            ? ['view_anterior', 'view_medial', 'view_lateral', 'view_posterior', 'perf_incompetent', 'perf_competent', 'perf_no_criteria', 'perf_ulcer', 'perf_metrics']
            : ['perf_incompetent', 'perf_competent', 'perf_no_criteria', 'perf_ulcer', 'perf_metrics'];
        
        displaySlots = perfTools.map(createSlot).slice(0, 10);
        while (displaySlots.length < 10) displaySlots.push(null);
    } else {
        displaySlots = [...MODE_BUTTONS, ...displayFiltered].slice(0, 10);
        while (displaySlots.length < 10) displaySlots.push(null);
    }

    if (!isMobile && isLeftHanded) {
        let reversedSlots = [];
        for (let i = 0; i < displaySlots.length; i += 2) {
            if (i + 1 < displaySlots.length) {
                reversedSlots.push(displaySlots[i + 1], displaySlots[i]);
            } else {
                reversedSlots.push(displaySlots[i]);
            }
        }
        displaySlots = reversedSlots;
    }

    // --- Recuperación Dinámica del Hospital ---
    const fpp = getFrappe();
    const doctorName = fpp?.session?.user_fullname ? fpp.session.user_fullname : 'Dr. Usuario Activo';

    const getSubsystemName = (c) => {
        if (c === 'PIERNA') return 'Arterias Miembros Inferiores';
        if (c === 'CAROTIDA') return 'Ejes Carotídeos';
        if (c === 'USF') return 'Mapa Anatómico USF';
        if (c === 'USP') return 'Mapa Anatómico USP';
        if (c === 'LATERAL') return 'Sistema Lateral';
        if (c === 'SVP') return 'Sistema Venoso Profundo';
        return c;
    };

    const getAnatomicalViewText = () => {
        if (cartography === 'USF') return 'VISTA ANTEROMEDIAL';
        if (cartography === 'USP') return 'VISTA POSTERIOR';
        if (cartography === 'LATERAL') return 'VISTA LATERAL';
        if (cartography === 'SVP') return 'SISTEMA PROFUNDO';
        if (cartography === 'PERF') return 'VISTAS MÚLTIPLES';
        if (cartography === 'PIERNA') return 'VISTA ANTERIOR';
        if (cartography === 'CAROTIDA') return 'CUELLO (LATERAL)';
        return '';
    };

    return (
        <aside className={`${isMobile ? 'w-[124px] z-40' : 'w-full z-30'} flex-col h-full relative pt-16 pb-2 flex shadow-2xl shrink-0`} style={{ backgroundColor: THEME.bgSidebar, borderRight: (!isLeftHanded) ? `1px solid ${THEME.border}` : 'none', borderLeft: isLeftHanded ? `1px solid ${THEME.border}` : 'none' }}>

            <div className="absolute top-[20px] left-0 w-full flex flex-col items-center justify-center p-2 text-center pointer-events-auto">
                <Activity className="w-5 h-5 text-cyan-500 mb-1" />
                <div className="flex flex-col">
                    <h1 className="text-[11px] font-bold leading-tight tracking-tight text-white">DopplerMap <span className="font-light" style={{ color: THEME.textMuted }}>Pro</span></h1>
                    <span className="text-[6px] uppercase tracking-[0.2em] font-bold text-cyan-500 mt-0.5">Suite</span>
                </div>
            </div>

            {(() => {
                const activeSegmentState = activeSegmentDetails ? (arteryStates[activeSegmentDetails.id] || {}) : {};
                const activeInterventions = activeSegmentState.interventions || [];
                const dynamicFindings = [];
                if (activeSegmentState.color && activeSegmentState.color !== 'unmapped' && TOOLS_MAP[activeSegmentState.color]) {
                    dynamicFindings.push(TOOLS_MAP[activeSegmentState.color]);
                }
                const getArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);
                getArray(activeSegmentState.pared).forEach(p => { if (TOOLS_MAP[p]) dynamicFindings.push(TOOLS_MAP[p]) });
                getArray(activeSegmentState.focal).forEach(f => { if (TOOLS_MAP[f]) dynamicFindings.push(TOOLS_MAP[f]) });
                activeInterventions.forEach(inv => { if (TOOLS_MAP[inv]) dynamicFindings.push(TOOLS_MAP[inv]) });

                return (
                    <div className="flex-1 w-full flex flex-col justify-start pt-10 pb-4 overflow-hidden z-40 pointer-events-none">
                        {/* DERECHA / IZQUIERDA Y SISTEMAS (BOTONES HORIZONTALES MÓVIL) */}
                        <div className={`flex flex-col gap-2 items-center w-full ${isMobile ? 'px-2' : 'px-3'} pointer-events-none mt-0 pb-4`}>
                            <button 
                                className="font-black text-[12px] md:text-[14px] uppercase px-5 py-2.5 rounded-xl pointer-events-auto transition-all active:scale-95 shadow-lg border border-white/20 bg-black/80 backdrop-blur-md w-full text-center" 
                                style={{ color: leg === 'DERECHA' ? THEME.cyan : THEME.orange }}
                                onClick={() => actions.setLeg(leg === 'DERECHA' ? 'IZQUIERDA' : 'DERECHA')}
                            >
                                {leg}
                            </button>
                            <button 
                                className="font-black text-[12px] md:text-[14px] uppercase px-5 py-2.5 rounded-xl pointer-events-auto transition-all active:scale-95 shadow-lg border border-white/20 bg-black/80 backdrop-blur-md w-full text-center" 
                                style={{ color: activeSystem === 'ARTERIAL' ? THEME.red : THEME.blue }}
                                onClick={() => actions.switchSystem(activeSystem === 'ARTERIAL' ? 'VENOSO' : 'ARTERIAL')}
                            >
                                {activeSystem === 'ARTERIAL' ? 'ARTERIAS' : 'VENAS'}
                            </button>
                        </div>
                        
                        {/* CAJA LATERAL DE DIAGNÓSTICOS FIJA (COLUMNA 1) */}
                        <div className={`flex flex-col items-center pointer-events-auto w-full ${isMobile ? 'px-2' : 'px-3'} mt-0`}>
                            {activeSegmentDetails && dynamicFindings.length > 0 && (
                                <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border shadow-2xl relative w-full flex flex-col items-center" style={{ borderColor: THEME.border }}>
                                    <div className="flex flex-col gap-2 w-full">
                                        {(() => {
                                            const ITEMS_PER_PAGE = 3;
                                            const totalPages = Math.ceil(dynamicFindings.length / ITEMS_PER_PAGE);
                                            
                                            // Asegurar que findingsPageLeft no se salga de rango si se eliminan items
                                            const safePage = Math.min(findingsPageLeft, Math.max(0, totalPages - 1));
                                            if (safePage !== findingsPageLeft && totalPages > 0) {
                                                setTimeout(() => setFindingsPageLeft(safePage), 0);
                                            }
                                            
                                            const visibleFindings = dynamicFindings.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);

                                            return (
                                                <>
                                                    {totalPages > 1 && (
                                                        <div className="flex justify-center pb-1">
                                                            <button 
                                                                onClick={() => setFindingsPageLeft(p => Math.max(0, p - 1))}
                                                                disabled={safePage === 0}
                                                                className={`p-1 rounded-full transition-all ${safePage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-95'}`}
                                                            >
                                                                <ChevronUp size={16} className="text-cyan-400" />
                                                            </button>
                                                        </div>
                                                    )}

                                                    {visibleFindings.map(f => (
                                                        <div key={f.id} className="relative flex flex-col items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10 text-center w-full pointer-events-auto">
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    actions.setGlobalArteryStates(prev => {
                                                                        const legState = { ...prev[leg] };
                                                                        const sState = { ...(legState[activeSegmentDetails.id] || {}) };
                                                                        const getArr = (v) => Array.isArray(v) ? v : (v ? [v] : []);
                                                                        if (sState.focal) sState.focal = getArr(sState.focal).filter(t => t !== f.id);
                                                                        if (sState.pared) sState.pared = getArr(sState.pared).filter(t => t !== f.id);
                                                                        if (sState.interventions) sState.interventions = getArr(sState.interventions).filter(t => t !== f.id);
                                                                        if (sState.color === f.id) sState.color = 'unmapped';
                                                                        
                                                                        if (sState.focal && sState.focal.length === 0) delete sState.focal;
                                                                        if (sState.pared && sState.pared.length === 0) delete sState.pared;
                                                                        if (sState.interventions && sState.interventions.length === 0) delete sState.interventions;
                                                                        
                                                                        legState[activeSegmentDetails.id] = sState;
                                                                        return { ...prev, [leg]: legState };
                                                                    });
                                                                }}
                                                                className="absolute -top-2 -right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg hover:scale-110 active:scale-95 transition-all pointer-events-auto"
                                                            >
                                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                                            </button>
                                                            <f.icon className="w-5 h-5 mb-1 pointer-events-none" style={{ color: f.hex || THEME.cyan }} />
                                                            <span className="text-[6px] font-bold text-white/90 uppercase leading-tight line-clamp-2 w-full pointer-events-none">{f.name}</span>
                                                        </div>
                                                    ))}

                                                    {totalPages > 1 && (
                                                        <div className="flex justify-center pt-1">
                                                            <button 
                                                                onClick={() => setFindingsPageLeft(p => Math.min(totalPages - 1, p + 1))}
                                                                disabled={safePage >= totalPages - 1}
                                                                className={`p-1 rounded-full transition-all ${safePage >= totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-95'}`}
                                                            >
                                                                <ChevronDown size={16} className="text-cyan-400" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}

            <div className="relative shrink-0 w-full max-h-[360px] overflow-y-auto custom-scrollbar pointer-events-auto mt-auto" style={{ height: 'auto', marginBottom: 0 }}>
                <div className={`transition-all duration-300 ease-out relative w-full ${isMobile ? 'px-2' : 'px-3'} pt-8`} style={{ bottom: 'auto' }}>

                    <button onClick={() => setShowSettings(!showSettings)} className={`absolute right-4 top-0 p-1 transition-colors ${showSettings || isEditingGrid ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`} title="Ajustes">
                        <Settings2 size={18} />
                    </button>

                    {showSettings && (
                        <div className={`absolute bottom-[100%] right-4 mb-2 w-48 rounded-xl shadow-2xl border p-3 flex flex-col gap-3 z-50 animate-in fade-in slide-in-from-bottom-2`} style={{ backgroundColor: THEME.bgSurface, borderColor: THEME.border }}>
                            <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 border-b border-white/10 pb-1">Ergonomía</span>

                            <button onClick={() => { actions.setIsLeftHanded(!isLeftHanded); setShowSettings(false); }} className="text-[11px] font-bold text-left hover:text-cyan-400 transition-colors flex items-center justify-between">
                                <span>{isLeftHanded ? 'Modo Zurdo' : 'Modo Diestro'}</span>
                                <span className="text-[16px]">{isLeftHanded ? '🖐️' : '🤚'}</span>
                            </button>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-left text-gray-300">Altura Pulgar</span>
                                    <span className="text-[10px] font-mono text-cyan-500">{thumbOffset}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="300"
                                    value={thumbOffset}
                                    onChange={(e) => actions.setThumbOffset(Number(e.target.value))}
                                    className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                            </div>

                            <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 border-b border-white/10 pb-1 mt-2">Botonera</span>

                            <button onClick={() => { actions.setIsEditingGrid(!isEditingGrid); actions.handleToolSwap(null); setShowSettings(false); }} className={`text-[11px] font-bold text-left transition-colors flex items-center justify-between ${isEditingGrid ? 'text-yellow-500' : 'text-gray-300 hover:text-white'}`}>
                                <span>{isEditingGrid ? 'Terminar Edición' : 'Editar Botones'}</span>
                                {isEditingGrid ? <X size={14} /> : <Settings2 size={14} />}
                            </button>
                        </div>
                    )}

                    <div className={`flex flex-col gap-1.5 p-1 rounded-2xl shadow-2xl border transition-all ${isEditingGrid ? 'ring-2 ring-yellow-500/50 border-yellow-500/30 bg-[#2a2510]' : ''}`} style={{ backgroundColor: isEditingGrid ? undefined : 'rgba(0,0,0,0.6)', borderColor: isEditingGrid ? undefined : THEME.border, backdropFilter: 'blur(10px)' }}>
                        <div className="grid grid-cols-2 gap-1.5 items-start">
                            {displaySlots.map((slotItem, index) => {
                                if (!slotItem) return <div key={`empty-${index}`} className="w-12 h-12 mx-auto rounded-xl border border-dashed border-white/10" />;

                                const toolId = typeof slotItem === 'string' ? slotItem : slotItem.id;
                                if (!toolId) return null; // Fallback

                                if (toolId === 'ModoB' || toolId === 'Espectral' || toolId === 'Doppler' || toolId === 'QX') {
                                    const isActive = slotItem.isActive;
                                    return (
                                        <button
                                            key={slotItem.id}
                                            onClick={slotItem.action}
                                            className="flex flex-col items-center justify-center shrink-0 w-12 h-12 mx-auto rounded-xl border transition-all active:scale-95 touch-none relative shadow-sm"
                                            style={{
                                                backgroundColor: isActive ? hexToRgba(slotItem.hex, 0.15) : THEME.bgSurface,
                                                borderColor: isActive ? slotItem.hex : THEME.border
                                            }}
                                        >
                                            <slotItem.icon className="w-5 h-5 mb-0.5" style={{ color: isActive ? slotItem.hex : THEME.textMuted }} />
                                            <span className="text-[7px] font-bold uppercase tracking-widest" style={{ color: isActive ? slotItem.hex : THEME.textMuted }}>{slotItem.name}</span>
                                        </button>
                                    );
                                }

                                const tool = TOOLS_MAP[toolId];
                                if (!tool) return null;

                                let isActive = slotItem.isActive !== undefined ? slotItem.isActive : false;
                                const isBeingSwapped = isEditingGrid && toolToSwap === toolId;

                                if (!isEditingGrid && slotItem.isActive === undefined) {
                                    const isTrayecto = tool.category.startsWith('trayecto');
                                    const isFocal = tool.category.startsWith('focal') || tool.category.startsWith('spectral');
                                    const isIntervention = tool.category.startsWith('intervention');

                                    if (tool.category === 'global') {
                                        isActive = !!(arteryStates.GLOBAL && arteryStates.GLOBAL[toolId]);
                                    } else if (activeElement) {
                                        const sState = arteryStates[activeElement.id] || {};
                                        if (tool.category === 'color') isActive = sState.color === toolId;
                                        else if (isFocal) isActive = (sState.focal || []).includes(toolId);
                                        else if (isTrayecto) isActive = (sState.pared || []).includes(toolId);
                                        else if (isIntervention) isActive = (sState.interventions || []).includes(toolId);
                                    }
                                }

                                const colorRender = tool.hex || (tool.category === 'intervention' ? THEME.cyan : THEME.textMain);
                                const isFlow = tool.category === 'color';
                                const isToolDisabled = tool.category !== 'global' && tool.category !== 'action' && toolId !== 'bypass' && !activeElement;

                                let btnStyle = { backgroundColor: isActive ? THEME.bgHover : THEME.bgSurface, borderColor: isActive ? colorRender : THEME.border };
                                if (isEditingGrid) {
                                    btnStyle = {
                                        backgroundColor: isBeingSwapped ? hexToRgba(THEME.yellow, 0.2) : THEME.bgSurface,
                                        borderColor: isBeingSwapped ? THEME.yellow : THEME.border,
                                        borderStyle: 'dashed'
                                    };
                                }

                                return (
                                    <button
                                        key={toolId}
                                        onClick={slotItem.action || (() => { if (!isToolDisabled || isEditingGrid) { isEditingGrid ? handleToolSwap(toolId) : handleToolClick(toolId); } })}
                                        onPointerDown={() => !isEditingGrid && setPressedTool(toolId)}
                                        onPointerUp={() => !isEditingGrid && setPressedTool(null)}
                                        onPointerLeave={() => !isEditingGrid && setPressedTool(null)}
                                        onContextMenu={(e) => e.preventDefault()}
                                        disabled={!isEditingGrid && isToolDisabled}
                                        className={`flex items-center justify-center shrink-0 w-12 h-12 mx-auto rounded-xl border transition-all touch-none shadow-sm ${isBeingSwapped ? 'animate-pulse' : ''} ${(!isEditingGrid && isToolDisabled) ? 'opacity-30 cursor-not-allowed' : 'active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:bg-white/5'}`}
                                        style={btnStyle}
                                    >
                                        <tool.icon
                                            className="w-6 h-6 pointer-events-none transition-opacity"
                                            style={{
                                                color: isEditingGrid ? THEME.textMain : (isActive ? colorRender : THEME.textMuted),
                                                opacity: (!isEditingGrid && !isActive) ? 0.5 : 1
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 px-1">
                        <button 
                            onClick={() => handleNextPrev('prev')}
                            className="flex-1 flex items-center justify-center py-2.5 rounded-xl border transition-all active:scale-95 shadow-sm bg-black/40 hover:bg-black/60"
                            style={{ borderColor: THEME.border }}
                        >
                            <ChevronLeft size={18} style={{ color: THEME.textMuted }} />
                        </button>
                        <button 
                            onClick={() => handleNextPrev('next')}
                            className="flex-1 flex items-center justify-center py-2.5 rounded-xl border transition-all active:scale-95 shadow-sm bg-black/40 hover:bg-black/60"
                            style={{ borderColor: THEME.border }}
                        >
                            <ChevronRight size={18} style={{ color: THEME.textMuted }} />
                        </button>
                    </div>
                </div>
            </div>

        </aside>
    );
};

// ============================================================================
// FUNCIONES DE SOPORTE DE RENDERIZADO (AISLADAS PARA PERFORMANCE)
// ============================================================================
const calculateSegmentStyle = (segment, sState, isMobile = false) => {
    const safeState = sState || {};
    // Width matched to background anatomy thickness
    const baseWidth = segment.type === 'macro' ? 36 : (segment.type === 'branch' ? 30 : 24);
    const width = isMobile ? baseWidth * 0.6 : baseWidth;
    let defaultColor = segment.altBase ? THEME.unmappedAlt : THEME.unmapped;
    if (segment.isPerforator) {
        defaultColor = segment.level === 'above' ? THEME.perfAboveKnee : THEME.perfBelowKnee;
    }
    if (segment.defaultColor) defaultColor = segment.defaultColor;

    const focalArray = Array.isArray(safeState.focal) ? safeState.focal : (safeState.focal ? [safeState.focal] : []);
    let hasManualColor = !!(safeState.color && safeState.color !== 'unmapped');
    let colorHex = hasManualColor ? TOOLS_MAP[safeState.color]?.hex : defaultColor;

    if (segment.isPerforator && (
        safeState.color === 'perf_incompetent' || 
        (parseFloat(safeState.diameter) >= 3.5 && parseFloat(safeState.reflux) > 500)
    )) {
        colorHex = THEME.red;
        hasManualColor = true;
    }

    const pared = Array.isArray(safeState.pared) ? safeState.pared : (safeState.pared ? [safeState.pared] : []);
    const interventions = safeState.interventions || [];

    const isMapped = hasManualColor || pared.length > 0 || focalArray.length > 0 || interventions.length > 0 ||
        (safeState.at && !isNaN(safeState.at)) || (safeState.ratio && !isNaN(safeState.ratio)) ||
        (safeState.length && !isNaN(safeState.length)) || (safeState.height && !isNaN(safeState.height)) ||
        (safeState.reflux && !isNaN(safeState.reflux)) || (safeState.diameter && !isNaN(safeState.diameter)) ||
        (safeState.psv && !isNaN(safeState.psv));

    return { isMapped, colorHex, width, pared, focal: focalArray, interventions, hasColor: hasManualColor, sStateColor: safeState.color };
};

// ============================================================================
// SOLUCIÓN DE RENDIMIENTO 2: SEGMENT LAYER (MEMOIZACIÓN EXTREMA + POINTER EVENTS)
// ============================================================================
const SPECTRAL_IDS = ['multiphasic', 'multiphasic_broad', 'biphasic', 'monophasic', 'monophasic_antero', 'tardus', 'reversed_flow', 'turbulence', 'v_continuous', 'v_pulsatile'];

const SegmentLayer = React.memo(({ segment, sState, isMobile, cartography, leg, setGlobalArteryStates }) => {
    const style = calculateSegmentStyle(segment, sState, isMobile);
    if (!style.isMapped) return null;

    const handleRemove = (e, toolId) => {
        e.stopPropagation();
        setGlobalArteryStates(prev => {
            const legState = { ...prev[leg] };
            const updatedSegmentState = { ...(legState[segment.id] || {}) };
            if (updatedSegmentState.focal) updatedSegmentState.focal = updatedSegmentState.focal.filter(t => t !== toolId);
            if (updatedSegmentState.pared) updatedSegmentState.pared = updatedSegmentState.pared.filter(t => t !== toolId);
            if (updatedSegmentState.interventions) updatedSegmentState.interventions = updatedSegmentState.interventions.filter(t => t !== toolId);
            legState[segment.id] = updatedSegmentState;
            return { ...prev, [leg]: legState };
        });
    };

    const { colorHex, width, pared, focal, hasColor, interventions, sStateColor } = style;
    const isCalcified = pared.includes('calcified'), isSoft = pared.includes('soft'), isUlcerated = pared.includes('ulcerated'), isGIM = pared.includes('gim');
    const isBypass = interventions.includes('bypass'), isAngioplasty = interventions.includes('angioplasty'), isStent = interventions.includes('stent'), isEndarterectomy = interventions.includes('endarterectomy');
    const isHypoplastic = pared.includes('v_hypoplastic'), isAplastic = pared.includes('v_aplastic'), isThickened = pared.includes('v_thickening'), hasAdhesions = pared.includes('v_adhesions'), isGulf = pared.includes('v_gulf');
    const isSaphenectomy = interventions.includes('saphenectomy');
    const isFoam = interventions.includes('foam_sclero');

    let strokeColor = colorHex;
    const isAblated = interventions.includes('v_ablated');
    const isThrombosed = sStateColor === 'v_thrombosed';
    const isAcuteThrombus = sStateColor === 'acute_thrombus';
    const isVarices = sStateColor === 'varices';
    const isOcclusion = pared.includes('occlusion');
    
    if (isAcuteThrombus || isVarices) strokeColor = 'transparent';

    let spectralColor = null;
    const selectedSpectrals = [...focal, ...pared].filter(id => SPECTRAL_IDS.includes(id));
    const hasSpectral = selectedSpectrals.length > 0;
    const specialColors = ['v_thrombosed', 'acute_thrombus', 'varices'];

    if (hasSpectral && !specialColors.includes(sStateColor)) {
        if (hasColor) {
            spectralColor = colorHex;
        }
        strokeColor = THEME.bgApp;
    }

    let dashArray = "none";
    let lineCap = (segment.type === 'macro' && segment.id !== 'sfj' && segment.id !== 'usp' && segment.id !== 'vsm_pierna_dist' && segment.id !== 'vsp_dist' && segment.id !== 'vfc' && segment.id !== 'v_circunfleja') ? 'butt' : 'round';
    let baseStrokeWidth = width;



    const baseIconColor = hasColor ? colorHex : '#FFFFFF';
    
    // Todas las herramientas seleccionadas (excepto color de flujo que ya está en baseIconColor)
    const allSelectedTools = [...new Set([...pared, ...focal, ...interventions])];

    return (
        <g key={`render-${segment.id}`} className="pointer-events-none">
            <g>
                <path
                    d={segment.path} fill="none"
                    stroke={strokeColor}
                    strokeWidth={baseStrokeWidth}
                    strokeLinecap={lineCap} strokeDasharray={dashArray}
                    filter={((isThrombosed) ? `drop-shadow(0 0 2px rgba(255,255,255,0.6))` : `drop-shadow(0 0 6px ${hexToRgba(colorHex, 0.5)})`)}
                />
            </g>

            {isVarices && (() => {
                const len = getParsedPathLength(segment.parsedPath);
                const stepsCount = Math.max(3, Math.floor(len / 25));
                const fractions = Array.from({ length: stepsCount }, (_, i) => (i + 1) / (stepsCount + 1));
                const points = getPointsAlongParsedPath(segment.parsedPath, fractions);
                return (
                    <g className="pointer-events-none">
                        {points.map((pt, i) => (
                            <g key={`varice-${i}`} transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.angle - 90}) scale(${isMobile ? 1.4 : 1.8})`} filter={`drop-shadow(0 2px 4px rgba(0,0,0,0.6))`}>
                                <svg x="-12" y="-12" width="24" height="24" overflow="visible">
                                    <IconVarices style={{ color: THEME.red }} />
                                </svg>
                            </g>
                        ))}
                    </g>
                );
            })()}

            {(() => {
                if (allSelectedTools.length === 0) return null;

                if (segment.isPerforator) {
                    // MANTENER LA LÓGICA ANTIGUA EXACTA PARA PERFORANTES
                    return (
                        <g>
                            {allSelectedTools.map((fId, idx) => {
                                const ToolIcon = TOOLS_MAP[fId]?.icon;
                                if (!ToolIcon) return null;

                                let offsetX = -80 + (idx * 38);
                                let offsetY = -28;
                                let isUlcer = fId === 'perf_ulcer';
                                if (isUlcer) { offsetX = -80; offsetY = 0; }

                                let boxSize = isUlcer ? 44 : 30;
                                let boxOffset = -boxSize / 2;
                                let iconSize = isUlcer ? 36 : 24;
                                let iconOffset = -iconSize / 2;
                                return (
                                    <g key={`perf-${fId}`} transform={`translate(${segment.focalPoint.x + offsetX}, ${segment.focalPoint.y + offsetY})`} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
                                        <rect x={boxOffset} y={boxOffset} width={boxSize} height={boxSize} rx="8" fill={THEME.bgApp} stroke={TOOLS_MAP[fId].hex || THEME.cyan} strokeWidth="1.5" opacity="0.9" />
                                        <svg x={iconOffset} y={iconOffset} width={iconSize} height={iconSize} overflow="visible">
                                            <ToolIcon style={{ color: TOOLS_MAP[fId].hex || THEME.cyan }} />
                                        </svg>
                                    </g>
                                );
                            })}
                        </g>
                    );
                }

                // NUEVA LÓGICA PARA ARTERIAS Y VENAS NORMALES: Iconos repetidos y apilados sobre el trayecto
                return (
                    <g>
                        {(() => {
                            const len = getParsedPathLength(segment.parsedPath);
                            const baseSpacing = 70; // Límite estricto para garantizar tamaño 30x30
                            let slots = Math.max(1, Math.min(4, Math.floor(len / baseSpacing)));
                            
                            // Ya no truncamos; dibujaremos todas las herramientas seleccionadas
                            const toolsToDraw = allSelectedTools;

                            const M = slots; // Para la distribución longitudinal usamos 'slots'
                            let scale = 1;
                            const baseScale = isMobile ? 0.9 : 1.1;
                            const finalScale = scale * baseScale;

                            return toolsToDraw.map((fId, idx) => {
                                const ToolIcon = TOOLS_MAP[fId]?.icon;
                                if (!ToolIcon) return null;

                                const slotIndex = idx % slots;
                                const layerIndex = Math.floor(idx / slots);

                                // Distribuir de manera equidistante a lo largo de los 'slots'
                                const fraction = (slotIndex + 0.5) / M;
                                const pts = getPointsAlongParsedPath(segment.parsedPath, [fraction]);
                                if (pts.length === 0) return null;
                                const pt = pts[0];

                                let offsetX = 0;
                                let offsetY = 0;
                                if (layerIndex > 0) {
                                    // layer 1 = derecha, layer 2 = izquierda, layer 3 = más a la derecha...
                                    const direction = (layerIndex % 2 !== 0) ? 1 : -1;
                                    const steps = Math.ceil(layerIndex / 2);
                                    const lateralSpacing = 42; // Ancho del recuadro (30) + 12px de margen para evitar que se vean pegados al reducir el mapa
                                    const offsetDist = direction * steps * lateralSpacing;
                                    
                                    // Desplazamiento perpendicular al trayecto (pt.angle + 90 grados)
                                    const perpAngleRad = (pt.angle + 90) * (Math.PI / 180);
                                    offsetX = offsetDist * Math.cos(perpAngleRad);
                                    offsetY = offsetDist * Math.sin(perpAngleRad);
                                }

                                const finalX = pt.x + offsetX;
                                const finalY = pt.y + offsetY;

                                const iconSize = 24;
                                const boxSize = 30;
                                const boxOffset = -boxSize / 2;
                                const iconOffset = -iconSize / 2;

                                return (
                                    <g key={`icon-${fId}-${idx}`} transform={`translate(${finalX}, ${finalY}) scale(${finalScale})`} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
                                        <rect x={boxOffset} y={boxOffset} width={boxSize} height={boxSize} rx="8" fill={THEME.bgApp} stroke={baseIconColor} strokeWidth="1.5" opacity="0.9" />
                                        <svg x={iconOffset} y={iconOffset} width={iconSize} height={iconSize} overflow="visible">
                                            <ToolIcon style={{ color: baseIconColor }} />
                                        </svg>
                                    </g>
                                );
                            });
                        })()}
                    </g>
                );
            })()}
        </g>
    );
}, (prev, next) => prev.sState === next.sState && prev.isMobile === next.isMobile && prev.cartography === next.cartography && prev.leg === next.leg);


const MapCanvas = ({ state, actions }) => {
    const { activeSystem, cartography, leg, activeElement, currentSegments, activeSegmentDetails, isLeftHanded, thumbOffset, arteryStates, isMobile, isEditingGrid, hoveredElementId, isGeneratingReport } = state;
    const { handleSegmentClick, switchSystem, switchCartography, setLeg, generateAIReport, setIsEditingGrid, setIsLeftHanded, setThumbOffset, handleToolSwap, setIsRightSidebarOpen, setHoveredElementId } = actions;
    const [showSettings, setShowSettings] = useState(false);
    const isPainting = useRef(false);
    const lastPaintedSegment = useRef(null);
    const dragStartSegment = useRef(null);
    const hasDragged = useRef(false);
    const dragPayload = useRef(null);

    const handleSegmentClickRef = useRef(handleSegmentClick);
    useEffect(() => { handleSegmentClickRef.current = handleSegmentClick; }, [handleSegmentClick]);

    const clearActiveToolsRef = useRef(actions.clearActiveTools);
    useEffect(() => { clearActiveToolsRef.current = actions.clearActiveTools; }, [actions.clearActiveTools]);

    useEffect(() => {
        const handleGlobalUp = () => {
            if (isPainting.current && !hasDragged.current && dragStartSegment.current) {
                // Clic puro sin arrastre: aplicar toggle normal
                handleSegmentClickRef.current(dragStartSegment.current, false);
            }
            if (isPainting.current && hasDragged.current) {
                // Deseleccionar herramienta tras usar la brocha
                if (clearActiveToolsRef.current) clearActiveToolsRef.current();
            }
            isPainting.current = false;
            lastPaintedSegment.current = null;
            dragStartSegment.current = null;
            hasDragged.current = false;
            dragPayload.current = null;
        };
        window.addEventListener('mouseup', handleGlobalUp);
        window.addEventListener('touchend', handleGlobalUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, []);

    const handlePointerMove = (clientX, clientY) => {
        if (!isPainting.current) return;
        const target = document.elementFromPoint(clientX, clientY);
        if (target && target.dataset && target.dataset.segmentId) {
            const sid = target.dataset.segmentId;
            if (sid !== lastPaintedSegment.current) {
                if (!hasDragged.current) {
                    hasDragged.current = true;
                    // Al iniciar el arrastre, aseguramos que el primer segmento se pinte
                    if (dragStartSegment.current !== sid) {
                        handleSegmentClickRef.current(dragStartSegment.current, true, dragPayload.current);
                    }
                }
                lastPaintedSegment.current = sid;
                handleSegmentClickRef.current(sid, true, dragPayload.current);
            }
        }
    };

    const activeIdentityColor = leg === 'DERECHA' ? THEME.cyan : THEME.orange;



    const getArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);
    const activeSegmentState = activeSegmentDetails ? (arteryStates[activeSegmentDetails.id] || {}) : {};
    const activeInterventions = activeSegmentState.interventions || [];
    const dynamicFindings = [];
    if (activeSegmentState.color && activeSegmentState.color !== 'unmapped' && TOOLS_MAP[activeSegmentState.color]) {
        dynamicFindings.push(TOOLS_MAP[activeSegmentState.color]);
    }
    getArray(activeSegmentState.pared).forEach(p => { if (TOOLS_MAP[p]) dynamicFindings.push(TOOLS_MAP[p]) });
    getArray(activeSegmentState.focal).forEach(f => { if (TOOLS_MAP[f]) dynamicFindings.push(TOOLS_MAP[f]) });
    activeInterventions.forEach(inv => { if (TOOLS_MAP[inv]) dynamicFindings.push(TOOLS_MAP[inv]) });

    const getPaddedViewBox = () => {
        let x = 0;
        let y = cartography === 'PERF' ? -50 : (['SVP', 'USF', 'USP', 'LATERAL'].includes(cartography) ? 90 : 30);
        let w = 500;
        let h = cartography === 'PERF' ? 1180 : 1120;

        if (!isMobile) {
            const factor = 0.25; // Expande el viewBox 25%, lo que contrae el mapa visible un 20%
            const addW = w * factor;
            const addH = h * factor;
            x -= addW / 2;
            y -= addH * 0.8; // Asigna el 80% del margen extra arriba para empujar el dibujo hacia abajo y centrarlo visualmente
            w += addW;
            h += addH;
        }
        return `${x} ${y} ${w} ${h}`;
    };

    return (
        <main 
            className="flex-1 relative overflow-hidden flex flex-col min-w-0 touch-none overscroll-none select-none" 
            style={{ backgroundImage: `linear-gradient(to top, ${THEME.bgApp}F2 0%, ${THEME.bgApp}40 50%, ${THEME.bgApp}00 100%)` }}
            onMouseLeave={() => { 
                if (isPainting.current && !hasDragged.current && dragStartSegment.current) {
                    handleSegmentClickRef.current(dragStartSegment.current, false);
                }
                isPainting.current = false; 
                lastPaintedSegment.current = null; 
                dragStartSegment.current = null;
                hasDragged.current = false;
            }}
            onDragStart={(e) => e.preventDefault()}
            onMouseMove={(e) => {
                handlePointerMove(e.clientX, e.clientY);
            }}
            onTouchMove={(e) => {
                if (e.touches.length > 0) {
                    handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
                }
            }}
        >

            {/* CABECERA GLOBAL MINIMALISTA (CERO SCROLL, MÁXIMA ELEGANCIA) */}
            <div className="h-14 px-4 shrink-0 flex items-center justify-between z-20 relative w-full" style={{ backgroundColor: THEME.bgSidebar, borderBottom: `1px solid ${THEME.border}` }}>

                {/* HISTORIAL: MÁQUINA DEL TIEMPO */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner">
                    <button onClick={undoTimeMachine} disabled={!canUndo} className={`p-1.5 rounded-lg transition-all ${canUndo ? 'text-white hover:bg-white/10 active:scale-95' : 'text-white/20 cursor-not-allowed'}`} title="Deshacer">
                        <Undo2 size={16} />
                    </button>
                    <button onClick={redoTimeMachine} disabled={!canRedo} className={`p-1.5 rounded-lg transition-all ${canRedo ? 'text-white hover:bg-white/10 active:scale-95' : 'text-white/20 cursor-not-allowed'}`} title="Rehacer">
                        <Redo2 size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-4 md:gap-6 bg-[#1a1a1a] px-3 py-1.5 rounded-2xl border border-white/5 shadow-inner">



                    {/* TERRITORIO (Textos compactos minimalistas) */}
                    <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
                        {activeSystem === 'ARTERIAL' ? (
                            <>
                                <button onClick={() => switchCartography('PIERNA')} className={`px-4 py-2 rounded-lg text-[12px] md:text-[13px] font-black tracking-wide transition-all ${cartography === 'PIERNA' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>MMII</button>
                                <button onClick={() => switchCartography('CAROTIDA')} className={`px-4 py-2 rounded-lg text-[12px] md:text-[13px] font-black tracking-wide transition-all ${cartography === 'CAROTIDA' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>CARÓTIDA</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => switchCartography('SVP')} className={`px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] md:text-[12px] font-black tracking-wide transition-all ${cartography === 'SVP' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>SVP</button>
                                <button onClick={() => switchCartography('USF')} className={`px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] md:text-[12px] font-black tracking-wide transition-all ${cartography === 'USF' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>USF</button>
                                <button onClick={() => switchCartography('USP')} className={`px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] md:text-[12px] font-black tracking-wide transition-all ${cartography === 'USP' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>USP</button>
                                <button onClick={() => switchCartography('ANT')} className={`px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] md:text-[12px] font-black tracking-wide transition-all ${cartography === 'ANT' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>ANT</button>
                                <button onClick={() => switchCartography('LATERAL')} className={`px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] md:text-[12px] font-black tracking-wide transition-all ${cartography === 'LATERAL' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>LAT</button>
                                <button onClick={() => switchCartography('PERF')} className={`px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-[11px] md:text-[12px] font-black tracking-wide transition-all ${cartography === 'PERF' ? 'text-white bg-white/10 shadow-inner border border-white/20' : 'text-gray-500 hover:text-gray-300'}`}>PER</button>
                            </>
                        )}
                    </div>
                </div>

                <div className="w-[84px]"></div> {/* Espaciador para equilibrar el flex-between */}
            </div>

            {activeSegmentDetails && (
                <div className="absolute top-14 left-0 right-0 z-30 flex flex-col items-center pointer-events-none">
                    <div className="w-full py-2 flex justify-center items-center" style={{ 
                        background: `linear-gradient(90deg, transparent, ${activeIdentityColor}15 15%, ${activeIdentityColor}30 50%, ${activeIdentityColor}15 85%, transparent)`,
                        borderBottom: `1px solid ${activeIdentityColor}40`,
                        borderTop: `1px solid ${activeIdentityColor}20`,
                        backdropFilter: 'blur(6px)'
                    }}>
                        {(() => {
                            const hoveredElement = currentSegments.find(s => s.id === hoveredElementId);
                            const displayElement = hoveredElement || activeSegmentDetails;
                            return (
                                <span className="text-[14px] font-black tracking-[0.15em] uppercase text-white drop-shadow-md text-center text-balance break-words" style={{ textShadow: `0 0 8px ${activeIdentityColor}80` }}>
                                    {displayElement.acronym ? `[${displayElement.acronym}] ` : ''}{displayElement.name}
                                </span>
                            );
                        })()}
                    </div>

                </div>
            )}

            {/* CONTROLES FLOTANTES (MAP CANVAS) */}
            {cartography !== 'PERF' && (
            <div className={`absolute bottom-0 left-0 w-full h-14 z-40 flex items-center justify-evenly px-4 border-t shadow-[0_-10px_30px_rgba(0,0,0,0.5)] pointer-events-auto`} style={{ backgroundColor: THEME.bgSurface, borderColor: THEME.border }}>
                
                {/* 1. Ubicación */}
                {cartography !== 'PERF' && (
                <button 
                    onClick={() => {
                        if (activeSegmentDetails) {
                            let view = 'Medial';
                            if (activeSegmentDetails.isPerforator) {
                                const perfViewMap = {
                                    'perf_anteromedial_sup': 'Medial', 'perf_anteromedial_inf': 'Medial',
                                    'perf_post_sup': 'Posterior', 'perf_post_inf': 'Posterior',
                                    'perf_lat_sup': 'Lateral', 'perf_lat_inf': 'Lateral',
                                    'perf_fem_sup': 'Anterior', 'perf_fem_inf': 'Anterior',
                                    'perf_dod': 'Medial', 'perf_boyd': 'Medial', 'perf_mhm': 'Medial'
                                };
                                view = perfViewMap[activeSegmentDetails.id] || 'Medial';
                                actions.setLocationModalPerforatorId({ id: activeSegmentDetails.id, type: 'deep', view, name: activeSegmentDetails.name });
                            } else {
                                if (cartography === 'USF') view = 'Medial';
                                else if (cartography === 'USP') view = 'Posterior';
                                else if (cartography === 'LATERAL') view = 'Lateral';
                                else if (cartography === 'PIERNA') view = 'Anterior';
                                actions.setLocationModalPerforatorId({ id: activeSegmentDetails.id, type: 'vein', view, name: activeSegmentDetails.name });
                            }
                        }
                    }}
                    className={`w-10 h-10 flex items-center justify-center p-0 rounded-md transition-all active:scale-95 ${activeSegmentDetails ? 'cursor-pointer hover:bg-white/5' : 'opacity-50 cursor-not-allowed'}`}
                    title="Diagrama de Ubicación"
                    disabled={!activeSegmentDetails}
                >
                    <MapPin size={20} className={activeSegmentDetails ? 'text-orange-400' : 'text-gray-500'} />
                </button>
                )}

                {/* 2. Leyenda */}
                <button onClick={() => { actions.setLegendSystem(activeSystem); actions.setIsLegendModalOpen(true); }} className="w-10 h-10 flex items-center justify-center p-0 rounded-md transition-all hover:bg-white/5 active:scale-95" title="Leyenda de Herramientas">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#9CA3AF" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#EF4444" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#06B6D4" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#EAB308" />
                    </svg>
                </button>

                {/* 3. Panel de Hallazgos */}
                <button onClick={() => setIsRightSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center p-0 rounded-md transition-all hover:bg-white/5 active:scale-95" title="Panel de Hallazgos">
                    <Menu size={20} className="text-cyan-400" />
                </button>

                {/* 4. Gemini AI Reporte */}
                <button onClick={generateAIReport} disabled={isGeneratingReport} className={`w-10 h-10 flex items-center justify-center p-0 rounded-md transition-all hover:bg-white/5 active:scale-95 ${isGeneratingReport ? 'opacity-50' : ''}`} title="Generar Informe Clínico">
                    {isGeneratingReport ? <div className="animate-spin w-5 h-5 border-2 border-t-transparent rounded-full" style={{ borderColor: THEME.textMuted, borderTopColor: 'transparent' }} /> : <Sparkles className="w-5 h-5 text-cyan-400" />}
                </button>

                {/* 5. Ir a Historia */}
                <button 
                    onClick={() => {
                        const root = document.getElementById('doppler-app-root');
                        if (root) {
                            root.style.display = 'none';
                            window.scrollTo(0, 0);
                        } else {
                            window.history.back();
                        }
                    }}
                    className="w-10 h-10 flex items-center justify-center p-0 rounded-md transition-all hover:bg-white/5 active:scale-95 text-gray-400"
                    title="Ir a Historia"
                >
                    <ArrowLeftFromLine size={20} />
                </button>

            </div>
            )}

            <div className="relative flex-1 w-full overflow-hidden">
                {!isMobile && (
                    <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-5 z-0 overflow-hidden">
                        <div
                            className="font-black uppercase tracking-[0.25em] select-none transition-all duration-700 ease-out flex items-center gap-2"
                            style={{ writingMode: 'vertical-rl', color: THEME.cyan, opacity: leg === 'DERECHA' ? 1 : 0, transform: leg === 'DERECHA' ? 'rotate(180deg) translateY(0)' : 'rotate(180deg) translateY(20px)' }}
                        >
                            <span style={{ fontSize: '72px', opacity: 0.08 }}>DERECHA</span>
                        </div>
                        <div
                            className="font-black uppercase tracking-[0.25em] select-none transition-all duration-700 ease-out flex items-center gap-2"
                            style={{ writingMode: 'vertical-rl', color: THEME.orange, opacity: leg === 'IZQUIERDA' ? 1 : 0, transform: leg === 'IZQUIERDA' ? 'rotate(180deg) translateY(0)' : 'rotate(180deg) translateY(20px)' }}
                        >
                            <span style={{ fontSize: '72px', opacity: 0.08 }}>IZQUIERDA</span>
                        </div>
                    </div>
                )}

                <svg 
                    viewBox={getPaddedViewBox()} 
                    className={`absolute inset-0 w-full h-full block z-10 ${freeVaricesMode ? 'cursor-crosshair' : ''}`} 
                    preserveAspectRatio={isMobile ? "xMidYMax meet" : "xMidYMid meet"}
                    onClick={(e) => {
                        if (freeVaricesMode) {
                            const svg = e.currentTarget;
                            const pt = svg.createSVGPoint();
                            pt.x = e.clientX;
                            pt.y = e.clientY;
                            const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
                            setPendingFreeVarice({ x: loc.x, y: loc.y, leg: leg });
                        }
                    }}
                >
                <g transform={isLeftHanded ? "translate(500, 0) scale(-1, 1)" : ""}>
                    {/* LÍNEAS DE CONEXIÓN */}
                    {currentSegments.map(segment => {
                        if (segment.hideNode) return null;
                        const mirrorX = (x) => leg === 'IZQUIERDA' ? 500 - x : x;
                        const focalX = mirrorX(segment.focalPoint.x);
                        const focalY = segment.focalPoint.y;
                        const mobileMargin = 100; // Shorter lines on mobile
                        const desktopMargin = 80;
                        const margin = isMobile ? mobileMargin : desktopMargin;
                        let baseCircleX;
                        if (segment.align === 'center') baseCircleX = 250;
                        else if (segment.align === 'perforator') baseCircleX = segment.focalPoint.x;
                        else if (segment.align === 'innerLeft') baseCircleX = 130;
                        else if (segment.align === 'innerRight') baseCircleX = 370;
                        else baseCircleX = segment.align === 'right' ? (500 - margin) + (segment.offsetX || 0) : margin - (segment.offsetX || 0);
                        const circleX = mirrorX(baseCircleX);
                        const circleY = segment.focalPoint.y + (segment.offsetY || 0);
                        if (focalX === circleX && focalY === circleY) return null;
                        return (
                            <g key={`line-${segment.id}`} className="pointer-events-none">
                                <line x1={focalX} y1={focalY} x2={circleX} y2={circleY} stroke={THEME.textMuted} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                                <circle cx={focalX} cy={focalY} r="2.5" fill={THEME.textMuted} opacity="0.6" />
                            </g>
                        );
                    })}
                    {/* LÍNEAS DIVISORIAS ANATÓMICAS (Interactivas) */}
                    {cartography !== 'PERF' && (
                        <g className="pointer-events-auto">
                            {(() => {
                                let lines = [];
                                if (cartography === 'USF') {
                                    lines = [
                                        { id: 'line_mid_thigh', y: 350, label: 'Mitad del Muslo' },
                                        { id: 'line_above_knee', y: 550, label: 'Línea Suprarrotuliana' },
                                        { id: 'line_below_knee', y: 650, label: 'Línea Infrarrotuliana' },
                                        { id: 'line_mid_leg', y: 850, label: 'Mitad de la Pierna' }
                                    ];
                                } else if (cartography === 'USP') {
                                    lines = [
                                        { id: 'line_supracondilea', y: 250, label: 'Línea Supracondílea' },
                                        { id: 'line_infracondilea', y: 390, label: 'Línea Infracondílea' },
                                        { id: 'line_mid_leg', y: 720, label: 'Mitad de la Pierna' }
                                    ];
                                } else if (cartography === 'ANT') {
                                    lines = [
                                        { id: 'line_mid_thigh', y: 350, label: 'Mitad del Muslo' },
                                        { id: 'line_above_knee', y: 550, label: 'Línea Suprarrotuliana' },
                                        { id: 'line_below_knee', y: 650, label: 'Línea Infrarrotuliana' },
                                        { id: 'line_mid_leg', y: 850, label: 'Mitad de la Pierna' }
                                    ];
                                } else if (cartography === 'SVP') {
                                    lines = [
                                        { id: 'line_mid_thigh', y: 370, label: 'Mitad del Muslo' },
                                        { id: 'line_supracondilea', y: 602, label: 'Línea Supracondílea' },
                                        { id: 'line_infracondilea', y: 676, label: 'Línea Infracondílea' },
                                        { id: 'line_mid_leg', y: 922, label: 'Mitad de la Pierna' }
                                    ];
                                } else if (cartography === 'LATERAL') {
                                    lines = [
                                        { id: 'line_supracondilea', y: 380, label: 'Línea Supracondílea' },
                                        { id: 'line_infracondilea', y: 520, label: 'Línea Infracondílea' }
                                    ];
                                }
                                return lines.map(line => {
                                    const isHovered = hoveredElementId === line.id;
                                    return (
                                        <g key={line.id} 
                                            onMouseEnter={() => setHoveredElementId(line.id)}
                                            onMouseLeave={() => setHoveredElementId(null)}
                                            onClick={() => setHoveredElementId(isHovered ? null : line.id)}
                                            className="cursor-pointer"
                                        >
                                            {/* Línea Base */}
                                            <line x1="12" y1={line.y} x2="488" y2={line.y} stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" strokeLinecap="round" opacity="0.25" className="pointer-events-none" />
                                            
                                            {/* Puntos de Interacción a ambos lados */}
                                            <circle cx="12" cy={line.y} r={isHovered ? 8 : 4} fill="#FFFFFF" opacity={isHovered ? 1 : 0.6} className="transition-all duration-200 pointer-events-none" />
                                            <circle cx="488" cy={line.y} r={isHovered ? 8 : 4} fill="#FFFFFF" opacity={isHovered ? 1 : 0.6} className="transition-all duration-200 pointer-events-none" />
                                            
                                            {/* Leyenda Oculta / Desplegable */}
                                            <text 
                                                x={isLeftHanded ? 472 : 28} 
                                                y={line.y + 3} 
                                                textAnchor={isLeftHanded ? 'end' : 'start'}
                                                fill="#FFFFFF" 
                                                fontSize="10" 
                                                fontWeight="bold" 
                                                transform={isLeftHanded ? "scale(-1, 1) translate(-500, 0)" : ""}
                                                className={`tracking-widest uppercase transition-all duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                                style={{ textShadow: '0px 0px 4px rgba(0,0,0,1), 0px 0px 8px rgba(0,0,0,0.8)' }}
                                            >
                                                {line.label}
                                            </text>
                                            
                                            {/* Área de impacto ampliada */}
                                            <rect x="0" y={line.y - 15} width="60" height="30" fill="transparent" />
                                        </g>
                                    );
                                });
                            })()}
                        </g>
                    )}

                    <g transform={leg === 'IZQUIERDA' ? "translate(500, 0) scale(-1, 1)" : ""}>
                        {cartography === 'USF' && <path d="M 215 30 L 215 160" fill="none" stroke={THEME.blue} strokeWidth="26" strokeOpacity="0.15" strokeLinecap="round" className="pointer-events-none" />}
                        {cartography === 'USP' && <path d="M 215 150 L 215 350" fill="none" stroke={THEME.blue} strokeWidth="26" strokeOpacity="0.15" strokeLinecap="round" className="pointer-events-none" />}

                        {/* BASE ANATÓMICA FANTASMA */}
                        <g opacity="0.6" className="pointer-events-none">
                            {currentSegments.map(segment => (
                                <path key={`base-${segment.id}`} d={segment.path} fill="none" stroke={segment.defaultColor || (segment.isPerforator ? (segment.level === 'above' ? THEME.perfAboveKnee : THEME.perfBelowKnee) : (segment.altBase ? THEME.unmappedAlt : THEME.unmapped))} strokeWidth={isMobile ? (segment.type === 'macro' ? 21.6 : (segment.type === 'branch' ? 18 : 14.4)) : (segment.type === 'macro' ? 36 : (segment.type === 'branch' ? 30 : 24))} strokeLinecap={(segment.type === 'macro' && segment.id !== 'sfj' && segment.id !== 'usp' && segment.id !== 'vsm_pierna_dist' && segment.id !== 'vsp_dist' && segment.id !== 'vfc' && segment.id !== 'v_circunfleja') ? 'butt' : 'round'} />
                            ))}
                            {currentSegments.map(segment => {
                                if (segment.collateralPath) {
                                    return <path key={`col-${segment.id}`} d={segment.collateralPath} fill="none" stroke={THEME.unmapped} strokeWidth={isMobile ? 18 : 24} strokeLinecap="round" />;
                                }
                                return null;
                            })}
                        </g>

                        {activeSegmentDetails && currentSegments.some(s => s.id === activeSegmentDetails.id) && <path d={activeSegmentDetails.path} fill="none" stroke="#FFFFFF" strokeWidth={32} strokeOpacity="0.1" strokeLinecap="round" className="pointer-events-none" />}

                        {/* RENDERIZADO MATEMÁTICO AISLADO Y MEMOIZADO PARA RENDIMIENTO EXTREMO */}
                        {currentSegments.filter(s => !s.isGhost).map(segment => (
                            <SegmentLayer key={`render-${segment.id}`} segment={segment} sState={arteryStates[segment.id]} isMobile={isMobile} cartography={cartography} leg={leg} setGlobalArteryStates={actions.setGlobalArteryStates} />
                        ))}

                        {/* RENDERIZADO GLOBAL DE VÁRICES LIBRES */}
                        {(arteryStates.GLOBAL?.free_varices || []).map(v => (
                            <g key={v.id} className="pointer-events-auto cursor-pointer group" onClick={(e) => {
                                e.stopPropagation();
                                actions.setGlobalArteryStates(prev => {
                                    const legState = prev[leg] || {};
                                    const globalData = legState.GLOBAL || {};
                                    return { ...prev, [leg]: { ...legState, GLOBAL: { ...globalData, free_varices: (globalData.free_varices || []).filter(item => item.id !== v.id) } } };
                                });
                            }}>
                                <circle cx={v.x} cy={v.y} r="18" fill="transparent" />
                                <circle cx={v.x} cy={v.y} r="6" fill={THEME.orange} filter="drop-shadow(0 0 4px rgba(249,115,22,0.8))" />
                                <path d={`M ${v.x - 4} ${v.y - 4} Q ${v.x - 10} ${v.y - 10} ${v.x - 5} ${v.y - 15} T ${v.x} ${v.y - 20}`} fill="none" stroke={THEME.orange} strokeWidth="2.5" strokeLinecap="round" />
                                <path d={`M ${v.x + 4} ${v.y + 4} Q ${v.x + 10} ${v.y + 10} ${v.x + 5} ${v.y + 15} T ${v.x} ${v.y + 20}`} fill="none" stroke={THEME.orange} strokeWidth="2.5" strokeLinecap="round" />
                                
                                {/* Label On Hover */}
                                <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <rect x={v.x - 40} y={v.y - 40} width="80" height="16" rx="4" fill="rgba(0,0,0,0.8)" />
                                    <text x={v.x} y={v.y - 32} fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">{v.location}</text>
                                    <rect x={v.x - 12} y={v.y + 10} width="24" height="12" rx="2" fill="red" />
                                    <text x={v.x} y={v.y + 18} fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">DEL</text>
                                </g>
                            </g>
                        ))}

                        {/* RENDERIZADO GLOBAL DE BYPASSES */}
                        {(arteryStates.GLOBAL?.bypasses || []).map(bp => {
                            const fromSeg = currentSegments.find(s => s.id === bp.from);
                            const toSeg = currentSegments.find(s => s.id === bp.to);
                            if (!fromSeg || !toSeg) return null;

                            const p1 = fromSeg.focalPoint;
                            const p2 = toSeg.focalPoint;
                            
                            // Calculate curve bulging to the left (lateral aspect)
                            const midX = (p1.x + p2.x) / 2;
                            const midY = (p1.y + p2.y) / 2;
                            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                            const controlX = Math.min(p1.x, p2.x) - (dist * 0.35);
                            const controlY = midY;

                            return (
                                <g key={bp.id} className="pointer-events-auto cursor-pointer group" onClick={(e) => {
                                    e.stopPropagation();
                                    actions.setGlobalArteryStates(prev => {
                                        const legState = prev[leg] || {};
                                        const globalData = legState.GLOBAL || {};
                                        return { ...prev, [leg]: { ...legState, GLOBAL: { ...globalData, bypasses: (globalData.bypasses || []).filter(b => b.id !== bp.id) } } };
                                    });
                                }}>
                                    {/* Hit area amplia y garantizada */}
                                    <path d={`M ${p1.x} ${p1.y} Q ${controlX} ${controlY} ${p2.x} ${p2.y}`} fill="none" stroke="rgba(0,0,0,0)" strokeWidth="40" pointerEvents="stroke" />
                                    {/* Visual Curve con efecto hover */}
                                    <path d={`M ${p1.x} ${p1.y} Q ${controlX} ${controlY} ${p2.x} ${p2.y}`} fill="none" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="8 6" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))" className="group-hover:stroke-red-500 transition-colors" />
                                    {/* Stitches */}
                                    <g transform={`translate(${p1.x}, ${p1.y})`}>
                                        <line x1="-8" y1="-8" x2="8" y2="8" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
                                        <line x1="-8" y1="8" x2="8" y2="-8" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
                                    </g>
                                    <g transform={`translate(${p2.x}, ${p2.y})`}>
                                        <line x1="-8" y1="-8" x2="8" y2="8" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
                                        <line x1="-8" y1="8" x2="8" y2="-8" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
                                    </g>
                                </g>
                            );
                        })}
                    </g>

                    {/* HIT AREAS INVISIBLES PARA LOS SEGMENTOS (Permite hacer clic en la "tripa" del vaso) */}
                    <g className="pointer-events-auto">
                        {currentSegments.filter(s => !s.isGhost).map(segment => (
                            <path 
                                key={`hitarea-${segment.id}`} 
                                d={segment.path} 
                                fill="none" 
                                stroke="rgba(0,0,0,0)" 
                                strokeWidth={isMobile ? 44 : 44} 
                                strokeLinecap="round" 
                                pointerEvents="stroke"
                                className="cursor-pointer"
                                data-segment-id={segment.id}
                                onPointerDown={(e) => {
                                    if (e.target.hasPointerCapture(e.pointerId)) {
                                        e.target.releasePointerCapture(e.pointerId);
                                    }
                                    isPainting.current = true;
                                    dragStartSegment.current = segment.id;
                                    lastPaintedSegment.current = segment.id;
                                    hasDragged.current = false;
                                    
                                    const sState = arteryStates[segment.id] || {};
                                    if (sState.color || (sState.pared && sState.pared.length) || (sState.focal && sState.focal.length) || (sState.interventions && sState.interventions.length)) {
                                        dragPayload.current = sState;
                                    } else {
                                        dragPayload.current = null;
                                    }
                                }}
                            />
                        ))}
                    </g>

                    {/* LÍNEAS CONECTORAS (DIBUJADAS PRIMERO PARA QUE QUEDEN DETRÁS DE TODAS LAS ETIQUETAS) */}
                    <g className="pointer-events-none">
                        {currentSegments.map(segment => {
                            if (segment.isGhost || segment.isPerforator) return null;
                            const mirrorX = (x) => leg === 'IZQUIERDA' ? 500 - x : x;
                            const margin = isMobile ? 100 : 80;
                            let baseCircleX;
                            if (segment.align === 'center') baseCircleX = 250;
                            else if (segment.align === 'perforator') baseCircleX = segment.focalPoint.x;
                            else if (segment.align === 'innerLeft') baseCircleX = 130;
                            else if (segment.align === 'innerRight') baseCircleX = 370;
                            else baseCircleX = segment.align === 'right' ? (500 - margin) + (segment.offsetX || 0) : margin - (segment.offsetX || 0);
                            const circleX = mirrorX(baseCircleX);
                            const circleY = segment.focalPoint.y + (segment.offsetY || 0);
                            const connectingLinePath = `M ${circleX} ${circleY} L ${segment.focalPoint.x} ${segment.focalPoint.y}`;
                            
                            return (
                                <g key={`conn-${segment.id}`}>
                                    <path d={connectingLinePath} fill="none" stroke={THEME.border} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                                    <circle cx={segment.focalPoint.x} cy={segment.focalPoint.y} r="3" fill={THEME.border} />
                                </g>
                            );
                        })}
                    </g>

                    {/* NODOS DE INTERACCIÓN (HITNODES) */}
                    {currentSegments.map(segment => {
                        if (segment.hideNode) return null;
                        const isSelected = activeElement?.id === segment.id;
                        const isHovered = hoveredElementId === segment.id;
                        let ghostStyle = { isMapped: false, colorHex: THEME.border };
                        if (segment.isGhost && cartography === 'PERF') {
                            const baseId = segment.id.replace('ghost_sup_', '').replace('ghost_deep_', '');
                            if (segment.id.startsWith('ghost_deep_')) {
                                const view = PERFORATOR_VIEWS[baseId];
                                if (view) ghostStyle = { isMapped: true, colorHex: VIEW_COLORS[view] };
                            } else if (segment.id.startsWith('ghost_sup_')) {
                                const system = SUPERFICIAL_SYSTEMS[baseId];
                                if (system) ghostStyle = { isMapped: true, colorHex: SUPERFICIAL_COLORS[system] };
                            }
                        }
                        const style = segment.isGhost ? ghostStyle : calculateSegmentStyle(segment, arteryStates[segment.id], isMobile);
                        const labelLines = segment.label.split('\n');

                        const mirrorX = (x) => leg === 'IZQUIERDA' ? 500 - x : x;
                        const mobileMargin = 100; // Match the margin used for lines
                        const desktopMargin = 80;
                        const margin = isMobile ? mobileMargin : desktopMargin;
                        let baseCircleX;
                        if (segment.align === 'center') baseCircleX = 250;
                        else if (segment.align === 'perforator') baseCircleX = segment.focalPoint.x;
                        else if (segment.align === 'innerLeft') baseCircleX = 130;
                        else if (segment.align === 'innerRight') baseCircleX = 370;
                        else baseCircleX = segment.align === 'right' ? (500 - margin) + (segment.offsetX || 0) : margin - (segment.offsetX || 0);
                        const circleX = mirrorX(baseCircleX);
                        const circleY = segment.focalPoint.y + (segment.offsetY || 0);
                        const circleRadius = isMobile ? 26 : (segment.customRadius ? segment.customRadius * 1.2 : 31);

                        const isCenter = segment.align === 'center';
                        const isInnerLeft = segment.align === 'innerLeft';
                        const isInnerRight = segment.align === 'innerRight';
                        const isRightSideVisually = circleX > 250 || isCenter || isInnerRight;
                        
                        let textX;
                        if (isInnerLeft) textX = circleX + circleRadius + (isMobile ? 2 : 8);
                        else if (isInnerRight) textX = circleX - circleRadius - (isMobile ? 2 : 8);
                        else if (isCenter) textX = circleX + circleRadius + (isMobile ? 2 : 8);
                        else textX = isRightSideVisually ? circleX + circleRadius + (isMobile ? 2 : 8) : circleX - circleRadius - (isMobile ? 2 : 8);
                        
                        let textAnchor;
                        if (isInnerLeft) textAnchor = isLeftHanded ? 'end' : 'start';
                        else if (isInnerRight) textAnchor = isLeftHanded ? 'start' : 'end';
                        else if (isCenter) textAnchor = isLeftHanded ? 'end' : 'start';
                        else textAnchor = isLeftHanded ? (isRightSideVisually ? 'end' : 'start') : (isRightSideVisually ? 'start' : 'end');

                        const allLines = labelLines.map(t => ({ text: t, isTitle: true }));
                        const startY = circleY - ((allLines.length - 1) * (isMobile ? 12 : 14)) / 2;

                        return (
                            <g key={`hitnode-${segment.id}`} style={{ pointerEvents: 'auto' }}>
                                <g transform={isLeftHanded ? `translate(${circleX * 2}, 0) scale(-1, 1)` : ""}>
                                    <g className={segment.isGhost ? "cursor-pointer" : "cursor-pointer transition-all duration-200"} 
                                       style={{ transformOrigin: `${circleX}px ${circleY}px`, transform: isSelected ? 'scale(1.05)' : (isHovered ? 'scale(1.02)' : 'scale(1)'), opacity: segment.isGhost ? 0.6 : 1 }} 
                                        data-segment-id={segment.id}
                                       onPointerDown={(e) => {
                                            if (e.target.hasPointerCapture(e.pointerId)) {
                                                e.target.releasePointerCapture(e.pointerId);
                                            }
                                            isPainting.current = true;
                                            dragStartSegment.current = segment.id;
                                            lastPaintedSegment.current = segment.id;
                                            hasDragged.current = false;
                                            
                                            const sState = arteryStates[segment.id] || {};
                                            if (sState.color || (sState.pared && sState.pared.length) || (sState.focal && sState.focal.length) || (sState.interventions && sState.interventions.length)) {
                                                dragPayload.current = sState;
                                            } else {
                                                dragPayload.current = null;
                                            }
                                       }}
                                       onMouseEnter={() => setHoveredElementId(segment.id)}
                                       onMouseLeave={() => setHoveredElementId(null)}
                                    >

                                        {/* Atrapadedos ajustado para evitar colisiones (Mínimo HIG Apple es 44px diámetro -> r=22) */}
                                        <circle cx={circleX} cy={circleY} r={Math.max(22, circleRadius)} fill="transparent" data-segment-id={segment.id} />

                                        <circle cx={circleX} cy={circleY} r={circleRadius} fill={THEME.bgSurface} stroke={style.isMapped ? style.colorHex : (isSelected ? (segment.isPerforator ? THEME.yellow : activeIdentityColor) : THEME.border)} strokeWidth={isSelected ? 4.5 : (segment.isPerforator ? 2.5 : 3)} strokeDasharray={segment.isPerforator ? "6 4" : undefined} filter={isSelected ? `drop-shadow(0 0 8px ${hexToRgba(style.isMapped ? style.colorHex : (segment.isPerforator ? THEME.yellow : activeIdentityColor), 0.5)})` : ''} />
                                        {style.isMapped && <circle cx={circleX} cy={circleY} r={circleRadius - 3} fill={style.colorHex} opacity="0.1" className="pointer-events-none" />}

                                        {(() => {
                                            const textToRender = segment.acronym || segment.label;
                                            if (!textToRender) return null;
                                            const lines = textToRender.split('\n');
                                            const lineSpacing = isMobile ? 12 : 15;
                                            const textStartY = circleY - ((lines.length - 1) * lineSpacing) / 2;
                                            return lines.map((lineText, i) => (
                                                <g key={`text-group-${i}`}>
                                                    <text x={circleX} y={textStartY + i * lineSpacing} textAnchor="middle" dominantBaseline="central" fontSize={isMobile ? "11" : "14"} fontWeight="bold" fill={style.isMapped ? THEME.textMain : THEME.textMuted} className="pointer-events-none">
                                                        {lineText}
                                                    </text>
                                                    {i === 0 && segment.faceTarget && (
                                                        <g className="pointer-events-none">
                                                            <rect x={(circleX + circleRadius * 0.7) - 6.5} y={(circleY - circleRadius * 0.7) - 6.5} width="13" height="13" rx="2.5" fill={THEME.bgSurface} stroke={THEME.border} strokeWidth="1.2" />
                                                            <text x={circleX + circleRadius * 0.7} y={circleY - circleRadius * 0.7 + 0.5} textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="bold" fill={THEME.textMuted}>
                                                                {segment.faceTarget.charAt(0).toUpperCase()}
                                                            </text>
                                                        </g>
                                                    )}
                                                </g>
                                            ));
                                        })()}

                                        {segment.frequency > 0 && (
                                            <g className="pointer-events-none">
                                                {Array.from({ length: segment.frequency }).map((_, i) => {
                                                    const spacing = 12;
                                                    const startY = circleY - ((segment.frequency - 1) * spacing) / 2;
                                                    const xPos = circleX + circleRadius + (isMobile ? 12 : 16);
                                                    return (
                                                        <text key={i} x={xPos} y={startY + i * spacing} textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="bold" fill="#ffffff" opacity="0.4">
                                                            +
                                                        </text>
                                                    );
                                                })}
                                            </g>
                                        )}

                                        {segment.ulcerDots > 0 && (
                                            <g className="pointer-events-none">
                                                {Array.from({ length: segment.ulcerDots }).map((_, i) => {
                                                    const spacing = 10;
                                                    const startY = circleY - ((segment.ulcerDots - 1) * spacing) / 2;
                                                    const xPos = circleX + circleRadius + (isMobile ? 22 : 28);
                                                    return (
                                                        <text key={`dot-${i}`} x={xPos} y={startY + i * spacing - 2} textAnchor="middle" dominantBaseline="central" fontSize="26" fontWeight="bold" fill="#ef4444" opacity="0.9">
                                                            •
                                                        </text>
                                                    );
                                                })}
                                            </g>
                                        )}

                                        {(() => {
                                            const state = arteryStates[segment.id] || {};
                                            const hasMetrics = state.psv || state.edv || state.at || state.diameter || state.reflux || state.length || state.height;
                                            if (!hasMetrics) return null;

                                            const dist = circleRadius + (isMobile ? 18 : 22);
                                            const badgeX = circleX + (isRightSideVisually ? -dist : dist); // Lado interior
                                            const badgeY = circleY; // Perfectamente alineado verticalmente

                                            return (
                                                <g 
                                                    className="pointer-events-auto cursor-pointer" 
                                                    transform={`translate(${badgeX}, ${badgeY})`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        actions.setActiveElement({ type: 'segment', id: segment.id });
                                                        actions.setIsRightSidebarOpen(true);
                                                    }}
                                                >
                                                    {/* Atrapadedos invisible de 44px (Estándar Apple HIG) */}
                                                    <circle cx="0" cy="0" r="22" fill="transparent" />
                                                    <circle cx="0" cy="0" r="11" fill={THEME.bgApp} stroke={THEME.cyan} strokeWidth="1.5" className="pointer-events-none" />
                                                    <path d="M -4 -1 L -4 4 M 0 -3 L 0 4 M 4 1 L 4 4" stroke={THEME.cyan} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none" />
                                                </g>
                                            );
                                        })()}
                                    </g>
                                </g>
                            </g>
                        );
                    })}

                    {/* FREEFORM VARICES */}
                    {(arteryStates.GLOBAL?.free_varices || []).map((v) => (
                        <g key={v.id} transform={`translate(${v.x}, ${v.y})`}>
                            <IconFreeVarices width="20" height="20" x="-10" y="-10" className="text-cyan-400 drop-shadow-md" />
                            <g transform={isLeftHanded ? "scale(-1, 1)" : ""}>
                                <text x={isLeftHanded ? -20 : 20} y="0" dominantBaseline="middle" textAnchor={isLeftHanded ? "end" : "start"} fontSize="13" fill={THEME.textMain} fontWeight="900" stroke={THEME.bgApp} strokeWidth="4" paintOrder="stroke" className="pointer-events-none drop-shadow-sm">
                                    {v.name}
                                </text>
                                <g className="cursor-pointer pointer-events-auto transition-transform hover:scale-110 active:scale-95">
                                    <circle cx={isLeftHanded ? -20 : 20} cy="-14" r="8" fill="#ef4444" className="shadow-md" />
                                    <path d={isLeftHanded ? "M -23 -17 L -17 -11 M -17 -17 L -23 -11" : "M 17 -17 L 23 -11 M 23 -17 L 17 -11"} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                                </g>
                            </g>
                        </g>
                    ))}

                </g>
                </svg>
            </div>
        </main>
    );
};

const SidebarRight = ({ state, actions }) => {
    const { activeSystem, cartography, leg, activeElement, isLeftHanded, arteryStates, activeSegmentDetails, currentSegments, isMobile } = state;
    const { handleSegmentClick, generateAIReport, isGeneratingReport, setActiveElement } = actions;
    
    const [findingsPage, setFindingsPage] = React.useState(0);
    React.useEffect(() => { setFindingsPage(0); }, [activeSegmentDetails?.id]);

    const ALL_SEGMENTS = [...SVP_SEGMENTS, ...USF_SEGMENTS, ...USP_SEGMENTS, ...CAROTID_SEGMENTS, ...ARTERIAL_SEGMENTS];

    const hasFindings = (id) => {
        const sState = arteryStates[id] || {};
        return (sState.color && sState.color !== 'unmapped') || 
               (sState.pared && sState.pared.length > 0) || 
               (sState.focal && sState.focal.length > 0) || 
               (sState.interventions && sState.interventions.length > 0) || 
               sState.psv || sState.edv || sState.at || sState.diameter || sState.length || sState.height || sState.reflux || sState.ratio || sState.attachedImage;
    };

    const handlePrevSegment = () => {
        if (!activeSegmentDetails) return;
        const mappedSegments = ALL_SEGMENTS.filter(s => hasFindings(s.id));
        if (mappedSegments.length === 0) return;

        const currentIndex = mappedSegments.findIndex(s => s.id === activeSegmentDetails.id);
        if (currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + mappedSegments.length) % mappedSegments.length;
            handleSegmentClick(mappedSegments[prevIndex].id, false);
        } else {
            handleSegmentClick(mappedSegments[mappedSegments.length - 1].id, false);
        }
    };

    const handleNextSegment = () => {
        if (!activeSegmentDetails) return;
        const mappedSegments = ALL_SEGMENTS.filter(s => hasFindings(s.id));
        if (mappedSegments.length === 0) return;

        const currentIndex = mappedSegments.findIndex(s => s.id === activeSegmentDetails.id);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % mappedSegments.length;
            handleSegmentClick(mappedSegments[nextIndex].id, false);
        } else {
            handleSegmentClick(mappedSegments[0].id, false);
        }
    };

    const setArteryProp = (id, prop, val) => {
        actions.setGlobalArteryStates(prev => ({
            ...prev, [leg]: { ...prev[leg], [id]: { ...(prev[leg][id] || {}), [prop]: val } }
        }));
    };

    const globalData = arteryStates.GLOBAL || {};
    const hasGlobalVarices = !!globalData.varices;

    const setGlobalProp = (prop, val) => {
        actions.setGlobalArteryStates(prev => ({
            ...prev, [leg]: { ...prev[leg], GLOBAL: { ...(prev[leg].GLOBAL || {}), [prop]: val } }
        }));
    };

    const activeSegmentState = activeSegmentDetails ? (arteryStates[activeSegmentDetails.id] || {}) : {};
    const renderSegmentDetails = (seg) => {
        const state = arteryStates[seg.id] || {};
        const getArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);
        
        let dynamicFindings = [];
        if (state.color && TOOLS_MAP[state.color]) {
            dynamicFindings.push({ tool: TOOLS_MAP[state.color], _delete: () => setArteryProp(seg.id, 'color', null) });
        }
        getArray(state.pared).forEach(p => {
            if (TOOLS_MAP[p]) dynamicFindings.push({ tool: TOOLS_MAP[p], _delete: () => {
                const newVal = getArray(state.pared).filter(x => x !== p);
                setArteryProp(seg.id, 'pared', newVal.length > 0 ? newVal : null);
            }});
        });
        getArray(state.focal).forEach(f => {
            if (TOOLS_MAP[f]) dynamicFindings.push({ tool: TOOLS_MAP[f], _delete: () => {
                const newVal = getArray(state.focal).filter(x => x !== f);
                setArteryProp(seg.id, 'focal', newVal.length > 0 ? newVal : null);
            }});
        });
        getArray(state.interventions).forEach(inv => {
            if (TOOLS_MAP[inv]) dynamicFindings.push({ tool: TOOLS_MAP[inv], _delete: () => {
                const newVal = getArray(state.interventions).filter(x => x !== inv);
                setArteryProp(seg.id, 'interventions', newVal.length > 0 ? newVal : null);
            }});
        });

        const taValue = state.at ? parseInt(state.at, 10) : null;
        const psvValue = state.psv ? parseFloat(state.psv) : null;
        const edvValue = state.edv ? parseFloat(state.edv) : null;
        const diamValue = state.diameter ? parseFloat(state.diameter) : null;
        const lengthValue = state.length ? parseFloat(state.length) : null;
        const heightValue = state.height ? parseFloat(state.height) : null;
        const refluxValue = state.reflux ? parseInt(state.reflux, 10) : null;

        const hasAnyData = dynamicFindings.length > 0 || diamValue || lengthValue || heightValue || refluxValue || taValue || psvValue || edvValue || state.attachedImage;

        if (!hasAnyData) return null;

        return (
            <div key={seg.id} className="flex flex-col gap-2 p-3 mb-3 rounded-xl shadow-sm border border-white/5" style={{ backgroundColor: THEME.bgApp }}>
                <span className="text-[13px] font-bold pb-2 border-b" style={{ color: THEME.textMain, borderColor: THEME.border }}>
                    {seg.name}
                </span>

                <div className="flex flex-col gap-1 relative">
                    {(() => {
                        const rows = [];
                        
                        dynamicFindings.forEach((item, idx) => {
                            const ToolIcon = item.tool?.icon;
                            if (!ToolIcon) return;
                            rows.push(
                                <div key={`find-${idx}`} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    <ToolIcon className="w-4 h-4 shrink-0" style={{ color: item.tool.hex || THEME.cyan }} />
                                    <span className="text-[11px] font-bold tracking-wide flex-1" style={{ color: THEME.textMain }}>{item.tool.name}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); item._delete(); }}
                                        className="p-1 rounded-md text-red-500/50 hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-95"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        });

                        if (psvValue !== null && !isNaN(psvValue)) {
                            rows.push(
                                <div key="psv" className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    <Activity className="w-4 h-4 shrink-0" style={{ color: THEME.textMuted }} />
                                    <span className="text-[11px] font-bold tracking-wide flex-1" style={{ color: THEME.textMain }}>PSV</span>
                                    <span className="text-[11px] font-mono font-black" style={{ color: THEME.textMain }}>{psvValue} cm/s</span>
                                </div>
                            );
                        }
                        if (edvValue !== null && !isNaN(edvValue)) {
                            rows.push(
                                <div key="edv" className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    <Activity className="w-4 h-4 shrink-0" style={{ color: THEME.textMuted }} />
                                    <span className="text-[11px] font-bold tracking-wide flex-1" style={{ color: THEME.textMain }}>EDV</span>
                                    <span className="text-[11px] font-mono font-black" style={{ color: THEME.textMain }}>{edvValue} cm/s</span>
                                </div>
                            );
                        }
                        if (taValue !== null && !isNaN(taValue)) {
                            rows.push(
                                <div key="ta" className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    <Activity className="w-4 h-4 shrink-0" style={{ color: THEME.textMuted }} />
                                    <span className="text-[11px] font-bold tracking-wide flex-1" style={{ color: THEME.textMain }}>TA</span>
                                    <span className="text-[11px] font-mono font-black" style={{ color: THEME.textMain }}>{taValue} ms</span>
                                </div>
                            );
                        }
                        if (diamValue !== null && !isNaN(diamValue)) {
                            rows.push(
                                <div key="diam" className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    <span className="text-[11px] font-bold tracking-wide flex-1 pl-6" style={{ color: THEME.textMain }}>Diámetro</span>
                                    <span className="text-[11px] font-mono font-black" style={{ color: THEME.textMain }}>{diamValue} {activeSystem === 'VENOSO' ? 'mm' : 'cm'}</span>
                                </div>
                            );
                        }
                        if (lengthValue !== null && !isNaN(lengthValue)) {
                            rows.push(
                                <div key="len" className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    <span className="text-[11px] font-bold tracking-wide flex-1 pl-6" style={{ color: THEME.textMain }}>Longitud</span>
                                    <span className="text-[11px] font-mono font-black" style={{ color: THEME.textMain }}>{lengthValue} cm</span>
                                </div>
                            );
                        }
                        if (heightValue !== null && !isNaN(heightValue)) {
                            rows.push(
                                <div key="height" className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    <span className="text-[11px] font-bold tracking-wide flex-1 pl-6" style={{ color: THEME.textMain }}>Altura</span>
                                    <span className="text-[11px] font-mono font-black" style={{ color: THEME.textMain }}>{heightValue} cm</span>
                                </div>
                            );
                        }
                        if (refluxValue !== null && !isNaN(refluxValue)) {
                            rows.push(
                                <div key="reflux" className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 group">
                                    {refluxValue > 500 ? (
                                        <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                                    ) : (
                                        <Activity className="w-4 h-4 shrink-0 text-green-500" />
                                    )}
                                    <span className="text-[11px] font-bold tracking-wide flex-1" style={{ color: THEME.textMain }}>Reflujo</span>
                                    <span className="text-[11px] font-mono font-black" style={{ color: THEME.textMain }}>{refluxValue} ms</span>
                                </div>
                            );
                        }

                        const ITEMS_PER_PAGE = 3;
                        const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);
                        
                        // Asegurar que findingsPage no se salga de rango si se eliminan items
                        const safePage = Math.min(findingsPage, Math.max(0, totalPages - 1));
                        if (safePage !== findingsPage && totalPages > 0) {
                            setTimeout(() => setFindingsPage(safePage), 0);
                        }
                        
                        const visibleRows = rows.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);

                        return (
                            <>
                                {totalPages > 1 && (
                                    <div className="flex justify-center border-b border-white/5 pb-1">
                                        <button 
                                            onClick={() => setFindingsPage(p => Math.max(0, p - 1))}
                                            disabled={safePage === 0}
                                            className={`p-1 rounded-full transition-all ${safePage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-95'}`}
                                        >
                                            <ChevronUp size={16} className="text-cyan-400" />
                                        </button>
                                    </div>
                                )}
                                
                                {visibleRows}

                                {totalPages > 1 && (
                                    <div className="flex justify-center border-t border-white/5 pt-1">
                                        <button 
                                            onClick={() => setFindingsPage(p => Math.min(totalPages - 1, p + 1))}
                                            disabled={safePage >= totalPages - 1}
                                            className={`p-1 rounded-full transition-all ${safePage >= totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 active:scale-95'}`}
                                        >
                                            <ChevronDown size={16} className="text-cyan-400" />
                                        </button>
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </div>

                {state.attachedImage ? (
                    <div className="w-full mt-3 p-1 rounded-lg border shadow-inner relative group" style={{ borderColor: THEME.border, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <img src={state.attachedImage} alt="Hallazgo" className="w-full h-auto rounded-md object-contain max-h-[160px]" />
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[9px] font-bold text-white tracking-widest uppercase border border-white/10">
                            Fotografía Clínica
                        </div>
                        <button 
                            onClick={() => setArteryProp(seg.id, 'attachedImage', null)} 
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full text-white shadow-xl opacity-100 transition-opacity z-10"
                        >
                            <X size={14} strokeWidth={3} />
                        </button>
                    </div>
                ) : (
                    <div className="mt-3">
                        <label className="flex items-center justify-center gap-2 w-full py-2.5 bg-black/50 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 hover:bg-white/10 cursor-pointer transition-all text-[11px] font-bold tracking-wider uppercase text-gray-300">
                            <Camera size={16} /> Agregar Foto
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const url = URL.createObjectURL(e.target.files[0]);
                                        setArteryProp(seg.id, 'attachedImage', url);
                                    }
                                }} 
                            />
                        </label>
                    </div>
                )}
            </div>
        );
    };

    if (isMobile && !state.isRightSidebarOpen) return null;

    const Wrapper = isMobile ? 'div' : 'aside';
    const wrapperClass = isMobile 
        ? "fixed inset-0 z-50 flex flex-col shadow-2xl animate-in slide-in-from-bottom-8 duration-300" 
        : "w-full flex flex-col shadow-lg z-20 shrink-0 h-full";
    const wrapperStyle = isMobile 
        ? { backgroundColor: THEME.bgSidebar } 
        : { backgroundColor: THEME.bgSidebar, borderLeft: isLeftHanded ? 'none' : `1px solid ${THEME.border}`, borderRight: isLeftHanded ? `1px solid ${THEME.border}` : 'none' };

    // Helper variables for UI
    const mappedFindings = ALL_SEGMENTS.filter(s => hasFindings(s.id));
    const activeIndex = activeSegmentDetails ? mappedFindings.findIndex(s => s.id === activeSegmentDetails.id) : -1;

    return (
        <Wrapper className={wrapperClass} style={wrapperStyle}>

            {/* ENCABEZADO MÓVIL */}
            {isMobile && (
                <div className="h-14 px-4 shrink-0 flex items-center justify-between border-b relative" style={{ borderColor: THEME.border, backgroundColor: THEME.bgSidebar }}>
                    <span className="text-[14px] font-bold" style={{ color: THEME.textMain }}>Hallazgos Clínicos</span>
                    <button onClick={() => { actions.setIsRightSidebarOpen(false); if(hasGlobalVarices && !activeSegmentDetails) setGlobalProp('varices', false); }} className="p-2 rounded-lg bg-white/10 active:scale-95 transition-all">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>
            )}

            <div className="p-4 pb-0 flex flex-col gap-3">
                <button 
                    onClick={generateAIReport}
                    disabled={isGeneratingReport}
                    className={UI_CLASSES.primaryBtn}
                >
                    {isGeneratingReport ? <div className="animate-spin w-5 h-5 border-2 border-t-transparent border-black rounded-full" /> : <Sparkles size={18} />}
                    <span>{isGeneratingReport ? 'Generando...' : 'Generar Reporte IA'}</span>
                </button>
                <button 
                    onClick={() => actions.setIsHistoryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-lg border border-indigo-500/30 transition-all font-semibold tracking-wide text-sm shadow-inner"
                >
                    <History size={18} />
                    <span>Historial de Estudios</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pt-4 flex flex-col relative">
                {activeSegmentDetails ? (
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-2 mb-4 bg-black/40 rounded-xl border shadow-inner" style={{ borderColor: THEME.border }}>
                            <button onClick={handlePrevSegment} className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-white"><ChevronLeft size={18} strokeWidth={2.5} /></button>
                            <div className="flex flex-col items-center">
                                <span className={UI_CLASSES.sidebarTitle}>Vaso Patológico</span>
                                <span className="text-[10px] font-mono font-bold mt-0.5" style={{ color: THEME.cyan }}>
                                    {activeIndex !== -1 ? `${activeIndex + 1} de ${mappedFindings.length}` : 'Seleccionado'}
                                </span>
                            </div>
                            <button onClick={handleNextSegment} className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-white"><ChevronRight size={18} strokeWidth={2.5} /></button>
                        </div>
                        
                        {renderSegmentDetails(ALL_SEGMENTS.find(s => s.id === activeSegmentDetails.id) || activeSegmentDetails)}
                    </div>
                ) : (
                    <div className="flex flex-col h-40 items-center justify-center text-center opacity-40 mt-10">
                        <MousePointerClick className="w-12 h-12 mb-4" />
                        <span className="text-sm uppercase font-bold mb-2 tracking-wider">Esperando Selección</span>
                        <span className="text-[11px] px-2 leading-relaxed">Toca una vena patológica en el mapa para iniciar la consulta dinámica.</span>
                    </div>
                )}


            </div>
        </Wrapper>
    );
};

// ============================================================================
// MODAL DE REPORTE GEMINI LLM CON EXPORTACIÓN A ERPNEXT
// ============================================================================
const AIReportModal = ({ isOpen, onClose, reportContent, setReportContent, onExport, isExporting }) => {
    if (!isOpen) return null;

    const handleCopy = () => {
        const textarea = document.createElement('textarea');
        textarea.value = reportContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert("¡Informe copiado al portapapeles!");
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm">
            <div className="flex flex-col w-full h-full" style={{ backgroundColor: THEME.bgSidebar }}>
                <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: THEME.border }}>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                        <h2 className="font-bold text-lg" style={{ color: THEME.textMain }}>Informe Médico Generado (IA)</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5" style={{ color: THEME.textMuted }} />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden p-4">
                    <textarea
                        className="w-full h-full p-4 rounded-lg outline-none font-mono text-sm leading-relaxed custom-scrollbar resize-none border"
                        style={{ backgroundColor: THEME.bgApp, color: THEME.textMain, borderColor: THEME.border }}
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                    />
                </div>

                <div className="p-4 border-t flex justify-between gap-3 bg-black/20" style={{ borderColor: THEME.border }}>
                    <button onClick={handleCopy} className="px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 flex items-center gap-2 border hover:bg-white/5" style={{ backgroundColor: 'transparent', color: THEME.textMain, borderColor: THEME.border }}>
                        <Copy className="w-4 h-4" /> Copiar al Portapapeles
                    </button>

                    <div className="flex gap-2">
                        <button onClick={onClose} className="px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 border hover:bg-white/5" style={{ backgroundColor: THEME.bgApp, color: THEME.textMuted, borderColor: THEME.border }}>
                            Cancelar
                        </button>
                        <button
                            onClick={onExport}
                            disabled={isExporting}
                            className="px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 flex items-center gap-2 text-white"
                            style={{ backgroundColor: isExporting ? THEME.unmapped : THEME.green, opacity: isExporting ? 0.7 : 1 }}
                        >
                            {isExporting ? <div className="animate-spin w-4 h-4 border-2 border-t-transparent rounded-full" /> : <Save className="w-4 h-4" />}
                            {isExporting ? 'Guardando...' : 'Culminar Estudio'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// MODAL DE MEDICIONES (TA, Ratio, Dimensiones)
// ============================================================================
const MeasurementModal = ({ isOpen, onClose, toolId, segmentName, segmentState, onSave, activeSystem, isPerforator }) => {
    const [values, setValues] = useState({
        width: segmentState?.width || segmentState?.diameter || '',
        length: segmentState?.length || '',
        height: segmentState?.height || '',
        ta: segmentState?.ta || segmentState?.at || '',
        ratio: segmentState?.ratio || '',
        psv: segmentState?.psv || '',
        edv: segmentState?.edv || '',
        reflux: segmentState?.reflux || ''
    });

    useEffect(() => {
        setValues({
            width: segmentState?.width || segmentState?.diameter || '',
            length: segmentState?.length || '',
            height: segmentState?.height || '',
            ta: segmentState?.ta || segmentState?.at || '',
            ratio: segmentState?.ratio || '',
            psv: segmentState?.psv || '',
            edv: segmentState?.edv || '',
            reflux: segmentState?.reflux || ''
        });
    }, [isOpen, toolId, segmentState]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(values);
        onClose();
    };

    let title = '';
    if (toolId === 'medidas_dimensiones') title = 'Dimensiones Anteroposteriores';
    if (toolId === 'medidas_ta') title = 'Tiempo de Aceleración';
    if (toolId === 'medidas_ratio') title = 'Índice / Ratio';
    if (toolId === 'medidas_velocidades') title = 'Velocidades (PSV/EDV)';
    if (toolId === 'medidas_reflux') title = 'Tiempo de Reflujo';

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="flex flex-col w-full max-w-sm rounded-2xl shadow-2xl border" style={{ backgroundColor: THEME.bgSidebar, borderColor: THEME.border }}>
                <div className="flex flex-col items-center justify-center p-4 border-b gap-1" style={{ borderColor: THEME.border }}>
                    <h2 className="font-bold text-lg text-center" style={{ color: THEME.textMain }}>{title}</h2>
                    <span className="text-[10px] uppercase tracking-widest font-black text-center break-words text-balance" style={{ color: THEME.cyan }}>{segmentName}</span>
                </div>

                <div className="p-6 flex flex-col gap-4">
                    {toolId === 'medidas_dimensiones' && (
                        <div className="flex gap-3">
                            <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>Diámetro ({activeSystem === 'VENOSO' ? 'mm' : 'cm'})</label>
                                <input type="number" inputMode="decimal" step="0.1" value={values.width} onChange={e => setValues({ ...values, width: e.target.value })} autoFocus className="w-full rounded-xl py-3 text-center text-xl font-mono font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black/30 border" style={{ borderColor: THEME.border, color: THEME.textMain }} />
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>{isPerforator ? 'Altura (cm)' : 'Longitud (cm)'}</label>
                                <input type="number" inputMode="decimal" step="0.1" value={isPerforator ? values.height : values.length} onChange={e => isPerforator ? setValues({ ...values, height: e.target.value }) : setValues({ ...values, length: e.target.value })} className="w-full rounded-xl py-3 text-center text-xl font-mono font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black/30 border" style={{ borderColor: THEME.border, color: THEME.textMain }} />
                            </div>
                        </div>
                    )}

                    {toolId === 'medidas_velocidades' && (
                        <div className="flex gap-3">
                            <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>PSV (cm/s)</label>
                                <input type="number" inputMode="decimal" value={values.psv} onChange={e => setValues({ ...values, psv: e.target.value })} autoFocus className="w-full rounded-xl py-3 text-center text-xl font-mono font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black/30 border" style={{ borderColor: THEME.border, color: THEME.textMain }} />
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>EDV (cm/s)</label>
                                <input type="number" inputMode="decimal" value={values.edv} onChange={e => setValues({ ...values, edv: e.target.value })} className="w-full rounded-xl py-3 text-center text-xl font-mono font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black/30 border" style={{ borderColor: THEME.border, color: THEME.textMain }} />
                            </div>
                        </div>
                    )}

                    {toolId === 'medidas_reflux' && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>Tiempo de Reflujo (ms)</label>
                            <input type="number" inputMode="numeric" step="10" value={values.reflux} onChange={e => setValues({ ...values, reflux: e.target.value })} autoFocus className="w-full rounded-xl py-4 text-center text-2xl font-mono font-bold outline-none focus:ring-2 focus:ring-red-500 transition-all bg-black/30 border" style={{ borderColor: THEME.border, color: THEME.textMain }} placeholder="> 500 ms" />
                        </div>
                    )}

                    {toolId === 'medidas_ta' && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>TA (ms)</label>
                            <input type="number" inputMode="numeric" value={values.ta} onChange={e => setValues({ ...values, ta: e.target.value })} autoFocus className="w-full rounded-xl py-4 text-center text-2xl font-mono font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black/30 border" style={{ borderColor: THEME.border, color: THEME.textMain }} placeholder="Ej. 120" />
                        </div>
                    )}

                    {toolId === 'medidas_ratio' && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>Ratio / Índice</label>
                            <input type="number" inputMode="decimal" step="0.01" value={values.ratio} onChange={e => setValues({ ...values, ratio: e.target.value })} autoFocus className="w-full rounded-xl py-4 text-center text-2xl font-mono font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black/30 border" style={{ borderColor: THEME.border, color: THEME.textMain }} placeholder="Ej. 0.9" />
                        </div>
                    )}
                </div>

                <div className="p-4 flex gap-2 border-t bg-black/20" style={{ borderColor: THEME.border }}>
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 border hover:bg-white/5" style={{ backgroundColor: THEME.bgApp, color: THEME.textMuted, borderColor: THEME.border }}>
                        Cancelar
                    </button>
                    <button onClick={handleSave} className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 text-white bg-cyan-600 hover:bg-cyan-500">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

const LegendModal = ({ onClose, legendSystem, hiddenTools = [], setHiddenTools }) => {
    const [activeTab, setActiveTab] = useState('Modo B');
    
    const spectralIds = ['multiphasic', 'monophasic', 'biphasic', 'reversed_flow', 'turbulence', 'tardus', 'v_continuous', 'v_pulsatile', 'medidas_ta', 'medidas_ratio', 'medidas_velocidades', 'medidas_reflux'];
    
    let validToolIds = [];
    if (legendSystem === 'ARTERIAL') {
        validToolIds = [...new Set([...DEFAULT_TOOL_GRIDS.PIERNA, ...DEFAULT_TOOL_GRIDS.CAROTIDA])];
    } else {
        validToolIds = [...DEFAULT_TOOL_GRIDS.VENOSO];
    }
    
    const systemTools = MASTER_TOOLS.filter(t => validToolIds.includes(t.id));
    
    const bModeTools = systemTools.filter(t => (t.category === 'trayecto' || t.category === 'trayecto_extra' || t.category === 'focal' || t.category === 'focal_extra' || t.category === 'global' || t.category === 'draw_point' || t.id === 'medidas_dimensiones') && !spectralIds.includes(t.id));
    const colorModeTools = systemTools.filter(t => t.category === 'color');
    const spectralModeTools = systemTools.filter(t => spectralIds.includes(t.id) || t.category === 'focal_cycle');
    const actionTools = systemTools.filter(t => t.category === 'intervention' || t.category === 'action');

    const renderTool = (t) => {
        const isHidden = hiddenTools.includes(t.id);
        const isAction = t.category === 'action';
        return (
            <div key={t.id} className="flex items-center gap-3 p-3 sm:p-4 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:bg-black/40 transition-all hover:scale-[1.02]" onClick={() => {
                if (isAction || !setHiddenTools) return;
                if (isHidden) setHiddenTools(prev => prev.filter(id => id !== t.id));
                else setHiddenTools(prev => [...prev, t.id]);
            }}>
                {!isAction && setHiddenTools && (
                    <button className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-lg border transition-all ${isHidden ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'bg-green-500/20 border-green-500/50 text-green-500'}`}>
                        {isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
                <t.icon className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" style={{ color: t.hex || THEME.textMain, opacity: isHidden ? 0.3 : 1 }} />
                <span className={`text-xs sm:text-sm font-bold leading-tight ${isHidden ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{t.name}</span>
            </div>
        );
    };

    const TABS = [
        { id: 'Modo B', tools: bModeTools, color: 'text-gray-400', border: 'border-gray-500' },
        { id: 'Color', tools: colorModeTools, color: 'text-red-400', border: 'border-red-500' },
        { id: 'Espectral', tools: spectralModeTools, color: 'text-cyan-400', border: 'border-cyan-500' },
        { id: 'Cirugía', tools: actionTools, color: 'text-yellow-500', border: 'border-yellow-500' }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col w-full max-w-7xl h-[95vh] rounded-[2rem] shadow-2xl border overflow-hidden" style={{ backgroundColor: THEME.bgSidebar, borderColor: THEME.border }}>
                
                <div className="flex flex-col border-b bg-black/20" style={{ borderColor: THEME.border }}>
                    <div className="flex items-center justify-between p-5 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-white/5 shadow-inner">
                                {legendSystem === 'ARTERIAL' ? <Activity className="w-8 h-8 text-red-500 drop-shadow-md" /> : <Droplet className="w-8 h-8 text-blue-500 drop-shadow-md" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Configuración de Visibilidad</span>
                                <h2 className="font-black text-xl sm:text-2xl text-white uppercase tracking-wider">Leyenda {legendSystem === 'ARTERIAL' ? 'Arterial' : 'Venosa'}</h2>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-3 rounded-full hover:bg-white/10 transition-colors bg-white/5">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center py-2 px-1 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all rounded-lg border shadow-sm ${activeTab === tab.id ? `${tab.color} ${tab.border} bg-white/10` : 'text-gray-500 hover:text-gray-300 border-white/5 bg-black/20'}`}
                            >
                                {tab.id} ({tab.tools.length})
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
                    {TABS.map(tab => {
                        if (activeTab !== tab.id || tab.tools.length === 0) return null;
                        return (
                            <div key={tab.id} className="animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                                    {tab.tools.map(renderTool)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const PerfMetricsModal = ({ isOpen, onClose, arteryStates, setArteryProp, activeElement, currentSegments }) => {
    if (!isOpen || !activeElement) return null;

    const segment = currentSegments.find(s => s.id === activeElement.id);
    const segmentName = segment ? segment.name : activeElement.id;
    const currentState = arteryStates[activeElement.id] || {};

    const [diameter, setDiameter] = useState(currentState.diameter || '');
    const [reflux, setReflux] = useState(currentState.reflux || '');
    const [c5c6, setC5c6] = useState(currentState.c5c6 || false);

    const handleSave = () => {
        const d = parseFloat(diameter);
        const r = parseFloat(reflux);
        
        if (!isNaN(d)) setArteryProp(activeElement.id, 'diameter', d);
        if (!isNaN(r)) setArteryProp(activeElement.id, 'reflux', r);
        setArteryProp(activeElement.id, 'c5c6', c5c6);

        if (!isNaN(d) && !isNaN(r)) {
            if (d > 3.5 && r > 500) {
                setArteryProp(activeElement.id, 'color', 'perf_incompetent');
            } else if (d < 3.5 && r < 500) {
                setArteryProp(activeElement.id, 'color', 'perf_competent');
            } else {
                setArteryProp(activeElement.id, 'color', 'perf_no_criteria');
            }
        }
        
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-sm flex flex-col overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Activity size={20} className="text-green-500" />
                        Métricas de Perforante
                    </h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-5 flex flex-col gap-5">
                    <div className="text-sm font-medium text-cyan-400 mb-2 border-b border-white/5 pb-2">
                        {segmentName}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Diámetro Aponeurótico (mm)</label>
                        <input 
                            type="number" step="0.1"
                            value={diameter}
                            onChange={(e) => setDiameter(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors"
                            placeholder="Ej. 3.5"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Tiempo de Reflujo (ms)</label>
                        <input 
                            type="number" step="10"
                            value={reflux}
                            onChange={(e) => setReflux(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-colors"
                            placeholder="Ej. 550"
                        />
                    </div>

                    <div className="flex items-center gap-3 mt-2 p-3 rounded-xl border border-white/10 bg-black/30 cursor-pointer hover:border-white/20 transition-colors" onClick={() => setC5c6(!c5c6)}>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${c5c6 ? 'bg-orange-500 border-orange-500' : 'border-white/30'}`}>
                            {c5c6 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-white"><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                        <span className="text-sm font-medium text-white/90">Condición Clínica C5/C6 Presente</span>
                    </div>
                </div>
                
                <div className="p-4 border-t border-white/5 bg-black/20 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors">Cancelar</button>
                    <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-colors shadow-lg shadow-green-900/50">Guardar</button>
                </div>
            </div>
        </div>
    );
};

const VARICE_LOCATIONS = [
    "Cara Anterior - Muslo Proximal",
    "Cara Anterior - Muslo Medio",
    "Cara Anterior - Muslo Distal",
    "Cara Anterior - Pierna Proximal",
    "Cara Anterior - Pierna Media",
    "Cara Anterior - Pierna Distal",
    "Cara Posterior - Muslo Proximal",
    "Cara Posterior - Muslo Medio",
    "Cara Posterior - Muslo Distal",
    "Cara Posterior - Pierna Proximal",
    "Cara Posterior - Pierna Media",
    "Cara Posterior - Pierna Distal",
    "Cara Medial - Muslo Proximal",
    "Cara Medial - Muslo Medio",
    "Cara Medial - Muslo Distal",
    "Cara Medial - Pierna Proximal",
    "Cara Medial - Pierna Media",
    "Cara Medial - Pierna Distal",
    "Cara Lateral - Muslo Proximal",
    "Cara Lateral - Muslo Medio",
    "Cara Lateral - Muslo Distal",
    "Cara Lateral - Pierna Proximal",
    "Cara Lateral - Pierna Media",
    "Cara Lateral - Pierna Distal",
    "Tobillo Anterior",
    "Tobillo Posterior",
    "Tobillo Medial",
    "Tobillo Lateral",
    "Pie - Dorso",
    "Pie - Planta"
];

const VariceLocationModal = ({ isOpen, onClose, pendingVarice, onConfirm }) => {
    const [selectedLoc, setSelectedLoc] = useState('');
    const [customText, setCustomText] = useState('');

    useEffect(() => {
        if (isOpen && pendingVarice) {
            setSelectedLoc(pendingVarice.suggestedLocation || VARICE_LOCATIONS[0]);
            setCustomText('');
        }
    }, [isOpen, pendingVarice]);

    if (!isOpen || !pendingVarice) return null;

    const handleSave = () => {
        const finalLoc = customText.trim() !== '' ? `${selectedLoc} (${customText.trim()})` : selectedLoc;
        onConfirm(finalLoc, pendingVarice);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col w-full max-w-md rounded-2xl shadow-2xl border" style={{ backgroundColor: THEME.bgSidebar, borderColor: THEME.border }}>
                <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: THEME.border }}>
                    <h2 className="font-bold text-lg text-cyan-400 flex items-center gap-2">
                        <IconFreeVarices className="w-5 h-5" /> Ubicación de Várice
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
                
                <div className="p-5 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Región Anatómica Detectada</label>
                        <select 
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-colors cursor-pointer appearance-none"
                            value={selectedLoc}
                            onChange={(e) => setSelectedLoc(e.target.value)}
                        >
                            {!VARICE_LOCATIONS.includes(selectedLoc) && (
                                <option value={selectedLoc}>{selectedLoc}</option>
                            )}
                            {VARICE_LOCATIONS.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Detalles Adicionales (Opcional)</label>
                        <input 
                            type="text" 
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500 transition-colors"
                            placeholder="Ej. Cerca de vena safena..."
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        />
                    </div>
                </div>

                <div className="p-4 border-t flex gap-3 bg-black/20" style={{ borderColor: THEME.border }}>
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors shadow-lg shadow-cyan-900/50">
                        Marcar
                    </button>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// MODAL DE HISTORIAL DE ESTUDIOS (CARGA DESDE ERPNEXT)
// ============================================================================
const HistoricalStudiesModal = ({ isOpen, onClose, patientId, onSelectStudy }) => {
    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        
        const fpp = getFrappe();
        if (!fpp) {
            setStudies([
                { name: 'SIM-001', creation: new Date().toISOString(), owner: 'Dr. Simulador', datos_doppler: '{}', informe_doppler: 'Este es un reporte de prueba.' }
            ]);
            return;
        }

        setLoading(true);
        fpp.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Vascular Encounter - Eco Doppler',
                filters: {
                    patient: patientId
                },
                fields: ['name', 'creation', 'owner', 'datos_doppler', 'informe_doppler'],
                order_by: 'creation desc',
                limit_page_length: 50
            },
            callback: function(r) {
                setLoading(false);
                if (r.message) {
                    setStudies(r.message);
                }
            }
        });

    }, [isOpen, patientId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e1e1e] border border-white/10 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                            <History size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Historial de Estudios</h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="text-center py-8 text-gray-400">Consultando base de datos de MariaDB...</div>
                    ) : studies.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">No se encontraron estudios previos para este paciente.</div>
                    ) : (
                        <div className="space-y-3">
                            {studies.map((study) => (
                                <div key={study.name} className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center hover:bg-white/10 transition-colors">
                                    <div>
                                        <div className="text-white font-medium flex items-center gap-2">
                                            {study.name}
                                            {study.datos_doppler && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] uppercase font-bold rounded">Mapa</span>}
                                            {study.informe_doppler && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] uppercase font-bold rounded">Reporte IA</span>}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-1">
                                            Fecha: {new Date(study.creation).toLocaleString()} • Por: {study.owner}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            if (!study.datos_doppler || study.datos_doppler === '{}') {
                                                if(study.name !== 'SIM-001') {
                                                    alert("Este estudio no contiene datos topográficos guardados.");
                                                    return;
                                                }
                                            }
                                            onSelectStudy(study);
                                        }}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 transition-colors font-semibold"
                                    >
                                        <Eye size={16} />
                                        <span>Cargar y Ver</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AnatomicalLocationModal = ({ isOpen, onClose, perforatorId: locationData }) => {
    const [hoveredSection, setHoveredSection] = useState('position');

    const perforatorId = locationData?.id;
    const type = locationData?.type || 'deep'; // 'deep' o 'sup'

    useEffect(() => {
        if (isOpen) {
            setHoveredSection('position');
        }
    }, [isOpen, perforatorId]);

    if (!isOpen || !perforatorId) return null;
    
    let pData = null;
    let view = locationData?.view || 'Medial';
    let itemName = locationData?.name || '';

    if (type === 'deep' || type === 'sup') {
        pData = perforatorsData.find(p => p.id === perforatorId);
        if (!pData) return null;
        view = PERFORATOR_VIEWS[pData.id] || 'Medial';
        itemName = pData.name;
    }
    
    // Find all perforators in the same view to show as context dots
    const contextPerforators = perforatorsData.filter(p => PERFORATOR_VIEWS[p.id] === view);
    
    const getXForView = (v) => {
        if (v === 'Posterior' || v === 'Anterior') return 50;
        if (v === 'Lateral') return 55;
        return 45; // Medial
    };
    
    const guide = (pData && ULTRASOUND_GUIDELINES[pData.id]) || {
        position: 'Bipedestación, pierna relajada.',
        transducer: 'Lineal de alta frecuencia (7-12 MHz).',
        landmarks: 'Región anatómica correspondiente a ' + view,
        technique: type === 'vein' ? 'Exploración sistemática del trayecto venoso.' : 'Identificar la disrupción fascial y evaluar con Doppler color y espectral.',
        settings: type === 'vein' ? 'Ajustar profundidad y PRF según el segmento.' : 'Ajustar PRF bajo y ganancia según flujo venoso superficial.'
    };

    const sections = [
        { id: 'position', title: 'Posición del Paciente', icon: User, color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10', solidBg: 'bg-blue-500' },
        { id: 'transducer', title: 'Transductor y Abordaje', icon: Maximize, color: 'text-cyan-400', border: 'border-cyan-500', bg: 'bg-cyan-500/10', solidBg: 'bg-cyan-500' },
        { id: 'landmarks', title: 'Referencias Anatómicas', icon: Target, color: 'text-orange-400', border: 'border-orange-500', bg: 'bg-orange-500/10', solidBg: 'bg-orange-500' },
        { id: 'technique', title: 'Técnica de Escaneo', icon: Activity, color: 'text-green-400', border: 'border-green-500', bg: 'bg-green-500/10', solidBg: 'bg-green-500' },
        { id: 'settings', title: 'Ajustes del Equipo', icon: Settings, color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/10', solidBg: 'bg-purple-500' }
    ];

    const activeSec = sections.find(s => s.id === hoveredSection) || sections[0];

    const getVeinSegmentHighlight = (id) => {
        let y1 = 20, y2 = 380; // default full leg
        if (!id) return { y1, y2 };
        const idLower = id.toLowerCase();
        
        // Thigh
        if (idLower.includes('sfj') || idLower.includes('vfc') || idLower.includes('femoral_comun') || idLower.includes('inguinal')) {
            y1 = 20; y2 = 60;
        } else if (idLower.includes('muslo_prox') || idLower.includes('afs_prox') || idLower.includes('vf_prox') || idLower.includes('vfp') || idLower.includes('femoral_profunda')) {
            y1 = 60; y2 = 130;
        } else if (idLower.includes('muslo_med') || idLower.includes('afs_med') || idLower.includes('vf_med') || idLower.includes('trib_muslo')) {
            y1 = 110; y2 = 160;
        } else if (idLower.includes('muslo_dist') || idLower.includes('afs_dist') || idLower.includes('vf_dist') || idLower.includes('hunter') || idLower.includes('dodd')) {
            y1 = 140; y2 = 180;
        } 
        // Knee
        else if (idLower.includes('pop') || idLower.includes('usp') || idLower.includes('rodilla') || idLower.includes('gemelar')) {
            y1 = 160; y2 = 220;
        } 
        // Leg
        else if (idLower.includes('pierna_prox') || idLower.includes('vsp_prox') || idLower.includes('tronco_tp') || idLower.includes('paratibial') || idLower.includes('boyd') || idLower.includes('sherman')) {
            y1 = 200; y2 = 270;
        } else if (idLower.includes('pierna_med') || idLower.includes('vsp_med') || idLower.includes('tibial') || idLower.includes('peronea')) {
            y1 = 250; y2 = 330;
        } else if (idLower.includes('pierna_dist') || idLower.includes('vsp_dist') || idLower.includes('soleales') || idLower.includes('cockett')) {
            y1 = 310; y2 = 380;
        } 
        // Foot
        else if (idLower.includes('pedia')) {
            y1 = 380; y2 = 420;
        }
        
        return { y1, y2 };
    };

    const DiscreetHeader = () => (
        <div className="p-3 border-b border-white/10 flex justify-between items-center bg-[#1C1C1C] shrink-0">
            <div className="flex items-center gap-3">
                {type === 'deep' ? <Target className="text-red-500 w-4 h-4" /> : <Activity className="text-cyan-500 w-4 h-4" />}
                <div className="flex flex-col">
                    <h2 className="text-[13px] font-bold text-white tracking-widest uppercase">{type === 'vein' ? 'Ubicación de Vena' : (type === 'deep' ? 'Diagrama de Ubicación' : 'Guía Ecográfica')}</h2>
                </div>
            </div>
            <button onClick={onClose} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-red-400 transition-colors" title="Cerrar">
                <X size={16} />
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[9999] bg-[#171717] w-full h-full flex flex-col overflow-hidden">
                <DiscreetHeader />
                
                {/* CAJA DESTACADA DEL NOMBRE */}
                <div className="w-full bg-gradient-to-r from-transparent via-white/5 to-transparent border-b border-white/10 py-3 sm:py-5 flex flex-col items-center justify-center shrink-0">
                    <span className="text-cyan-500 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] mb-1">Estructura Seleccionada</span>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-black text-lg sm:text-2xl uppercase tracking-widest text-center">
                            {itemName}
                        </span>
                        {pData && pData.acronym && (
                            <span className="text-gray-400 text-sm sm:text-base font-mono font-bold">({pData.acronym})</span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className={`flex-1 flex flex-row overflow-hidden bg-black/20 relative gap-2 sm:gap-4 ${type === 'sup' ? '' : 'p-2 sm:p-4'}`}>
                    {/* COLUMNA IZQUIERDA: DIAGRAMA */}
                    {(type === 'deep' || type === 'vein') && (
                    <div className="w-[50%] flex flex-col min-h-0 overflow-hidden shrink-0 border-r border-white/10">
                        {/* DIAGRAMA DE UBICACIÓN */}
                        <div className="flex-1 flex flex-col items-center justify-center relative min-h-0 bg-black/40 rounded-xl border border-white/5 p-4">
                            <svg viewBox="0 0 100 450" className="w-full h-full drop-shadow-2xl overflow-visible" preserveAspectRatio="xMidYMid meet">
                                {/* Leg Outline */}
                                <path d="M 15 20 L 85 20 L 70 170 L 65 190 L 75 260 L 60 380 L 40 380 L 25 260 L 35 190 L 30 170 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="2.5" strokeLinejoin="round" />
                                
                                {/* Groin line */}
                                <line x1="15" y1="20" x2="85" y2="20" stroke="#52525b" strokeDasharray="4 4" strokeWidth="1.5" />
                                <text x="50" y="10" fill="#a1a1aa" fontSize="12" fontWeight="bold" textAnchor="middle">Ingle</text>
                                
                                {/* Knee lines */}
                                <line x1="30" y1="170" x2="70" y2="170" stroke="#52525b" strokeDasharray="4 4" strokeWidth="1.5" />
                                <line x1="35" y1="190" x2="65" y2="190" stroke="#52525b" strokeDasharray="4 4" strokeWidth="1.5" />
                                <text x="15" y="180" fill="#a1a1aa" fontSize="12" fontWeight="bold" textAnchor="end" dominantBaseline="middle">Rodilla</text>
                                
                                {/* Ankle line */}
                                <line x1="40" y1="380" x2="60" y2="380" stroke="#52525b" strokeDasharray="4 4" strokeWidth="1.5" />
                                <text x="50" y="373" fill="#a1a1aa" fontSize="12" fontWeight="bold" textAnchor="middle">Tobillo</text>

                                {/* Foot Diagrams depending on view */}
                                {view === 'Anterior' && (
                                    <path d="M 40 380 L 60 380 L 65 420 L 62 425 L 59 420 L 56 425 L 53 420 L 50 425 L 47 420 L 44 425 L 41 420 L 38 425 L 35 420 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="2.5" strokeLinejoin="round" />
                                )}
                                {(view === 'Lateral' || view === 'Medial') && (
                                    <path d={view === 'Lateral' ? "M 40 380 L 40 425 L 100 425 L 100 415 L 60 380 Z" : "M 60 380 L 60 425 L 0 425 L 0 415 L 40 380 Z"} fill="#18181b" stroke="#3f3f46" strokeWidth="2.5" strokeLinejoin="round" />
                                )}
                                {view === 'Posterior' && (
                                    <path d="M 40 380 L 60 380 L 58 410 L 42 410 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="2.5" strokeLinejoin="round" />
                                )}
                                {/* Resaltado de Vena */}
                                {type === 'vein' && (() => {
                                    const { y1, y2 } = getVeinSegmentHighlight(locationData?.id || '');
                                    const cx = getXForView(view);
                                    const cy = (y1 + y2) / 2;
                                    return (
                                        <g>
                                            <rect x="25" y={y1} width="50" height={y2 - y1} fill="#06B6D4" opacity="0.15" rx="8" />
                                            <line x1="25" y1={y1} x2="75" y2={y1} stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
                                            <line x1="25" y1={y2} x2="75" y2={y2} stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
                                            
                                            <circle cx={cx} cy={cy} r="12" fill="#06B6D4" className="animate-ping" opacity="0.3" />
                                            <circle cx={cx} cy={cy} r="6" fill="#06B6D4" stroke="white" strokeWidth="1.5" filter="drop-shadow(0 0 10px rgba(6,182,212,0.9))" />
                                        </g>
                                    );
                                })()}

                                {/* Puntos de Referencia */}
                                {(() => {
                                    const getTrueY = (id) => {
                                        const allSegments = [...USF_SEGMENTS, ...ANT_SEGMENTS, ...USP_SEGMENTS, ...LATERAL_SEGMENTS, ...SVP_SEGMENTS];
                                        const seg = allSegments.find(s => s.id === id);
                                        if (seg && seg.focalPoint) return seg.focalPoint.y;
                                        if (seg && seg.parsedPath && seg.parsedPath.length > 0) return seg.parsedPath[0].y;
                                        return 500; // fallback
                                    };

                                    return contextPerforators.map(cp => {
                                        const trueY = getTrueY(cp.id);
                                        const cpY = 20 + (trueY / 1150) * 360;
                                        const cpX = getXForView(PERFORATOR_VIEWS[cp.id]);
                                        
                                        if (pData && cp.id === pData.id) {
                                        return (
                                            <g key={cp.id}>
                                                <circle cx={cpX} cy={cpY} r="8" fill="#ef4444" className="animate-ping" opacity="0.4" />
                                                <circle cx={cpX} cy={cpY} r="6" fill="#ef4444" stroke="white" strokeWidth="1.5" filter="drop-shadow(0 0 10px rgba(239,68,68,0.9))" />
                                                <text x={cpX + 12} y={cpY} fill="white" fontSize="11" fontWeight="bold" dominantBaseline="middle" filter="drop-shadow(0 0 2px black)">{cp.acronym}</text>
                                            </g>
                                        );
                                    } else {
                                        return (
                                            <g key={cp.id}>
                                                <circle cx={cpX} cy={cpY} r="3" fill="#52525b" />
                                                <text x={cpX + 8} y={cpY} fill="#71717a" fontSize="8" fontWeight="bold" dominantBaseline="middle">{cp.acronym}</text>
                                            </g>
                                        );
                                    }
                                });
                            })()}
                            </svg>
                        </div>
                    </div>
                    )}

                    {/* COLUMNA DERECHA / PANTALLA COMPLETA */}
                    <div className={`flex flex-col min-h-0 overflow-y-auto custom-scrollbar w-full flex-1 ${type === 'sup' ? '' : 'justify-center items-center gap-6 px-2 sm:px-6'}`}>
                        {(type === 'deep' || type === 'vein') && (
                            <>
                                {/* BANNER CONECTOR */}
                                {type === 'deep' && pData && (() => {
                                    const supSystem = SUPERFICIAL_SYSTEMS[pData.id];
                                    const supHex = SUPERFICIAL_COLORS[supSystem] || '#06B6D4';
                                    const view = PERFORATOR_VIEWS[pData.id] || 'Medial';
                                    const deepHex = VIEW_COLORS[view] || '#A855F7';
                                    
                                    return (
                                        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 bg-black/40 p-4 sm:p-6 rounded-2xl border border-white/10 shrink-0 shadow-2xl w-full max-w-xs">
                                            <div className="flex flex-col items-center gap-1.5 w-full">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sistema Superficial</span>
                                                <span className="font-black text-sm sm:text-base uppercase px-2 py-2 rounded-xl border-2 w-full text-center truncate" style={{ color: supHex, backgroundColor: `${supHex}15`, borderColor: `${supHex}40` }}>{pData.sup}</span>
                                            </div>
                                            <div className="flex flex-col items-center text-gray-500 my-1">
                                                <div className="w-[2px] h-3 sm:h-5 bg-gray-600 rounded-full"></div>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 sm:w-6 sm:h-6 my-1 text-cyan-500 animate-pulse"><circle cx="12" cy="12" r="10"/><path d="M12 4v16M8 14l4 6 4-6"/></svg>
                                                <div className="w-[2px] h-3 sm:h-5 bg-gray-600 rounded-full"></div>
                                            </div>
                                            <div className="flex flex-col items-center gap-1.5 w-full">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Eje Profundo</span>
                                                <span className="font-black text-sm sm:text-base uppercase px-2 py-2 rounded-xl border-2 w-full text-center truncate" style={{ color: deepHex, backgroundColor: `${deepHex}15`, borderColor: `${deepHex}40` }}>{pData.deep}</span>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* LEYENDA (MOVIDA A LA DERECHA) */}
                                {(() => {
                                    const supSystem = type === 'deep' && pData ? SUPERFICIAL_SYSTEMS[pData.id] : null;
                                    const deepView = type === 'deep' && pData ? PERFORATOR_VIEWS[pData.id] : view;
                                    
                                    const getSupClass = (sys) => supSystem === sys 
                                        ? (sys === 'MAGNA' ? "bg-[#FACC15]/20 text-[#FACC15] border-[#FACC15]/30 shadow-[0_0_10px_rgba(250,204,21,0.2)]" : "bg-[#2DD4BF]/20 text-[#2DD4BF] border-[#2DD4BF]/30 shadow-[0_0_10px_rgba(45,212,191,0.2)]")
                                        : "bg-white/5 text-gray-600 border-white/5 opacity-50 grayscale";
                                        
                                    const getDeepClass = (v) => {
                                        if (deepView !== v) return "bg-white/5 text-gray-600 border-white/5 opacity-50 grayscale";
                                        switch(v) {
                                            case 'Anterior': return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
                                            case 'Medial': return "bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]";
                                            case 'Lateral': return "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]";
                                            case 'Posterior': return "bg-[#EC4899]/20 text-[#EC4899] border-[#EC4899]/30 shadow-[0_0_10px_rgba(236,72,153,0.2)]";
                                            default: return "bg-white/5 text-gray-600 border-white/5 opacity-50 grayscale";
                                        }
                                    };

                                    return (
                                        <div className="p-5 bg-black/30 rounded-2xl border border-white/5 flex flex-col gap-4 shrink-0 animate-in fade-in duration-500 w-full max-w-sm shadow-xl">
                                            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-black mb-1 border-b border-white/10 pb-3 text-center">Código de Colores (Sistemas y Caras)</span>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Sistema Superficial</span>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className={`text-[11px] px-3 py-1.5 rounded-lg font-bold border transition-all duration-300 ${getSupClass('MAGNA')}`}>USF</span>
                                                        <span className={`text-[11px] px-3 py-1.5 rounded-lg font-bold border transition-all duration-300 ${getSupClass('PARVA')}`}>USP</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Cara Anatómica</span>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className={`text-[11px] px-3 py-1.5 rounded-lg font-bold border transition-all duration-300 ${getDeepClass('Anterior')}`}>C. Anterior</span>
                                                        <span className={`text-[11px] px-3 py-1.5 rounded-lg font-bold border transition-all duration-300 ${getDeepClass('Medial')}`}>C. Medial</span>
                                                        <span className={`text-[11px] px-3 py-1.5 rounded-lg font-bold border transition-all duration-300 ${getDeepClass('Lateral')}`}>C. Lateral</span>
                                                        <span className={`text-[11px] px-3 py-1.5 rounded-lg font-bold border transition-all duration-300 ${getDeepClass('Posterior')}`}>C. Posterior</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </>
                        )}

                        {/* MINICURSO (SOLO PARA SVS) */}
                        {type === 'sup' && (
                            <div className="flex-1 flex flex-col gap-4 sm:gap-6 min-h-0 overflow-hidden w-full max-w-4xl mx-auto p-2 sm:p-4 animate-in fade-in zoom-in-95 duration-500">
                                
                                {/* TABS VERTICALES (Arriba, mismo ancho que el contenedor) */}
                                <div className="flex flex-col gap-2 shrink-0 w-full overflow-y-auto custom-scrollbar">
                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1 px-2">Fases del Estudio</span>
                                    {sections.map(sec => {
                                        const SecIcon = sec.icon;
                                        return (
                                            <div 
                                                key={sec.id}
                                                onMouseEnter={() => setHoveredSection(sec.id)}
                                                onClick={() => setHoveredSection(sec.id)}
                                                className={`w-full p-3 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-row items-center gap-3 sm:gap-4 shrink-0 ${hoveredSection === sec.id ? `${sec.border} ${sec.bg} shadow-[0_0_15px_rgba(0,0,0,0.4)] z-10` : 'border-white/5 bg-black/40 hover:border-white/20 hover:bg-black/60'}`}
                                            >
                                                <SecIcon size={20} className={`shrink-0 transition-colors ${hoveredSection === sec.id ? sec.color : 'text-gray-500'}`} />
                                                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest leading-tight text-left flex-1 ${hoveredSection === sec.id ? 'text-white' : 'text-gray-400'}`}>{sec.title}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                                {/* TEXT CONTENT (Abajo, mismo ancho que los botones) */}
                                <div className="flex-1 rounded-3xl bg-black/60 border border-white/5 p-5 sm:p-8 flex flex-col relative overflow-hidden shadow-2xl min-h-0 w-full">
                                    <div className={`absolute top-0 left-0 w-full h-1.5 ${activeSec.solidBg} opacity-80`}></div>
                                    <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-6 shrink-0">
                                        <div className={`p-3 sm:p-4 rounded-2xl shadow-inner ${activeSec.bg}`}>
                                            {React.createElement(activeSec.icon, { size: 28, className: `${activeSec.color}` })}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Guía Ecográfica Paso a Paso</span>
                                            <h4 className={`text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider ${activeSec.color} drop-shadow-md`}>
                                                {activeSec.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 sm:pr-4 text-gray-300 text-sm sm:text-base md:text-lg leading-[1.8] font-medium text-justify">
                                        {guide[hoveredSection]}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default function App() {
    const [activeSystem, setActiveSystem] = useState('VENOSO');
    const [cartography, setCartography] = useState('USF');
    const [leg, setLeg] = useState('DERECHA');
    const [toolPage, setToolPage] = useState(0);
    const [activePerfViews, setActivePerfViews] = useState('ALL');

    const togglePerfView = (view) => {
        setActivePerfViews(prev => prev === view ? 'ALL' : view);
    };

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isLegendModalOpen, setIsLegendModalOpen] = useState(false);
    const [locationModalPerforatorId, setLocationModalPerforatorId] = useState(null);
    const [isPerfModalOpen, setIsPerfModalOpen] = useState(false);
    const [legendSystem, setLegendSystem] = useState('ARTERIAL');
    const [reportContent, setReportContent] = useState("");
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    const [activeMeasureTool, setActiveMeasureTool] = useState(null);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [bypassDrawingMode, setBypassDrawingMode] = useState(null);
    const [pendingVarice, setPendingVarice] = useState(null);
    const [freeVaricesMode, setFreeVaricesMode] = useState(false);
    const [pendingFreeVarice, setPendingFreeVarice] = useState(null);

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 1024;
    const isIPad = windowWidth > 768 && windowWidth <= 1024;

    // --- AUTOGUARDADO Y MÁQUINA DEL TIEMPO ---
    const [globalArteryStatesBase, setGlobalArteryStatesBase] = useState(() => {
        try {
            const draft = localStorage.getItem('doppler_draft_state');
            return draft ? JSON.parse(draft) : { 'DERECHA': {}, 'IZQUIERDA': {} };
        } catch (e) {
            return { 'DERECHA': {}, 'IZQUIERDA': {} };
        }
    });

    const historyStack = useRef([]);
    const historyPointer = useRef(-1);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    useEffect(() => {
        if (historyStack.current.length === 0) {
            historyStack.current.push(JSON.stringify(globalArteryStatesBase));
            historyPointer.current = 0;
        }
    }, []);

    const updateHistoryState = () => {
        setCanUndo(historyPointer.current > 0);
        setCanRedo(historyPointer.current < historyStack.current.length - 1);
    };

    const setGlobalArteryStates = (updater) => {
        setGlobalArteryStatesBase(prev => {
            const nextState = typeof updater === 'function' ? updater(prev) : updater;
            const nextStr = JSON.stringify(nextState);
            const currentStr = historyStack.current[historyPointer.current];
            
            if (nextStr !== currentStr) {
                if (historyPointer.current < historyStack.current.length - 1) {
                    historyStack.current = historyStack.current.slice(0, historyPointer.current + 1);
                }
                historyStack.current.push(nextStr);
                if (historyStack.current.length > 15) {
                    historyStack.current.shift();
                } else {
                    historyPointer.current++;
                }
                setTimeout(updateHistoryState, 0);
            }
            return nextState;
        });
    };

    const undoTimeMachine = () => {
        if (historyPointer.current > 0) {
            historyPointer.current--;
            const prevStateStr = historyStack.current[historyPointer.current];
            setGlobalArteryStatesBase(JSON.parse(prevStateStr));
            updateHistoryState();
        }
    };

    const redoTimeMachine = () => {
        if (historyPointer.current < historyStack.current.length - 1) {
            historyPointer.current++;
            const nextStateStr = historyStack.current[historyPointer.current];
            setGlobalArteryStatesBase(JSON.parse(nextStateStr));
            updateHistoryState();
        }
    };

    const globalArteryStates = globalArteryStatesBase;

    useEffect(() => {
        try {
            localStorage.setItem('doppler_draft_state', JSON.stringify(globalArteryStates));
        } catch (e) { }
    }, [globalArteryStates]);

    const [customGrids, setCustomGrids] = useState(() => {
        try {
            const saved = localStorage.getItem('customToolGrids');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.VENOSO) {
                    if (parsed.VENOSO.includes('varices') || parsed.VENOSO.includes('cross_cycle') || parsed.VENOSO.includes('free_varices') || !parsed.VENOSO.includes('varicose_source')) {
                        parsed.VENOSO = parsed.VENOSO.filter(t => t !== 'varices' && t !== 'cross_cycle' && t !== 'free_varices');
                        if (!parsed.VENOSO.includes('varicose_source')) parsed.VENOSO.unshift('varicose_source');
                    }
                }

                if (
                    !parsed.VENOSO || !parsed.PIERNA || !parsed.CAROTIDA || !parsed.PERF ||
                    !parsed.PERF.includes('perf_metrics') ||
                    !parsed.PIERNA.includes('cross_cycle') ||
                    !parsed.CAROTIDA.includes('cross_cycle')
                ) {
                    return DEFAULT_TOOL_GRIDS;
                }
                return parsed;
            }
            return DEFAULT_TOOL_GRIDS;
        } catch (e) { return DEFAULT_TOOL_GRIDS; }
    });

    const [isEditingGrid, setIsEditingGrid] = useState(false);
    const [toolToSwap, setToolToSwap] = useState(null);

    const [isLeftHanded, setIsLeftHanded] = useState(() => {
        try { return localStorage.getItem('isLeftHanded') === 'true'; } catch (e) { return false; }
    });
    const [hoveredElementId, setHoveredElementId] = useState(null);

    const [thumbOffset, setThumbOffset] = useState(() => {
        try { const val = localStorage.getItem('thumbOffset'); return val ? parseInt(val, 10) : 20; } catch (e) { return 20; }
    });

    const [hiddenTools, setHiddenTools] = useState(() => {
        try { const saved = localStorage.getItem('hiddenTools'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
    });

    useEffect(() => { try { localStorage.setItem('isLeftHanded', isLeftHanded); } catch (e) { } }, [isLeftHanded]);
    useEffect(() => { try { localStorage.setItem('thumbOffset', thumbOffset); } catch (e) { } }, [thumbOffset]);
    useEffect(() => { try { localStorage.setItem('customToolGrids', JSON.stringify(customGrids)); } catch (e) { } }, [customGrids]);
    useEffect(() => { try { localStorage.setItem('hiddenTools', JSON.stringify(hiddenTools)); } catch (e) { } }, [hiddenTools]);

    const arteryStates = globalArteryStates[leg] || {};

    const setArteryProp = (id, prop, val) => {
        setGlobalArteryStates(prev => ({
            ...prev, [leg]: { ...prev[leg], [id]: { ...(prev[leg][id] || {}), [prop]: val } }
        }));
    };

    const filteredPerforantes = PERFORANTES_SEGMENTS.filter(seg => {
        if (activePerfViews === 'ALL') return true;
        let baseId = seg.id;
        if (baseId.startsWith('ghost_sup_')) baseId = baseId.replace('ghost_sup_', '');
        else if (baseId.startsWith('ghost_deep_')) baseId = baseId.replace('ghost_deep_', '');
        const view = PERFORATOR_VIEWS[baseId];
        if (!view) return true;
        return activePerfViews === view;
    });

    const currentSegments = cartography === 'PIERNA' ? ARTERIAL_SEGMENTS : cartography === 'CAROTIDA' ? CAROTID_SEGMENTS : cartography === 'USP' ? USP_SEGMENTS : cartography === 'ANT' ? ANT_SEGMENTS : cartography === 'SVP' ? SVP_SEGMENTS : cartography === 'LATERAL' ? LATERAL_SEGMENTS : cartography === 'PERF' ? filteredPerforantes : USF_SEGMENTS;

    const [activeElement, setActiveElement] = useState({ type: 'segment', id: 'femoral_comun' });
    const ALL_APP_SEGMENTS = [...SVP_SEGMENTS, ...USF_SEGMENTS, ...USP_SEGMENTS, ...CAROTID_SEGMENTS, ...ARTERIAL_SEGMENTS, ...ANT_SEGMENTS, ...LATERAL_SEGMENTS, ...PERFORANTES_SEGMENTS];
    const activeSegmentDetails = activeElement?.type === 'segment' ? currentSegments.find(a => a.id === activeElement.id) || ALL_APP_SEGMENTS.find(a => a.id === activeElement.id) : null;

    const switchSystem = (sys) => {
        setActiveSystem(sys);
        setToolPage(0);
        setIsEditingGrid(false);
        setToolToSwap(null);
        if (sys === 'ARTERIAL') {
            setCartography('PIERNA');
            setActiveElement({ type: 'segment', id: 'femoral_comun' });
        } else {
            setCartography('USF');
            setActiveElement({ type: 'segment', id: 'sfj' });
        }
        setActiveColor(null); setActivePared([]); setActiveFocal([]); setActiveInterventions([]);
    };

    const switchCartography = (view) => {
        setCartography(view);
        setToolPage(0);
        setIsEditingGrid(false);
        setToolToSwap(null);
        setActiveElement({ type: 'segment', id: view === 'PIERNA' ? 'femoral_comun' : view === 'CAROTIDA' ? 'cca_prox' : view === 'USP' ? 'usp' : view === 'SVP' ? 'vfc' : view === 'PERF' ? 'perf_hunter' : view === 'LATERAL' ? 'v_lateral_pierna' : view === 'ANT' ? 'vsaa' : 'sfj' });
        setActiveColor(null); setActivePared([]); setActiveFocal([]); setActiveInterventions([]);
    };

    const setLegAndReset = (newLeg) => {
        setLeg(newLeg);
    };

    const handleToolSwap = (clickedToolId) => {
        if (clickedToolId === null) {
            setToolToSwap(null);
            return;
        }

        if (!toolToSwap) {
            setToolToSwap(clickedToolId);
        } else {
            setCustomGrids(prev => {
                const newGrids = { ...prev };
                const currentGridKey = cartography === 'PERF' ? 'PERF' : (activeSystem === 'VENOSO' ? 'VENOSO' : cartography);
                const gridArray = [...(newGrids[currentGridKey] || DEFAULT_TOOL_GRIDS[currentGridKey])];

                const idx1 = gridArray.indexOf(toolToSwap);
                const idx2 = gridArray.indexOf(clickedToolId);

                if (idx1 !== -1 && idx2 !== -1) {
                    [gridArray[idx1], gridArray[idx2]] = [gridArray[idx2], gridArray[idx1]];
                    newGrids[currentGridKey] = gridArray;
                }
                return newGrids;
            });
            setToolToSwap(null);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
                
                if (activeElement) {
                    setGlobalArteryStates(prev => {
                        const st = { ...prev[leg] };
                        const segState = { ...(st[activeElement.id] || {}) };
                        segState.attachedImage = compressedBase64;
                        st[activeElement.id] = segState;
                        return { ...prev, [leg]: st };
                    });
                }
                
                // Reset input to allow uploading the same file again if needed
                e.target.value = null;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
        reader.readAsDataURL(file);
    };

    const handleLoadHistoricalStudy = (study) => {
        if (study.name === 'SIM-001') {
            alert("Este es un estudio simulado. En producción, cargaría el mapa y el reporte exacto almacenado en MariaDB.");
            setIsHistoryModalOpen(false);
            return;
        }

        try {
            if (study.datos_doppler && study.datos_doppler !== '{}') {
                const parsedData = JSON.parse(study.datos_doppler);
                setGlobalArteryStates(parsedData);
            }
            
            if (study.informe_doppler) {
                setReportContent(study.informe_doppler);
            } else {
                setReportContent('');
            }

            const currentFpp = getFrappe();
            if (currentFpp) {
                currentFpp.show_alert({ message: `✅ Estudio ${study.name} cargado en el mapa`, indicator: 'green' });
            }
            
            setIsHistoryModalOpen(false);
            
            // Si el estudio cargado tiene reporte, sugerimos abrirlo
            if (study.informe_doppler    const handleToolClick = (toolId) => {
        const tool = TOOLS_MAP[toolId];
        if (!tool && toolId !== 'clear_segment' && toolId !== 'upload_spectrum' && toolId !== 'upload_reflux' && toolId !== 'bypass') return;

        // Comportamiento Seguro: Requiere vaso activo para todo menos global y bypass
        if (tool?.category !== 'global' && toolId !== 'bypass') {
            if (!activeElement) {
                if (window.frappe) window.frappe.show_alert({ message: "Selecciona un vaso primero", indicator: 'orange' });
                else alert("Selecciona un segmento vascular primero.");
                return;
            }
        }

        if (toolId === 'clear_segment') {
            setGlobalArteryStates(prev => {
                const legState = { ...prev[leg] };
                delete legState[activeElement.id];
                
                if (legState.GLOBAL && legState.GLOBAL.bypasses) {
                    legState.GLOBAL.bypasses = legState.GLOBAL.bypasses.filter(bp => bp.from !== activeElement.id && bp.to !== activeElement.id);
                }
                return { ...prev, [leg]: legState };
            });
            return;
        }

        if (toolId === 'upload_spectrum' || toolId === 'upload_reflux') {
            const fileInput = document.getElementById('image-upload-input');
            if (fileInput) fileInput.click();
            return;
        }

        if (toolId === 'varicose_source') {
            const segmentState = arteryStates[leg]?.[activeElement.id] || {};
            const focalArray = Array.isArray(segmentState.focal) ? segmentState.focal : (segmentState.focal ? [segmentState.focal] : []);
            
            if (focalArray.includes('varicose_source')) {
                setArteryProp(activeElement.id, 'focal', focalArray.filter(f => f !== 'varicose_source'));
            } else {
                setPendingVarice({ segmentId: activeElement.id, leg });
            }
            return;
        }

        if (toolId === 'bypass') {
            if (bypassDrawingMode) {
                setBypassDrawingMode(null);
            } else {
                setBypassDrawingMode({ step: 1, fromSeg: null });
                setFreeVaricesMode(false);
            }
            return;
        }

        if (toolId === 'free_varices') {
            setFreeVaricesMode(prev => !prev);
            setBypassDrawingMode(null);
            return;
        }

        if (tool.category === 'global') {
            setGlobalArteryStates(prev => {
                const legState = prev[leg] || {};
                const globalData = legState.GLOBAL || {};
                const isActive = !!globalData[toolId];
                return {
                    ...prev,
                    [leg]: {
                        ...legState,
                        GLOBAL: {
                            ...globalData,
                            [toolId]: !isActive
                        }
                    }
                };
            });
            return;
        }

        if (tool.category === 'medicion') {
            setActiveMeasureTool(toolId);
            return;
        }

        const sState = arteryStates[activeElement.id] || {};
        if (tool.category === 'color') {
            const isActive = sState.color === toolId;
            setGlobalArteryStates(prev => {
                const legState = { ...prev[leg] };
                const newColor = isActive ? 'unmapped' : toolId;
                const updatedSegmentState = { ...(legState[activeElement.id] || {}), color: newColor };
                
                if (newColor === 'flow_absent') {
                    const SPECTRAL_IDS = ['multiphasic', 'multiphasic_broad', 'biphasic', 'monophasic', 'monophasic_antero', 'tardus', 'reversed_flow', 'turbulence', 'v_continuous', 'v_pulsatile'];
                    if (Array.isArray(updatedSegmentState.focal)) {
                        updatedSegmentState.focal = updatedSegmentState.focal.filter(f => !SPECTRAL_IDS.includes(f));
                    }
                    delete updatedSegmentState.psv;
                    delete updatedSegmentState.edv;
                    delete updatedSegmentState.ta;
                    delete updatedSegmentState.at;
                    delete updatedSegmentState.ratio;
                    delete updatedSegmentState.reflux;
                }
                
                legState[activeElement.id] = updatedSegmentState;
                return { ...prev, [leg]: legState };
            });
        } else {
            setGlobalArteryStates(prev => {
                const legState = prev[leg] || {};
                const elementState = legState[activeElement.id] || {};
                
                const isTrayecto = tool.category.startsWith('trayecto');
                const isIntervention = tool.category.startsWith('intervention');
                const targetProp = isIntervention ? 'interventions' : (isTrayecto ? 'pared' : 'focal');
                
                let newPared = Array.isArray(elementState.pared) ? elementState.pared.filter(i => i !== toolId) : [];
                let newFocal = Array.isArray(elementState.focal) ? elementState.focal.filter(i => i !== toolId) : [];
                let newInterventions = Array.isArray(elementState.interventions) ? elementState.interventions.filter(i => i !== toolId) : [];

                const wasActive = 
                    (Array.isArray(elementState.pared) && elementState.pared.includes(toolId)) || 
                    (Array.isArray(elementState.focal) && elementState.focal.includes(toolId)) || 
                    (Array.isArray(elementState.interventions) && elementState.interventions.includes(toolId));

                let newColor = elementState.color;

                if (!wasActive) {
                    const EXCLUSIVE_SPECTRAL = ['multiphasic', 'multiphasic_broad', 'biphasic', 'monophasic', 'monophasic_antero', 'tardus', 'reversed_flow', 'v_continuous', 'v_pulsatile'];
                    const EXCLUSIVE_DEVELOPMENT = ['v_aplastic', 'v_hypoplastic'];

                    if (toolId === 'cross_cycle') {
                        const has3 = newFocal.includes('cross_3');
                        const has2 = newFocal.includes('cross_2');
                        const has1 = newFocal.includes('cross_1');

                        newFocal = newFocal.filter(t => !['cross_3', 'cross_2', 'cross_1'].includes(t));

                        if (has3) newFocal.push('cross_2');
                        else if (has2) newFocal.push('cross_1');
                        else if (has1) { /* Leave empty */ }
                        else newFocal.push('cross_3');

                        const updatedElementState = { ...elementState, focal: newFocal };
                        return { ...prev, [leg]: { ...legState, [activeElement.id]: updatedElementState } };
                    }

                    if (targetProp === 'focal') {
                        if (EXCLUSIVE_SPECTRAL.includes(toolId)) {
                            newFocal = newFocal.filter(t => !EXCLUSIVE_SPECTRAL.includes(t));
                            if (newColor === 'flow_absent') newColor = 'unmapped';
                        }
                    }
                    
                    if (targetProp === 'pared') {
                        if (EXCLUSIVE_DEVELOPMENT.includes(toolId)) newPared = newPared.filter(t => !EXCLUSIVE_DEVELOPMENT.includes(t));
                    }

                    if (toolId === 'saphenectomy' || toolId === 'v_ablated') {
                        newPared = [];
                        newFocal = [];
                        const competing = toolId === 'saphenectomy' ? 'v_ablated' : 'saphenectomy';
                        newInterventions = newInterventions.filter(i => i !== competing);
                    }

                    if (targetProp === 'pared') newPared.push(toolId);
                    else if (targetProp === 'focal') newFocal.push(toolId);
                    else if (targetProp === 'interventions') newInterventions.push(toolId);
                }

                const updatedElementState = { 
                    ...elementState, 
                    color: newColor !== undefined ? newColor : elementState.color,
                    pared: newPared, 
                    focal: newFocal, 
                    interventions: newInterventions 
                };

                const newLegState = { ...legState, [activeElement.id]: updatedElementState };

                if (!wasActive && (toolId === 'saphenectomy' || toolId === 'v_ablated')) {
                    const competing = toolId === 'saphenectomy' ? 'v_ablated' : 'saphenectomy';
                    let currentId = activeElement.id;
                    while (currentId) {
                        const seg = currentSegments.find(s => s.id === currentId);
                        if (!seg || !seg.parentId) break;
                        currentId = seg.parentId;
                        
                        const parentState = legState[currentId] || {};
                        let pInterventions = Array.isArray(parentState.interventions) ? parentState.interventions.filter(i => i !== toolId && i !== competing) : [];
                        pInterventions.push(toolId);
                        
                        newLegState[currentId] = {
                            ...parentState,
                            pared: [], 
                            focal: [], 
                            interventions: pInterventions
                        };
                    }
                }

                return { 
                    ...prev, 
                    [leg]: newLegState
                };
            });
        }
    };

    const handleSegmentClick = (segmentId, isDragging = false, clonePayload = null) => {
        if (cartography === 'PERF') {
            if (segmentId.startsWith('ghost_deep_')) {
                const baseId = segmentId.replace('ghost_deep_', '');
                setLocationModalPerforatorId({ id: baseId, type: 'deep' });
                return;
            } else if (segmentId.startsWith('ghost_sup_')) {
                const baseId = segmentId.replace('ghost_sup_', '');
                setLocationModalPerforatorId({ id: baseId, type: 'sup' });
                return;
            }
        }

        if (clonePayload && isDragging) {
            setGlobalArteryStates(prev => {
                const legState = { ...prev[leg] };
                const existing = legState[segmentId] || {};
                const mergeUniq = (arr1, arr2) => Array.from(new Set([...(Array.isArray(arr1) ? arr1 : []), ...(Array.isArray(arr2) ? arr2 : [])]));
                
                legState[segmentId] = {
                    ...existing,
                    color: clonePayload.color && clonePayload.color !== 'unmapped' ? clonePayload.color : existing.color,
                    pared: mergeUniq(existing.pared, clonePayload.pared),
                    focal: mergeUniq(existing.focal, clonePayload.focal),
                    interventions: mergeUniq(existing.interventions, clonePayload.interventions),
                };
                return { ...prev, [leg]: legState };
            });
            // Optimizacion Pincel Magico: No cambiamos activeElement durante el drag masivo
            return;
        }

        if (bypassDrawingMode) {
            if (bypassDrawingMode.step === 1) {
                setBypassDrawingMode({ step: 2, fromSeg: segmentId });
                setActiveElement({ type: 'segment', id: segmentId });
            } else if (bypassDrawingMode.step === 2) {
                setGlobalArteryStates(prev => {
                    const legState = prev[leg] || {};
                    const globalData = legState.GLOBAL || {};
                    const bypasses = globalData.bypasses || [];
                    return {
                        ...prev,
                        [leg]: {
                            ...legState,
                            GLOBAL: {
                                ...globalData,
                                bypasses: [...bypasses, { id: Date.now(), from: bypassDrawingMode.fromSeg, to: segmentId }]
                            }
                        }
                    };
                });
                setBypassDrawingMode(null);
                setActiveElement({ type: 'segment', id: segmentId });
            }
            return;
        }

        setActiveElement({ type: 'segment', id: segmentId });
    };                };



                return { ...prev, [leg]: legState };
            });
            if (!isDragging) {
                setActiveColor(null); setActivePared([]); setActiveFocal([]); setActiveInterventions([]);
            }
        }
        setActiveElement({ type: 'segment', id: segmentId });
    };

    // --- INTEGRACIÓN: GUARDAR EN ERPNEXT ---
    const exportToERPNext = () => {
        const activeFrm = getForm();
        if (!activeFrm) {
            alert(`📡 SIMULADOR DE EXPORTACIÓN A HISTORIA CLÍNICA\n\nSi estuvieras en el hospital, el sistema enviaría los datos a MariaDB.\n\n✅ Borrador Local Purgado.`);
            setIsReportModalOpen(false);
            try { localStorage.removeItem('doppler_draft_state'); } catch (e) { }
            return;
        }

        setIsExporting(true);
        
        // Convertimos los datos complejos de React a Texto (String JSON)
        const datosComoTexto = JSON.stringify(globalArteryStates);
        
        // Inyección de datos al campo de Frappe (datos_doppler)
        activeFrm.set_value('datos_doppler', datosComoTexto)
            .then(() => {
                if (reportContent) {
                    return activeFrm.set_value('informe_doppler', reportContent);
                }
                return Promise.resolve();
            })
            .then(() => {
                // Ejecutar el guardado físico en MariaDB
                activeFrm.save();
                console.log("Datos persistidos exitosamente en MariaDB.");
                setIsExporting(false);
                const currentFpp = getFrappe();
                if (currentFpp) currentFpp.show_alert({ message: "✅ Estudio guardado exitosamente en MariaDB", indicator: 'green' });
                setIsReportModalOpen(false);
                try { localStorage.removeItem('doppler_draft_state'); } catch (e) { }
            })
            .catch(err => {
                setIsExporting(false);
                console.error("Error al guardar en ERPNext:", err);
                const currentFpp = getFrappe();
                if (currentFpp) currentFpp.msgprint({ title: "Error de Guardado", message: "Error al intentar guardar en la Base de Datos", indicator: 'red' });
            });
    };

    // --- Recuperación Dinámica del Contexto Hospitalario ---
    const fpp = getFrappe();
    const frm = getForm();

    const doctorName = fpp?.session?.user_fullname ? fpp.session.user_fullname : 'Dr. Especialista';
    const encounterId = frm?.doc?.parent_encounter ? frm.doc.parent_encounter : 'ENCOUNTER-0000';
    const patientId = frm?.doc?.patient ? frm.doc.patient : 'PACIENTE-0000';

    const getStudyFullName = (sys, cart) => {
        if (sys === 'ARTERIAL') return 'Eco Doppler Arterial de Miembros Inferiores';
        if (cart === 'CAROTIDA') return 'Eco Doppler de Troncos Supra-aórticos (Carotídeo y Vertebral)';
        if (sys === 'VENOSO') {
            return 'Eco Doppler Venoso de Miembros Inferiores (Sistema Venoso Superficial: USF+USP y Sistema Venoso Profundo: SVP)';
        }
        return `Eco Doppler ${sys === 'VENOSO' ? 'Venoso' : 'Arterial'}`;
    };

    const generateAIReport = async () => {
        setIsGeneratingReport(true);
        const studyFullName = getStudyFullName(activeSystem, cartography);
        const contextData = { TIPO_ESTUDIO: studyFullName, ESTUDIO: cartography, SISTEMA: activeSystem, DERECHA: {}, IZQUIERDA: {} };
        const getSegName = (id) => currentSegments.find(s => s.id === id)?.name || id;

        for (const currentLeg of ['DERECHA', 'IZQUIERDA']) {
            for (const [segId, data] of Object.entries(globalArteryStates[currentLeg])) {

                if (segId === 'GLOBAL') {
                    continue;
                }

                if (Object.keys(data).length > 0) {
                    const cleanedData = { ...data };
                    if (cleanedData.color) cleanedData.color = TOOLS_MAP[cleanedData.color]?.name || cleanedData.color;
                    if (cleanedData.pared) cleanedData.pared = cleanedData.pared.map(p => TOOLS_MAP[p]?.name || p);
                    if (cleanedData.focal) cleanedData.focal = cleanedData.focal.map(f => TOOLS_MAP[f]?.name || f);
                    if (cleanedData.interventions) cleanedData.interventions = cleanedData.interventions.map(i => TOOLS_MAP[i]?.name || i);

                    if (cleanedData.diameter) cleanedData.diametro = cleanedData.diameter + (activeSystem === 'VENOSO' ? ' mm' : ' cm');
                    if (cleanedData.reflux) cleanedData.tiempo_reflujo = cleanedData.reflux + ' ms';
                    if (cleanedData.height) cleanedData.altura = cleanedData.height + ' cm';
                    if (cleanedData.length) cleanedData.longitud = cleanedData.length + ' cm';
                    if (cleanedData.c5c6) cleanedData.condicion_clinica_c5c6 = "PRESENTE";
                    
                    if (cleanedData.focal && cleanedData.focal.includes('Fuente Varicosa')) {
                        cleanedData.ubicacion_en_piel_de_las_varices = cleanedData.varicose_location;
                        delete cleanedData.varicose_location;
                    }

                    delete cleanedData.diameter;
                    delete cleanedData.reflux;
                    delete cleanedData.height;
                    delete cleanedData.length;
                    delete cleanedData.c5c6;

                    contextData[currentLeg][getSegName(segId)] = cleanedData;
                }
            }
        }

        const prompt = `Actúa como un médico especialista en ecografía vascular. Redacta el informe médico narrativo final de un ${studyFullName} usando EXCLUSIVAMENTE los hallazgos registrados en el JSON adjunto.
      
      DATOS DEL ENCUENTRO:
      - Encounter ID: ${encounterId}
      - ID Paciente: ${patientId}
      - Médico Tratante: ${doctorName}
      - Estudio: ${studyFullName}
      
      REGLAS ESTRICTAS DE REDACCIÓN:
      1. Estructura el informe con los apartados: "Hallazgos Ecográficos" (separado por extremidad) y "Conclusión Diagnóstica".
      2. Escrutinio Total: Analiza exhaustivamente CADA segmento vascular provisto en el JSON. No omitas ningún vaso que tenga datos.
      3. Diagnósticos Gráficos (CRÍTICO): NO pases por alto NINGÚN hallazgo visual estampado en las venas/arterias (colores de flujo, placas, trombos, estenosis, compresiones, intervenciones previas como stents o bypass). Todo lo que esté en los arrays "color", "pared", "focal" o "interventions" DEBE estar en el informe de cada vaso.
      4. Venas Perforantes (CRÍTICO - CONSENSO SVS/AVF): Para clasificar una perforante como "Patológica", el consenso exige estrictamente 3 variables irrefutables que estarán en el JSON:
         A) "diametro" >= 3.5 mm.
         B) "tiempo_reflujo" > 500 ms.
         C) "condicion_clinica_c5c6" = "PRESENTE".
         Si la vena CUMPLE ESTAS 3 CONDICIONES, clasifícala como "Perforante Patológica".
         Si NO cumple las 3 condiciones, o si solo tiene el color "Perf. Incomp.", clasifícala ESTRICTAMENTE como "Perforante Incompetente". NUNCA la eleves al diagnóstico de "Patológica" sin las 3 variables.
      5. Hemodinámica: Si es un estudio Arterial, detalla siempre las velocidades (PSV, EDV) y Tiempos de Aceleración (TA) registrados.
      6. Nomenclatura: Usa terminología anatómica internacional (UIP) pero mantén SIEMPRE el epónimo clásico entre paréntesis para claridad clínica.
      7. Si una extremidad no tiene datos en el JSON, indica: "Sin alteraciones ecográficas detectables" o "No evaluada".
      8. Firma: Concluye el informe con la firma del médico tratante (${doctorName}).
      
      DATOS CRUDOS DEL ESTUDIO (JSON):
      ${JSON.stringify(contextData)}`;

        const currentFpp = getFrappe();
        if (!currentFpp) {
            // Simulador local si no estamos en ERPNext
            setTimeout(() => {
                setReportContent("📡 SIMULADOR DE IA (ERPNext no detectado)\n\nEn producción, ERPNext enviará este prompt a Gemini usando la API Key oculta en el backend y devolverá el texto aquí.\n\nPrompt Generado:\n" + prompt.substring(0, 200) + "...");
                setIsGeneratingReport(false);
                setIsReportModalOpen(true);
            }, 1500);
            return;
        }

        // Llamada real y segura al backend de ERPNext
        // Usamos la vía más segura y a prueba de fallos: una Custom App (Bania IA)
        const FRAPPE_APP_NAME = "bania"; 
        currentFpp.call({
            method: `${FRAPPE_APP_NAME}.api.consultar_gemini`,
            args: {
                prompt: prompt
            },
            callback: function (r) {
                setIsGeneratingReport(false);
                if (!r.exc && r.message) {
                    setReportContent(r.message);
                    setIsReportModalOpen(true);
                } else {
                    if (currentFpp) currentFpp.msgprint({ title: "Error IA", message: "Error al conectar con la Inteligencia Artificial a través de ERPNext.", indicator: 'red' });
                    else alert("Error al conectar con la Inteligencia Artificial a través de ERPNext.");
                }
            }
        });
    };

    const handleSaveMeasure = (values) => {
        if (!activeElement || !activeMeasureTool) return;
        setGlobalArteryStates(prev => {
            const legState = prev[leg] || {};
            const segState = legState[activeElement.id] || {};
            return {
                ...prev,
                [leg]: {
                    ...legState,
                    [activeElement.id]: {
                        ...segState,
                        ...(values.width !== undefined && { width: values.width, diameter: values.width }),
                        ...(values.length !== undefined && { length: values.length }),
                        ...(values.height !== undefined && { height: values.height }),
                        ...(values.ta !== undefined && { ta: values.ta, at: values.ta }),
                        ...(values.ratio !== undefined && { ratio: values.ratio }),
                        ...(values.psv !== undefined && { psv: values.psv }),
                        ...(values.edv !== undefined && { edv: values.edv }),
                        ...(values.reflux !== undefined && { reflux: values.reflux })
                    }
                }
            };
        });
        setActiveMeasureTool(null);
    };

    const clearActiveTools = () => { };

    const layoutFlexDir = isLeftHanded ? 'flex-row-reverse' : 'flex-row';

    const state = { activeSystem, cartography, leg, isLeftHanded, thumbOffset, arteryStates, activeElement, currentSegments, activeSegmentDetails, toolPage, customGrids, isEditingGrid, toolToSwap, isMobile, isIPad, windowWidth, activeMeasureTool, isRightSidebarOpen, isLegendModalOpen, hiddenTools, hoveredElementId, locationModalPerforatorId, activePerfViews, bypassDrawingMode, pendingVarice, canUndo, canRedo, freeVaricesMode, pendingFreeVarice };
    const actions = { clearActiveTools, switchSystem, setIsLeftHanded, setThumbOffset, handleToolClick, switchCartography, setLeg: setLegAndReset, setActiveElement, setGlobalArteryStates, handleSegmentClick, generateAIReport, isGeneratingReport, setToolPage, setIsEditingGrid, handleToolSwap, setActiveMeasureTool, setIsRightSidebarOpen, setIsLegendModalOpen, setIsPerfModalOpen, setIsHistoryModalOpen, setLegendSystem, setHoveredElementId, setLocationModalPerforatorId, togglePerfView, setBypassDrawingMode, setPendingVarice, undoTimeMachine, redoTimeMachine, setFreeVaricesMode, setPendingFreeVarice };

    return (
        <div className={`flex h-full w-full font-sans overflow-hidden selection:bg-cyan-500/30 touch-none overscroll-none ${isMobile ? 'flex-col' : layoutFlexDir}`} style={{ backgroundColor: THEME.bgApp, color: THEME.textMain }}>
            {/* INPUT INVISIBLE PARA SUBIR IMÁGENES */}
            <input type="file" id="image-upload-input" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            
            {/* BANNER FLOTANTE DE MODO BYPASS */}
            {bypassDrawingMode && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(37,99,235,0.6)] flex items-center gap-3 cursor-pointer hover:bg-red-600 transition-colors" onClick={() => setBypassDrawingMode(null)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M 4 12 C 8 2, 16 2, 20 12" /></svg>
                    <span>{bypassDrawingMode.step === 1 ? "Paso 1: Selecciona el vaso de INICIO" : "Paso 2: Selecciona el vaso de LLEGADA"}</span>
                    <span className="ml-2 text-white/50 text-[10px] uppercase">(Clic para Cancelar)</span>
                </div>
            )}



            {isMobile ? (
                <div className="flex flex-row flex-1 w-full relative overflow-hidden">
                    <SidebarLeft state={state} actions={actions} />
                    <MapCanvas state={state} actions={actions} />
                    <SidebarRight state={state} actions={actions} />
                </div>
            ) : (
                <>
                    <div className="flex shrink-0 w-[150px] h-full overflow-hidden">
                        <SidebarLeft state={state} actions={actions} />
                    </div>
                    <div style={{ width: '55%', flex: 1 }} className="flex shrink-0 relative h-full overflow-hidden">
                        <MapCanvas state={state} actions={actions} />
                    </div>
                    <div style={{ width: '30%', minWidth: '280px' }} className="flex shrink-0 h-full overflow-hidden">
                        <SidebarRight state={state} actions={actions} />
                    </div>
                </>
            )}

            {isLegendModalOpen && (
                <LegendModal onClose={() => setIsLegendModalOpen(false)} legendSystem={legendSystem} hiddenTools={hiddenTools} setHiddenTools={setHiddenTools} />
            )}

            <AnatomicalLocationModal 
                isOpen={!!locationModalPerforatorId} 
                onClose={() => setLocationModalPerforatorId(null)} 
                onNavigate={(id) => setLocationModalPerforatorId(id)}
                perforatorId={locationModalPerforatorId} 
            />

            <VariceLocationModal
                isOpen={!!pendingVarice}
                onClose={() => setPendingVarice(null)}
                pendingVarice={pendingVarice}
                onConfirm={(locName, variceData) => {
                    const segmentState = arteryStates[variceData.leg]?.[variceData.segmentId] || {};
                    const focalArray = Array.isArray(segmentState.focal) ? segmentState.focal : (segmentState.focal ? [segmentState.focal] : []);
                    
                    setGlobalArteryStates(prev => {
                        const legState = { ...prev[variceData.leg] };
                        const segState = legState[variceData.segmentId] || {};
                        return {
                            ...prev,
                            [variceData.leg]: {
                                ...legState,
                                [variceData.segmentId]: {
                                    ...segState,
                                    focal: [...focalArray, 'varicose_source'],
                                    varicose_location: locName
                                }
                            }
                        };
                    });
                    setPendingVarice(null);
                }}
            />

            <VariceLocationModal
                isOpen={!!pendingFreeVarice}
                onClose={() => setPendingFreeVarice(null)}
                pendingVarice={pendingFreeVarice}
                onConfirm={(locName, variceData) => {
                    setGlobalArteryStates(prev => {
                        const legState = prev[variceData.leg] || {};
                        const globalData = legState.GLOBAL || {};
                        const freeVarices = globalData.free_varices || [];
                        return {
                            ...prev,
                            [variceData.leg]: {
                                ...legState,
                                GLOBAL: {
                                    ...globalData,
                                    free_varices: [...freeVarices, { x: variceData.x, y: variceData.y, location: locName, id: Date.now() }]
                                }
                            }
                        };
                    });
                    setPendingFreeVarice(null);
                    setFreeVaricesMode(false);
                }}
            />

            <AIReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                reportContent={reportContent}
                setReportContent={setReportContent}
                onExport={exportToERPNext}
                isExporting={isExporting}
            />

            <MeasurementModal
                isOpen={!!activeMeasureTool}
                onClose={() => setActiveMeasureTool(null)}
                toolId={activeMeasureTool}
                segmentName={activeSegmentDetails?.name || ''}
                segmentState={activeElement ? (arteryStates[activeElement.id] || {}) : {}}
                onSave={handleSaveMeasure}
                activeSystem={activeSystem}
                isPerforator={activeSegmentDetails?.isPerforator}
            />

            <PerfMetricsModal 
                isOpen={isPerfModalOpen} 
                onClose={() => setIsPerfModalOpen(false)} 
                arteryStates={arteryStates} 
                setArteryProp={setArteryProp} 
                activeElement={activeElement} 
                currentSegments={currentSegments} 
            />
        </div>
    );
}
