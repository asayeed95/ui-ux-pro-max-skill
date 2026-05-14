"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function MorphingOrb() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.4, 24]} />
        <MeshDistortMaterial
          color="#dc2626"
          emissive="#1e293b"
          roughness={0.15}
          metalness={0.85}
          distort={0.42}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#1e293b" />
        <MorphingOrb />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0008, 0.0008]}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
