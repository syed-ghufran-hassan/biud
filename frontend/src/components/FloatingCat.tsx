/**
 * BiUD Frontend - Floating Cat Mascot
 * Gold themed cat with metallic accents
 */

'use client';

export default function FloatingCat() {
  return (
    <div className="relative animate-float cursor-pointer group">
      <svg
        width="48"
        height="48"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Glow effect */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37"/>
            <stop offset="50%" stopColor="#FFD700"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
        </defs>
        
        {/* Cat body - golden */}
        <ellipse cx="32" cy="38" rx="18" ry="14" fill="url(#goldGradient)" filter="url(#glow)"/>
        
        {/* Cat head - golden */}
        <circle cx="32" cy="24" r="14" fill="url(#goldGradient)"/>
        
        {/* Left ear */}
        <path d="M20 16 L18 4 L26 12 Z" fill="url(#goldGradient)"/>
        <path d="M21 14 L20 7 L25 12 Z" fill="#1a1a1a"/>
        
        {/* Right ear */}
        <path d="M44 16 L46 4 L38 12 Z" fill="url(#goldGradient)"/>
        <path d="M43 14 L44 7 L39 12 Z" fill="#1a1a1a"/>
        
        {/* Eyes - dark with gold shine */}
        <ellipse cx="26" cy="22" rx="3" ry="4" fill="#1a1a1a" className="animate-blink origin-center"/>
        <ellipse cx="38" cy="22" rx="3" ry="4" fill="#1a1a1a" className="animate-blink origin-center"/>
        
        {/* Eye shine */}
        <circle cx="25" cy="21" r="1" fill="#FFD700"/>
        <circle cx="37" cy="21" r="1" fill="#FFD700"/>
        
        {/* Nose - dark */}
        <ellipse cx="32" cy="27" rx="2" ry="1.5" fill="#1a1a1a"/>
        
        {/* Mouth */}
        <path d="M29 30 Q32 33 35 30" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        
        {/* Whiskers */}
        <g stroke="#1a1a1a" strokeWidth="0.5">
          <line x1="14" y1="24" x2="22" y2="26"/>
          <line x1="14" y1="28" x2="22" y2="28"/>
          <line x1="14" y1="32" x2="22" y2="30"/>
          <line x1="50" y1="24" x2="42" y2="26"/>
          <line x1="50" y1="28" x2="42" y2="28"/>
          <line x1="50" y1="32" x2="42" y2="30"/>
        </g>
        
        {/* Tail */}
        <path 
          d="M50 42 Q58 36 54 28" 
          stroke="url(#goldGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
          className="origin-bottom-left animate-tail-wag"
        />
        
        {/* Front paws */}
        <ellipse cx="24" cy="50" rx="4" ry="3" fill="url(#goldGradient)"/>
        <ellipse cx="40" cy="50" rx="4" ry="3" fill="url(#goldGradient)"/>
        
        {/* Collar with Bitcoin symbol */}
        <rect x="24" y="34" width="16" height="4" rx="2" fill="#1a1a1a"/>
        <circle cx="32" cy="38" r="3" fill="url(#goldGradient)" stroke="#1a1a1a" strokeWidth="0.5"/>
        <text x="32" y="40" fontSize="5" fill="#1a1a1a" textAnchor="middle" fontWeight="bold">₿</text>
      </svg>
      
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/20 rounded-full blur-xl transition-all duration-300" />
    </div>
  );
}
