"use client";

import { cn } from "../../lib/utils";
import React, { useState, useEffect } from "react";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */

/**
 * The InteractiveGridPattern component.
 *
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [glowingSquares, setGlowingSquares] = useState(new Set());

  useEffect(() => {
    // Initialize with some glowing squares immediately
    const initializeGlow = () => {
      const numGlowSquares = Math.floor(Math.random() * 12) + 15; // 15-26 squares
      const totalSquares = horizontal * vertical;
      const newGlowingSquares = new Set();
      
      while (newGlowingSquares.size < numGlowSquares) {
        const randomIndex = Math.floor(Math.random() * totalSquares);
        newGlowingSquares.add(randomIndex);
      }
      
      setGlowingSquares(newGlowingSquares);
    };

    // Initialize immediately
    initializeGlow();

    const interval = setInterval(() => {
      initializeGlow();
    }, 1500); // Very fast updates for smooth continuous effect

    return () => clearInterval(interval);
  }, [horizontal, vertical]);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full border border-gray-400/30",
        className,
      )}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        const isHovered = hoveredSquare === index;
        const isGlowing = glowingSquares.has(index);
        
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-blue-400 transition-all duration-150 ease-in-out",
              isHovered 
                ? "fill-gray-900" 
                : isGlowing 
                  ? "fill-blue-400/70 drop-shadow-lg" 
                  : "fill-blue-500/40",
              squaresClassName,
            )}
            style={{
              filter: isGlowing ? "fill-blue-500/40" : undefined
            }}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}
