// Antigravity Motion System
// Physical, directional, decisive. No decoration.

import {
  Transition,
  Variants,
  cubicBezier,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/* EASING TOKENS (TYPE-SAFE — NEVER USE STRINGS) */
/* ------------------------------------------------------------------ */

export const easing = {
  standard: cubicBezier(0.4, 0.0, 0.2, 1),
  aggressive: cubicBezier(0.22, 1, 0.36, 1),
  float: cubicBezier(0.33, 1, 0.68, 1),
} as const;

/* ------------------------------------------------------------------ */
/* SPRINGS */
/* ------------------------------------------------------------------ */

// Core spring - high stiffness, low damping, small overshoot
export const spring: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 35,
  mass: 1,
};

// Fast spring for immediate response
export const springFast: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 40,
};

// Heavy spring for finality
export const springHeavy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1.5,
};

/* ------------------------------------------------------------------ */
/* SCREEN & CARD TRANSITIONS */
/* ------------------------------------------------------------------ */

// Screen enters from below (new intent)
export const screenEnter: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    y: -40,
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

// Card slides in from side (reveal)
export const cardSlideIn: Variants = {
  initial: { x: 60, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    x: -60,
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

// Scale up for reveals (toward user)
export const revealScale: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: spring,
  },
};

// Final reveal - heavy, irreversible
export const finalReveal: Variants = {
  initial: { scale: 0.85, opacity: 0, y: 20 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: springHeavy,
  },
};

/* ------------------------------------------------------------------ */
/* INTERACTIONS */
/* ------------------------------------------------------------------ */

// Button mechanical press
export const buttonPress = {
  whileTap: { scale: 0.96 },
  transition: springFast,
};

// Player card enter/exit
export const playerCardMotion: Variants = {
  initial: { x: -40, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: spring,
  },
  exit: {
    x: 60,
    opacity: 0,
    transition: { duration: 0.12 },
  },
};

// Shake for error - horizontal only, fast
export const shakeX = {
  x: [0, -8, 8, -8, 8, 0],
  transition: { duration: 0.3 },
};

/* ------------------------------------------------------------------ */
/* HERO / HOMEPAGE MOTION */
/* ------------------------------------------------------------------ */

// Hero card floating entrance - dramatic float up from bottom
// Optimized for mobile with simpler spring physics
export const heroFloatIn: Variants = {
  initial: (config: { rotate?: number }) => ({
    y: "100vh",
    scale: 0.95,
    opacity: 0,
    rotate: config.rotate ?? 0,
  }),
  animate: (config: {
    delay?: number;
    rotate?: number;
    finalY?: number;
  }) => ({
    y: config.finalY ?? 0,
    scale: 1,
    opacity: 1,
    rotate: config.rotate ?? 0,
    transition: {
      type: "spring",
      stiffness: 100,    // Reduced from 120 - less physics calculations
      damping: 16,       // Slightly increased for smoother stop
      mass: 0.8,         // Reduced from 1 - faster, lighter feel
      delay: config.delay ?? 0,
    },
  }),
};


// Continuous floating/bobbing animation for hero images
// Disabled by default for performance - enable only when needed
export const floatingAnimation = {
  y: [0, -10, 0],  // Simplified keyframes
  transition: {
    duration: 4,        // Faster cycle = fewer frames
    ease: "easeInOut",  // Simpler easing
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

/* ------------------------------------------------------------------ */
/* PERFORMANCE UTILITIES */
/* ------------------------------------------------------------------ */

// Simple fade for lightweight transitions
export const simpleFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

// Mobile-optimized spring - use for touch devices
export const springMobile: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};
