"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Preset gradient colors (10 colors each for smooth transitions)
const colorPresets = {
  nature: [
    "#669900", "#88bb22", "#99cc33", "#aaddaa", "#ccee66",
    "#006699", "#228888", "#3399cc", "#55aacc", "#669900",
  ],
  ocean: [
    "#006699", "#1177aa", "#2288bb", "#3399cc", "#44aadd",
    "#55bbee", "#66ccff", "#44bbee", "#2299cc", "#006699",
  ],
  sunset: [
    "#ff6600", "#ff7711", "#ff8822", "#ff9900", "#ffaa22",
    "#ffbb44", "#ffcc00", "#ff9933", "#ff7722", "#ff6600",
  ],
  aurora: [
    "#00ff87", "#22ffaa", "#44ffcc", "#60efff", "#88ddff",
    "#bb99ff", "#dd77ee", "#ff68f0", "#ff55cc", "#00ff87",
  ],
  gold: [
    "#bf953f", "#fcf6ba", "#b38728", "#fbf5b7", "#aa771c",
    "#da9100", "#fcf6ba", "#b38728", "#fbf5b7", "#bf953f",
  ],
  custom: [
    "#669900", "#99cc33", "#ccee66", "#006699", "#3399cc",
    "#990066", "#cc3399", "#ff6600", "#ff9900", "#ffcc00",
  ],
};

export const GlowBorderCard = React.forwardRef(
  (
    {
      children,
      className,
      width = "100%",
      height,
      aspectRatio,
      borderRadius = "1rem",
      animationDuration = 4,
      gradientColors,
      borderWidth = "2.5px",
      blurAmount = "8px",
      inset = "-2px",
      colorPreset = "aurora",
      paused = false,
      style,
      ...props
    },
    ref
  ) => {
    // Determine the gradient colors to use (up to 10)
    const colors =
      gradientColors || colorPresets[colorPreset] || colorPresets.aurora;

    // Build color CSS variables (--glow-color-1 through --glow-color-10)
    const colorVars = {};
    for (let i = 0; i < 10; i++) {
      colorVars[`--glow-color-${i + 1}`] = colors[i % colors.length];
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden isolate w-full transition-all duration-300",
          "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm hover:shadow-xl",
          className
        )}
        style={{
          width: width,
          height: height || "auto",
          aspectRatio: aspectRatio || "unset",
          borderRadius: borderRadius,
          "--glow-animation-duration": `${animationDuration}s`,
          ...colorVars,
          ...style,
        }}
        {...props}
      >
        {/* The Glow Rotating Border Layer */}
        <div
          className={cn(
            "absolute -z-10 border-solid rounded-[inherit]",
            "glow-conic pointer-events-none",
            paused && "[animation-play-state:paused]"
          )}
          style={{
            inset: inset,
            borderWidth: borderWidth,
            filter: `blur(${blurAmount})`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    );
  }
);

GlowBorderCard.displayName = "GlowBorderCard";

export default GlowBorderCard;
