import React from "react";

export function SimpleRetroGrid({ 
  angle = 65, 
  cellSize = 60, 
  opacity = 0.4, 
  lineColor = "#064EE3" 
}) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        perspective: "1200px",
        opacity: opacity
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          transform: `rotateX(${angle}deg)`
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${lineColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            backgroundRepeat: "repeat",
            backgroundPosition: "0 0"
          }}
        />
      </div>
      <div 
        className="absolute inset-0"
        style={{ 
          background: `
            linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0.7) 100%),
            radial-gradient(ellipse at center top, transparent 0%, rgba(255,255,255,0.1) 30%, transparent 70%)
          `
        }}
      />
    </div>
  );
}