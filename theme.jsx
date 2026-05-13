// theme.jsx — design tokens, App shell helpers
// Edit colors and tokens here.

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "blue",
  "showGrid": true,
  "showStatusBar": true,
  "showLogoHero": true,
  "lang": "es"
}/*EDITMODE-END*/;

const ACCENTS = {
  gold: { c: 'oklch(0.82 0.13 80)', soft: 'oklch(0.82 0.13 80 / 0.12)', ink: '#0a0805' },
  lime: { c: 'oklch(0.82 0.18 130)', soft: 'oklch(0.82 0.18 130 / 0.12)', ink: '#0a0d08' },
  blue: { c: 'oklch(0.72 0.16 240)', soft: 'oklch(0.72 0.16 240 / 0.12)', ink: '#04080f' },
  violet: { c: 'oklch(0.72 0.18 295)', soft: 'oklch(0.72 0.18 295 / 0.12)', ink: '#0a0612' },
};

const THEMES = {
  dark: {
    bg: 'oklch(0.18 0.025 255)',
    bg2: 'oklch(0.22 0.025 255)',
    bg3: 'oklch(0.26 0.025 255)',
    text: 'oklch(0.94 0.005 240)',
    dim: 'oklch(0.62 0.005 240)',
    line: 'oklch(1 0 0 / 0.08)',
    line2: 'oklch(1 0 0 / 0.14)',
    chrome: 'oklch(0.16 0.025 255 / 0.88)',
  },
  light: {
    bg: 'oklch(0.985 0.002 240)',
    bg2: 'oklch(0.97 0.002 240)',
    bg3: 'oklch(0.94 0.002 240)',
    text: 'oklch(0.18 0.005 240)',
    dim: 'oklch(0.45 0.005 240)',
    line: 'oklch(0 0 0 / 0.08)',
    line2: 'oklch(0 0 0 / 0.14)',
    chrome: 'oklch(0.99 0.002 240 / 0.85)',
  },
};


const BackgroundGrid = ({ line }) => (
  <div style={{
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
    backgroundSize: '64px 64px',
    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
    opacity: 0.6,
  }} />
);

const Container = ({ children, style }) => (
  <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1, ...style }}>
    {children}
  </div>
);

