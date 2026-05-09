import React, { useState, useEffect, useRef } from 'react';
import { Activity, MousePointerClick, AlertTriangle, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Droplet, Sparkles, Copy, X, Plus, CornerUpLeft, Settings2, Save, Flame, Snowflake, ActivitySquare, Trash2, Edit2, Camera, Waves, Info, ShieldAlert, CheckCircle2, Circle, ListChecks, Stethoscope, Power, User, History, Check, Bug, ClipboardList } from 'lucide-react';

// --- UTILIDADES FRAPPE ---
const getFrappe = () => typeof window !== 'undefined' && window.frappe ? window.frappe : null;
const getForm = () => typeof window !== 'undefined' && window.cur_frm ? window.cur_frm : null;
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
  
  green: '#10B981', 
  yellow: '#F59E0B', 
  orange: '#F97316', 
  red: '#EF4444',
  cyan: '#06B6D4', 
  blue: '#3B82F6', 
  black: '#000000', 
  grey: '#6B7280', 
  purple: '#8B5CF6',
  
  unmapped: '#525252',    
  unmappedAlt: '#333333'  
};

// --- ESTILOS UNIFICADOS DE BOTONES PRINCIPALES (CTA) ---
const UI_CLASSES = {
  primaryBtn: "bg-yellow-500 text-[#171717] shadow-[0_0_15px_rgba(245,158,11,0.4)] border border-yellow-400 hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] font-bold transition-all active:scale-95",
  secondaryBtn: "bg-[#262626] text-gray-400 border border-[#404040] hover:border-gray-500 hover:text-white shadow-inner font-bold transition-all active:scale-95"
};

// --- ICONOS DE EXAMEN FÍSICO VASCULAR ---
const IconPulseNormal = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M 2 12 L 6 12 L 10 4 L 14 20 L 18 12 L 22 12" /></svg>;
const IconPulseDim = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M 2 12 L 8 12 L 10 9 L 14 15 L 16 12 L 22 12" /></svg>;
const IconPulseAbsent = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...props}><line x1="2" y1="12" x2="22" y2="12" /></svg>;
const IconBruit = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M 4 12 C 4 8, 8 4, 12 4 C 16 4, 20 8, 20 12 C 20 16, 16 20, 12 20 C 8 20, 4 16, 4 12 Z" strokeDasharray="3 3"/><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>;
const IconUlcerVenous = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M 12 3 C 15 2, 21 6, 20 12 C 19 18, 14 22, 8 20 C 3 18, 2 11, 6 6 C 8 4, 10 4, 12 3 Z" fill="currentColor" fillOpacity="0.2" strokeDasharray="3 2" />
    <path d="M 12 8 C 14 7, 16 9, 15 12 C 14 15, 11 16, 8 15 C 7 14, 7 10, 8 8 C 9 7, 10 7, 12 8 Z" fill="currentColor" fillOpacity="0.6" stroke="none" />
  </svg>
);
const IconUlcerArterial = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.8" />
    <circle cx="12" cy="12" r="4" fill={THEME.bgApp} stroke="none" />
  </svg>
);
const IconUlcerNeuro = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M 12 2 L 16 8 C 18 11, 18 15, 16 18 L 12 22 L 8 18 C 6 15, 6 11, 8 8 Z" fill={THEME.bgApp} />
    <circle cx="12" cy="14" r="3" fill="currentColor" stroke="none" />
  </svg>
);
const IconNecrosis = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <defs>
      <clipPath id="fingerClip">
        <path d="M 6 22 C 6 16, 7 12, 7 8 C 7 3, 17 3, 17 8 C 17 12, 18 16, 18 22 Z" />
      </clipPath>
    </defs>
    
    {/* Mancha negra recortada exactamente por el contorno del dedo */}
    <g clipPath="url(#fingerClip)">
       <path d="M 0 12 C 8 8, 16 14, 24 12 V 0 H 0 Z" fill="currentColor" stroke="none" />
    </g>
    
    {/* Contorno dibujado encima */}
    <path d="M 6 22 C 6 16, 7 12, 7 8 C 7 3, 17 3, 17 8 C 17 12, 18 16, 18 22" />
    
    {/* Uña */}
    <path d="M 9.5 7.5 C 9.5 5.5, 14.5 5.5, 14.5 7.5 V 9.5 C 14.5 10.5, 9.5 10.5, 9.5 9.5 Z" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1" />
    
    {/* Pliegues articulares */}
    <path d="M 9 15 C 11 16, 13 16, 15 15" opacity="0.6" />
    <path d="M 10 17 C 11 17.5, 13 17.5, 14 17" opacity="0.6" />
  </svg>
);
const IconEdema = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M 12 3 L 12 12" strokeWidth="3" />
    <path d="M 7 16 C 9 18, 15 18, 17 16" strokeWidth="3" />
    <path d="M 5 12 C 8 10, 16 10, 19 12" strokeDasharray="2 3" />
  </svg>
);
const IconCyanosis = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Base del dedo */}
    <path d="M 8 18 V 22 M 16 18 V 22" strokeWidth="1.5" />
    
    {/* Dedo estrangulado e hinchado por isquemia */}
    <path d="M 8 16 C 4 10, 7 3, 12 3 C 17 3, 20 10, 16 16" strokeWidth="1.5" />
    
    {/* Uña */}
    <path d="M 10 6 C 10 4, 14 4, 14 6 V 8 C 14 9, 10 9, 10 8 Z" opacity="0.5" />
    
    {/* Extremos de la cuerda */}
    <path d="M 16 18 C 18 19, 20 21, 21 22" strokeWidth="1.5" />
    <path d="M 15 18 C 16 20, 16 21, 17 23" strokeWidth="1.5" />
    
    {/* Cuerda enrollada apretando la base (Torniquete) */}
    <path d="M 6 17 C 6 14.5, 18 14.5, 18 17 C 18 19.5, 6 19.5, 6 17 Z" fill="currentColor" opacity="0.8" stroke="none" />
  </svg>
);
const IconRubor = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.3" strokeDasharray="4 4" />
  </svg>
);
const IconPallor = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" fill="#FFF" fillOpacity="0.8" stroke="#CCC" />
  </svg>
);
const IconHairLoss = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Piel */}
    <path d="M 3 14 C 7 14, 9 14, 10.5 16 C 11 17, 13 17, 13.5 16 C 15 14, 17 14, 21 14" strokeWidth="2" />
    
    {/* Bulbo folicular */}
    <path d="M 10.5 16 C 10.5 20, 10 22, 12 22 C 14 22, 13.5 20, 13.5 16" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
    <circle cx="12" cy="20.5" r="1" fill="currentColor" stroke="none" />
    
    {/* Pelo suelto (con espacio en la raíz para indicar desprendimiento) */}
    <path d="M 12 15 C 12 9, 17 7, 16 3 C 15.5 1, 12 2, 11 4" strokeWidth="1.5" />
    <path d="M 12 19 L 12 17.5" strokeWidth="1.5" strokeLinecap="round" />

    {/* Línea roja diagonal de prohibición indicando 'NO cabello' */}
    <line x1="4" y1="4" x2="20" y2="20" stroke="#EF4444" strokeWidth="2.5" opacity="0.9" />
  </svg>
);
const IconAmputation = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="4 4" strokeWidth="3" />
    <circle cx="12" cy="6" r="2" />
    <path d="M 12 8 L 12 12" />
  </svg>
);
const IconVarices = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M 9 2 C 15 6, 5 10, 11 14 C 17 18, 7 22, 13 24" strokeWidth="2.5" />
    <path d="M 12 11 C 16 10, 18 14, 21 12" strokeWidth="1.5" />
    <path d="M 10 16 C 6 18, 4 14, 2 16" strokeWidth="1.5" />
  </svg>
);
const IconSpiderVeins = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M 12 12 L 12 4 M 12 12 L 18 8 M 12 12 L 20 16 M 12 12 L 12 20 M 12 12 L 6 18 M 12 12 L 4 10" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);
const IconThickNails = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Contorno del Dedo */}
    <path d="M 6 22 V 12 C 6 7, 18 7, 18 12 V 22" />
    <path d="M 9 16 C 11 16.5, 13 16.5, 15 16" opacity="0.6" />
    
    {/* Base de la Uña */}
    <path d="M 8.5 10.5 C 8.5 13, 15.5 13, 15.5 10.5" />
    
    {/* Crecimiento Masivo y Deforme de la Uña (Engrosamiento / Onicogrifosis) */}
    <path d="M 8.5 10.5 C 8 3, 16 2, 15.5 10.5" fill="currentColor" fillOpacity="0.3" />
    
    {/* Textura Rugosa / Estrías de la Uña Engrosada */}
    <path d="M 10 8.5 C 11 7.5, 13 7.5, 14 8.5" opacity="0.7" />
    <path d="M 10.5 6.5 C 11.5 5.5, 12.5 5.5, 13.5 6.5" opacity="0.7" />
    <path d="M 11 4.5 C 11.5 4, 12.5 4, 13 4.5" opacity="0.7" />
  </svg>
);
const IconOchre = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Pierna anatómica (pantorrilla ancha, tobillo estrecho) */}
    <path d="M 7 2 C 7 8, 4 12, 6 18 C 6 20, 6 22, 10 22 C 14 22, 15 20, 14 18 C 15 12, 17 8, 15 2" strokeWidth="1.5" />
    
    {/* Zona de pigmentación (polaina / tercio distal) */}
    <path d="M 5 13 C 9 14, 15 14, 15 13 V 18 C 15 20, 14 22, 10 22 C 6 22, 6 20, 6 18 Z" fill="currentColor" fillOpacity="0.2" stroke="none" />
    
    {/* Punteado de hemosiderina denso */}
    <circle cx="8" cy="15" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="11" cy="14" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="13" cy="16" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="9" cy="17" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="18" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="7" cy="19" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="11" cy="20" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="14" cy="18" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="10" cy="16" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="8" cy="21" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconLipodermato = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Forma de botella de champán invertida */}
    <path d="M 6 2 C 6 8, 9 12, 9 18 C 9 20, 10.5 22, 12 22 C 13.5 22, 15 20, 15 18 C 15 12, 18 8, 18 2" strokeWidth="1.5" />
    {/* Placa endurecida/Atrofia blanca en el centro */}
    <path d="M 10 14 C 10 12, 14 12, 14 14 C 14 16, 10 16, 10 14 Z" fill="currentColor" fillOpacity="0.4" />
    <path d="M 9 18 L 15 18" opacity="0.4" strokeDasharray="1 2" />
    <path d="M 8 10 L 16 10" opacity="0.4" strokeDasharray="1 2" />
  </svg>
);

const IconHealedUlcer = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.1" strokeDasharray="2 2" />
    <path d="M 9 12 L 11 14 L 15 10" strokeWidth="2" />
  </svg>
);

const IconCorona = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Pie de perfil (tobillo y talón) */}
    <path d="M 10 2 V 12 C 10 16, 6 18, 4 18 C 4 21, 8 22, 12 22 C 16 22, 18 20, 18 16 V 2" strokeWidth="1.5" />
    <circle cx="14" cy="16" r="1.5" opacity="0.5" /> {/* Maléolo */}
    {/* Estrellas vasculares */}
    <path d="M 12 18 L 10 20 M 11 19 L 13 21 M 15 18 L 17 20 M 16 19 L 14 21" strokeWidth="1" stroke="currentColor" />
  </svg>
);

const IconStemmer = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Dedo del pie engrosado */}
    <path d="M 6 22 V 10 C 6 5, 18 5, 18 10 V 22" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
    {/* Pliegue grueso imposible de pinzar */}
    <path d="M 9 10 C 9 6, 15 6, 15 10" strokeWidth="3" />
    {/* Pinzas resbalando / Intentando agarrar */}
    <path d="M 4 2 C 7 5, 8 8, 8 10" strokeWidth="1.5" />
    <path d="M 20 2 C 17 5, 16 8, 16 10" strokeWidth="1.5" />
    <path d="M 2 4 L 5 2 M 22 4 L 19 2" strokeWidth="1" /> {/* Lineas de fuerza/resbalón */}
  </svg>
);

const IconPapilloma = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M 2 18 L 22 18" strokeWidth="2" opacity="0.5" />
    {/* Superficie verrugosa */}
    <path d="M 3 18 C 3 13, 6 13, 7 18 C 7 12, 11 12, 12 18 C 12 14, 15 14, 16 18 C 16 11, 21 11, 21 18" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const IconOrangeSkin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
    {/* Hoyuelos/poros uniformes */}
    <circle cx="9" cy="8" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="8" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="8" cy="13" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="13" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="10" cy="16" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="14" cy="16" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconLymphorrhea = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Superficie de la pierna hinchada */}
    <path d="M 4 2 C 4 12, 6 18, 12 22 C 18 18, 20 12, 20 2" strokeWidth="1.5" opacity="0.6" />
    {/* Gotas cayendo (Linforrea) */}
    <path d="M 12 10 C 10 13, 10 15, 12 15 C 14 15, 14 13, 12 10 Z" fill="currentColor" stroke="none" />
    <path d="M 8 14 C 7 16, 7 17, 8 17 C 9 17, 9 16, 8 14 Z" fill="currentColor" stroke="none" opacity="0.7" />
    <path d="M 16 16 C 15 18, 15 19, 16 19 C 17 19, 17 18, 16 16 Z" fill="currentColor" stroke="none" opacity="0.5" />
  </svg>
);

const IconEczema = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Contorno de la pierna (similar a Ocre) */}
    <path d="M 7 2 C 7 8, 4 12, 6 18 C 6 20, 6 22, 10 22 C 14 22, 15 20, 14 18 C 15 12, 17 8, 15 2" strokeWidth="1.5" />
    {/* Mancha irregular de Eczema / Dermatitis por estasis */}
    <path d="M 6 13 Q 9 11 12 12 T 15 15 Q 12 18 8 16 T 6 13 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeDasharray="1 2" />
    {/* Fisuras / rascado (excoriaciones) */}
    <path d="M 8 13 L 10 14 L 9 16" stroke="currentColor" strokeWidth="1" />
    <path d="M 12 13 L 13 15 L 11 16" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const IconCapillaryRefill = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Contorno del dedo */}
    <path d="M 6 22 V 12 C 6 7, 18 7, 18 12 V 22" fill="currentColor" fillOpacity="0.1" />
    {/* Dedo presionando (arriba) */}
    <path d="M 12 2 V 7" strokeWidth="2" />
    <path d="M 9 6 L 12 8 L 15 6" strokeWidth="1.5" />
    {/* Zona de palidez (blanca) por la presión */}
    <circle cx="12" cy="12" r="4" fill="#ffffff" stroke="none" opacity="0.9" />
    {/* Flecha circular o reloj indicando retardo */}
    <path d="M 16 16 A 4 4 0 1 1 12 20" strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M 16 16 L 18 15 M 16 16 L 15 14" strokeWidth="1.5" />
  </svg>
);

const IconBuerger = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Pierna colgando (vista lateral, hacia abajo) */}
    <path d="M 12 2 V 14 C 12 18, 16 20, 20 20 C 22 20, 22 18, 20 16 L 16 14 V 2" strokeWidth="1.5" />
    {/* Flecha indicando gravedad / colgando */}
    <path d="M 6 4 V 16 M 4 14 L 6 17 L 8 14" strokeWidth="1.5" />
    {/* Sombreado indicando rubor distal intenso */}
    <path d="M 12 12 V 14 C 12 18, 16 20, 20 20 C 22 20, 22 18, 20 16 L 16 14 Z" fill="currentColor" fillOpacity="0.5" stroke="none" />
  </svg>
);

const IconClaudication = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Pantorrilla de perfil (músculo gemelo prominente) */}
    <path d="M 8 2 V 6 C 8 14, 18 12, 16 20 V 22 H 10 V 20 C 10 16, 2 12, 8 2 Z" strokeWidth="1.5" opacity="0.5" />
    {/* Rayo de dolor en la masa muscular */}
    <path d="M 13 6 L 9 12 H 13 L 11 18 L 17 10 H 13 L 15 6 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const IconVesicles = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Piel edematizada */}
    <path d="M 2 16 C 6 14, 18 14, 22 16 V 22 H 2 Z" fill="currentColor" fillOpacity="0.1" stroke="none" />
    <path d="M 2 16 C 6 14, 18 14, 22 16" strokeWidth="1.5" />
    {/* Vesículas (ampollas) sobre la piel */}
    <path d="M 6 15 C 6 12, 10 12, 10 15" strokeWidth="1.5" fill="none" />
    <path d="M 11 14.5 C 11 10, 17 10, 17 14.5" strokeWidth="1.5" fill="none" />
    <path d="M 18 15 C 18 13, 21 13, 21 15" strokeWidth="1.5" fill="none" />
    {/* Brillo del líquido adentro */}
    <circle cx="8" cy="13.5" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="14" cy="12" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="19.5" cy="14" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconRestPain = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Cama / Superficie horizontal */}
    <line x1="2" y1="20" x2="22" y2="20" strokeWidth="2" opacity="0.5" />
    {/* Pie acostado */}
    <path d="M 4 20 L 4 16 C 4 13, 8 12, 12 16 H 18 C 21 16, 21 20, 18 20 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
    {/* Rayo de dolor isquémico (foco en el antepié/dedos, típico de dolor de reposo) */}
    <path d="M 19 9 L 16 13 H 19 L 17 17" fill="currentColor" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const IconHeaviness = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Pesa rusa / Kettlebell o Yunque */}
    <path d="M 8 10 H 16 M 9 10 V 7 C 9 5, 15 5, 15 7 V 10" strokeWidth="1.5" />
    <path d="M 6 10 H 18 C 19 10, 20 12, 20 16 C 20 20, 18 22, 12 22 C 6 22, 4 20, 4 16 C 4 12, 5 10, 6 10 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
    <path d="M 12 14 V 18 M 10 16 H 14" strokeWidth="1" />
  </svg>
);

const IconCramps = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Pierna en flexión brusca (espasmo) */}
    <path d="M 8 2 V 6 C 8 14, 18 12, 16 20 V 22 H 10 V 20 C 10 16, 2 12, 8 2 Z" strokeWidth="1.5" opacity="0.3" />
    {/* Líneas de espasmo muscular (zigzag de contracción) */}
    <path d="M 4 10 L 7 12 L 4 14" strokeWidth="1.5" />
    <path d="M 20 10 L 17 12 L 20 14" strokeWidth="1.5" />
    <path d="M 12 6 C 10 9, 14 13, 12 16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

const IconItching = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Superficie de piel */}
    <path d="M 4 18 C 8 16, 16 16, 20 18" strokeWidth="1.5" />
    {/* Uñas / Líneas de rascado rojas */}
    <path d="M 6 8 L 8 14" strokeWidth="1.5" stroke="currentColor" />
    <path d="M 12 6 L 14 13" strokeWidth="1.5" stroke="currentColor" />
    <path d="M 18 8 L 16 15" strokeWidth="1.5" stroke="currentColor" />
    {/* Partículas de descamación / irritación */}
    <circle cx="10" cy="16" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="17" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconBurning = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Superficie de piel */}
    <path d="M 3 18 C 9 20, 15 20, 21 18" strokeWidth="1.5" />
    {/* Llamas de ardor emergiendo de la piel */}
    <path d="M 12 18 C 12 18, 9 14, 9 10 C 9 6, 12 2, 12 2 C 12 2, 15 6, 15 10 C 15 14, 12 18, 12 18 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" />
    <path d="M 7 17 C 7 17, 5 14, 5 11 C 5 8, 7 5, 7 5 C 7 5, 9 8, 9 11 C 9 14, 7 17, 7 17 Z" strokeWidth="1.5" />
    <path d="M 17 17 C 17 17, 15 14, 15 11 C 15 8, 17 5, 17 5 C 17 5, 19 8, 19 11 C 19 14, 17 17, 17 17 Z" strokeWidth="1.5" />
  </svg>
);

const IconCircleCross = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);
const IconScalpel = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <g transform="rotate(0 12 12)">
      <rect x="3" y="10.5" width="10" height="3" rx="0.5" fill="currentColor" fillOpacity="0.2" />
      <line x1="5" y1="10.5" x2="5" y2="13.5" />
      <line x1="7" y1="10.5" x2="7" y2="13.5" />
      <line x1="9" y1="10.5" x2="9" y2="13.5" />
      <path d="M 13 10.5 L 22 10.5 C 22 10.5, 22 16, 18 16 L 13 13.5 Z" fill="currentColor" fillOpacity="0.6" stroke="none" />
      <path d="M 13 10.5 L 22 10.5 C 22 10.5, 22 16, 18 16 L 13 13.5 Z" />
    </g>
  </svg>
);

const IconDrawVarice = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <g transform="translate(7, -6) scale(0.7)">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeWidth="1.5" />
        <path d="M15 5l4 4" strokeWidth="1.5" />
    </g>
    <path d="M 8.5 9 C 14 10, 2 13, 9 16 C 15 19, 1 20, 7 23" strokeWidth="2.5" />
  </svg>
);

const IconDrawTelangiectasia = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <g transform="translate(7, -6) scale(0.7)">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeWidth="1.5" />
        <path d="M15 5l4 4" strokeWidth="1.5" />
    </g>
    <path d="M 8.5 9 Q 6 13, 6 17 M 7 11 Q 3 13, 2 15 M 6 13 Q 11 15, 12 18 M 6 15 Q 4 19, 3 21" strokeWidth="0.8" />
  </svg>
);

const IconDrawGeneric = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <g transform="translate(7, -6) scale(0.7)">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeWidth="1.5" />
        <path d="M15 5l4 4" strokeWidth="1.5" />
    </g>
    <path d="M 8.5 9 Q 5 15, 12 16 T 20 20" strokeWidth="2" />
  </svg>
);

// --- MATRIZ DE HERRAMIENTAS VINCULADA A PROTOCOLOS (SOLO SIGNOS FÍSICOS) ---
const MASTER_TOOLS = [
  { id: 'pulse_normal', name: 'Pulso Presente', icon: IconPulseNormal, hex: THEME.cyan, category: 'pulso', protocols: ['RECTA', 'WIFI'], system: 'arterial', type: 'signo' },
  { id: 'pulse_dim', name: 'Pulso Disminuido', icon: IconPulseDim, hex: THEME.yellow, category: 'pulso', protocols: ['RECTA', 'WIFI'], system: 'arterial', type: 'signo' },
  { id: 'pulse_absent', name: 'Pulso Ausente', icon: IconPulseAbsent, hex: THEME.red, category: 'pulso', protocols: ['RECTA', 'WIFI'], system: 'arterial', type: 'signo' },
  { id: 'bruit', name: 'Soplo / Frémito', icon: IconBruit, hex: THEME.orange, category: 'pulso', protocols: ['RECTA'], system: 'arterial', type: 'signo' },
  { id: 'edema', name: 'Edema', icon: IconEdema, hex: THEME.cyan, category: 'piel', protocols: ['CEAP', 'CLAVE'], system: 'venoso', type: 'signo' },
  { id: 'cyanosis', name: 'Isquemia', icon: IconCyanosis, hex: THEME.purple, category: 'lesion', protocols: ['CEAP', 'WIFI'], system: 'arterial', type: 'signo' },
  { id: 'rubor', name: 'Eritema', icon: IconRubor, hex: THEME.red, category: 'piel', protocols: ['CEAP', 'WIFI'], system: 'venoso', type: 'signo' },
  { id: 'pallor', name: 'Palidez', icon: IconPallor, hex: THEME.textMain, category: 'lesion', protocols: ['CEAP', 'WIFI'], system: 'arterial', type: 'signo' },
  { id: 'cold', name: 'Frialdad', icon: Snowflake, hex: THEME.blue, category: 'lesion', protocols: ['WIFI'], system: 'arterial', type: 'signo' },
  { id: 'hot', name: 'Calor', icon: Flame, hex: THEME.orange, category: 'piel', protocols: ['WIFI'], system: 'venoso', type: 'signo' },
  { id: 'telangiectasia', name: 'Telangiectasias', icon: IconSpiderVeins, hex: THEME.purple, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'signo' },
  { id: 'varices', name: 'Várices', icon: IconVarices, hex: '#FF1A1A', category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'signo' }, 
  { id: 'lymphedema', name: 'Linfedema', icon: Waves, hex: THEME.green, category: 'piel', protocols: ['CLAVE', 'CEAP'], system: 'linfatico', type: 'signo' },
  { id: 'hair_loss', name: 'Pérdida de Vello', icon: IconHairLoss, hex: THEME.textMuted, category: 'lesion', protocols: ['RECTA'], system: 'arterial', type: 'signo' },
  { id: 'thick_nails', name: 'Uñas Engrosadas', icon: IconThickNails, hex: THEME.yellow, category: 'lesion', protocols: ['RECTA'], system: 'arterial', type: 'signo' },
  { id: 'ulcer_venous', name: 'Úlcera Venosa', icon: IconUlcerVenous, hex: THEME.blue, category: 'piel', protocols: ['CEAP', 'WIFI'], system: 'venoso', type: 'signo' },
  { id: 'ulcer_arterial', name: 'Úlcera isquémica', icon: IconUlcerArterial, hex: THEME.red, category: 'lesion', protocols: ['WIFI', 'RECTA'], system: 'arterial', type: 'signo' },
  { id: 'ulcer_neuro', name: 'Úlc. Neuropática', icon: IconUlcerNeuro, hex: THEME.yellow, category: 'lesion', protocols: ['WIFI', 'RECTA'], system: 'arterial', type: 'signo' },
  { id: 'necrosis', name: 'Gangrena', icon: IconNecrosis, hex: THEME.black, category: 'lesion', protocols: ['WIFI', 'RECTA'], system: 'arterial', type: 'signo' },
  { id: 'infection', name: 'Infección', icon: Bug, hex: THEME.orange, category: 'lesion', protocols: ['WIFI', 'RECTA', 'CEAP'], system: 'arterial', type: 'signo' },
  { id: 'amputation', name: 'Amputado', icon: IconAmputation, hex: THEME.red, category: 'lesion', protocols: ['WIFI', 'RECTA'], system: 'arterial', type: 'signo' },
  { id: 'pigmentation', name: 'Pigmentación / Ocre', icon: IconOchre, hex: THEME.orange, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'signo' },
  { id: 'eczema', name: 'Eczema Venoso', icon: IconEczema, hex: THEME.red, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'signo' },
  { id: 'lipodermatosclerosis', name: 'Lipo / Atrofia Blanca', icon: IconLipodermato, hex: THEME.textMuted, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'signo' },
  { id: 'healed_ulcer', name: 'Úlcera Cicatrizada', icon: IconHealedUlcer, hex: THEME.textMain, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'signo' },
  { id: 'corona_phlebectatica', name: 'Corona Flebectática', icon: IconCorona, hex: THEME.purple, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'signo' },
  { id: 'stemmer', name: 'Signo Stemmer', icon: IconStemmer, hex: THEME.green, category: 'piel', protocols: ['CLAVE'], system: 'linfatico', type: 'signo' },
  { id: 'papillomatosis', name: 'Papilomatosis', icon: IconPapilloma, hex: THEME.textMuted, category: 'piel', protocols: ['CLAVE'], system: 'linfatico', type: 'signo' },
  { id: 'peau_d_orange', name: 'Piel Naranja', icon: IconOrangeSkin, hex: THEME.orange, category: 'piel', protocols: ['CLAVE'], system: 'linfatico', type: 'signo' },
  { id: 'lymphorrhea', name: 'Linforrea', icon: IconLymphorrhea, hex: THEME.cyan, category: 'piel', protocols: ['CLAVE'], system: 'linfatico', type: 'signo' },
  { id: 'lymph_vesicles', name: 'Vesículas Linfáticas', icon: IconVesicles, hex: THEME.cyan, category: 'piel', protocols: ['CLAVE'], system: 'linfatico', type: 'signo' },
  { id: 'capillary_refill', name: 'Llenado Lento', icon: IconCapillaryRefill, hex: THEME.orange, category: 'lesion', protocols: ['WIFI', 'RECTA'], system: 'arterial', type: 'signo' },
  { id: 'dependent_rubor', name: 'Rubor Decúbito', icon: IconBuerger, hex: THEME.red, category: 'lesion', protocols: ['WIFI', 'RECTA'], system: 'arterial', type: 'signo' },
  { id: 'claudication', name: 'Claudicación', icon: IconClaudication, hex: THEME.yellow, category: 'lesion', protocols: ['RECTA'], system: 'arterial', type: 'sintoma' },
  { id: 'rest_pain', name: 'Dolor de Reposo', icon: IconRestPain, hex: THEME.red, category: 'lesion', protocols: ['WIFI', 'RECTA'], system: 'arterial', type: 'sintoma' },
  { id: 'heaviness', name: 'Pesadez / Fatiga', icon: IconHeaviness, hex: THEME.purple, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'sintoma' },
  { id: 'cramps', name: 'Calambres', icon: IconCramps, hex: THEME.yellow, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'sintoma' },
  { id: 'itching', name: 'Prurito', icon: IconItching, hex: THEME.orange, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'sintoma' },
  { id: 'burning', name: 'Ardor', icon: IconBurning, hex: THEME.red, category: 'piel', protocols: ['CEAP'], system: 'venoso', type: 'sintoma' },
  { id: 'photo', name: 'Adjuntar Foto', icon: Camera, hex: THEME.textMain, category: 'adjunto', protocols: [], system: 'otro', type: 'otro' },
  { id: 'draw_varice', name: 'Trazo Várices', icon: IconDrawVarice, hex: THEME.red, category: 'piel', protocols: [], system: 'venoso', type: 'dibujo' },
  { id: 'draw_telangiectasia', name: 'Trazo Arañas', icon: IconDrawTelangiectasia, hex: THEME.blue, category: 'piel', protocols: [], system: 'venoso', type: 'dibujo' },
  { id: 'draw_green', name: 'Trazo Verde', icon: IconDrawGeneric, hex: THEME.green, category: 'pulso', protocols: [], system: 'linfatico', type: 'dibujo' },
  { id: 'draw_yellow', name: 'Trazo Amarillo', icon: IconDrawGeneric, hex: THEME.yellow, category: 'lesion', protocols: [], system: 'otro', type: 'dibujo' },
];

const PROTOCOLS_DEF = [
    { id: 'CEAP', name: 'Evaluación Venosa', desc: 'Escalas CEAP y VCSS', icon: IconVarices, color: THEME.blue },
    { id: 'WIFI', name: 'Riesgo de Pie / Úlcera', desc: 'Isquemia, Herida, Infección', icon: AlertTriangle, color: THEME.red },
    { id: 'RECTA', name: 'Evaluación Arterial', desc: 'Pulsos y Trofismo', icon: Activity, color: THEME.orange },
    { id: 'CLAVE', name: 'Evaluación Linfática', desc: 'Grados de Linfedema', icon: Droplet, color: THEME.green },
];

const TOOLS_MAP = MASTER_TOOLS.reduce((acc, t) => ({ ...acc, [t.id]: t }), {});
const ZONAL_TOOLS = ['edema', 'cyanosis', 'rubor', 'pallor', 'cold', 'hot', 'lymphedema', 'heaviness', 'cramps', 'itching', 'burning'];

const DEFAULT_TOOL_GRIDS = {
  DEFAULT: [ 'pulse_normal', 'pulse_dim', 'pulse_absent', 'bruit', 'edema', 'cyanosis', 'rubor', 'cold', 'hot', 'telangiectasia', 'varices', 'lymphedema', 'hair_loss', 'thick_nails', 'ulcer_venous', 'ulcer_arterial', 'ulcer_neuro', 'necrosis', 'infection', 'amputation', 'photo' ]
};

// ==========================================
// MATRIZ DE DATOS Y PUNTOS CLÍNICOS
// ==========================================
const ETIQUETAS_VISTAS = [
  { id: 'v_dor', nombre: 'Vista Dorsal', x: 84, y: 279 },
  { id: 'v_med', nombre: 'Vista Medial', x: 127, y: 32 },
  { id: 'v_ant', nombre: 'Vista Anterior', x: 125, y: 95 },
  { id: 'v_lat', nombre: 'Vista Lateral', x: 125, y: 150 },
  { id: 'v_pos', nombre: 'Vista Posterior', x: 127, y: 213 },
  { id: 'v_pla', nombre: 'Vista Plantar', x: 188, y: 279 },
];

const PUNTOS_ANATOMICOS = [
  // --- NODOS DEDICADOS A PULSOS ---
  { id: 'pulso_femoral', vista: 'Anterior', nombre: 'Pulso Femoral', tipo: 'linea', cx: 280, cy: 121, x1: 259, y1: 121, isPulse: true },
  { id: 'pulso_popliteo', vista: 'Posterior', nombre: 'Pulso Poplíteo', tipo: 'linea', cx: 180, cy: 260, x1: 180, y1: 234, isPulse: true },
  { id: 'pulso_pedio', vista: 'Dorsal', nombre: 'Pulso Pedio', tipo: 'linea', cx: 93, cy: 332, x1: 93, y1: 302, isPulse: true },
  { id: 'pulso_tibial', vista: 'Medial', nombre: 'Pulso Tibial Posterior', tipo: 'linea', cx: 87, cy: 90, x1: 87, y1: 66, isPulse: true },

  // --- VISTA DORSAL ---
  { id: 'dor_o1', vista: 'Dorsal', nombre: '1er ortejo (Dorsal)', tipo: 'polyline', x1: 57, y1: 313, cx: 20, cy: 323, points: "57,313 57,323 20,323" },
  { id: 'dor_o2', vista: 'Dorsal', nombre: '2do ortejo (Dorsal)', tipo: 'polyline', x1: 57, y1: 306, cx: 20, cy: 310, points: "57,306 46,306 46,310 20,310" }, 
  { id: 'dor_o3', vista: 'Dorsal', nombre: '3er ortejo (Dorsal)', tipo: 'polyline', x1: 59, y1: 301, cx: 20, cy: 301, points: "59,301 20,301" },
  { id: 'dor_o4', vista: 'Dorsal', nombre: '4to ortejo (Dorsal)', tipo: 'polyline', x1: 63, y1: 295, cx: 20, cy: 290, points: "63,295 48,295 48,290 20,290" },
  { id: 'dor_o5', vista: 'Dorsal', nombre: '5to ortejo (Dorsal)', tipo: 'polyline', x1: 69, y1: 291, cx: 40, cy: 281, points: "69,291 69,281 40,281" },
  { id: 'dor_dorso', vista: 'Dorsal', nombre: 'Dorso del pie', tipo: 'punto', cx: 93, cy: 302 },

  // --- VISTA MEDIAL ---
  { id: 'med_cal', vista: 'Medial', nombre: 'Cara medial del calcáneo', tipo: 'punto', cx: 65, cy: 67 },
  { id: 'med_nav', vista: 'Medial', nombre: 'Arco longitudinal medial', tipo: 'punto', cx: 65, cy: 53 },
  { id: 'med_jua', vista: 'Medial', nombre: '1ra art. metatarsofalángica', tipo: 'punto', cx: 63, cy: 40 },
  { id: 'med_hal', vista: 'Medial', nombre: '1er ortejo (Hallux medial)', tipo: 'punto', cx: 62, cy: 28 },
  { id: 'med_mal', vista: 'Medial', nombre: 'Maléolo medial', tipo: 'punto', cx: 87, cy: 66 },
  { id: 'med_tib_d', vista: 'Medial', nombre: 'Tercio distal pierna', tipo: 'punto', cx: 109, cy: 65.1 },
  { id: 'med_tib_m', vista: 'Medial', nombre: 'Tercio medio pierna', tipo: 'punto', cx: 132, cy: 64.2 },
  { id: 'med_tib_p', vista: 'Medial', nombre: 'Tercio proximal pierna', tipo: 'punto', cx: 154, cy: 63.3 },
  { id: 'med_rod', vista: 'Medial', nombre: 'Cara medial de la rodilla', tipo: 'punto', cx: 180, cy: 62.2 },
  { id: 'med_fem_d', vista: 'Medial', nombre: 'Tercio distal femoral medial', tipo: 'punto', cx: 204, cy: 61.2 },
  { id: 'med_fem_m', vista: 'Medial', nombre: 'Tercio medio femoral medial', tipo: 'punto', cx: 234, cy: 60 },
  { id: 'med_fem_p', vista: 'Medial', nombre: 'Tercio proximal femoral medial', tipo: 'punto', cx: 259, cy: 59 },

  // --- VISTA ANTERIOR ---
  { id: 'ant_rot', vista: 'Anterior', nombre: 'Rótula (Patela)', tipo: 'punto', cx: 180, cy: 121 },
  { id: 'ant_dor', vista: 'Anterior', nombre: 'Dorso del pie', tipo: 'punto', cx: 63, cy: 121 },
  { id: 'ant_tal', vista: 'Anterior', nombre: 'Articulación talocrural', tipo: 'punto', cx: 87, cy: 121 },
  { id: 'ant_tib_d', vista: 'Anterior', nombre: 'Tercio distal pierna', tipo: 'punto', cx: 109, cy: 121 },
  { id: 'ant_tib_m', vista: 'Anterior', nombre: 'Cara anterior de la tibia', tipo: 'punto', cx: 132, cy: 121 },
  { id: 'ant_tib_p', vista: 'Anterior', nombre: 'Tercio proximal pierna', tipo: 'punto', cx: 154, cy: 121 },
  { id: 'ant_fem_d', vista: 'Anterior', nombre: 'Tercio distal femoral', tipo: 'punto', cx: 204, cy: 121 },
  { id: 'ant_fem_m', vista: 'Anterior', nombre: 'Tercio medio femoral', tipo: 'punto', cx: 234, cy: 121 },
  { id: 'ant_fem_p', vista: 'Anterior', nombre: 'Ingle / Femoral Proximal', tipo: 'punto', cx: 259, cy: 121 },

  // --- VISTA LATERAL ---
  { id: 'lat_cal', vista: 'Lateral', nombre: 'Cara lateral del calcáneo', tipo: 'punto', cx: 65, cy: 170 },
  { id: 'lat_5to', vista: 'Lateral', nombre: 'Base del 5to metatarsiano', tipo: 'punto', cx: 65, cy: 187 },
  { id: 'lat_mal', vista: 'Lateral', nombre: 'Maléolo lateral', tipo: 'punto', cx: 87, cy: 170 },
  { id: 'lat_per_d', vista: 'Lateral', nombre: 'Tercio distal pierna', tipo: 'punto', cx: 109, cy: 170 },
  { id: 'lat_per_m', vista: 'Lateral', nombre: 'Cara lateral pierna (Peroné)', tipo: 'punto', cx: 132, cy: 170 },
  { id: 'lat_per_p', vista: 'Lateral', nombre: 'Tercio proximal pierna', tipo: 'punto', cx: 154, cy: 170 },
  { id: 'lat_rod', vista: 'Lateral', nombre: 'Cara lateral de la rodilla', tipo: 'punto', cx: 180, cy: 170 },
  { id: 'lat_fem_d', vista: 'Lateral', nombre: 'Tercio distal femoral lateral', tipo: 'punto', cx: 204, cy: 170 },
  { id: 'lat_fem_m', vista: 'Lateral', nombre: 'Tercio medio femoral lateral', tipo: 'punto', cx: 234, cy: 170 },
  { id: 'lat_fem_p', vista: 'Lateral', nombre: 'Tercio proximal femoral lateral', tipo: 'punto', cx: 259, cy: 170 },

  // --- VISTA POSTERIOR ---
  { id: 'pos_cal', vista: 'Posterior', nombre: 'Tuberosidad del calcáneo', tipo: 'punto', cx: 65, cy: 235 },
  { id: 'pos_aqu', vista: 'Posterior', nombre: 'Tendón calcáneo (Aquiles)', tipo: 'punto', cx: 87, cy: 234 },
  { id: 'pos_sur_d', vista: 'Posterior', nombre: 'Tercio distal pierna (Sural)', tipo: 'punto', cx: 109, cy: 234 },
  { id: 'pos_sur_m', vista: 'Posterior', nombre: 'Región sural (Pantorrilla)', tipo: 'punto', cx: 132, cy: 234 },
  { id: 'pos_sur_p', vista: 'Posterior', nombre: 'Tercio proximal pierna', tipo: 'punto', cx: 154, cy: 234 },
  { id: 'pos_pop', vista: 'Posterior', nombre: 'Fosa poplítea', tipo: 'punto', cx: 180, cy: 234 },
  { id: 'pos_fem_d', vista: 'Posterior', nombre: 'Tercio distal femoral', tipo: 'punto', cx: 204, cy: 234 },
  { id: 'pos_fem_m', vista: 'Posterior', nombre: 'Tercio medio femoral', tipo: 'punto', cx: 234, cy: 234 },
  { id: 'pos_fem_p', vista: 'Posterior', nombre: 'Tercio proximal femoral', tipo: 'punto', cx: 259, cy: 234 },

  // --- VISTA PLANTAR ---
  { id: 'pla_tal', vista: 'Plantar', nombre: 'Talón (Plantar)', tipo: 'punto', cx: 174, cy: 312 },
  { id: 'pla_ist', vista: 'Plantar', nombre: 'Istmo del pie', tipo: 'punto', cx: 200, cy: 301 },
  { id: 'pla_alm_l', vista: 'Plantar', nombre: 'Almohadilla lateral', tipo: 'punto', cx: 221, cy: 298 },
  { id: 'pla_alm_1', vista: 'Plantar', nombre: 'Almohadilla 1er Metatarsiano', tipo: 'punto', cx: 226, cy: 317 },
  { id: 'pla_o1', vista: 'Plantar', nombre: '1er ortejo (Plantar)', tipo: 'polyline', x1: 249, y1: 316, cx: 285, cy: 326, points: "249,316 249,326 285,326" },
  { id: 'pla_o2', vista: 'Plantar', nombre: '2do ortejo (Plantar)', tipo: 'polyline', x1: 247, y1: 308, cx: 285, cy: 313, points: "247,308 260,308 260,313 285,313" },
  { id: 'pla_o3', vista: 'Plantar', nombre: '3er ortejo (Plantar)', tipo: 'polyline', x1: 243, y1: 303, cx: 285, cy: 303, points: "243,303 285,303" },
  { id: 'pla_o4', vista: 'Plantar', nombre: '4to ortejo (Plantar)', tipo: 'polyline', x1: 240, y1: 298, cx: 285, cy: 293, points: "240,298 258,298 258,293 285,293" },
  { id: 'pla_o5', vista: 'Plantar', nombre: '5to ortejo (Plantar)', tipo: 'polyline', x1: 237, y1: 294, cx: 285, cy: 284, points: "237,294 237,284 285,284" },

  // --- ZONAS TRANS-FACIALES (REPLICADAS PARA VISIBILIDAD MÓVIL) ---
  // Nodo Global (Para toda la extremidad, invocado por botón externo)
  { id: 'trans_todo', targetId: 'trans_todo', vista: 'Global', nombre: 'Toda la Extremidad', tipo: 'oculto', isTransFacial: true },

  // Medial (Borde Frontal = cy: 40) - No se solapa (faciales en ~60)
  { id: 'med_trans_muslo', targetId: 'trans_muslo', vista: 'Medial', nombre: 'Muslo Completo', tipo: 'region', cx: 234, cy: 36, isTransFacial: true },
  { id: 'med_trans_pierna', targetId: 'trans_pierna', vista: 'Medial', nombre: 'Pantorrilla Completa', tipo: 'region', cx: 132, cy: 44, isTransFacial: true },
  { id: 'med_trans_pie', targetId: 'trans_pie', vista: 'Medial', nombre: 'Pie Completo', tipo: 'region', cx: 75, cy: 40, isTransFacial: true },

  // Anterior (Borde Inferior = cy: 140) - Evita solape con faciales en 121
  { id: 'ant_trans_muslo', targetId: 'trans_muslo', vista: 'Anterior', nombre: 'Muslo Completo', tipo: 'region', cx: 234, cy: 144, isTransFacial: true },
  { id: 'ant_trans_pierna', targetId: 'trans_pierna', vista: 'Anterior', nombre: 'Pantorrilla Completa', tipo: 'region', cx: 132, cy: 136, isTransFacial: true },
  { id: 'ant_trans_pie', targetId: 'trans_pie', vista: 'Anterior', nombre: 'Pie Completo', tipo: 'region', cx: 75, cy: 140, isTransFacial: true },

  // Lateral (Borde Inferior/Posterior = cy: 190) - Evita solape con faciales en 170
  { id: 'lat_trans_muslo', targetId: 'trans_muslo', vista: 'Lateral', nombre: 'Muslo Completo', tipo: 'region', cx: 234, cy: 194, isTransFacial: true },
  { id: 'lat_trans_pierna', targetId: 'trans_pierna', vista: 'Lateral', nombre: 'Pantorrilla Completa', tipo: 'region', cx: 132, cy: 186, isTransFacial: true },
  { id: 'lat_trans_pie', targetId: 'trans_pie', vista: 'Lateral', nombre: 'Pie Completo', tipo: 'region', cx: 75, cy: 190, isTransFacial: true },

  // Posterior (Borde Inferior = cy: 260) - Evita solape con faciales en 234
  { id: 'pos_trans_muslo', targetId: 'trans_muslo', vista: 'Posterior', nombre: 'Muslo Completo', tipo: 'region', cx: 234, cy: 264, isTransFacial: true },
  { id: 'pos_trans_pierna', targetId: 'trans_pierna', vista: 'Posterior', nombre: 'Pantorrilla Completa', tipo: 'region', cx: 132, cy: 256, isTransFacial: true },
  { id: 'pos_trans_pie', targetId: 'trans_pie', vista: 'Posterior', nombre: 'Pie Completo', tipo: 'region', cx: 75, cy: 260, isTransFacial: true },
];

const LEG_PATHS = [
  "m 183.96862,162.87843 c -5.98043,1.5863 -22.71871,1.51087 -28.575,-0.12867 -12.23608,-3.42568 -21.25451,-4.94008 -32.31224,-4.91082 -5.79216,0.0153 -12.14396,0.45451 -19.81068,1.26401 -17.542782,1.85229 -29.567508,2.06252 -34.131251,0.59738 -4.073252,-1.30767 -8.198698,-0.59332 -9.511564,1.64693 -0.620346,1.05855 -0.643092,2.2136 -0.287838,14.55208 0.210606,7.3146 0.09508,8.92788 -1.099674,15.34583 -0.426114,2.28899 -0.585565,6.8412 -0.31471,8.99584 0.09289,0.73892 0.01494,1.49176 -0.205672,1.98437 -0.356545,0.79614 -0.347179,0.99223 0.161231,3.43959 0.151152,0.7276 0.330542,1.79917 0.398942,2.38125 0.208791,1.76599 0.222044,6.26426 3.913973,6.63938 1.608067,0.16339 1.176047,-3.13946 1.785937,-6.1283 0.386269,-1.89296 2.171665,-8.16352 4.834847,-13.87254 1.251651,-2.72443 2.651544,-6.13115 4.051432,-9.25473 0.791199,-2.66426 4.706367,-5.32065 8.043437,-5.45704 4.423707,-0.34876 20.47915,0.93672 29.24008,2.00763 26.79517,3.77891 37.71341,5.29015 39.02604,5.40122 6.99159,0.59564 14.7471,1.61025 22.68388,3.09594 7.28946,2.37844 18.07152,0.0494 25.93847,0.0207 11.99576,-2.4001 53.38176,6.81243 61.22887,6.3624 l -0.13229,-49.87654 c -23.53024,4.09868 -47.34713,9.78737 -74.92622,15.89409 z M 59.177783,203.66199 c 0.04886,-0.005 0.09728,0.005 0.143144,0.0341 0.302405,0.19484 -0.170088,1.1898 -0.570508,0.9617 -0.281347,-0.16026 0.08538,-0.95743 0.427364,-0.9958 z m 0.655257,2.31924 c 0.0652,-0.0104 0.121422,0.0251 0.15813,0.12454 0.08893,0.28494 -0.134585,1.49404 -0.637687,1.15238 -0.252871,-0.32259 0.197016,-1.23177 0.479557,-1.27692 z m 0.545187,2.54454 c 0.06562,0.007 0.121425,0.0701 0.157096,0.20929 0.08915,0.34782 -0.523995,1.83495 -0.822689,1.02061 -0.09542,-0.26014 0.381257,-1.26163 0.665593,-1.2299 z m 0.58136,2.29857 c 0.303103,0.008 0.339854,2.12373 -0.419096,1.98438 -0.630959,-0.11585 -0.197577,-2.00088 0.419096,-1.98438 z m 1.761649,1.36426 c 1.027314,0.0438 0.156272,2.49377 -0.510563,2.10995 -0.669956,-0.38561 -0.274041,-2.1434 0.510563,-2.10995 z",
  "M 62.206022 22.09891 C 60.280177 22.07106 58.698843 24.217907 58.454313 27.125993 C 58.089785 31.461185 58.549924 41.468546 59.296639 45.43857 C 60.523739 51.96264 60.722279 54.730383 60.459359 61.654118 C 59.813855 78.652542 61.20863 80.857727 70.679407 77.812821 C 76.692655 75.879531 82.479334 75.843857 101.56228 77.622135 C 120.39331 79.380407 138.78133 79.450956 157.19816 73.6415 C 162.92859 72.073391 177.69059 73.892738 184.84712 74.145345 C 198.08679 74.612671 242.35318 93.693242 259.42396 95.052079 L 259.42396 44.206087 C 246.08195 42.903651 214.97713 46.375524 204.12863 46.227669 C 192.91793 46.622534 180.37321 44.616346 171.35337 46.444194 C 166.53432 47.910828 161.44456 47.610746 156.5367 48.691085 C 150.32906 49.613842 144.47153 50.109359 138.31507 50.960714 C 131.44013 51.927503 116.61942 54.127759 113.54191 54.638525 C 99.223116 57.014969 83.131841 57.990549 79.93724 56.676127 C 77.580812 55.706574 75.47073 53.992602 74.873466 52.5632 C 72.994162 48.135672 70.354208 42.981108 67.917818 38.267432 C 65.781748 34.413317 64.690815 31.471444 64.620345 29.374951 C 64.64963 29.044885 65.112579 22.10321 62.206022 22.09891 z M 63.194592 23.031669 C 63.567134 23.046814 64.0025 24.040059 64.180062 25.135417 C 64.419929 26.615128 64.30729 27.431418 64.004362 27.381791 C 62.617434 27.154578 62.235093 23.739931 63.039563 23.08748 C 63.089277 23.04716 63.141372 23.029506 63.194592 23.031669 z",
  "m 43.629229,123.72639 c 0.227592,-0.43649 0.587857,-0.89102 0.80059,-1.01007 0.320545,-0.17939 0.272055,-0.35281 -0.283142,-1.01262 -1.057762,-1.25708 -0.881351,-3.98184 0.314942,-4.86447 0.287033,-0.21178 0.306872,-0.43657 0.08907,-1.00941 -0.49064,-1.29049 -0.332785,-2.02576 0.644785,-3.00333 0.656092,-0.65609 0.860441,-1.0403 0.702969,-1.32168 -0.611445,-1.09259 0.613846,-2.69938 2.268902,-2.97533 0.912199,-0.15209 0.992574,-0.23384 0.935451,-0.95147 -0.131607,-1.65342 2.178372,-2.51572 4.703273,-1.75571 2.652964,0.79856 5.653003,1.93726 6.662277,2.52873 4.825147,1.44254 12.020048,4.72894 16.06306,3.91219 2.182857,-0.45086 4.60783,-0.3828 7.306686,0.20508 5.555538,1.21014 12.465391,0.60789 24.593858,-2.14354 16.21357,-3.67816 36.51109,-4.69261 52.78438,-2.6381 15.28711,2.30957 29.61095,-0.46327 42.79864,-1.70722 0.18655,0.18656 55.34554,-10.596361 55.41996,-9.274848 0.31165,5.533938 0.51887,42.598428 -0.25447,48.983138 -0.25104,2.07266 -56.34884,-8.39417 -56.6149,-8.37868 -4.93107,0.28705 -21.11316,-1.25353 -25.60655,-2.43786 -7.34124,-1.93495 -8.50187,-1.98965 -26.06146,-1.22833 -11.67119,0.50603 -23.09269,-0.19751 -36.5125,-2.24908 -11.70197,-1.78896 -23.493006,-2.63314 -26.85521,-1.9227 -3.705427,0.74059 -7.437859,0.19378 -10.980208,-0.0331 -6.348645,-0.40688 -8.893558,-0.19528 -13.361458,1.11095 -3.807333,1.11312 -14.559195,1.54157 -17.255403,0.68761 -2.169236,-0.68704 -3.536685,-5.14525 -2.303576,-7.51019 z m 3.258796,-3.30742 c 0.846178,0 0.974916,-1.3698 0.179898,-1.91418 -0.542054,-0.37117 -0.680757,-0.19679 -0.680757,0.85584 0,0.86201 0.09291,1.05834 0.500859,1.05834 z m 2.040507,7.83114 c 0.655513,-0.25154 0.487214,-2.86878 -0.226261,-3.51862 -1.519487,-1.38399 -1.870348,-1.33752 -1.691926,0.22408 0.08902,0.77909 0.06879,1.83324 -0.04494,2.34256 -0.212558,0.9519 0.748652,1.41802 1.963124,0.95198 z m -1.350741,-12.46135 c 0.726607,0 0.902804,-1.41812 0.236713,-1.90518 -0.700331,-0.5121 -0.765879,-0.44525 -0.765879,0.78102 0,0.94777 0.08303,1.12416 0.529166,1.12416 z m 0.802275,-4.10104 c 0.446501,0 0.920809,-0.99922 0.722151,-1.52136 -0.207475,-0.54531 -0.817898,-0.37364 -0.940826,0.26459 -0.213416,1.10803 -0.187537,1.25677 0.218675,1.25677 z m 3.005395,-3.76173 c 0.546951,-0.10534 0.57164,-1.36252 0.02879,-1.46619 -0.278469,-0.0532 -0.405464,0.16646 -0.425664,0.73619 -0.02172,0.61246 0.0758,0.79183 0.396874,0.73 z",
  "m 55.37173,232.26837 c 1.01136,-3.83339 2.59297,-4.84491 7.2776,-4.93917 3.81024,0.11118 8.94273,-3.58714 11.68731,-1.0058 2.146283,-0.004 4.797767,-0.0649 6.908768,0.70505 3.127021,1.18848 5.326312,0.96479 15.802814,-1.60723 21.194778,-3.14949 35.479268,-7.4529 58.208338,-4.11221 16.48015,4.08816 30.63656,-0.8095 43.81074,-1.4707 0.2372,0.2372 58.57203,-13.10465 58.61319,-10.55679 0.099,6.12492 0.63079,44.1739 0.0959,50.00463 -0.22352,2.4364 -59.60599,-8.16513 -59.85294,-8.16614 -1.30613,-0.005 -12.99955,-0.7582 -18.3252,-1.17986 -27.93903,-4.95157 -58.77549,-2.90499 -82.682289,-6.08717 -5.50889,-1.64948 -12.177794,0.34018 -17.065626,-0.66365 -3.581238,-0.76182 -9.254195,-0.82521 -12.038545,-0.13452 -9.67917,0.43238 -14.06078,-4.64329 -12.44003,-10.78644 z",
  "m 54.744909,301.24659 c 0.432153,6.07967 7.625345,5.37215 11.071346,5.74186 3.433001,-0.28829 6.204479,-0.26505 14.577237,0.12167 4.576405,0.21138 6.207961,0.16484 6.883514,-0.19671 0.486955,-0.26061 2.571502,-0.6952 4.632983,-0.96536 2.061482,-0.27015 4.923529,-0.66287 6.359673,-0.87282 4.835738,-0.70697 17.486418,-1.9181 23.547378,-2.2542 3.31848,-0.18402 7.08098,-0.61379 8.39312,-0.95953 2.40729,-0.63428 8.25699,-0.60789 17.01939,0.078 3.07747,0.24089 3.07748,0.24148 3.07748,-12.92045 0,-13.16194 -1e-5,-13.16205 -1.58537,-12.93066 -0.87196,0.12731 -4.43904,0.65736 -7.92684,1.1781 -5.92905,0.88521 -13.51818,1.26448 -14.39946,0.71982 -0.73743,-0.45575 -6.45963,-0.15789 -8.62187,0.4488 -2.50918,0.70404 -7.12867,0.57882 -14.46795,-0.3927 -14.561693,-1.92756 -26.84967,-2.19455 -32.315702,-0.75479 -1.385718,0.39316 -2.83409,0.52002 -2.915735,2.1194 -0.03778,1.62845 4.00053,0.89728 2.692792,1.43237 -0.625657,0.24939 -1.915645,0.44796 -3.394413,0.3876 -3.556535,-0.14516 -4.724921,0.12872 -4.726951,1.99993 -0.0028,2.10245 0.667643,2.42978 4.950626,2.42978 5.770451,0 3.939695,0.67478 -2.208291,0.8138 -5.693289,0.12872 -6.845645,0.52122 -6.845645,2.33217 0,2.13176 0.83969,2.50363 5.446788,2.41156 4.275398,-0.0854 4.909007,0.0227 4.451561,0.76281 -0.160457,0.25961 -1.990044,0.20166 -5.167013,0.33514 -2.952914,0.12407 -7.164262,-0.53352 -7.249277,2.82175 -0.07021,2.77291 6.571158,1.58532 10.087046,1.85202 0.269933,0.16821 7.564452,-0.39521 5.48687,1.02073 -0.20281,0.0606 -3.343489,0.36152 -6.659133,-0.0685 -2.381466,0.0172 -4.989948,-0.44215 -7.086803,-0.34606 -2.090695,0.0822 -2.98613,1.91731 -3.107351,3.6545 z m 0.612729,0.0699 c -0.04681,-1.5241 1.027442,-2.9089 2.503377,-2.92303 4.491615,1.16739 1.71323,7.46303 -0.602536,5.85261 -1.312164,-0.77873 -1.868837,-1.88677 -1.900841,-2.92958 z m 1.04914,-6.38664 c 0.03186,-0.61291 0.400868,-1.23748 0.845145,-1.36534 1.262636,-0.0515 1.147619,2.55056 0.332222,2.66073 -0.904078,-0.0809 -1.209174,-0.68248 -1.177367,-1.29539 z m 2.483695,-6.03256 c -0.0028,-0.50852 0.182451,-1.0339 0.647707,-1.34786 1.60061,-0.0546 1.634038,2.13608 0.507074,2.6877 -0.622838,0.30761 -1.150058,-0.49229 -1.154781,-1.33984 z m 4.046478,-5.4038 c -0.01128,-0.63899 0.308986,-1.26035 0.756253,-1.4739 1.998742,-0.0515 0.96514,3.25699 -0.02989,2.81301 -0.507778,-0.3346 -0.717398,-0.84211 -0.726393,-1.33911 z M 68.64603,278.98 c -0.0028,-0.41883 0.262221,-0.64843 0.76718,-0.64843 0.401812,0 0.523837,0.18823 0.523837,0.81163 0,0.96119 -0.929343,1.17052 -1.213065,0.27322 -0.05132,-0.16249 -0.07726,-0.30821 -0.07797,-0.43642 z",
  "m 164.37847,301.36543 c -0.0105,-0.82422 0.075,-1.70624 0.25526,-2.64587 1.37883,-7.18615 3.59011,-8.40823 21.83713,-12.09106 25.00147,-5.0461 32.96015,-6.12363 38.21715,-6.72759 1.5781,-0.18132 6.84573,-0.65754 10.82526,-0.68572 1.1023,-0.008 5.15075,-0.25261 5.60739,1.40273 0.36441,1.32096 -1.37943,1.47748 -3.24889,2.097 -6.06987,2.01141 1.69073,0.0999 2.51243,-0.0495 4.7542,-0.86497 6.27203,0.57466 5.69307,2.99454 -0.35775,1.49526 -1.12398,1.88048 -5.32876,2.06784 -8.32199,1.122 -1.28426,0.66952 2.23253,0.41038 6.64447,-0.48961 8.04365,-0.003 8.04365,2.28591 0,2.01538 -1.10225,2.26378 -5.46877,2.51876 -6.82876,0.39877 -11.22703,2.50724 -0.65362,1.11204 3.4708,-0.45798 8.65599,-2.06261 9.20283,1.73775 0.41837,2.90754 -4.84931,2.62903 -8.12996,3.05905 -7.42347,0.97303 -6.62661,1.64417 -0.71666,0.79785 2.22754,-0.319 4.67069,-0.68347 6.26123,-0.72826 2.93607,-0.0827 4.85701,3.13307 4.47789,5.13197 -0.65059,3.4302 -4.41504,4.8832 -12.44047,4.89337 -2.75428,0.003 -6.16616,0.22642 -7.58201,0.49566 -7.23587,1.37143 -13.95578,0.92488 -22.6764,-0.20095 -9.44436,-1.51844 -13.77745,-1.56058 -22.07617,-0.21447 -17.74793,2.87884 -26.74461,0.30619 -26.84411,-7.66139 z"
];

const getArray = (val) => Array.isArray(val) ? val : (val && val !== 'unmapped' ? [val] : []);

// ============================================================================
// COMPONENTES DE INTERFAZ Y RENDERIZADO
// ============================================================================

const SmartInput = ({ value, onChange, placeholder, className, style, type="text", step, inputMode }) => {
    const [localVal, setLocalVal] = useState(value || '');
    useEffect(() => { setLocalVal(value || ''); }, [value]);

    return (
        <input 
            type={type} step={step} inputMode={inputMode}
            value={localVal} 
            onChange={e => setLocalVal(e.target.value)} 
            onBlur={() => { if (localVal !== (value || '')) onChange(localVal); }} 
            placeholder={placeholder} className={className} style={style} 
        />
    );
};

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        if (message) { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }
    }, [message, onClose]);
    if (!message) return null;
    return (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="bg-red-500/90 backdrop-blur text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3 border border-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-xs font-bold tracking-wide">{message}</span>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded"><X className="w-3 h-3" /></button>
            </div>
        </div>
    );
};

const SidebarLeft = ({ state, actions }) => {
  const { isLeftHanded, thumbOffset, activeElement, examStates, toolPage, workOrder, isExamStarted } = state;
  const { setIsLeftHanded, setThumbOffset, handleToolClick, setToolPage, setGlobalExamStates } = actions;
  
  const [pressedTool, setPressedTool] = useState(null);
  const [showSettings, setShowSettings] = useState(false); 
  const fileInputRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('ULCERAS');
  const [categoryPage, setCategoryPage] = useState(0);
  const [findingsPage, setFindingsPage] = useState(0);

  const TOOL_FAMILIES = [
      { id: 'ULCERAS', name: 'Lesiones', icon: ShieldAlert, hex: THEME.yellow, tools: ['ulcer_venous', 'ulcer_arterial', 'ulcer_neuro', 'healed_ulcer', 'necrosis', 'infection', 'amputation', 'draw_yellow'] },
      { id: 'PIEL', name: 'Venosas', icon: IconVarices, hex: THEME.blue, tools: ['corona_phlebectatica', 'telangiectasia', 'varices', 'edema', 'pigmentation', 'eczema', 'lipodermatosclerosis', 'rubor', 'hot', 'heaviness', 'cramps', 'itching', 'burning', 'draw_varice', 'draw_telangiectasia'] },
      { id: 'TROFICAS', name: 'Arteriales', icon: Activity, hex: THEME.red, tools: ['pulse_normal', 'pulse_dim', 'pulse_absent', 'bruit', 'capillary_refill', 'claudication', 'rest_pain', 'cyanosis', 'dependent_rubor', 'pallor', 'cold', 'hot', 'hair_loss', 'thick_nails'] },
      { id: 'PULSOS', name: 'Linfedema', icon: IconCircleCross, hex: THEME.green, tools: ['lymphedema', 'stemmer', 'papillomatosis', 'peau_d_orange', 'lymphorrhea', 'lymph_vesicles', 'draw_green'] },
  ];

  const handleCategoryClick = (catId) => {
      if (activeCategory === catId) {
          const catDef = TOOL_FAMILIES.find(c => c.id === catId);
          const visibleToolsCount = catDef.tools.filter(t => state.activeToolIds.includes(t)).length;
          const totalCatPages = Math.ceil(visibleToolsCount / 6);
          if (totalCatPages > 1) {
              setCategoryPage((prev) => (prev + 1) % totalCatPages);
          }
      } else {
          setActiveCategory(catId);
          setCategoryPage(0);
      }
  };

  const activeFamilyDef = TOOL_FAMILIES.find(c => c.id === activeCategory);
  const currentCategoryToolsFiltered = activeFamilyDef.tools.filter(t => state.activeToolIds.includes(t));
  const currentCategoryTools = currentCategoryToolsFiltered.slice(categoryPage * 6, categoryPage * 6 + 6);

  const gridSlots = Array(10).fill(null);
  
  TOOL_FAMILIES.forEach((fam, idx) => {
      gridSlots[idx] = { type: 'CATEGORY', ...fam };
  });

  for (let i = 0; i < 6; i++) {
      if (currentCategoryTools[i]) {
          gridSlots[4 + i] = { type: 'TOOL', id: currentCategoryTools[i] };
      }
  }

  const displaySlots = [];
  for (let row = 0; row < 5; row++) {
      const rData = [gridSlots[row*2], gridSlots[row*2+1]];
      if (isLeftHanded) rData.reverse();
      displaySlots.push(...rData);
  }

  const handlePhotoUpload = (e) => {
      const file = e.target.files[0];
      if (file && activeElement) {
          const reader = new FileReader();
          reader.onload = (event) => {
              setGlobalExamStates(prev => ({
                  ...prev, [state.leg]: { 
                      ...prev[state.leg], 
                      [activeElement.id]: { ...(prev[state.leg][activeElement.id] || {}), foto: event.target.result } 
                  }
              }));
          };
          reader.readAsDataURL(file);
      }
  };

  const activeToolInfo = pressedTool && pressedTool !== 'NEXT_PAGE' && pressedTool !== 'PREV_PAGE' ? TOOLS_MAP[pressedTool] : null;
  const doctorName = typeof window !== 'undefined' && window.frappe?.session?.user_fullname ? window.frappe.session.user_fullname : 'Dr. Usuario Activo';

  return (
    <aside className="w-[210px] flex flex-col shadow-2xl z-[60] shrink-0 h-full relative" style={{ backgroundColor: THEME.bgSidebar, borderRight: isLeftHanded ? 'none' : `1px solid ${THEME.border}`, borderLeft: isLeftHanded ? `1px solid ${THEME.border}` : 'none' }}>
      
      <input type="file" ref={fileInputRef} hidden onChange={handlePhotoUpload} accept="image/*" />

      <div className="h-14 px-4 shrink-0 flex items-center justify-between border-b relative" style={{ borderColor: THEME.border, backgroundColor: THEME.bgSidebar }}>
        <div className="flex items-center gap-2">
          <ActivitySquare className="w-5 h-5 text-yellow-500" />
          <div className="flex flex-col">
            <h1 className="text-[14px] font-bold leading-none tracking-tight">PhysioMap <span className="font-light" style={{ color: THEME.textMuted }}>Pro</span></h1>
            <span className="text-[7px] uppercase tracking-[0.2em] font-bold text-yellow-500 text-right mt-0.5">Signos Físicos</span>
          </div>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="p-1.5 rounded-md transition-colors" style={{ backgroundColor: showSettings ? THEME.bgHover : 'transparent' }}>
            <Settings2 size={18} className={showSettings ? 'text-yellow-400' : 'text-gray-400'} />
        </button>

        {showSettings && (
            <div className="absolute top-14 right-2 w-48 rounded-xl shadow-2xl border p-3 flex flex-col gap-3 z-50 animate-in fade-in zoom-in-95" style={{ backgroundColor: THEME.bgSurface, borderColor: THEME.border }}>
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 border-b border-white/10 pb-1">Ergonomía</span>
                <button onClick={() => {setIsLeftHanded(!isLeftHanded); setShowSettings(false);}} className="text-[11px] font-bold text-left hover:text-yellow-400 transition-colors flex items-center justify-between">
                    <span>{isLeftHanded ? 'Modo Zurdo' : 'Modo Diestro'}</span>
                    <span className="text-[16px]">{isLeftHanded ? '🖐️' : '🤚'}</span>
                </button>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-left text-gray-300">Altura Pulgar</span>
                        <span className="text-[10px] font-mono text-yellow-500">{thumbOffset}px</span>
                    </div>
                    <input type="range" min="0" max="300" value={thumbOffset} onChange={(e) => setThumbOffset(Number(e.target.value))} className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
                </div>
            </div>
        )}
      </div>

      <div className="p-4 border-b flex flex-col gap-3 transition-all flex-1 overflow-hidden" style={{ borderColor: THEME.border, backgroundColor: THEME.bgSidebar }}>
          {activeToolInfo ? (
              <div className="flex flex-col items-center justify-center h-full animate-in fade-in zoom-in duration-150">
                  {(() => {
                      const ActiveToolIcon = activeToolInfo.icon;
                      return <ActiveToolIcon className="w-12 h-12 mb-3" style={{ color: activeToolInfo.hex || THEME.cyan }} />;
                  })()}
                  <span className="text-[14px] font-bold text-center leading-tight" style={{ color: THEME.textMain }}>{activeToolInfo.name}</span>
                  <span className="text-[9px] uppercase tracking-widest mt-1.5 font-bold" style={{ color: THEME.textMuted }}>
                      {activeToolInfo.category.toUpperCase()}
                  </span>
              </div>
          ) : (
              <div className="flex flex-col gap-0 animate-in fade-in duration-300 h-full overflow-hidden">
                  {/* Banner del Nodo Activo */}
                  <div className="flex items-center justify-center px-2 py-3 rounded-xl border shadow-inner min-h-[50px] shrink-0" style={{ borderColor: THEME.border, backgroundColor: THEME.bgApp }}>
                      {state.hoveredElement ? (
                          <span className="text-[14px] leading-snug font-bold text-center text-yellow-400 px-1 break-words w-full">
                              {state.hoveredElement.nombre || state.hoveredElement.id}
                          </span>
                      ) : activeElement ? (
                          <span className="text-[14px] leading-snug font-bold text-center text-yellow-500 px-1 break-words w-full">
                              {activeElement.nombre || activeElement.id || "Nodo Activo"}
                          </span>
                      ) : (
                          <span className="text-[10px] text-gray-500 italic text-center uppercase tracking-widest font-bold">Zona Facial</span>
                      )}
                  </div>

                  {/* Toggles DER/IZQ y MMII/PIE (Botones tipo Switch) */}
                  <div className="flex flex-row items-center gap-2 shrink-0 w-full my-3">
                          <button 
                              onClick={() => actions.setLeg(state.leg === 'DERECHA' ? 'IZQUIERDA' : 'DERECHA')}
                              className="flex-1 flex items-center justify-center px-2 py-2 rounded-xl border shadow-inner h-[40px] transition-all active:scale-95"
                              style={{ borderColor: THEME.border, backgroundColor: THEME.bgApp }}
                          >
                              <span className="text-[13px] leading-none font-bold text-center text-yellow-500 uppercase tracking-wide">
                                  {state.leg === 'DERECHA' ? 'DER' : 'IZQ'}
                              </span>
                          </button>
                          
                          <button 
                              onClick={() => {
                                  if (state.viewSegment === 'PIERNA') {
                                      actions.setViewSegment('PIE');
                                      actions.setMobileSubView('dorsal');
                                  } else {
                                      actions.setViewSegment('PIERNA');
                                      actions.setMobileSubView('medial');
                                  }
                              }}
                              className="flex-1 flex items-center justify-center px-2 py-2 rounded-xl border shadow-inner h-[40px] transition-all active:scale-95"
                              style={{ borderColor: THEME.border, backgroundColor: THEME.bgApp }}
                          >
                              <span className="text-[13px] leading-none font-bold text-center text-yellow-500 uppercase tracking-wide">
                                  {state.viewSegment === 'PIERNA' ? 'MMII' : 'PIE'}
                              </span>
                          </button>
                  </div>

                  {(() => {
                      const targetId = activeElement ? (activeElement.targetId || activeElement.id) : null;
                      const activeNodeState = targetId && examStates[targetId] ? examStates[targetId] : null;
                      const assignedTools = [];
                      if (activeNodeState) {
                          getArray(activeNodeState.pulso).forEach(t => assignedTools.push({ type: 'node', cat: 'pulso', id: t }));
                          getArray(activeNodeState.piel).forEach(t => assignedTools.push({ type: 'node', cat: 'piel', id: t }));
                          getArray(activeNodeState.lesion).forEach(t => assignedTools.push({ type: 'node', cat: 'lesion', id: t }));
                          getArray(activeNodeState.intervencion).forEach(t => assignedTools.push({ type: 'node', cat: 'intervencion', id: t }));
                      }
                      
                      state.freehandDrawings.forEach((draw, i) => {
                          assignedTools.push({ type: 'draw', drawIndex: i, id: draw.type });
                      });

                      return (
                          <div className="flex flex-col p-2 rounded-xl border shadow-inner shrink-0 overflow-hidden h-[225px]" style={{ backgroundColor: THEME.bgApp, borderColor: THEME.border }}>
                              {(activeElement || state.freehandDrawings.length > 0) ? (
                                  <div className="flex flex-col h-full w-full">
                                      {(() => {
                                          const totalFindings = assignedTools.length;
                                          const totalPages = Math.ceil(totalFindings / 6);
                                          const safePage = totalPages > 0 && findingsPage >= totalPages ? totalPages - 1 : findingsPage;
                                          const currentFindings = assignedTools.slice(safePage * 6, safePage * 6 + 6);
                                          
                                          return (
                                              <>
                                                  {totalPages > 1 && (
                                                      <button 
                                                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFindingsPage(prev => Math.max(0, prev - 1)); }}
                                                          onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setFindingsPage(prev => Math.max(0, prev - 1)); }}
                                                          disabled={safePage === 0}
                                                          className="w-full py-1 bg-white/5 rounded-md flex justify-center hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:active:scale-100 transition-all shrink-0 mb-1.5 z-20 cursor-pointer"
                                                      >
                                                          <ChevronUp size={14} className="text-white pointer-events-none" />
                                                      </button>
                                                  )}
                                                  
                                                  <div className="flex flex-wrap gap-2.5 content-start flex-1 px-1">
                                                      {assignedTools.length === 0 && (
                                                          <div className="w-full flex justify-center mt-2">
                                                              <span className="text-[10px] text-gray-500 italic">Sin hallazgos</span>
                                                          </div>
                                                      )}
                                                      {currentFindings.map((tData, idx) => {
                                                          const toolDef = TOOLS_MAP[tData.id];
                                                          if(!toolDef) return null;
                                                          const TIcon = toolDef.icon;
                                                          const isDraw = tData.type === 'draw';
                                                          return (
                                                              <div key={`${tData.id}-${isDraw ? tData.drawIndex : idx}`} className="relative flex flex-col items-center justify-center gap-1 p-1.5 rounded-md border bg-black/20 w-[46%]" style={{ borderColor: THEME.border }} title={toolDef.name}>
                                                                  <TIcon size={12} className="w-3 h-3 shrink-0" style={{ color: toolDef.hex }} />
                                                                  <span className="text-[9px] text-white font-medium text-center leading-tight">
                                                                      {toolDef.name} {isDraw ? `#${tData.drawIndex + 1}` : ''}
                                                                  </span>
                                                                  <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        if (isDraw) {
                                                                            actions.setFreehandDrawings(prev => ({
                                                                                ...prev,
                                                                                [state.leg]: (prev[state.leg] || []).filter((_, i) => i !== tData.drawIndex)
                                                                            }));
                                                                        } else {
                                                                            const targetId = activeElement.targetId || activeElement.id;
                                                                            const newArr = getArray(examStates[targetId][tData.cat]).filter(x => x !== tData.id);
                                                                            setGlobalExamStates(prev => ({
                                                                                ...prev,
                                                                                [state.leg]: {
                                                                                    ...prev[state.leg],
                                                                                    [targetId]: {
                                                                                        ...prev[state.leg][targetId],
                                                                                        [tData.cat]: newArr
                                                                                    }
                                                                                }
                                                                            }));
                                                                        }
                                                                    }}
                                                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md border border-white/20 z-10"
                                                                  >
                                                                    <X size={10} className="text-white font-bold" />
                                                                  </button>
                                                              </div>
                                                          );
                                                      })}
                                                  </div>

                                                  {totalPages > 1 && (
                                                      <button 
                                                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFindingsPage(prev => Math.min(totalPages - 1, prev + 1)); }}
                                                          onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setFindingsPage(prev => Math.min(totalPages - 1, prev + 1)); }}
                                                          disabled={safePage === totalPages - 1}
                                                          className="w-full py-1 bg-white/5 rounded-md flex justify-center hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:active:scale-100 transition-all shrink-0 mt-auto z-20 cursor-pointer"
                                                      >
                                                          <ChevronDown size={14} className="text-white pointer-events-none" />
                                                      </button>
                                                  )}
                                              </>
                                          );
                                      })()}
                                  </div>
                              ) : (
                                  <div className="flex items-center justify-center h-full opacity-50">
                                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Seleccione un Diagnóstico<br/>para la Zona Facial</span>
                                  </div>
                              )}
                          </div>
                      );
                  })()}
              </div>
          )}
      </div>

      <div className="relative shrink-0 w-full" style={{ height: `${320 + thumbOffset}px` }}>
        <div className="absolute w-full px-4 transition-all duration-300 ease-out" style={{ bottom: `${20 + thumbOffset}px` }}>
          {(() => {
              let hasAnyGlobalTool = false;
              if (examStates) {
                  Object.values(examStates).forEach(legState => {
                      if (legState) {
                          Object.values(legState).forEach(nodeState => {
                              if (nodeState && (
                                  (nodeState.pulso && nodeState.pulso.length > 0) || 
                                  (nodeState.piel && nodeState.piel.length > 0) || 
                                  (nodeState.lesion && nodeState.lesion.length > 0) || 
                                  (nodeState.intervencion && nodeState.intervencion.length > 0)
                              )) {
                                  hasAnyGlobalTool = true;
                              }
                          });
                      }
                  });
              }
              
              if (hasAnyGlobalTool || (state.activeToolIds && state.activeToolIds.length > 0)) {
                  return null;
              }
              
              return (
                  <div className="flex justify-between items-center mb-2 px-2 opacity-50">
                      <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: THEME.textMain }}>Herramientas Topográficas</span>
                  </div>
              );
          })()}

          <div className="flex flex-col gap-2 p-2 rounded-xl shadow-lg border transition-all" style={{ backgroundColor: THEME.bgApp, borderColor: THEME.border }}>
              {/* Botones Redondos (Herramientas Flotantes) */}
              <div className="flex items-center justify-center gap-2 py-1 flex-wrap">
                  {/* Utilidades */}
                  <button 
                      onClick={() => {
                          if (activeElement && isExamStarted) fileInputRef.current.click();
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur transition-all border shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 bg-white/5 hover:bg-white/10 border-white/10 hover:text-white ${(!activeElement || !isExamStarted) ? 'opacity-30 cursor-not-allowed text-gray-500' : 'cursor-pointer text-gray-400'}`}
                      title="Adjuntar Foto a Nodo"
                  >
                      <Camera size={18} />
                  </button>

                  <button 
                      onClick={() => actions.setIsRightSidebarOpen(true)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur transition-all border shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 bg-white/5 hover:bg-white/10 border-white/10 hover:text-white md:hidden ${(!activeElement || !isExamStarted) ? 'opacity-30 cursor-not-allowed text-gray-500' : 'cursor-pointer text-gray-400'}`}
                      title="Abrir Panel Clínico"
                  >
                      <ClipboardList size={18} />
                  </button>

                  <button 
                      onClick={() => actions.setShowLegend(!state.showLegend)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full backdrop-blur transition-all border shadow-[0_4px_10px_rgba(0,0,0,0.3)] active:scale-95 ${state.showLegend ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : `bg-white/5 hover:bg-white/10 border-white/10 hover:text-white ${(!activeElement || !isExamStarted) ? 'opacity-30 cursor-not-allowed text-gray-500' : 'cursor-pointer text-gray-400'}`}`}
                      title="Mostrar Leyenda"
                  >
                      <Info size={18} />
                  </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 items-start">
                  {displaySlots.map((slot, index) => {
                      if (!slot) return <div key={`empty-${index}`} className="h-[60px] rounded-xl border border-dashed border-white/10" />;
                      
                      if (slot.type === 'CATEGORY') {
                          const isActiveCat = activeCategory === slot.id;
                          const CatIcon = slot.icon;
                          const visibleToolsCount = slot.tools.filter(t => state.activeToolIds.includes(t)).length;
                          const totalCatPages = Math.ceil(visibleToolsCount / 6);
                          const hasMorePages = totalCatPages > 1;
                          
                          return (
                              <button 
                                key={`cat-${slot.id}`} onClick={() => handleCategoryClick(slot.id)} 
                                className={`flex flex-col items-center justify-center h-[60px] rounded-xl transition-all ${isActiveCat ? 'bg-[#262626] border shadow-inner shadow-black/50' : 'bg-black/20 border hover:bg-white/5 active:scale-95'}`}
                                style={{ borderColor: isActiveCat ? slot.hex : THEME.border }}
                              >
                                  <div className="relative flex items-center justify-center mb-1">
                                      <CatIcon className="w-6 h-6" style={{ color: isActiveCat ? slot.hex : THEME.textMuted }} />
                                      {isActiveCat && categoryPage > 0 && (
                                          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0.5">
                                              {Array.from({ length: categoryPage }).map((_, i) => (
                                                  <Plus key={i} size={10} style={{ color: slot.hex }} strokeWidth={4} />
                                              ))}
                                          </div>
                                      )}
                                  </div>
                                  <span className="text-[8px] uppercase tracking-widest font-bold" style={{ color: isActiveCat ? THEME.textMain : THEME.textMuted }}>{slot.name}</span>
                              </button>
                          );
                      }

                      // It's a TOOL
                      const toolId = slot.id;
                      const tool = TOOLS_MAP[toolId];
                      if(!tool) return null;

                      let isActive = false;
                      const isDrawingTool = ['draw_varice', 'draw_telangiectasia', 'draw_green', 'draw_yellow'].includes(toolId);
                      
                      if (isDrawingTool) {
                          isActive = state.activeDrawingTool === toolId;
                      } else if (activeElement) {
                          const stateId = activeElement.targetId || activeElement.id;
                          const sState = examStates[stateId] || {};
                          const cat = tool.category;
                          const currentArr = Array.isArray(sState[cat]) ? sState[cat] : (sState[cat] && sState[cat] !== 'unmapped' ? [sState[cat]] : []);
                          isActive = currentArr.includes(toolId);
                      }

                      const colorRender = tool.hex;
                      let btnStyle = { backgroundColor: isActive ? THEME.bgHover : THEME.bgSurface, borderColor: isActive ? colorRender : THEME.border };
                      
                      let isToolDisabled = !activeElement || !isExamStarted;
                      if (!isToolDisabled) {
                          if (activeElement.isTransFacial) {
                              isToolDisabled = tool.type !== 'sintoma' && !ZONAL_TOOLS.includes(toolId) && toolId !== 'photo';
                          } else if (activeElement.isPulse) {
                              isToolDisabled = tool.category !== 'pulso' && toolId !== 'photo';
                          } else {
                              isToolDisabled = (tool.type === 'sintoma' || tool.category === 'pulso') && toolId !== 'photo' && toolId !== 'draw_varice' && toolId !== 'draw_telangiectasia' && toolId !== 'draw_green' && toolId !== 'draw_yellow';
                          }
                      }
                      const ToolIcon = tool.icon;

                      return (
                          <button 
                              key={`tool-${toolId}`} onClick={() => {
                                  if (activeElement && isExamStarted) {
                                      if (isDrawingTool) {
                                          actions.setActiveDrawingTool(state.activeDrawingTool === toolId ? null : toolId);
                                      } else if (toolId === 'photo') {
                                          fileInputRef.current.click();
                                      } else {
                                          handleToolClick(toolId);
                                      }
                                  }
                              }} 
                              onPointerDown={() => setPressedTool(toolId)} onPointerUp={() => setPressedTool(null)} onPointerLeave={() => setPressedTool(null)}
                              onContextMenu={(e) => e.preventDefault()}
                              className={`flex items-center justify-center h-[60px] rounded-xl border transition-all touch-none ${isToolDisabled ? 'opacity-30 cursor-not-allowed' : 'active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.3)]'}`} 
                              style={btnStyle}
                              disabled={isToolDisabled}
                          >
                              <ToolIcon 
                                  className="w-7 h-7 pointer-events-none transition-opacity" 
                                  style={{ color: isActive ? colorRender : THEME.textMuted, opacity: (!isActive) ? 0.5 : 1 }} 
                              />
                          </button>
                      );
                  })}
                  </div>
              </div>
          </div>
        </div>
    </aside>
  );
};

// ============================================================================
// CAPA DE RENDERIZADO DE PUNTOS CLÍNICOS Y MAPA TOPOGRÁFICO
// ============================================================================

const DynamicPointLayer = React.memo(({ pointData, coordinates, isPulseNode, nodeId }) => {
    const pulseToolsToHide = ['pulse_normal', 'pulse_dim', 'pulse_absent'];
    const pulso = getArray(pointData.pulso).filter(id => !pulseToolsToHide.includes(id)).map(id => TOOLS_MAP[id]).filter(Boolean);
    
    const piel = getArray(pointData.piel).filter(id => !ZONAL_TOOLS.includes(id)).map(id => TOOLS_MAP[id]).filter(Boolean);
    const lesion = getArray(pointData.lesion).map(id => TOOLS_MAP[id]).filter(Boolean);
    const intervencion = getArray(pointData.intervencion).filter(id => id !== 'amputation').map(id => TOOLS_MAP[id]).filter(Boolean);

    const allFindings = [...pulso, ...piel, ...lesion, ...intervencion];
    if (allFindings.length === 0) return null;

    const isDorsalToe = nodeId.includes('dor_o');
    const isPlantarToe = nodeId.includes('pla_o');
    
    return (
      <g className="pointer-events-none" transform={`translate(${coordinates.x}, ${coordinates.y})`}>
          {allFindings.map((tool, idx) => {
              let ox = 0, oy = 0;
              if (isDorsalToe) { ox = -12 - (idx * 14); oy = 0; } 
              else if (isPlantarToe) { ox = 12 + (idx * 14); oy = 0; } 
              else if (isPulseNode) { ox = 18 + (idx * 14); oy = 0; } 
              else {
                  const sign = idx % 2 === 0 ? -1 : 1;
                  const step = Math.floor(idx / 2) + 1;
                  oy = sign * (step * 14);
                  ox = 0;
              }
              const ToolIcon = tool.icon;
              return (
                  <g key={tool.id} transform={`translate(${ox}, ${oy}) scale(0.58)`} filter="drop-shadow(0 1px 1px rgba(0,0,0,0.8))">
                      <circle cx="0" cy="0" r="12" fill={THEME.bgSurface} stroke={tool.hex} strokeWidth="1.5" opacity="0.9" />
                      <ToolIcon x="-12" y="-12" width="24" height="24" style={{ color: tool.hex }} />
                  </g>
              );
          })}
      </g>
    );
});

const MapCanvas = ({ state, actions }) => {
  const { leg, activeElement, examStates, isExamStarted, showLegend } = state;
  const { setLeg, setActiveElement, setShowLegend } = actions;
  
  const gRefDesktop = useRef(null);
  const gRefMobile = useRef(null);

  const getPointerCoords = (e, gNode) => {
      if (!gNode) return null;
      const svgRoot = gNode.ownerSVGElement;
      if (!svgRoot) return null;
      const pt = svgRoot.createSVGPoint();
      pt.x = e.clientX || (e.touches && e.touches[0]?.clientX);
      pt.y = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (pt.x === undefined || pt.y === undefined) return null;
      return pt.matrixTransform(gNode.getScreenCTM().inverse());
  };

  const handlePointerDown = (e, isMobile = false) => {
      actions.setActiveElement(null);
      
      if (!state.activeDrawingTool || !isExamStarted) return;
      e.preventDefault();
      e.stopPropagation();
      const gNode = isMobile ? gRefMobile.current : gRefDesktop.current;
      const coords = getPointerCoords(e, gNode);
      if (coords) {
          actions.setCurrentPath({ type: state.activeDrawingTool, points: [{ x: coords.x, y: coords.y }] });
      }
  };

  const handlePointerMove = (e, isMobile = false) => {
      if (!state.activeDrawingTool || !state.currentPath) return;
      e.preventDefault();
      e.stopPropagation();
      const gNode = isMobile ? gRefMobile.current : gRefDesktop.current;
      const coords = getPointerCoords(e, gNode);
      if (coords) {
          actions.setCurrentPath(prev => ({ ...prev, points: [...prev.points, { x: coords.x, y: coords.y }] }));
      }
  };

  const activeZonal = {};
  let globalAmputationX = -1;
  
  Object.entries(examStates).forEach(([nodeId, nState]) => {
      let nodeX;
      
      if (nodeId.startsWith('trans_')) {
          if (nodeId === 'trans_todo') nodeX = 280;
          if (nodeId === 'trans_muslo') nodeX = 260;
          if (nodeId === 'trans_pierna') nodeX = 160;
          if (nodeId === 'trans_pie') nodeX = 90;
      } else {
          const node = PUNTOS_ANATOMICOS.find(p => p.id === nodeId);
          if (!node || node.isPulse) return;
          
          if (nState.intervencion?.includes('amputation')) {
              const isLegPoint = node.id.match(/_(tib|fem|rod|rot|per|sur|pop|mal|cal)/);
              if (isLegPoint && node.cx > globalAmputationX) {
                  globalAmputationX = node.cx;
              }
          }

          nodeX = node.cx;
          if (node.vista === 'Plantar') {
              nodeX = 87 - ((node.cx - 174) * 0.443); 
          }
      }

      const pielTools = getArray(nState.piel);
      pielTools.forEach(toolId => {
          if (ZONAL_TOOLS.includes(toolId)) {
              if (!activeZonal[toolId] || nodeX > activeZonal[toolId]) {
                  activeZonal[toolId] = nodeX;
              }
          }
      });
  });

  const xPoints = Array.from(new Set([0, ...Object.values(activeZonal)])).sort((a,b) => a - b);
  const segments = [];
  for (let i = 0; i < xPoints.length - 1; i++) {
      const startX = xPoints[i];
      const endX = xPoints[i+1];
      const activeInSegment = Object.keys(activeZonal).filter(t => activeZonal[t] >= endX);
      if (activeInSegment.length > 0) {
          segments.push({ startX, endX, tools: activeInSegment });
      }
  }

  const isNodeAmputated = (node) => {
      if (globalAmputationX === -1) return false;
      if (node.cx === globalAmputationX && !node.id.includes('_o')) return false;
      if (node.vista === 'Dorsal' || node.vista === 'Plantar') {
          return globalAmputationX > 60; 
      }
      return node.cx < globalAmputationX;
  };
  
  return (
    <main className="flex-1 relative overflow-hidden flex flex-col min-w-0 touch-none overscroll-none" style={{ backgroundImage: `linear-gradient(to top, ${THEME.bgApp}F2 0%, ${THEME.bgApp}40 50%, ${THEME.bgApp}00 100%)` }}>
      
      <style>{`
        .svg-path { transition: filter 0.3s ease-in-out; }
        .nodo-interactivo { cursor: pointer; -webkit-tap-highlight-color: transparent; transition: all 0.2s; }
        .etiqueta-nodo { opacity: 0; transition: opacity 0.2s ease-in-out; pointer-events: none; }
        .nodo-interactivo:hover .etiqueta-nodo, .nodo-interactivo:active .etiqueta-nodo { opacity: 1; }
        .punto-visible { transition: all 0.2s ease-in-out; }
        .nodo-clickeado { stroke: currentColor !important; stroke-width: 3px !important; filter: drop-shadow(0px 0px 6px currentColor); fill: rgba(255,255,255,0.2) !important; }
        .nodo-interactivo:hover .punto-visible, .nodo-interactivo:active .punto-visible {
            stroke: currentColor !important; stroke-width: 2px !important; filter: drop-shadow(0px 0px 4px currentColor); 
        }
        .linea-conectora { stroke-width: 0.5px; stroke-dasharray: 1.5, 1.5; transition: all 0.2s ease-in-out; }
        .punto-anclaje { transition: fill 0.2s; }
        .nodo-interactivo:hover .linea-conectora, .nodo-interactivo:active .linea-conectora { stroke: currentColor !important; opacity: 1 !important; }
        .nodo-interactivo:hover .punto-anclaje, .nodo-interactivo:active .punto-anclaje { fill: currentColor !important; opacity: 1 !important; }
      `}</style>

      <div className="h-14 px-4 shrink-0 flex items-center justify-center z-[60] relative w-full" style={{ backgroundColor: THEME.bgSidebar, borderBottom: `1px solid ${THEME.border}` }}>
        {/* Desktop Title */}
        <div className="hidden md:flex items-center gap-4 md:gap-6 bg-[#1a1a1a] px-3 py-1.5 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex items-center gap-1">
                <span className="px-3 py-1 rounded-md text-[11px] font-black tracking-wide text-white bg-white/10">Mapa Topográfico Integral (6 Vistas)</span>
            </div>
        </div>

        {/* Mobile Navigation replacing Title */}
        <div className="md:hidden flex w-full max-w-sm mx-auto bg-[#1a1a1a] p-1 border border-white/5 rounded-2xl overflow-hidden shadow-inner">
              {state.viewSegment === 'PIERNA' ? (
                  <>
                      {['medial', 'anterior', 'lateral', 'posterior'].map(view => {
                          const label = view === 'medial' ? 'MED' : view === 'anterior' ? 'ANT' : view === 'lateral' ? 'LAT' : 'POST';
                          return (
                              <button 
                                  key={view}
                                  onClick={() => actions.setMobileSubView(view)}
                                  className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${state.mobileSubView === view ? 'bg-yellow-500 text-black shadow-md' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                              >
                                  {label}
                              </button>
                          );
                      })}
                  </>
              ) : (
                  <>
                      {['dorsal', 'plantar'].map(view => (
                          <button 
                              key={view}
                              onClick={() => actions.setMobileSubView(view)}
                              className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl ${state.mobileSubView === view ? 'bg-yellow-500 text-black shadow-md' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                          >
                              {view}
                          </button>
                      ))}
                  </>
              )}
        </div>

        {/* Legend Modal */}
        <div className="absolute right-4 z-40 flex items-center gap-2">
             {showLegend && (
                <div className="absolute top-12 right-0 w-64 bg-[#1C1C1C]/95 backdrop-blur-md border border-[#404040] rounded-xl shadow-2xl p-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto custom-scrollbar animate-in slide-in-from-top-4 fade-in">
                   <div className="flex justify-between items-center mb-1 border-b border-white/10 pb-2 sticky top-0 bg-[#1C1C1C]/95 z-10">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">Leyenda Clínica</span>
                     <button onClick={() => setShowLegend(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors"><X size={14} className="text-gray-400 hover:text-white"/></button>
                   </div>
                   {['sintoma', 'signo'].map(tipo => {
                       const typeTools = MASTER_TOOLS.filter(t => t.type === tipo && t.id !== 'photo');
                       if (typeTools.length === 0) return null;
                       return (
                          <div key={tipo} className="mb-4">
                             <span className="text-[11px] font-black uppercase tracking-widest text-white border-b border-white/20 pb-1 mb-2 block w-full">
                                 {tipo === 'sintoma' ? 'Síntomas' : 'Signos Clínicos'}
                             </span>
                             {['venoso', 'arterial', 'linfatico'].map(sistema => {
                                 const tools = typeTools.filter(t => t.system === sistema);
                                 if (tools.length === 0) return null;
                                 return (
                                     <div key={sistema} className="flex flex-col gap-1.5 mb-3 ml-1">
                                         <span className="text-[9px] uppercase tracking-widest text-yellow-600/80 font-bold mb-0.5">
                                             Patología {sistema.charAt(0).toUpperCase() + sistema.slice(1)}
                                         </span>
                                         <div className="grid grid-cols-1 gap-1">
                                             {tools.map(tool => {
                                                 const ToolIcon = tool.icon;
                                                 const isZonal = ZONAL_TOOLS.includes(tool.id);
                                                 return (
                                                     <div key={tool.id} className="flex items-center justify-between gap-2.5 p-1.5 rounded-md transition-colors cursor-pointer hover:bg-white/5" onClick={() => actions.toggleToolVisibility(tool.id)}>
                                                         <div className="flex items-center gap-2.5">
                                                         <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                                                             <div className="absolute inset-0 rounded-full border opacity-40" style={{ backgroundColor: THEME.bgSurface, borderColor: tool.hex, borderWidth: '1px' }}></div>
                                                             <ToolIcon width="14" height="14" style={{color: tool.hex}} className="relative z-10" />
                                                         </div>
                                                         <span className="text-[10px] text-gray-300 font-medium leading-tight flex items-center gap-1.5">
                                                             {tool.name}
                                                             {isZonal && <span className="text-[8px] uppercase font-bold tracking-widest px-1 py-[1px] rounded-sm bg-black/40 border" style={{ color: tool.hex, borderColor: tool.hex }}>(Zona)</span>}
                                                         </span>
                                                      </div>
                                                      <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-all ${state.activeToolIds.includes(tool.id) ? 'bg-yellow-500 border-yellow-500' : 'bg-transparent border-[#525252]'}`}>
                                                          {state.activeToolIds.includes(tool.id) && <Check size={10} className="text-black" strokeWidth={3} />}
                                                      </div>
                                                   </div>
                                                 )
                                             })}
                                         </div>
                                     </div>
                                 );
                             })}
                          </div>
                       )
                   })}
                </div>
             )}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none flex justify-between items-start pt-24 px-0 z-0 overflow-hidden">
        <div className="font-black uppercase tracking-[0.25em] select-none transition-all duration-700 ease-out" style={{ writingMode: 'vertical-rl', fontSize: '72px', color: THEME.yellow, opacity: leg === 'DERECHA' ? 0.08 : 0, transform: leg === 'DERECHA' ? 'rotate(180deg) translateY(0)' : 'rotate(180deg) translateY(20px)' }}>DERECHA</div>
        <div className="font-black uppercase tracking-[0.25em] select-none transition-all duration-700 ease-out" style={{ writingMode: 'vertical-rl', fontSize: '72px', color: THEME.yellow, opacity: leg === 'IZQUIERDA' ? 0.08 : 0, transform: leg === 'IZQUIERDA' ? 'rotate(180deg) translateY(0)' : 'rotate(180deg) translateY(20px)' }}>IZQUIERDA</div>
      </div>



      {(() => {
        const svgInnerContent = (
          <>
            <defs>
            <clipPath id="legs-clip">
                {LEG_PATHS.map((d, i) => <path key={i} d={d} />)}
            </clipPath>
            {segments.map((seg, i) => (
                <pattern key={`pat-${i}`} id={`pat-${i}`} width={seg.tools.length * 6} height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    {seg.tools.map((t, j) => (
                        <rect key={j} x={j * 6} width="6" height="10" fill={TOOLS_MAP[t].hex} />
                    ))}
                </pattern>
            ))}
            <clipPath id="main-legs-clip">
                {LEG_PATHS.slice(0, 4).map((d, i) => <path key={i} d={d} />)}
            </clipPath>
            <clipPath id="dorsal-leg-clip">
                <path d={LEG_PATHS[4]} transform="translate(0, 12)" />
            </clipPath>
            <clipPath id="plantar-leg-clip">
                <path d={LEG_PATHS[5]} transform="translate(0, 12)" />
            </clipPath>
        </defs>

        <g id="layer1">
          {LEG_PATHS.map((d, i) => {
             const isFoot = i === 4 || i === 5;
             return <path key={`leg-${i}`} className="svg-path" style={{ fill: hexToRgba(THEME.yellow, 0.10), stroke: hexToRgba(THEME.yellow, 0.9), strokeWidth: '0.15' }} d={d} transform={isFoot ? "translate(0, 12)" : undefined} />
          })}

          {segments.map((seg, i) => {
              const stdWidth = seg.endX - seg.startX;
              let pStartX = 0, pWidth = 0;
              if (seg.startX < 87) {
                  const calcEnd = Math.min(seg.endX, 87);
                  pStartX = 174 + (87 - calcEnd) * 2.255;
                  const pEndX = 174 + (87 - seg.startX) * 2.255;
                  pWidth = pEndX - pStartX;
              }
              return (
                  <g key={`zonal-g-${i}`} opacity="0.6" className="pointer-events-none">
                      <rect x={seg.startX} y="0" width={stdWidth} height="350" fill={`url(#pat-${i})`} clipPath="url(#main-legs-clip)" />
                      <rect x={seg.startX} y="0" width={stdWidth} height="350" fill={`url(#pat-${i})`} clipPath="url(#dorsal-leg-clip)" />
                      {pWidth > 0 && <rect x={pStartX} y="0" width={pWidth} height="350" fill={`url(#pat-${i})`} clipPath="url(#plantar-leg-clip)" />}
                  </g>
              );
          })}

          {globalAmputationX > -1 && (
              <g className="pointer-events-none">
                  <rect x={-20} y={0} width={globalAmputationX + 20} height={350} fill={THEME.bgApp} clipPath="url(#main-legs-clip)" />
                  {globalAmputationX > 60 && (
                      <>
                          <rect x={0} y={0} width={340} height={350} fill={THEME.bgApp} clipPath="url(#dorsal-leg-clip)" />
                          <rect x={0} y={0} width={340} height={350} fill={THEME.bgApp} clipPath="url(#plantar-leg-clip)" />
                      </>
                  )}
              </g>
          )}

          {/* REGIONES CLICKEABLES ANATOMICAS (Muslo, Pantorrilla, Pie) */}
          {isExamStarted && !state.activeDrawingTool && (
              <g>
                  {/* Muslo */}
                  <g onClick={(e) => { e.stopPropagation(); actions.toggleTransfacialZone('trans_muslo'); }}>
                      <svg x="180" y="-20" width="100" height="400" viewBox="180 -20 100 400" className="overflow-hidden cursor-pointer">
                          {LEG_PATHS.slice(0, 4).map((d, i) => (
                              <path key={`thigh-${i}`} d={d} fill={(activeElement?.targetIds?.includes('trans_muslo') || activeElement?.targetIds?.includes('trans_todo')) ? 'rgba(255,255,255,0.15)' : 'transparent'} className="hover:fill-white/10 transition-colors pointer-events-auto" />
                          ))}
                      </svg>
                  </g>
                  {/* Pantorrilla */}
                  <g onClick={(e) => { e.stopPropagation(); actions.toggleTransfacialZone('trans_pierna'); }}>
                      <svg x="87" y="-20" width="93" height="400" viewBox="87 -20 93 400" className="overflow-hidden cursor-pointer">
                          {LEG_PATHS.slice(0, 4).map((d, i) => (
                              <path key={`calf-${i}`} d={d} fill={(activeElement?.targetIds?.includes('trans_pierna') || activeElement?.targetIds?.includes('trans_todo')) ? 'rgba(255,255,255,0.15)' : 'transparent'} className="hover:fill-white/10 transition-colors pointer-events-auto" />
                          ))}
                      </svg>
                  </g>
                  {/* Pie */}
                  <g onClick={(e) => { e.stopPropagation(); actions.toggleTransfacialZone('trans_pie'); }}>
                      <svg x="-20" y="-20" width="107" height="400" viewBox="-20 -20 107 400" className="overflow-hidden cursor-pointer">
                          {LEG_PATHS.map((d, i) => {
                              const isFoot = i === 4 || i === 5;
                              return <path key={`foot-${i}`} d={d} transform={isFoot ? "translate(0, 12)" : undefined} fill={(activeElement?.targetIds?.includes('trans_pie') || activeElement?.targetIds?.includes('trans_todo')) ? 'rgba(255,255,255,0.15)' : 'transparent'} className="hover:fill-white/10 transition-colors pointer-events-auto" />
                          })}
                      </svg>
                  </g>
              </g>
          )}

          <g className="pointer-events-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              {state.freehandDrawings.map((draw, i) => {
                  const sColor = draw.type === 'draw_varice' ? '#EF4444' : draw.type === 'draw_telangiectasia' ? '#3B82F6' : draw.type === 'draw_green' ? '#22C55E' : '#EAB308';
                  const sWidth = draw.type === 'draw_telangiectasia' ? '0.8' : '2';
                  return <polyline key={`draw-${i}`} points={draw.points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={sColor} strokeWidth={sWidth} strokeLinecap="round" strokeLinejoin="round" />
              })}
              {state.currentPath && (() => {
                  const sColor = state.currentPath.type === 'draw_varice' ? '#EF4444' : state.currentPath.type === 'draw_telangiectasia' ? '#3B82F6' : state.currentPath.type === 'draw_green' ? '#22C55E' : '#EAB308';
                  const sWidth = state.currentPath.type === 'draw_telangiectasia' ? '0.8' : '2';
                  return <polyline points={state.currentPath.points.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={sColor} strokeWidth={sWidth} strokeLinecap="round" strokeLinejoin="round" />
              })()}
          </g>

          <g fill={THEME.textMain} opacity="0.05" fontSize="4.5" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="0.5">
            {ETIQUETAS_VISTAS.map((etiqueta) => (
              <text key={etiqueta.id} x={etiqueta.x} y={etiqueta.y} className="md:block hidden">{etiqueta.nombre.toUpperCase()}</text>
            ))}
          </g>

          <g fontSize="7" fontFamily="Arial, sans-serif" fontWeight="bold">
            {PUNTOS_ANATOMICOS.map((punto) => {
              if (isNodeAmputated(punto)) return null; 

              const sState = examStates[punto.targetId || punto.id] || {};
              const isSelected = activeElement?.id === punto.id || (activeElement && punto.targetId && activeElement.targetId === punto.targetId);
              
              const isPulseEvaluated = punto.isPulse && sState.pulso && sState.pulso.some(id => ['pulse_normal', 'pulse_dim', 'pulse_absent'].includes(id));
              const hasData = isPulseEvaluated || sState.foto || (sState.piel && sState.piel.length > 0) || (sState.lesion && sState.lesion.length > 0) || (sState.intervencion && sState.intervencion.length > 0);
              
              let pulseColor = '#FFFFFF';
              if (sState.pulso?.includes('pulse_normal')) pulseColor = THEME.cyan;
              else if (sState.pulso?.includes('pulse_dim')) pulseColor = THEME.yellow;
              else if (sState.pulso?.includes('pulse_absent')) pulseColor = THEME.red;

              const baseColor = punto.isPulse ? pulseColor : punto.isTransFacial ? '#FFFFFF' : THEME.yellow;
              const nodeRadius = punto.isPulse || punto.isTransFacial ? 5 : 2.5;
              const hitboxRadius = punto.isPulse || punto.isTransFacial ? 16 : 12;

              return (
                  <g 
                  key={punto.id} 
                  className="nodo-interactivo" 
                  onPointerDown={(e) => { 
                      if (!isExamStarted) return;
                      e.stopPropagation(); 
                      actions.setActiveElement(punto); 
                  }}
                  onMouseEnter={() => {
                      actions.setHoveredElement && actions.setHoveredElement(punto);
                  }}
                  onMouseLeave={() => actions.setHoveredElement && actions.setHoveredElement(null)}
                  style={{ color: baseColor, pointerEvents: (isExamStarted && !state.activeDrawingTool) ? 'auto' : 'none' }}
                >
                  {punto.tipo === 'linea' && (
                    <>
                      <line x1={punto.x1} y1={punto.y1} x2={punto.cx} y2={punto.cy} className="linea-conectora" style={{ stroke: (hasData || isSelected || punto.isPulse) ? 'currentColor' : hexToRgba(THEME.yellow, 0.5), opacity: 1 }} />
                      <circle cx={punto.x1} cy={punto.y1} r="0.8" className="punto-anclaje" style={{ fill: (hasData || isSelected || punto.isPulse) ? 'currentColor' : THEME.yellow, opacity: 1 }} />
                    </>
                  )}
                  {punto.tipo === 'polyline' && (
                    <>
                      <polyline points={punto.points} fill="none" className="linea-conectora" style={{ stroke: (hasData || isSelected) ? 'currentColor' : hexToRgba(THEME.yellow, 0.5), opacity: 1 }} />
                      <circle cx={punto.x1} cy={punto.y1} r="0.8" className="punto-anclaje" style={{ fill: (hasData || isSelected) ? 'currentColor' : THEME.yellow, opacity: 1 }} />
                    </>
                  )}
                  {punto.tipo !== 'region' && (
                      <circle cx={punto.cx} cy={punto.cy} r={hitboxRadius} fill="transparent" />
                  )}
                  {punto.tipo !== 'region' && (
                      <circle 
                        cx={punto.cx} cy={punto.cy} r={nodeRadius} 
                        className={`punto-visible ${isSelected ? 'nodo-clickeado' : ''}`} 
                        style={{ stroke: (isSelected || punto.isPulse) ? 'currentColor' : hexToRgba(THEME.yellow, 0.6), fill: (punto.isPulse && isPulseEvaluated) ? 'currentColor' : THEME.bgApp, strokeWidth: (isSelected || punto.isPulse) ? 2 : 1 }}
                      />
                  )}
                  {hasData && <DynamicPointLayer pointData={sState} coordinates={{x: punto.cx, y: punto.cy}} isPulseNode={punto.isPulse} nodeId={punto.id} />}
                  {sState.foto && <circle cx={punto.cx + 6} cy={punto.cy - 6} r="1.5" fill={THEME.textMain} className="pointer-events-none" />}
                </g>
              );
            })}
          </g>
        </g>
        </>
        );

        let mobileViewBox = "30 -280 60 280"; // medial default
        let mobileTransformClass = "translate-y-[20px]";
        let mobilePaddingClass = "";
        let mobileWidthClass = "w-[80%]";
        let mobileContainerClass = "max-w-xs px-4";

        if (state.mobileSubView === 'anterior') mobileViewBox = "90 -280 60 280";
        if (state.mobileSubView === 'lateral') mobileViewBox = "150 -280 60 280";
        if (state.mobileSubView === 'posterior') mobileViewBox = "210 -280 60 280";
        
        if (state.mobileSubView === 'dorsal') {
            mobileViewBox = "275 -100 70 90";
            mobileTransformClass = "translate-y-0";
            mobilePaddingClass = "pt-[230px]";
            mobileWidthClass = "w-full";
            mobileContainerClass = "max-w-sm px-2";
        }
        if (state.mobileSubView === 'plantar') {
            mobileViewBox = "285 -279 50 108";
            mobileTransformClass = "-translate-y-[24px]";
        }

        return (
          <>
            {/* DESKTOP VIEW */}
            <svg 
               viewBox="10 -5 280 350" 
               className={`absolute inset-0 w-full h-full hidden md:block pt-16 pb-6 z-10 ${state.activeDrawingTool ? 'cursor-crosshair' : ''}`}
               preserveAspectRatio="xMidYMid meet"
               style={{ filter: !isExamStarted ? 'grayscale(80%)' : 'none', transition: 'all 0.5s ease', opacity: !isExamStarted ? 0.4 : 1, touchAction: state.activeDrawingTool ? 'none' : 'auto' }}
               onPointerDown={(e) => handlePointerDown(e, false)}
               onPointerMove={(e) => handlePointerMove(e, false)}
            >
              <g ref={gRefDesktop}>{svgInnerContent}</g>
            </svg>

            {/* MOBILE VIEW */}
            <div className={`md:hidden absolute inset-0 w-full h-full pt-28 pb-6 z-10 flex items-center justify-center ${!isExamStarted ? 'opacity-40 grayscale' : ''}`}>
                <div className={`w-full ${mobileContainerClass} h-full flex flex-col items-center justify-center`}>
                    <svg 
                        viewBox={mobileViewBox} 
                        className={`${mobileWidthClass} h-auto drop-shadow-2xl border border-white/10 rounded-xl bg-[#262626]/40 overflow-visible transition-all duration-500 ease-in-out ${mobileTransformClass} ${mobilePaddingClass} ${state.activeDrawingTool ? 'cursor-crosshair' : ''}`}
                        style={{ touchAction: state.activeDrawingTool ? 'none' : 'auto' }}
                        onPointerDown={(e) => handlePointerDown(e, true)}
                        onPointerMove={(e) => handlePointerMove(e, true)}
                    >
                        <g transform="rotate(-90)" ref={gRefMobile}>{svgInnerContent}</g>
                    </svg>
                </div>
            </div>
            {Object.keys(activeZonal).length > 0 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 pointer-events-none">
                    {Object.keys(activeZonal).map(toolId => {
                        const tool = TOOLS_MAP[toolId];
                        if (!tool) return null;
                        const TIcon = tool.icon;
                        return (
                            <div key={toolId} className="w-8 h-8 rounded-full bg-black/60 border backdrop-blur flex items-center justify-center shadow-lg" style={{ borderColor: tool.hex }} title={tool.name}>
                                <TIcon size={16} style={{ color: tool.hex }} />
                            </div>
                        );
                    })}
                </div>
            )}
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex gap-2">
                <button
                    onClick={() => actions.toggleTransfacialZone('trans_todo')}
                    className={`relative px-4 py-1.5 rounded-full border backdrop-blur-md transition-all active:scale-95 ${activeElement?.targetIds?.includes('trans_todo') ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-[#1a1a1a]/80 text-yellow-500 border-white/10 hover:bg-white/10'}`}
                >
                    <span className="text-[9px] font-black tracking-wider uppercase">MMII</span>
                    {examStates['trans_todo'] && Object.keys(examStates['trans_todo']).some(k => examStates['trans_todo'][k] && examStates['trans_todo'][k].length > 0) && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-500 rounded-full border-[2px] border-[#1a1a1a] shadow-sm"></div>
                    )}
                </button>
                <button
                    onClick={() => actions.toggleTransfacialZone('trans_muslo')}
                    className={`relative px-4 py-1.5 rounded-full border backdrop-blur-md transition-all active:scale-95 ${activeElement?.targetIds?.includes('trans_muslo') ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-[#1a1a1a]/80 text-gray-300 border-white/10 hover:bg-white/10'}`}
                >
                    <span className="text-[9px] font-black tracking-wider uppercase">Muslo</span>
                    {examStates['trans_muslo'] && Object.keys(examStates['trans_muslo']).some(k => examStates['trans_muslo'][k] && examStates['trans_muslo'][k].length > 0) && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-500 rounded-full border-[2px] border-[#1a1a1a] shadow-sm"></div>
                    )}
                </button>
                <button
                    onClick={() => actions.toggleTransfacialZone('trans_pierna')}
                    className={`relative px-4 py-1.5 rounded-full border backdrop-blur-md transition-all active:scale-95 ${activeElement?.targetIds?.includes('trans_pierna') ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-[#1a1a1a]/80 text-gray-300 border-white/10 hover:bg-white/10'}`}
                >
                    <span className="text-[9px] font-black tracking-wider uppercase">Pierna</span>
                    {examStates['trans_pierna'] && Object.keys(examStates['trans_pierna']).some(k => examStates['trans_pierna'][k] && examStates['trans_pierna'][k].length > 0) && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-500 rounded-full border-[2px] border-[#1a1a1a] shadow-sm"></div>
                    )}
                </button>
                <button
                    onClick={() => actions.toggleTransfacialZone('trans_pie')}
                    className={`relative px-4 py-1.5 rounded-full border backdrop-blur-md transition-all active:scale-95 ${activeElement?.targetIds?.includes('trans_pie') ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-[#1a1a1a]/80 text-gray-300 border-white/10 hover:bg-white/10'}`}
                >
                    <span className="text-[9px] font-black tracking-wider uppercase">Pie</span>
                    {examStates['trans_pie'] && Object.keys(examStates['trans_pie']).some(k => examStates['trans_pie'][k] && examStates['trans_pie'][k].length > 0) && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-500 rounded-full border-[2px] border-[#1a1a1a] shadow-sm"></div>
                    )}
                </button>
            </div>
          </>
        );
      })()}
    </main>
  );
};

// ============================================================================
// PANEL DE AUDITORÍA Y ESTUDIO (DERECHA)
// ============================================================================
const SidebarRight = ({ state, actions }) => {
  const { leg, activeElement, examStates, activeTab, workOrder, isExamStarted, importedData, protocolExclusions, userRole } = state;
  const { generateAIReport, isGeneratingReport, setGlobalExamStates, setActiveElement, setActiveTab, setProtocolExclusions, setToastMessage, setWorkOrder } = actions;

  const [viewIndex, setViewIndex] = useState(0);

  const toggleProtocol = (protocol) => {
      if (protocol === 'EXPERT') {
          setWorkOrder(['EXPERT']);
          return;
      }
      let newOrder = [...workOrder].filter(p => p !== 'EXPERT');
      if (newOrder.includes(protocol)) {
          newOrder = newOrder.filter(p => p !== protocol);
      } else {
          newOrder.push(protocol);
      }
      setWorkOrder(newOrder);
  };

  // Auto-switch a 'nodo' cuando seleccionas un punto clínico
  useEffect(() => {
      if (activeElement) setActiveTab('node');
  }, [activeElement, setActiveTab]);

  const currentPointsKeys = PUNTOS_ANATOMICOS.map(p => p.id);

  const handlePrevRegion = () => {
      if (!activeElement || currentPointsKeys.length === 0) return;
      const currentIndex = currentPointsKeys.indexOf(activeElement.id);
      const prevIndex = (currentIndex - 1 + currentPointsKeys.length) % currentPointsKeys.length;
      setActiveElement({ id: currentPointsKeys[prevIndex] });
  };

  const handleNextRegion = () => {
      if (!activeElement || currentPointsKeys.length === 0) return;
      const currentIndex = currentPointsKeys.indexOf(activeElement.id);
      const nextIndex = (currentIndex + 1) % currentPointsKeys.length;
      setActiveElement({ id: currentPointsKeys[nextIndex] });
  };

  const setRegionProp = (id, prop, val) => {
      const targetId = (activeElement && activeElement.id === id && activeElement.targetId) ? activeElement.targetId : id;
      setGlobalExamStates(prev => ({
          ...prev, [leg]: { ...prev[leg], [targetId]: { ...(prev[leg][targetId] || {}), [prop]: val } }
      }));
  };

  const handleDeletePoint = () => {
      if (!activeElement) return;
      setGlobalExamStates(prev => {
          const newState = { ...prev };
          const newLegState = { ...newState[leg] };
          const targetId = activeElement.targetId || activeElement.id;
          delete newLegState[targetId];
          newState[leg] = newLegState;
          return newState;
      });
      setActiveElement(null);
  };

  const toggleExclusion = (key) => {
      setProtocolExclusions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeRegionState = activeElement ? (examStates[activeElement.targetId || activeElement.id] || {}) : null;
  const activeRegionObj = PUNTOS_ANATOMICOS.find(p => p.id === activeElement?.id);
  
  const dynamicFindings = [];
  if (activeRegionState) {
      getArray(activeRegionState.pulso).forEach(p => dynamicFindings.push(TOOLS_MAP[p]));
      getArray(activeRegionState.piel).forEach(p => dynamicFindings.push(TOOLS_MAP[p]));
      getArray(activeRegionState.lesion).forEach(f => dynamicFindings.push(TOOLS_MAP[f]));
      getArray(activeRegionState.intervencion).forEach(inv => dynamicFindings.push(TOOLS_MAP[inv]));
  }

  const hasUlcer = dynamicFindings.some(f => f && f.id && (f.id === 'ulcer_venous' || f.id === 'ulcer_arterial' || f.id === 'ulcer_neuro'));
  const hasNecrosis = dynamicFindings.some(f => f && f.id === 'necrosis');
  const hasEdema = dynamicFindings.some(f => f && f.id === 'edema');
  const hasLymphedema = dynamicFindings.some(f => f && f.id === 'lymphedema');
  const hasPulse = dynamicFindings.some(f => f && f.category === 'pulso');
  const hasInfectionSigns = dynamicFindings.some(f => f && (f.id === 'rubor' || f.id === 'hot' || f.id === 'edema' || f.id === 'infection'));
  const isAmputated = dynamicFindings.some(f => f && f.id === 'amputation');

  // Lógica de Validación Clínica del Nodo (El Centinela focal)
  const missingData = [];
  if (activeRegionState) {
      if (isAmputated && !activeRegionState.amputation_level) missingData.push('Nivel de Amputación');
      if (hasUlcer && (!activeRegionState.ulcer_length || !activeRegionState.ulcer_width)) missingData.push('Dimensiones de Úlcera');
      if ((hasUlcer || hasNecrosis) && !activeRegionState.wifi_w) missingData.push('Grado WIFI (W)');
      if (hasPulse && !activeRegionState.wifi_i) missingData.push('Grado WIFI (I)');
      if (hasPulse && !activeRegionState.pulse_intensity) missingData.push('Intensidad de Pulso');
      if (hasInfectionSigns && !activeRegionState.wifi_fi) missingData.push('Grado WIFI (fI)');
      if (hasEdema && !activeRegionState.edema_grade) missingData.push('Grado de Edema');
      if (hasLymphedema && (!activeRegionState.clave_c || !activeRegionState.clave_v || !activeRegionState.clave_e || !activeRegionState.clave_l || !activeRegionState.clave_a)) missingData.push('C.L.A.V.E. Incompleto');
  }

  // --- CÁLCULO AUTOMÁTICO DE CLASIFICACIONES CLÍNICAS ---
  let ceapSet = new Set();
  let wifi_wound = 0;
  let wifi_ischemia = 0;
  let wifi_infection = 0;
  let vcss_score = 0;
  let recta_c = importedData.rectaC || 0; 
  let recta_t = 0;
  let recta_a = 0;
  let clave_c = 0;

  Object.entries(examStates).forEach(([regionId, region]) => {
      if(regionId === 'global_general') return;
      const tools = [...getArray(region.piel), ...getArray(region.lesion), ...getArray(region.pulso), ...getArray(region.intervencion)];
      
      if (tools.includes('telangiectasia')) ceapSet.add(1);
      if (tools.includes('varices')) ceapSet.add(2);
      if (tools.includes('edema') || tools.includes('lymphedema')) ceapSet.add(3);
      if (tools.includes('cyanosis') || tools.includes('rubor') || tools.includes('pallor') || tools.includes('pigmentation') || tools.includes('eczema') || tools.includes('lipodermatosclerosis')) ceapSet.add(4);
      if (tools.includes('healed_ulcer')) ceapSet.add(5);
      if (tools.includes('ulcer_venous') || tools.includes('ulcer_arterial') || tools.includes('ulcer_neuro')) ceapSet.add(6);

      if (region.wifi_w) wifi_wound = Math.max(wifi_wound, parseInt(region.wifi_w));
      if (region.wifi_i) wifi_ischemia = Math.max(wifi_ischemia, parseInt(region.wifi_i));
      if (region.wifi_fi) wifi_infection = Math.max(wifi_infection, parseInt(region.wifi_fi));

      if (region.clave_c) clave_c = Math.max(clave_c, parseInt(region.clave_c));

      if (tools.includes('varices') || tools.includes('telangiectasia')) vcss_score += 1;
      if (tools.includes('rubor') || tools.includes('cyanosis') || tools.includes('pallor')) vcss_score += 1;
      if (tools.includes('lymphedema')) vcss_score += 2;
      if (tools.includes('ulcer_venous')) vcss_score += 3;
      if (region.edema_grade) {
          if (region.edema_grade.includes('+ / 4')) vcss_score += 1;
          else if (region.edema_grade.includes('++ / 4')) vcss_score += 2;
          else if (region.edema_grade.includes('+++')) vcss_score += 3;
      }

      if (tools.includes('hair_loss') || tools.includes('thick_nails')) recta_t = Math.max(recta_t, 1);
      if (tools.includes('ulcer_arterial') || tools.includes('ulcer_neuro')) recta_t = Math.max(recta_t, 2);
      if (tools.includes('necrosis') || tools.includes('amputation')) recta_t = Math.max(recta_t, 3);
      if (tools.includes('ulcer_arterial') || tools.includes('necrosis')) recta_c = Math.max(recta_c, 4);

      if (tools.includes('pulse_absent') || tools.includes('pulse_dim')) {
          if (regionId === 'pulso_femoral') recta_a = 'Aai';
          else if (regionId === 'pulso_popliteo' && recta_a !== 'Aai') recta_a = 'Afp';
          else if ((regionId === 'pulso_pedio' || regionId === 'pulso_tibial') && recta_a !== 'Aai' && recta_a !== 'Afp') recta_a = 'Aip';
          else if (recta_a !== 0 && recta_a !== 'Amu') recta_a = 'Amu';
      }
  });

  if (recta_a === 0) recta_a = 'Norm';
  let recta_r = 0;
  if (wifi_ischemia === 1 || wifi_ischemia === 2) recta_r = 1;
  if (wifi_ischemia === 3) recta_r = 2;

  const ceapString = Array.from(ceapSet).sort((a,b) => a - b).join(',');
  const ceapDisplay = ceapSet.size > 0 ? `C${ceapString}${importedData.isSymptomaticVenous ? 's' : 'a'}` : `C0${importedData.isSymptomaticVenous ? 's' : 'a'}`;

  // --- INTERPRETACIONES CLÍNICAS DINÁMICAS ---
  const maxCeap = ceapSet.size > 0 ? Math.max(...Array.from(ceapSet)) : 0;
  let ceapMeaning = "Sin Signos Visibles";
  if (maxCeap === 1) ceapMeaning = "Telangiectasias o Venas Reticulares";
  if (maxCeap === 2) ceapMeaning = "Venas Varicosas";
  if (maxCeap === 3) ceapMeaning = "Edema de origen Venoso";
  if (maxCeap === 4) ceapMeaning = "Cambios Tróficos Cutáneos";
  if (maxCeap === 5) ceapMeaning = "Úlcera Venosa Cicatrizada";
  if (maxCeap === 6) ceapMeaning = "Úlcera Venosa Activa";

  let vcssMeaning = "Enfermedad Leve";
  if (vcss_score === 0) vcssMeaning = "Ausencia de Enfermedad";
  else if (vcss_score >= 4 && vcss_score <= 7) vcssMeaning = "Enfermedad Moderada";
  else if (vcss_score > 7) vcssMeaning = "Enfermedad Severa";

  let wifiMeaning = "Bajo Riesgo de Amputación";
  const wifiTotal = wifi_wound + wifi_ischemia + wifi_infection;
  if (wifiTotal >= 4) wifiMeaning = "Alto Riesgo de Amputación";
  else if (wifiTotal >= 2) wifiMeaning = "Riesgo Moderado de Amputación";
  
  let claveMeaning = "Sin Linfedema Clínico";
  if (clave_c === 1) claveMeaning = "Linfedema Reversible";
  if (clave_c === 2) claveMeaning = "Linfedema Irreversible (Sin Cambios)";
  if (clave_c === 3) claveMeaning = "Linfedema con Cambios Tisulares";
  if (clave_c === 4) claveMeaning = "Elefantiasis Nostras Verrucosa";

  let rectaMeaning = "Enfermedad Arterial Periférica";
  if (recta_c >= 4) rectaMeaning = "Isquemia Crónica Amenazante (CLTI)";
  else if (recta_r > 0) rectaMeaning = "Isquemia Arterial Moderada/Severa";
  else if (recta_a !== 'Norm' || recta_t > 0) rectaMeaning = "Enfermedad Arterial Leve/Asintomática";

  const classifications = [
      { title: 'CEAP', value: ceapDisplay, desc: ceapMeaning, color: THEME.blue, key: 'CEAP' },
      { title: 'WIFI', value: `W${wifi_wound} I${wifi_ischemia} fI${wifi_infection}`, desc: wifiMeaning, color: THEME.red, key: 'WIFI' },
      { title: 'VCSS', value: `${vcss_score} pts`, desc: vcssMeaning, color: THEME.cyan, key: 'CEAP' },
      { title: 'R.E.C.T.A.', value: `R${recta_r} ${importedData.rectaE} C${recta_c} T${recta_t} ${recta_a}`, desc: rectaMeaning, color: THEME.orange, key: 'RECTA' },
      { title: 'C.L.A.V.E.', value: `C${clave_c}`, desc: claveMeaning, color: THEME.green, key: 'CLAVE' }
  ];

  // --- LÓGICA DE AUDITORÍA DE PROTOCOLO (Global Checklist) ---
  const isExpert = workOrder.includes('EXPERT');
  const isWIFI = workOrder.includes('WIFI');
  const isCEAP = workOrder.includes('CEAP');
  const isRECTA = workOrder.includes('RECTA');
  const isCLAVE = workOrder.includes('CLAVE');

  let globalHasPedio = !!examStates['pulso_pedio']?.pulso?.length;
  let globalHasTibial = !!examStates['pulso_tibial']?.pulso?.length;
  let globalHasFemoral = !!examStates['pulso_femoral']?.pulso?.length;
  let globalHasPopliteo = !!examStates['pulso_popliteo']?.pulso?.length;
  let globalHasVenousSign = false;
  let globalHasEdema = false;
  let globalHasLymphedema = false;
  let globalHasLesion = false;

  Object.entries(examStates).forEach(([id, data]) => {
      if (id === 'global_general') return;
      if (data.piel?.some(t => ['varices', 'telangiectasia', 'cyanosis', 'rubor'].includes(t))) globalHasVenousSign = true;
      if (data.piel?.includes('edema')) globalHasEdema = true;
      if (data.piel?.includes('lymphedema')) globalHasLymphedema = true;
      if (data.lesion?.some(t => ['ulcer_venous', 'ulcer_arterial', 'ulcer_neuro', 'necrosis'].includes(t))) globalHasLesion = true;
  });

  const checkList = [];

  if (isWIFI || isRECTA) {
      checkList.push({ id: 'tsk_pulses_dist', label: 'Pulsos Distales (Pedio y Tibial)', isDone: (globalHasPedio && globalHasTibial) });
  }
  if (isRECTA) {
      checkList.push({ id: 'tsk_pulses_prox', label: 'Pulsos Proximales (Femoral y Popliteo)', isDone: (globalHasFemoral && globalHasPopliteo) });
  }
  if (isCEAP) {
      checkList.push({ id: 'tsk_venous', label: 'Estigmas Venosos (Várices/Piel)', isDone: globalHasVenousSign || protocolExclusions.no_varices });
  }
  if (isCEAP || isCLAVE) {
      checkList.push({ id: 'tsk_edema', label: 'Evaluación de Edema', isDone: globalHasEdema || protocolExclusions.no_edema });
  }
  if (isCLAVE) {
      checkList.push({ id: 'tsk_lymphedema', label: 'Linfedema', isDone: globalHasLymphedema || protocolExclusions.no_edema });
  }
  if (isWIFI) {
      checkList.push({ id: 'tsk_lesions', label: 'Heridas Tróficas (WIFI)', isDone: globalHasLesion || protocolExclusions.no_trophic });
  }

  const isChecklistComplete = isExpert ? true : checkList.every(t => t.isDone);
  const currentClassObj = classifications[viewIndex];
  const isClassActive = isExpert || workOrder.includes(currentClassObj.key);

  const showArterialContext = isRECTA || isWIFI;
  const showVenousContext = isCEAP;
  const hasContextData = (showArterialContext && (importedData.perfilArterial || importedData.sintomasArteriales)) || (showVenousContext && importedData.sintomasVenosos);

  return (
    <>
      {state.isRightSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden" onClick={() => actions.setIsRightSidebarOpen(false)} />
      )}
      <aside className={`w-[calc(100vw-210px)] md:w-[400px] flex flex-col shadow-lg shrink-0 h-full transition-transform duration-300 ${state.isRightSidebarOpen ? 'fixed right-0 top-0 z-[60] translate-x-0' : 'fixed right-0 top-0 z-[60] translate-x-full md:translate-x-0 md:static md:z-20'}`} style={{ backgroundColor: THEME.bgSidebar, borderLeft: 'none', borderRight: '1px solid #404040' }}>
        
        {state.isRightSidebarOpen && (
            <div className="md:hidden flex justify-between items-center h-14 px-4 border-b border-white/5 bg-black/40 shrink-0">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Hallazgos Clínicos</span>
               <button onClick={() => actions.setIsRightSidebarOpen(false)} className="p-1.5 bg-red-500/20 text-red-500 rounded-md hover:bg-red-500/30 transition-colors">
                  <X size={16}/>
               </button>
            </div>
        )}

      {/* CARRUSEL DE MANDO CABECERA */}
      <div className="flex flex-col items-center relative py-4 border-b bg-black/20" style={{ borderColor: THEME.border }}>
          <div className="flex justify-between items-center w-full px-4 mb-2">
              <button onClick={() => setViewIndex(prev => (prev === 0 ? classifications.length - 1 : prev - 1))} className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400"><ChevronLeft size={20} strokeWidth={2.5}/></button>
              <span className="text-[12px] uppercase tracking-widest font-black" style={{ color: currentClassObj.color }}>{currentClassObj.title}</span>
              <button onClick={() => setViewIndex(prev => (prev === classifications.length - 1 ? 0 : prev + 1))} className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400"><ChevronRight size={20} strokeWidth={2.5}/></button>
          </div>
          
          <div className="flex flex-col items-center animate-in slide-in-from-right-4 fade-in duration-300 w-full mb-3" key={viewIndex}>
              <span className="text-4xl font-black text-center tracking-tight leading-tight drop-shadow-xl" style={{ color: currentClassObj.color }}>
                  {currentClassObj.value}
              </span>
          </div>

          <div className="flex items-center justify-center w-full px-4 text-center mt-1">
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: currentClassObj.color, opacity: 0.8 }}>
                  {currentClassObj.desc}
              </span>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col">
         
         <div className="flex w-full mb-4 bg-black/40 rounded-lg p-1 border border-white/5 shrink-0">
             <button
                 onClick={() => setActiveTab('global')}
                 className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'global' ? 'bg-[#262626] text-yellow-500 shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/5' : 'text-gray-500 hover:text-gray-300'}`}
             >
                 <ListChecks size={13} />
                 Protocolo
             </button>
             <button
                 onClick={() => {
                     if (activeElement) setActiveTab('node');
                     else setToastMessage("Seleccione un nodo en el mapa para ver el estudio.");
                 }}
                 className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'node' ? 'bg-[#262626] text-yellow-500 shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/5' : 'text-gray-500 hover:text-gray-300'}`}
             >
                 <User size={13} />
                 Estudio
             </button>
         </div>

         {activeTab === 'global' ? (
             <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 
                 {/* ORDEN DE TRABAJO (Toggles) */}
                 <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-white/5 pb-1">1. Protocolos a Evaluar</span>
                    <div className="grid grid-cols-1 gap-2 mt-1">
                        {PROTOCOLS_DEF.map(prot => {
                            const isSelected = workOrder.includes(prot.id);
                            const PIcon = prot.icon;
                            return (
                                <button 
                                    key={prot.id} onClick={() => toggleProtocol(prot.id)}
                                    className={`flex items-center gap-3 p-2 rounded-xl border transition-all text-left w-full active:scale-95 ${isSelected ? 'bg-[#262626] border-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.15)]' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
                                >
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${isSelected ? 'bg-yellow-500/10 border-yellow-500' : 'bg-[#262626] border-transparent'}`}>
                                        <PIcon size={14} style={{ color: isSelected ? THEME.yellow : prot.color }} />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className={`text-[11px] font-bold ${isSelected ? 'text-yellow-500' : 'text-gray-200'}`}>{prot.name}</span>
                                        <span className="text-[8px] text-gray-500 uppercase font-bold tracking-wider">{prot.desc}</span>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-yellow-500 border-yellow-500' : 'bg-transparent border-gray-600'}`}>
                                        {isSelected && <CheckCircle2 size={12} className="text-black" />}
                                    </div>
                                </button>
                            );
                        })}
                        {userRole === 'expert' && (
                            <button 
                                onClick={() => toggleProtocol('EXPERT')}
                                className={`flex items-center justify-center gap-2 w-full py-2 mt-1 rounded-lg border text-[9px] font-bold uppercase tracking-widest transition-all ${workOrder.includes('EXPERT') ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'}`}
                            >
                                <Sparkles size={12} /> Modo Especialista (Lienzo Libre)
                            </button>
                        )}
                        
                        <div className="mt-3 pt-3 border-t border-white/10 w-full flex justify-center">
                            {isClassActive ? (
                                <div className="py-2 px-6 rounded-xl border border-green-500/50 bg-green-500/10 flex items-center gap-2 w-full justify-center">
                                    <CheckCircle2 size={14} className="text-green-500" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-green-500">Protocolo {currentClassObj.key} Activo</span>
                                </div>
                            ) : (
                                <button onClick={() => toggleProtocol(currentClassObj.key)} className="py-2 px-6 rounded-xl border border-gray-500 bg-gray-500/10 hover:bg-gray-500/20 flex items-center gap-2 transition-all w-full justify-center shadow-lg">
                                    <Power size={14} className="text-gray-300" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Activar {currentClassObj.key}</span>
                                </button>
                            )}
                        </div>
                    </div>
                 </div>

                 {/* DATOS GLOBALES FILTRADOS (READ-ONLY) */}
                 {isExamStarted && !isExpert && hasContextData && (
                     <div className="flex flex-col p-3 rounded-xl border bg-blue-500/5 border-blue-500/20 animate-in fade-in zoom-in-95">
                         <span className="text-[9px] uppercase tracking-widest font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                             <Droplet size={12}/> Contexto Clínico (SymptoMap)
                         </span>
                         <div className="flex flex-col gap-1.5">
                             {showArterialContext && importedData.perfilArterial && (
                                 <div className="flex justify-between items-center text-xs border-b border-blue-500/10 pb-1">
                                     <span className="text-gray-400">Perfil Arterial:</span>
                                     <span className="font-bold text-white text-right">{importedData.perfilArterial}</span>
                                 </div>
                             )}
                             {showArterialContext && importedData.sintomasArteriales && (
                                 <div className="flex justify-between items-center text-xs border-b border-blue-500/10 pb-1">
                                     <span className="text-gray-400">Clínica Isquémica:</span>
                                     <span className="font-bold text-white text-right">{importedData.sintomasArteriales}</span>
                                 </div>
                             )}
                             {showVenousContext && importedData.sintomasVenosos && (
                                 <div className="flex justify-between items-center text-xs">
                                     <span className="text-gray-400">Síntomas Venosos:</span>
                                     <span className="font-bold text-white text-right">{importedData.sintomasVenosos}</span>
                                 </div>
                             )}
                         </div>
                     </div>
                 )}

                 {isExpert && (
                     <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-xl bg-purple-500/5 border-purple-500/30 text-center gap-2">
                         <Sparkles className="w-8 h-8 text-purple-400" />
                         <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Modo Especialista Activo</span>
                         <span className="text-[10px] text-gray-400 leading-relaxed">Validaciones apagadas. Lienzo libre. Interrogatorio silenciado.</span>
                     </div>
                 )}

                 {!isExpert && (isWIFI || isRECTA || isCEAP || isCLAVE) && (
                     <div className="flex flex-col gap-3 mt-2 animate-in fade-in">
                         <div className="flex items-center justify-between border-b border-white/5 pb-1">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">2. Certificaciones (Exenciones)</span>
                         </div>
                         
                         {(isWIFI || isRECTA) && (
                             <div className="flex items-center gap-3 px-3 py-2.5 bg-black/40 rounded-xl border cursor-pointer transition-all active:scale-95 hover:bg-white/5" style={{ borderColor: protocolExclusions.no_trophic ? THEME.green : 'rgba(255,255,255,0.05)' }} onClick={() => toggleExclusion('no_trophic')}>
                                 <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${protocolExclusions.no_trophic ? 'bg-green-500 border-green-500' : 'bg-[#262626] border-gray-600'}`}>
                                     {protocolExclusions.no_trophic && <CheckCircle2 size={12} className="text-black" />}
                                 </div>
                                 <div className="flex flex-col flex-1">
                                     <div className="flex items-center gap-2 mb-0.5">
                                         <span className={`text-[10px] leading-tight font-bold ${protocolExclusions.no_trophic ? 'text-green-400' : 'text-gray-300'}`}>Sin Lesiones Tróficas</span>
                                         {importedData.hasTrophicLesions === false && <span className="bg-blue-500/20 text-blue-400 text-[8px] px-1.5 py-0.5 rounded border border-blue-500/30 font-medium">Refiere: Negativo</span>}
                                         {importedData.hasTrophicLesions === true && <span className="bg-red-500/20 text-red-400 text-[8px] px-1.5 py-0.5 rounded border border-red-500/30 font-medium">Refiere: Positivo</span>}
                                     </div>
                                     <span className="text-[8px] text-gray-500 uppercase tracking-wider">Omitir úlceras/necrosis</span>
                                 </div>
                             </div>
                         )}
                         
                         {isCEAP && (
                             <div className="flex items-center gap-3 px-3 py-2.5 bg-black/40 rounded-xl border cursor-pointer transition-all active:scale-95 hover:bg-white/5" style={{ borderColor: protocolExclusions.no_varices ? THEME.green : 'rgba(255,255,255,0.05)' }} onClick={() => toggleExclusion('no_varices')}>
                                 <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${protocolExclusions.no_varices ? 'bg-green-500 border-green-500' : 'bg-[#262626] border-gray-600'}`}>
                                     {protocolExclusions.no_varices && <CheckCircle2 size={12} className="text-black" />}
                                 </div>
                                 <div className="flex flex-col flex-1">
                                     <div className="flex items-center gap-2 mb-0.5">
                                         <span className={`text-[10px] leading-tight font-bold ${protocolExclusions.no_varices ? 'text-green-400' : 'text-gray-300'}`}>Sin Estigmas Venosos</span>
                                         {importedData.hasVarices === false && <span className="bg-blue-500/20 text-blue-400 text-[8px] px-1.5 py-0.5 rounded border border-blue-500/30 font-medium">Refiere: Negativo</span>}
                                         {importedData.hasVarices === true && <span className="bg-red-500/20 text-red-400 text-[8px] px-1.5 py-0.5 rounded border border-red-500/30 font-medium">Refiere: Positivo</span>}
                                     </div>
                                     <span className="text-[8px] text-gray-500 uppercase tracking-wider">Omitir várices/manchas</span>
                                 </div>
                             </div>
                         )}

                         {(isCEAP || isCLAVE) && (
                             <div className="flex items-center gap-3 px-3 py-2.5 bg-black/40 rounded-xl border cursor-pointer transition-all active:scale-95 hover:bg-white/5" style={{ borderColor: protocolExclusions.no_edema ? THEME.green : 'rgba(255,255,255,0.05)' }} onClick={() => toggleExclusion('no_edema')}>
                                 <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${protocolExclusions.no_edema ? 'bg-green-500 border-green-500' : 'bg-[#262626] border-gray-600'}`}>
                                     {protocolExclusions.no_edema && <CheckCircle2 size={12} className="text-black" />}
                                 </div>
                                 <div className="flex flex-col flex-1">
                                     <div className="flex items-center gap-2 mb-0.5">
                                         <span className={`text-[10px] leading-tight font-bold ${protocolExclusions.no_edema ? 'text-green-400' : 'text-gray-300'}`}>Sin Edema / Linfedema</span>
                                         {importedData.hasEdema === false && <span className="bg-blue-500/20 text-blue-400 text-[8px] px-1.5 py-0.5 rounded border border-blue-500/30 font-medium">Refiere: Negativo</span>}
                                         {importedData.hasEdema === true && <span className="bg-red-500/20 text-red-400 text-[8px] px-1.5 py-0.5 rounded border border-red-500/30 font-medium">Refiere: Positivo</span>}
                                     </div>
                                     <span className="text-[8px] text-gray-500 uppercase tracking-wider">Omitir aumento de volumen</span>
                                 </div>
                             </div>
                         )}
                     </div>
                 )}
                 
                 {/* EL CENTINELA (TAREAS PENDIENTES) */}
                 {!isExpert && checkList.length > 0 && (
                     <div className="flex flex-col gap-2 p-4 rounded-xl border bg-[#1A1A1A] mt-2 animate-in fade-in" style={{ borderColor: THEME.border }}>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500 mb-1">3. Checklist de Auditoría</span>
                         {checkList.map(task => (
                             <div key={task.id} className="flex items-start gap-2.5">
                                 <div className="mt-0.5">
                                     {task.isDone ? <CheckCircle2 size={14} className="text-green-500" /> : <Circle size={14} className="text-red-500/50" />}
                                 </div>
                                 <span className={`text-xs font-medium leading-tight ${task.isDone ? 'text-gray-500 line-through' : 'text-white'}`}>{task.label}</span>
                             </div>
                         ))}
                     </div>
                 )}
             </div>
         ) : (
             // TAB: ESTUDIO (NODO ESPECÍFICO)
             activeRegionState && activeRegionObj ? (
                <div className="flex flex-col gap-4 animate-in slide-in-from-right-4 fade-in duration-300">
                   <div className="flex flex-col gap-3">
                       
                       {/* CENTINELA DE VALIDACIÓN CLÍNICA (NODO) */}
                       {missingData.length > 0 && !isExpert && (
                           <div className="w-full bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex flex-col gap-1.5 animate-in fade-in">
                               <div className="flex items-center gap-1.5 text-red-400">
                                   <ShieldAlert size={14} />
                                   <span className="text-[10px] font-bold uppercase tracking-widest">Datos Incompletos en Nodo</span>
                               </div>
                               <ul className="list-disc pl-5 text-[10px] text-red-300/80 leading-relaxed">
                                   {missingData.map((err, i) => <li key={i}>{err}</li>)}
                               </ul>
                           </div>
                       )}

                       <div className="p-4 rounded-xl border shadow-inner flex flex-col items-center min-h-[72px]" style={{ backgroundColor: THEME.bgApp, borderColor: THEME.border }}>
                          <div className="flex items-center justify-between w-full mb-1">
                              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: THEME.textMuted }}>Estudio Topográfico</span>
                              <button onClick={handleDeletePoint} className="p-1 hover:bg-red-500/20 rounded text-red-500 transition-colors" title="Borrar Punto">
                                  <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                          
                          <div className="flex items-center justify-between w-full mt-1 mb-1">
                              <button onClick={handlePrevRegion} disabled={currentPointsKeys.length <= 1} className="p-1.5 rounded-lg transition-all hover:bg-white/10 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent" style={{ color: THEME.textMuted }}><ChevronLeft size={18} strokeWidth={2.5} /></button>
                              
                              <div className="relative flex-1 px-1">
                                  <span className="w-full bg-transparent text-[14px] font-bold text-center leading-tight block pb-0.5" style={{ color: THEME.textMain }}>
                                      {activeRegionObj ? activeRegionObj.nombre : "Punto Clínico"}
                                  </span>
                              </div>

                          <button onClick={handleNextRegion} disabled={currentPointsKeys.length <= 1} className="p-1.5 rounded-lg transition-all hover:bg-white/10 active:scale-90 disabled:hover:bg-transparent" style={{ color: THEME.textMuted }}><ChevronRight size={18} strokeWidth={2.5} /></button>
                          </div>

                          {activeRegionState.foto && (
                              <div className="flex flex-col gap-1.5 w-full mt-2 mb-2">
                                  <label className="text-[9px] uppercase tracking-widest text-center text-gray-400 font-bold">Evidencia Fotográfica</label>
                                  <div className="relative rounded-lg overflow-hidden border bg-black/50 flex justify-center items-center h-24" style={{ borderColor: THEME.border }}>
                                      <img src={activeRegionState.foto} alt="Evidencia" className="h-full w-auto object-contain" />
                                      <button onClick={() => setRegionProp(activeElement.id, 'foto', null)} className="absolute top-1 right-1 bg-red-500/80 p-1 rounded hover:bg-red-500 transition-colors">
                                          <X className="w-3 h-3 text-white" />
                                      </button>
                                  </div>
                              </div>
                          )}

                          <div className="w-full flex flex-col gap-1 mt-2 pt-3 border-t" style={{ borderColor: THEME.border }}>
                              {dynamicFindings.length === 0 && !activeRegionState.foto ? (
                                  <span className="text-[10px] text-center italic block py-1" style={{ color: THEME.textMuted }}>Seleccione una herramienta en la botonera.</span>
                              ) : (
                                  <>
                                      {dynamicFindings.map((tool, idx) => {
                                          const ToolIcon = tool?.icon;
                                          if(!ToolIcon) return null;
                                          return (
                                              <div key={`find-${idx}`} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0 group">
                                                  <div className="flex items-center gap-2">
                                                      <ToolIcon className="w-4 h-4 shrink-0" style={{ color: tool.hex }} />
                                                      <span className="text-[11px] font-bold tracking-wide" style={{ color: THEME.textMain }}>{tool.name}</span>
                                                  </div>
                                                  <button 
                                                      onClick={() => {
                                                          const targetId = activeElement.targetId || activeElement.id;
                                                          setGlobalExamStates(prev => {
                                                              const newState = { ...prev };
                                                              const newLegState = { ...newState[leg] };
                                                              const nodeState = { ...newLegState[targetId] };
                                                              ['piel', 'lesion', 'pulso', 'intervencion'].forEach(cat => {
                                                                  if (nodeState[cat]) {
                                                                      const arr = (Array.isArray(nodeState[cat]) ? nodeState[cat] : [nodeState[cat]]).filter(t => t !== tool.id);
                                                                      if (arr.length > 0) nodeState[cat] = arr;
                                                                      else delete nodeState[cat];
                                                                  }
                                                              });
                                                              newLegState[targetId] = nodeState;
                                                              newState[leg] = newLegState;
                                                              return newState;
                                                          });
                                                      }} 
                                                      className="p-1 hover:bg-red-500/20 rounded text-red-500/40 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                  >
                                                      <X className="w-3 h-3" />
                                                  </button>
                                              </div>
                                          );
                                      })}
                                  </>
                              )}
                          </div>
                       </div>
                   </div>
                   
                   <div className="flex flex-col pt-1 pb-10">
                      <div className="flex flex-col gap-4">
                          
                          {isAmputated && (
                              <div className="flex flex-col gap-1.5 w-full">
                                  <label className="text-[10px] uppercase tracking-widest text-center text-red-500 font-bold">Nivel de Amputación</label>
                                  <select 
                                      value={activeRegionState.amputation_level || ''} 
                                      onChange={e => setRegionProp(activeElement.id, 'amputation_level', e.target.value)} 
                                      className="w-full rounded-xl py-2.5 px-2 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner appearance-none cursor-pointer" 
                                      style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}
                                  >
                                      <option value="" disabled>Seleccione el nivel exacto...</option>
                                      <option value="Supracondílea">Supracondílea</option>
                                      <option value="Infracondílea">Infracondílea</option>
                                      <option value="Transmetatarsiana">Transmetatarsiana</option>
                                      <option value="Digital">Digital / Falángica</option>
                                  </select>
                              </div>
                          )}

                          {hasLymphedema && (
                              <div className="flex flex-col gap-2 w-full mt-2 border-t pt-3" style={{ borderColor: THEME.border }}>
                                  <label className="text-[10px] uppercase tracking-widest text-center text-green-400 font-bold mb-1">Clasificación C.L.A.V.E.</label>
                                  <select value={activeRegionState.clave_c || ''} onChange={e => setRegionProp(activeElement.id, 'clave_c', e.target.value)} className="w-full rounded-lg py-2 px-2 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-inner appearance-none cursor-pointer" style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}>
                                      <option value="" disabled>[C] Clínica...</option>
                                      <option value="0">C0: Latente</option>
                                      <option value="1">C1: Reversible</option>
                                      <option value="2">C2: Irreversible</option>
                                      <option value="3">C3: Elefantiasis</option>
                                  </select>
                                  <select value={activeRegionState.clave_v || ''} onChange={e => setRegionProp(activeElement.id, 'clave_v', e.target.value)} className="w-full rounded-lg py-2 px-2 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-inner appearance-none cursor-pointer" style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}>
                                      <option value="" disabled>[V] Volumen...</option>
                                      <option value="1">V1: Leve</option>
                                      <option value="2">V2: Moderado</option>
                                      <option value="3">V3: Grave</option>
                                  </select>
                                  <select value={activeRegionState.clave_e || ''} onChange={e => setRegionProp(activeElement.id, 'clave_e', e.target.value)} className="w-full rounded-lg py-2 px-2 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-inner appearance-none cursor-pointer" style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}>
                                      <option value="" disabled>[E] Etiología...</option>
                                      <option value="p">Ep: Primario</option>
                                      <option value="s">Es: Secundario</option>
                                  </select>
                                  <div className="flex gap-2">
                                      <select value={activeRegionState.clave_l || ''} onChange={e => setRegionProp(activeElement.id, 'clave_l', e.target.value)} className="w-full rounded-lg py-2 px-1 text-center text-[10px] font-bold outline-none focus:ring-1 focus:ring-green-500 transition-all shadow-inner appearance-none cursor-pointer" style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}>
                                          <option value="" disabled>[L] Localización...</option>
                                          <option value="g">Lg: Ganglionar</option>
                                          <option value="v">Lv: Vasos</option>
                                          <option value="d">Ld: Dérmico</option>
                                          <option value="m">Lm: Mixto</option>
                                      </select>
                                      <select value={activeRegionState.clave_a || ''} onChange={e => setRegionProp(activeElement.id, 'clave_a', e.target.value)} className="w-full rounded-lg py-2 px-1 text-center text-[10px] font-bold outline-none focus:ring-1 focus:ring-green-500 transition-all shadow-inner appearance-none cursor-pointer" style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}>
                                          <option value="" disabled>[A] Alteración...</option>
                                          <option value="o">Ao: Obstructivo</option>
                                          <option value="r">Ar: Reflujo</option>
                                          <option value="h">Ah: Hipodinámico</option>
                                      </select>
                                  </div>
                              </div>
                          )}

                          {(hasUlcer || hasNecrosis) && (
                              <div className="flex flex-col gap-1.5 w-full mt-2 border-t pt-3" style={{ borderColor: THEME.border }}>
                                  <label className="text-[10px] uppercase tracking-widest text-center text-red-400 font-bold">Grado WIFI - Herida (W)</label>
                                  <select 
                                      value={activeRegionState.wifi_w || ''} 
                                      onChange={e => setRegionProp(activeElement.id, 'wifi_w', e.target.value)} 
                                      className="w-full rounded-xl py-2.5 px-2 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner appearance-none cursor-pointer" 
                                      style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}
                                  >
                                      <option value="" disabled>Seleccionar W...</option>
                                      <option value="0">W0: Sin úlcera clínica</option>
                                      <option value="1">W1: Úlcera menor, superficial</option>
                                      <option value="2">W2: Úlcera profunda</option>
                                      <option value="3">W3: Úlcera extensa o Gangrena</option>
                                  </select>
                              </div>
                          )}

                          {hasPulse && (
                              <div className="flex flex-col gap-1.5 w-full mt-2 border-t pt-3" style={{ borderColor: THEME.border }}>
                                  <label className="text-[10px] uppercase tracking-widest text-center text-cyan-400 font-bold">Grado WIFI / RECTA - Isquemia (I/R)</label>
                                  <select 
                                      value={activeRegionState.wifi_i || ''} 
                                      onChange={e => setRegionProp(activeElement.id, 'wifi_i', e.target.value)} 
                                      className="w-full rounded-xl py-2.5 px-2 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-cyan-500 transition-all shadow-inner appearance-none cursor-pointer" 
                                      style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}
                                  >
                                      <option value="" disabled>Seleccionar I...</option>
                                      <option value="0">I0: ITB {'>'}= 0.80</option>
                                      <option value="1">I1: ITB 0.60 - 0.79</option>
                                      <option value="2">I2: ITB 0.40 - 0.59</option>
                                      <option value="3">I3: ITB {'<'}= 0.39 (Isquemia crítica)</option>
                                  </select>
                              </div>
                          )}

                          {hasInfectionSigns && (
                              <div className="flex flex-col gap-1.5 w-full mt-2 border-t pt-3" style={{ borderColor: THEME.border }}>
                                  <label className="text-[10px] uppercase tracking-widest text-center text-orange-400 font-bold">Grado WIFI - Infección (fI)</label>
                                  <select 
                                      value={activeRegionState.wifi_fi || ''} 
                                      onChange={e => setRegionProp(activeElement.id, 'wifi_fi', e.target.value)} 
                                      className="w-full rounded-xl py-2.5 px-2 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-inner appearance-none cursor-pointer" 
                                      style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}
                                  >
                                      <option value="" disabled>Seleccionar fI...</option>
                                      <option value="0">fI0: Sin síntomas de infección</option>
                                      <option value="1">fI1: Infección local leve</option>
                                      <option value="2">fI2: Infección moderada</option>
                                      <option value="3">fI3: Infección severa (SIRS)</option>
                                  </select>
                              </div>
                          )}

                          {hasPulse && (
                              <div className="flex flex-col gap-1.5 w-full mt-2 border-t pt-3" style={{ borderColor: THEME.border }}>
                                  <label className="text-[10px] uppercase tracking-widest text-center text-gray-400 font-bold">Intensidad del Pulso</label>
                                  <select 
                                      value={activeRegionState.pulse_intensity || ''} 
                                      onChange={e => setRegionProp(activeElement.id, 'pulse_intensity', e.target.value)} 
                                      className="w-full rounded-xl py-2.5 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-gray-500 transition-all shadow-inner appearance-none cursor-pointer" 
                                      style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}
                                  >
                                      <option value="" disabled>Seleccionar escala...</option>
                                      <option value="0/4">0/4 (Ausente)</option>
                                      <option value="1/4">1/4 (Disminuido)</option>
                                      <option value="2/4">2/4 (Normal)</option>
                                      <option value="3/4">3/4 (Lleno / Aumentado)</option>
                                      <option value="4/4">4/4 (Aneurismático)</option>
                                  </select>
                              </div>
                          )}

                          {hasUlcer && (
                              <div className="flex flex-col gap-2 w-full mt-2 border-t pt-3" style={{ borderColor: THEME.border }}>
                                  <label className="text-[10px] uppercase tracking-widest text-center text-gray-400 font-bold">Dimensiones de la Úlcera</label>
                                  <div className="grid grid-cols-2 gap-3 w-full">
                                     <div className="flex flex-col gap-1 w-full">
                                         <label className="text-[8px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>Largo (cm)</label>
                                         <SmartInput type="number" inputMode="decimal" step="0.1" value={activeRegionState.ulcer_length} onChange={val=>setRegionProp(activeElement.id, 'ulcer_length', val)} placeholder="3.5" className="w-full rounded-lg py-2 text-center text-xs font-mono font-bold outline-none focus:ring-1 focus:ring-gray-500 transition-all shadow-inner" style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }} />
                                     </div>
                                     <div className="flex flex-col gap-1 w-full">
                                         <label className="text-[8px] uppercase tracking-widest text-center" style={{ color: THEME.textMuted }}>Ancho (cm)</label>
                                         <SmartInput type="number" inputMode="decimal" step="0.1" value={activeRegionState.ulcer_width} onChange={val=>setRegionProp(activeElement.id, 'ulcer_width', val)} placeholder="2.0" className="w-full rounded-lg py-2 text-center text-xs font-mono font-bold outline-none focus:ring-1 focus:ring-gray-500 transition-all shadow-inner" style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }} />
                                     </div>
                                  </div>
                              </div>
                          )}

                          {hasEdema && (
                              <div className="flex flex-col gap-1.5 w-full mt-2 border-t pt-3" style={{ borderColor: THEME.border }}>
                                  <label className="text-[10px] uppercase tracking-widest text-center text-gray-400 font-bold">Grado de Edema (Fóvea)</label>
                                  <select 
                                      value={activeRegionState.edema_grade || ''} 
                                      onChange={e => setRegionProp(activeElement.id, 'edema_grade', e.target.value)} 
                                      className="w-full rounded-xl py-2.5 text-center text-xs font-bold outline-none focus:ring-2 focus:ring-gray-500 transition-all shadow-inner appearance-none cursor-pointer" 
                                      style={{ backgroundColor: THEME.bgApp, border: `1px solid ${THEME.border}`, color: THEME.textMain }}
                                  >
                                      <option value="" disabled>Seleccionar grado...</option>
                                      <option value="+ / 4">+ (Leve, 2mm)</option>
                                      <option value="++ / 4">++ (Moderado, 4mm)</option>
                                      <option value="+++ / 4">+++ (Profundo, 6mm)</option>
                                      <option value="++++ / 4">++++ (Muy profundo)</option>
                                  </select>
                              </div>
                          )}
                      </div>
                   </div>
                </div>
             ) : (
                <div className="flex flex-col h-full items-center justify-center text-center opacity-40 pb-10 animate-in fade-in zoom-in-95">
                    <MousePointerClick className="w-12 h-12 mb-4 text-yellow-400" />
                    <span className="text-sm uppercase font-bold mb-2 tracking-wider text-yellow-400">Mapa Topográfico Activo</span>
                    <span className="text-[11px] px-2 leading-relaxed">Toca cualquier punto de la extremidad para documentar los signos físicos.</span>
                </div>
             )
         )}
      </div>

      <div className="shrink-0 p-4 border-t flex flex-col gap-3 transition-all bg-black/40" style={{ borderColor: THEME.border }}>
          <button 
             onClick={generateAIReport} disabled={isGeneratingReport || (!isChecklistComplete && !isExpert) || missingData.length > 0 || !isExamStarted}
             className={`w-full h-11 rounded-lg flex items-center justify-center gap-2 text-[12px] font-bold transition-all active:scale-95 shadow-sm ${isGeneratingReport || (!isChecklistComplete && !isExpert) || missingData.length > 0 || !isExamStarted ? UI_CLASSES.secondaryBtn + ' opacity-50 cursor-not-allowed' : UI_CLASSES.primaryBtn}`} 
          >
             {isGeneratingReport ? <div className="animate-spin w-4 h-4 border-2 border-t-transparent border-current rounded-full" /> : <Sparkles className="w-4 h-4" />}
             {isGeneratingReport ? 'Redactando...' : (missingData.length > 0 ? 'Faltan Datos en Nodo' : (!isChecklistComplete && !isExpert ? 'Checklist Incompleto' : 'Generar Reporte IA'))}
          </button>
          
          <button 
             onClick={() => actions.setIsHistoryModalOpen && actions.setIsHistoryModalOpen(true)}
             className={`w-full h-11 rounded-lg flex items-center justify-center gap-2 text-[12px] font-bold transition-all active:scale-95 border bg-transparent hover:bg-white/5 border-[#404040] text-gray-300`}
          >
             <History className="w-4 h-4 text-yellow-500" />
             Historial de Estudios
          </button>
      </div>
    </aside>
    </>
  );
};

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="flex flex-col w-full max-w-2xl max-h-[85vh] rounded-xl shadow-2xl border" style={{ backgroundColor: THEME.bgSidebar, borderColor: THEME.border }}>
                <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: THEME.border }}>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <h2 className="font-bold text-lg" style={{ color: THEME.textMain }}>Nota Clínica Generada (IA)</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 transition-colors"><X className="w-5 h-5" style={{ color: THEME.textMuted }} /></button>
                </div>
                
                <div className="flex-1 overflow-hidden p-4">
                    <textarea 
                        className="w-full h-full p-4 rounded-lg outline-none font-mono text-sm leading-relaxed custom-scrollbar resize-none border"
                        style={{ backgroundColor: THEME.bgApp, color: THEME.textMain, borderColor: THEME.border }}
                        value={reportContent} onChange={(e) => setReportContent(e.target.value)}
                    />
                </div>
                
                <div className="p-4 border-t flex justify-between gap-3 bg-black/20" style={{ borderColor: THEME.border }}>
                    <button onClick={handleCopy} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 flex items-center gap-2 border hover:bg-white/5 bg-transparent text-white border-white/20`}>
                        <Copy className="w-4 h-4" /> Copiar Nota
                    </button>

                    <div className="flex gap-2">
                        <button onClick={onClose} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 border hover:bg-white/5 bg-[#171717] text-gray-400 border-[#404040]`}>Cancelar</button>
                        <button onClick={onExport} disabled={isExporting} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 flex items-center gap-2 ${isExporting ? UI_CLASSES.secondaryBtn + ' opacity-50 cursor-not-allowed' : UI_CLASSES.primaryBtn}`}>
                            {isExporting ? <div className="animate-spin w-4 h-4 border-2 border-t-transparent rounded-full" /> : <Save className="w-4 h-4" />}
                            {isExporting ? 'Guardando...' : 'Culminar Examen'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function App() {
  const [leg, setLeg] = useState('DERECHA'); 
  const [showLegend, setShowLegend] = useState(false); 
  const [toolPage, setToolPage] = useState(0); 
  const [activeTab, setActiveTab] = useState('global');
  const [hoveredElement, setHoveredElement] = useState(null);
  
  // PINCEL MÁGICO Y TRAZADOR LIBRE
  const [isDragging, setIsDragging] = useState(false);
  const [lastAppliedTool, setLastAppliedTool] = useState(null);
  const [freehandDrawings, setFreehandDrawings] = useState(() => {
    try {
        const draft = localStorage.getItem('physio_freehand_v5');
        return draft ? JSON.parse(draft) : { 'DERECHA': [], 'IZQUIERDA': [] };
    } catch(e) { return { 'DERECHA': [], 'IZQUIERDA': [] }; }
  });
  const [activeDrawingTool, setActiveDrawingTool] = useState(null); // 'draw_varice' o 'draw_telangiectasia'
  const [currentPath, setCurrentPath] = useState(null);

  useEffect(() => {
      try { localStorage.setItem('physio_freehand_v5', JSON.stringify(freehandDrawings)); } catch(e) {}
  }, [freehandDrawings]);

  useEffect(() => {
      const handlePointerUp = () => {
          setIsDragging(false);
          if (currentPath) {
              setFreehandDrawings(prev => ({
                  ...prev,
                  [leg]: [...(prev[leg] || []), currentPath]
              }));
              setCurrentPath(null);
          }
      };
      window.addEventListener('pointerup', handlePointerUp);
      return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [currentPath, leg]);

  // NUEVOS ESTADOS DE ARQUITECTURA
  const [workOrder, setWorkOrder] = useState([]);
  const [userRole, setUserRole] = useState('expert'); // Simula Rol ERPNext
  const isExamStarted = true; // Permitir mapeo libre desde el inicio sin forzar protocolo
  const [viewSegment, setViewSegment] = useState('PIERNA');
  const [mobileSubView, setMobileSubView] = useState('medial');
  
  // --- INYECCIÓN DE SYMPTOMAP ---
  const importedData = {
      perfilArterial: "Diabético, Tabaquismo",
      sintomasArteriales: "Claudicación (100m)",
      sintomasVenosos: "Dolor vespertino, pesadez",
      isSymptomaticVenous: true,
      rectaE: "Em",
      rectaC: 2,
      // Respuestas del interrogatorio previo:
      hasVarices: false,        
      hasEdema: false,          
      hasTrophicLesions: false  
  };
  
  const [protocolExclusions, setProtocolExclusions] = useState({ 
      no_varices: false, 
      no_edema: false, 
      no_trophic: false 
  });
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  
  const [activeToolIds, setActiveToolIds] = useState(() => {
    try {
        const draft = localStorage.getItem('physio_active_tools_v5');
        if (draft) return JSON.parse(draft);
    } catch(e) {}
    return MASTER_TOOLS.map(t => t.id);
  });

  useEffect(() => {
    try { localStorage.setItem('physio_active_tools_v5', JSON.stringify(activeToolIds)); } catch(e) {}
  }, [activeToolIds]);

  const toggleToolVisibility = (toolId) => {
      setActiveToolIds(prev => prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]);
  };

  const handleLoadHistoricalStudy = (study) => {
      try {
          if (study.datos_examen_fisico) {
              const parsedState = JSON.parse(study.datos_examen_fisico);
              setGlobalExamStates(parsedState);
          }
          if (study.informe_examen_fisico) {
              setReportContent(study.informe_examen_fisico);
              setIsReportModalOpen(true);
          }
          setIsHistoryModalOpen(false);
          setToastMessage(`Estudio ${study.name} cargado exitosamente.`);
      } catch (err) {
          setToastMessage("Error al cargar el estudio histórico.");
      }
  };

  const [globalExamStates, setGlobalExamStates] = useState(() => {
    try {
        const draft = localStorage.getItem('physio_draft_state');
        return draft ? JSON.parse(draft) : { 'DERECHA': {}, 'IZQUIERDA': {} };
    } catch(e) { return { 'DERECHA': {}, 'IZQUIERDA': {} }; }
  });

  useEffect(() => { try { localStorage.setItem('physio_draft_state', JSON.stringify(globalExamStates)); } catch(e) {} }, [globalExamStates]);

  const [customGrids, setCustomGrids] = useState(() => {
    try {
      const saved = localStorage.getItem('physioToolGrids');
      return saved ? JSON.parse(saved) : DEFAULT_TOOL_GRIDS;
    } catch(e) { return DEFAULT_TOOL_GRIDS; }
  });
  
  const [isEditingGrid, setIsEditingGrid] = useState(false);
  const [toolToSwap, setToolToSwap] = useState(null);

  const [isLeftHanded, setIsLeftHanded] = useState(() => {
    try { return localStorage.getItem('isLeftHanded') === 'true'; } catch(e) { return false; }
  });
  const [thumbOffset, setThumbOffset] = useState(() => {
    try { const val = localStorage.getItem('thumbOffset'); return val ? parseInt(val, 10) : 20; } catch(e) { return 20; }
  }); 

  useEffect(() => { try { localStorage.setItem('isLeftHanded', isLeftHanded); } catch(e) {} }, [isLeftHanded]);
  useEffect(() => { try { localStorage.setItem('thumbOffset', thumbOffset); } catch(e) {} }, [thumbOffset]);
  useEffect(() => { try { localStorage.setItem('physioToolGrids', JSON.stringify(customGrids)); } catch(e) {} }, [customGrids]);
  
  const examStates = globalExamStates[leg] || {};
  const [activeElement, setActiveElement] = useState(null);
  
  const setLegAndReset = (newLeg) => {
      setLeg(newLeg);
      setActiveElement(null);
  };

  const toggleTransfacialZone = (zoneId) => {
      setActiveElement(prev => {
          if (zoneId === 'trans_todo') {
              return { id: 'trans_todo', isTransFacial: true, nombre: 'Toda la Extremidad', vista: 'Global', targetId: 'trans_todo', targetIds: ['trans_todo'] };
          }
          
          let currentIds = (prev?.targetIds || (prev?.targetId ? [prev.targetId] : [])).filter(id => id !== 'trans_todo' && id !== 'multi_transfacial');
          
          if (currentIds.includes(zoneId)) {
              currentIds = currentIds.filter(id => id !== zoneId);
          } else {
              currentIds = [...currentIds, zoneId];
          }

          if (currentIds.length === 0) return null;
          if (currentIds.length === 1) {
              const id = currentIds[0];
              const nombre = id === 'trans_muslo' ? 'Muslo Completo' : id === 'trans_pierna' ? 'Pantorrilla Completa' : 'Pie Completo';
              return { id: id, isTransFacial: true, targetId: id, targetIds: [id], nombre, vista: 'Global' };
          }
          
          return { id: 'multi_transfacial', isTransFacial: true, targetId: 'multi_transfacial', targetIds: currentIds, nombre: 'Múltiples Zonas', vista: 'Global' };
      });
  };

  const handleToolSwap = (clickedToolId) => {
      if (clickedToolId === null) { setToolToSwap(null); return; }
      if (!toolToSwap) { setToolToSwap(clickedToolId); } 
      else {
          setCustomGrids(prev => {
              const newGrids = { ...prev };
              const currentGridKey = 'DEFAULT';
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

  const handleToolClick = (toolId, overrideElementId = null) => {
    const activeId = overrideElementId || activeElement?.id;
    if (!activeId) return;

    let targetElementIds = [];
    if (overrideElementId) {
        targetElementIds = [overrideElementId];
    } else if (activeElement?.targetIds) {
        targetElementIds = activeElement.targetIds;
    } else if (activeElement?.targetId) {
        targetElementIds = [activeElement.targetId];
    } else {
        targetElementIds = [activeId];
    }

    const tool = TOOLS_MAP[toolId];
    if (!tool) return;

    setLastAppliedTool(toolId);

    if (!workOrder.includes('EXPERT')) {
        if (protocolExclusions.no_varices && (toolId === 'varices' || toolId === 'telangiectasia')) {
            setToastMessage("Contradicción: Usted certificó ausencia de estigmas venosos en la pestaña Protocolo.");
            return;
        }
        if (protocolExclusions.no_edema && (toolId === 'edema' || toolId === 'lymphedema')) {
            setToastMessage("Contradicción: Usted certificó ausencia de aumento de volumen en la pestaña Protocolo.");
            return;
        }
        if (protocolExclusions.no_trophic && (toolId === 'ulcer_venous' || toolId === 'ulcer_arterial' || toolId === 'ulcer_neuro' || toolId === 'necrosis')) {
            setToastMessage("Contradicción: Usted certificó ausencia de lesiones tróficas en la pestaña Protocolo.");
            return;
        }
    }

    let hasError = false;
    targetElementIds.forEach(targetElementId => {
        const ptInfo = PUNTOS_ANATOMICOS.find(p => p.id === targetElementId);
        if (tool.category === 'pulso') {
            if (!ptInfo || !ptInfo.isPulse) hasError = "Anatomía Inválida: Evalúe pulsos o soplos exclusivamente en focos arteriales blancos.";
        } else if (tool.category !== 'adjunto') {
            if (ptInfo && ptInfo.isPulse) hasError = "Error Clínico: Use los nodos anatómicos amarillos para registrar lesiones de piel, calor o úlceras.";
        }
    });

    if (hasError) {
        setToastMessage(hasError);
        return;
    }

    setGlobalExamStates(prev => {
        const legState = { ...prev[leg] };
        targetElementIds.forEach(targetElementId => {
            const sState = legState[targetElementId] || {};
            const propName = tool.category; 
            const getArray = (val) => Array.isArray(val) ? val : (val && val !== 'unmapped' ? [val] : []);
            const currentArr = getArray(sState[propName]);
            
            const isDragEvent = overrideElementId !== null;
            let newArr = currentArr;
            
            if (isDragEvent) {
                if (!currentArr.includes(toolId)) newArr = [...currentArr, toolId];
            } else {
                newArr = currentArr.includes(toolId) ? currentArr.filter(i => i !== toolId) : [...currentArr, toolId];
            }
            
            legState[targetElementId] = { ...sState, [propName]: newArr };
        });
        return { ...prev, [leg]: legState };
    });
    
    setActiveTab('node');
  };

// ============================================================================
// HISTORIAL CLINICO MODAL
// ============================================================================
const HistoricalStudiesModal = ({ isOpen, onClose, onLoadStudy }) => {
    const [studies, setStudies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const currentFpp = getFrappe();
        const currentFrm = getForm();
        
        if (!currentFpp || !currentFrm) {
            setStudies([{ name: 'SIM-001', creation: '2026-05-04 10:00:00', patient_name: 'Paciente Simulado' }]);
            return;
        }

        const patientId = currentFrm.doc.patient;
        if (!patientId) return;

        setIsLoading(true);
        currentFpp.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Physical Encounter - Examen Fisico',
                filters: { patient: patientId },
                fields: ['name', 'creation', 'datos_examen_fisico', 'informe_examen_fisico'],
                order_by: 'creation desc',
                limit_page_length: 20
            },
            callback: function(r) {
                setIsLoading(false);
                if (r.message) setStudies(r.message);
                else setStudies([]);
            }
        });
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="flex flex-col w-full max-w-lg max-h-[80vh] rounded-xl shadow-2xl border bg-[#1C1C1C] border-[#404040]">
                <div className="flex items-center justify-between p-4 border-b border-[#404040]">
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-yellow-500" />
                        <h2 className="font-bold text-lg text-white">Historial de Exámenes Físicos</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                    {isLoading ? (
                        <div className="flex justify-center py-8"><div className="animate-spin w-6 h-6 border-2 border-t-transparent border-yellow-500 rounded-full"></div></div>
                    ) : studies.length === 0 ? (
                        <div className="text-center text-gray-400 py-8 text-sm">No se encontraron exámenes previos.</div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {studies.map((study) => (
                                <div key={study.name} className="flex flex-col p-3 rounded-lg border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-white">{study.name}</span>
                                        <span className="text-xs text-yellow-500">{new Date(study.creation).toLocaleDateString()}</span>
                                    </div>
                                    <button onClick={() => onLoadStudy(study)} className="w-full py-2 bg-[#262626] hover:bg-[#333333] text-gray-300 rounded-md border border-[#404040] text-xs font-bold transition-all">
                                        Cargar y Ver Examen
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

  const exportToERPNext = () => {
      const currentFpp = getFrappe();
      const currentFrm = getForm();

      if (!currentFpp || !currentFrm) {
          alert(`📡 SIMULADOR DE EXPORTACIÓN A HISTORIA CLÍNICA\n\nSi estuvieras en el hospital, el sistema enviaría la matriz de datos JSON y esta nota clínica.\n\n✅ Borrador Local Purgado.`);
          setIsReportModalOpen(false); 
          try { localStorage.removeItem('physio_draft_state'); } catch(e) {}
          return;
      }

      setIsExporting(true);
      const datosComoTexto = JSON.stringify(globalExamStates);
      
      currentFrm.set_value('datos_examen_fisico', datosComoTexto)
          .then(() => {
              if (reportContent) {
                  return currentFrm.set_value('informe_examen_fisico', reportContent);
              }
              return Promise.resolve();
          })
          .then(() => {
              currentFrm.save();
              setIsExporting(false);
              currentFpp.show_alert({ message: "✅ Examen Físico guardado exitosamente en MariaDB", indicator: 'green' });
              setIsReportModalOpen(false);
              try { localStorage.removeItem('physio_draft_state'); } catch(e) {}
          })
          .catch(err => {
              setIsExporting(false);
              currentFpp.msgprint({ title: "Error de Guardado", message: "Error al intentar guardar en la Base de Datos", indicator: 'red' });
          });
  };

  const doctorName = getFrappe()?.session?.user_fullname ? getFrappe().session.user_fullname : 'Dr. Especialista';
  const patientName = getForm()?.doc?.patient_name ? getForm().doc.patient_name : 'Paciente de Prueba';

  const generateAIReport = async () => {
      setIsGeneratingReport(true);
      const contextData = { TIPO: 'Examen Físico Vascular', PROTOCOLOS: workOrder, IMPORTADO: importedData, DERECHA: {}, IZQUIERDA: {} };

      const getArr = (val) => Array.isArray(val) ? val : (val && val !== 'unmapped' ? [val] : []);

      for (const currentLeg of ['DERECHA', 'IZQUIERDA']) {
          for (const [ptId, data] of Object.entries(globalExamStates[currentLeg] || {})) {
              if (ptId === 'global_general') continue;
              
              if (Object.keys(data).length > 0) {
                  const cleanedData = { ...data };
                  if (cleanedData.pulso) cleanedData.pulso = getArr(cleanedData.pulso).map(p => TOOLS_MAP[p]?.name || p).join(', ');
                  if (cleanedData.piel) cleanedData.piel = getArr(cleanedData.piel).map(p => TOOLS_MAP[p]?.name || p).join(', ');
                  if (cleanedData.lesion) cleanedData.lesion = getArr(cleanedData.lesion).map(f => TOOLS_MAP[f]?.name || f).join(', ');
                  if (cleanedData.intervencion) cleanedData.intervencion = getArr(cleanedData.intervencion).map(i => TOOLS_MAP[i]?.name || i).join(', ');
                  
                  delete cleanedData.foto;
                  const ptInfo = PUNTOS_ANATOMICOS.find(p => p.id === ptId);
                  const label = ptInfo ? ptInfo.nombre : ptId;

                  contextData[currentLeg][label] = cleanedData;
              }
          }
      }

      const prompt = `Actúa como un médico especialista. Redacta una nota clínica profesional de Examen Físico Vascular usando exclusivamente los hallazgos registrados.
      
      PACIENTE: ${patientName}
      MÉDICO: ${doctorName}
      PROTOCOLOS EVALUADOS: ${workOrder.join(', ')}
      
      REGLAS ESTRICTAS DE REDACCIÓN Y FORMATO:
      1. FORMATO OBLIGATORIO: Devuelve la respuesta en formato HTML puro (usando etiquetas <b>, <br>, <ul>, <li>, <p>) adecuado para un campo "Text Editor" de ERPNext. NO uses Markdown. NO encierres la respuesta en bloques de código HTML.
      2. Divide en "Extremidad Inferior Derecha" y "Extremidad Inferior Izquierda".
      3. Cada hallazgo vendrá etiquetado con el nombre de la región anatómica. Agrúpalos lógicamente: Inspección (Piel, Úlceras, Color, Edema) y Palpación (Pulsos, Temperatura).
      4. Detalla el patrón de dolor, grado WIFI, grado CEAP, nivel de amputación y dimensiones de úlceras si existen.
      5. Si una extremidad no tiene datos, indica: "Sin alteraciones a la inspección y palpación. No se registraron hallazgos patológicos".
      6. Finaliza con una Impresión Diagnóstica basada en los datos recopilados.
      
      DATOS CRUDOS DEL ESTUDIO (JSON):
      ${JSON.stringify(contextData)}`;

      const currentFpp = getFrappe();
      if (!currentFpp) {
          setTimeout(() => {
              setReportContent("<b>SIMULADOR DE IA</b><br/><br/><b>EXTREMIDAD INFERIOR DERECHA:</b><br/>Se evidencia...<br/><br/><b>EXTREMIDAD INFERIOR IZQUIERDA:</b><br/>Destaca...<br/><br/>Prompt:<br/>" + prompt.substring(0, 150) + "...");
              setIsGeneratingReport(false);
              setIsReportModalOpen(true);
          }, 1500);
          return;
      }

      // Nombre de la App en Frappe para enrutar el Backend
      const FRAPPE_APP_NAME = "bania"; 
      currentFpp.call({
          method: `${FRAPPE_APP_NAME}.api.consultar_gemini`, 
          args: { prompt: prompt },
          callback: function(r) {
              setIsGeneratingReport(false);
              if (!r.exc && r.message) {
                  // Limpiar bloques de código si Gemini los envía por error
                  let cleanMessage = r.message.replace(/\`\`\`html/g, '').replace(/\`\`\`/g, '').trim();
                  setReportContent(cleanMessage);
                  setIsReportModalOpen(true);
              } else {
                  currentFpp.msgprint({ title: "Error IA", message: "Error al conectar con la Inteligencia Artificial a través de ERPNext.", indicator: 'red' });
              }
          }
      });
  };

  const layoutFlexDir = isLeftHanded ? 'flex-row-reverse' : 'flex-row';
  const state = { leg, isLeftHanded, thumbOffset, examStates, activeElement, hoveredElement, toolPage, activeTab, isExamStarted, workOrder, userRole, importedData, protocolExclusions, activeToolIds, viewSegment, mobileSubView, isRightSidebarOpen, showLegend, isDragging, lastAppliedTool, freehandDrawings: freehandDrawings[leg] || [], activeDrawingTool, currentPath };
  const actions = { setIsLeftHanded, setThumbOffset, handleToolClick, setLeg: setLegAndReset, generateAIReport, isGeneratingReport, setToolPage, setGlobalExamStates, setActiveElement, setHoveredElement, setToastMessage, setActiveTab, setWorkOrder, setProtocolExclusions, setIsHistoryModalOpen, toggleToolVisibility, setViewSegment, setMobileSubView, setIsRightSidebarOpen, setShowLegend, setIsDragging, setActiveDrawingTool, setCurrentPath, setFreehandDrawings, toggleTransfacialZone };

  return (
    <div className={`flex h-full w-full font-sans overflow-hidden selection:bg-yellow-500/30 touch-none overscroll-none relative ${layoutFlexDir}`} style={{ backgroundColor: THEME.bgApp, color: THEME.textMain }}>
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      <SidebarLeft state={state} actions={actions} />
      <MapCanvas state={state} actions={actions} />
      <SidebarRight state={state} actions={actions} />
      
      <HistoricalStudiesModal 
          isOpen={isHistoryModalOpen} 
          onClose={() => setIsHistoryModalOpen(false)} 
          onLoadStudy={handleLoadHistoricalStudy} 
      />

      <AIReportModal 
         isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} 
         reportContent={reportContent} setReportContent={setReportContent}
         onExport={exportToERPNext} isExporting={isExporting}
      />
    </div>
  );
}