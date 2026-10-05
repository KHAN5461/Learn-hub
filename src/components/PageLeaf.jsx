import React from 'react';
import { motion } from 'framer-motion';

export default function PageLeaf({
  index,
  totalLeaves,
  isFlipped,
  isFlipping,
  frontContent,
  backContent,
  onFlipNext,
  onFlipPrev,
  isCover = false,
  isInteractive = false,
  pageNumberFront = null,
  pageNumberBack = null,
  theme = 'dark',
}) {
  const isDark = theme === 'dark';

  // 3D Stacking Order
  const zIndex = isFlipping
    ? 150
    : isFlipped
    ? index + 10
    : (totalLeaves - index) + 10;

  // Tangible page layer thickness
  const zOffset = isFlipped ? index * 0.5 : (totalLeaves - index) * 0.5;

  return (
    <motion.div
      className="absolute inset-0 origin-left preserve-3d select-none"
      style={{
        zIndex,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      initial={false}
      animate={{
        rotateY: isFlipped ? -180 : 0,
        z: isFlipping ? 22 : zOffset,
      }}
      transition={{
        rotateY: {
          duration: isFlipped ? 0.65 : 0.48,
          ease: isFlipped ? [0.34, 1.25, 0.64, 1] : [0.32, 0, 0.67, 0],
        },
        z: {
          duration: 0.28,
          ease: 'easeIn',
        },
      }}
    >
      {/* FRONT SIDE (Visible on Right side when unflipped) */}
      <div
        className={`absolute inset-0 backface-hidden overflow-hidden transition-colors duration-300 ${
          isCover
            ? 'rounded-r-[6px] bg-[#0c192c] border-l-[3px] border-[#070e1a] shadow-2xl'
            : 'top-[8px] bottom-[8px] right-[6px] rounded-r-[4px] bg-[#fcfaf7] shadow-[2px_4px_16px_rgba(0,0,0,0.15)] border-r border-stone-200'
        }`}
        onClick={(e) => {
          if (!isInteractive || isFlipped) return;
          e.stopPropagation();
          onFlipNext();
        }}
      >
        {frontContent}

        {/* Page Number on bottom right for inner pages */}
        {!isCover && pageNumberFront && (
          <div className="absolute bottom-3 right-4 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-stone-400 bg-black/5 pointer-events-none z-20">
            {pageNumberFront}
          </div>
        )}

        {/* Dynamic page curvature / lighting specular sheen */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          initial={false}
          animate={{
            opacity: isFlipping ? 0.35 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.4) 40%, rgba(0,0,0,0.3) 75%, transparent 100%)',
          }}
        />

        {/* Spine Crease Deep Gutter Shadow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)',
          }}
        />

        {/* Static Edge Shading */}
        {!isCover && (
          <img
            src="/assets/images/front_page_edge_shading.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 mix-blend-multiply z-10"
          />
        )}
      </div>

      {/* BACK SIDE (Visible on Left side when flipped) */}
      <div
        className={`absolute inset-0 backface-hidden overflow-hidden transition-colors duration-300 ${
          isCover
            ? 'rounded-l-[6px] bg-[#f6eee3] shadow-xl border-r border-stone-300'
            : 'top-[8px] bottom-[8px] left-[6px] rounded-l-[4px] bg-[#fcfaf7] shadow-[-2px_4px_16px_rgba(0,0,0,0.15)] border-l border-stone-200'
        }`}
        style={{
          transform: 'rotateY(180deg) translateZ(0.2px)',
        }}
        onClick={(e) => {
          if (!isInteractive || !isFlipped) return;
          e.stopPropagation();
          onFlipPrev();
        }}
      >
        {backContent}

        {/* Page Number on bottom left for inner pages */}
        {!isCover && pageNumberBack && (
          <div className="absolute bottom-3 left-4 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-stone-400 bg-black/5 pointer-events-none z-20">
            {pageNumberBack}
          </div>
        )}

        {/* Dynamic page curvature / lighting specular sheen */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          initial={false}
          animate={{
            opacity: isFlipping ? 0.35 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(270deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.4) 40%, rgba(0,0,0,0.3) 75%, transparent 100%)',
          }}
        />

        {/* Spine Crease Gutter Shadow */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)',
          }}
        />

        {/* Static Edge Shading */}
        {!isCover && (
          <img
            src="/assets/images/back_page_edge_shading.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 mix-blend-multiply z-10"
          />
        )}
      </div>
    </motion.div>
  );
}
