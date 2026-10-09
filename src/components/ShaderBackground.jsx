"use client";
import React, { useState, useEffect } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

export function ShaderBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-50 bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none w-screen h-screen overflow-hidden">
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <ShaderGradient
          animate="on"
          axesHelper="off"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={2.89}
          cPolarAngle={120}
          cameraZoom={1}
          color1="#ebedff"
          color2="#f3f2f8"
          color3="#dbf8ff"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={0}
          positionY={1.8}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={-90}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={1}
          uFrequency={5.5}
          uSpeed={0.3}
          uStrength={3}
          uTime={0.2}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}

export default ShaderBackground;
