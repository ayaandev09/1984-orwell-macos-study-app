'use client';

import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
} from 'react';
import './chromatic-button.css';

export interface ChromaticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  colorMode?: string;
  speed?: number;
  paused?: boolean;
  phase?: number;
  feather?: number;
  projectionScale?: number;
  intensity?: number;
  grain?: number;
  seed?: number;
  borderRadius?: number;
  hoverEffect?: string;
  entrance?: string;
  entranceSpeed?: number;
  entranceBlur?: number;
  entranceDistance?: number;
  entranceScale?: number;
}

/**
 * Tactile Frosted Glass Pillow Button (Option D + A)
 * 
 * Blends Apple VisionOS/macOS frosted liquid glass with a tactile 3D pillow bevel:
 * - Pure frosted translucent glass with deep backdrop blur
 * - Specular top rim bevel highlight (tactile pillow depth)
 * - Zero idle color shifting or rainbow animations (calm study focus)
 * - Soft subject-tinted glow on hover and active selection
 * - Satisfying tactile micro-press (scale 0.97 + inset shadow)
 */
export const ChromaticButton = forwardRef<HTMLButtonElement, ChromaticButtonProps>(
  function ChromaticButton(
    {
      children,
      className = '',
      color = 'rgba(255, 255, 255, 0.15)',
      style,
      disabled,
      type = 'button',
      borderRadius = 50,
      ...restProps
    },
    ref,
  ) {
    // Extract any color overrides safely
    const customStyle: CSSProperties = {
      '--button-accent-tint': color,
      ...style,
    } as CSSProperties;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`tactile-glass-pillow-button ${className}`.trim()}
        style={customStyle}
        {...restProps}
      >
        {/* Specular Top Bevel Reflection Layer */}
        <span className="tactile-pillow-bevel-top" aria-hidden="true" />
        
        {/* Ambient Subject Glow Layer */}
        <span className="tactile-pillow-glow" aria-hidden="true" />

        {/* Content */}
        <span className="tactile-pillow-content relative z-10 inline-flex items-center justify-center">
          {children}
        </span>
      </button>
    );
  },
);

export default ChromaticButton;
