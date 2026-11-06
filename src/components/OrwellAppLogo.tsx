"use client";

import React from "react";

export const OrwellAppLogo: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <defs>
        {/* Cyan Neon Gradients */}
        <linearGradient id="orwellCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="30%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <radialGradient id="orwellCyanAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#0284c7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>

        {/* Party Red Surveillance Gradients */}
        <linearGradient id="orwellPartyRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="35%" stopColor="#ef4444" />
          <stop offset="75%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>

        {/* Pyramidal Minitrue Gradients */}
        <linearGradient id="orwellPyramidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Ambient Surveillance Radial Aura */}
      <circle cx="256" cy="256" r="240" fill="url(#orwellCyanAura)" />

      {/* Outer Glass Rim & Telescreen Coordinates Ring */}
      <circle
        cx="256"
        cy="256"
        r="230"
        fill="#0b1322"
        stroke="url(#orwellCyanGrad)"
        strokeWidth="8"
        strokeOpacity="0.9"
      />
      <circle
        cx="256"
        cy="256"
        r="214"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeDasharray="8 8"
        strokeOpacity="0.6"
      />

      {/* Brutalist Minitrue Spire Base */}
      <polygon
        points="256,76 394,374 118,374"
        fill="url(#orwellPyramidGrad)"
        stroke="url(#orwellCyanGrad)"
        strokeWidth="4"
        strokeOpacity="0.5"
      />
      <line
        x1="256"
        y1="76"
        x2="256"
        y2="374"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeOpacity="0.4"
      />

      {/* Radar Reticle Cardinal Alignment Markers */}
      <line x1="256" y1="36" x2="256" y2="76" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
      <line x1="256" y1="436" x2="256" y2="476" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
      <line x1="36" y1="256" x2="76" y2="256" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
      <line x1="436" y1="256" x2="476" y2="256" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />

      {/* The All-Seeing Telescreen Eye */}
      {/* Outer Almond Contour */}
      <path
        d="M 96 256 C 160 148, 352 148, 416 256 C 352 364, 160 364, 96 256 Z"
        fill="#070e1b"
        stroke="url(#orwellCyanGrad)"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* Sclera Aperture Secondary Trace */}
      <path
        d="M 132 256 C 180 182, 332 182, 380 256 C 332 330, 180 330, 132 256 Z"
        fill="none"
        stroke="#0284c7"
        strokeWidth="3"
        strokeDasharray="6 6"
        strokeOpacity="0.8"
      />

      {/* Glowing Crimson Surveillance Iris */}
      <circle cx="256" cy="256" r="68" fill="url(#orwellPartyRed)" stroke="#fee2e2" strokeWidth="3.5" />
      <circle cx="256" cy="256" r="56" fill="none" stroke="#fecaca" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.7" />

      {/* Central Surveillance Aperture Pupil */}
      <circle cx="256" cy="256" r="32" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="256" cy="256" r="14" fill="#38bdf8" />

      {/* Dual Specular Glints */}
      <circle cx="270" cy="242" r="8" fill="#ffffff" />
      <circle cx="244" cy="268" r="3.5" fill="#ffffff" fillOpacity="0.85" />

      {/* Concentric Scanning Orbit */}
      <circle cx="256" cy="256" r="132" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 14" strokeOpacity="0.5" />
    </svg>
  );
};
