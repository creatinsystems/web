"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Group } from "three";

/** Slowly rotating group of floating glass geometries */
function SceneContent() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main torus — large, glassy */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.4, 0.45, 32, 64]} />
          <MeshDistortMaterial
            color="#818cf8"
            roughness={0.15}
            metalness={0.8}
            distort={0.2}
            speed={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Icosahedron — floating offset */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[1.8, 0.8, -0.5]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <MeshDistortMaterial
            color="#6366f1"
            roughness={0.1}
            metalness={0.9}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.75}
          />
        </mesh>
      </Float>

      {/* Octahedron — smaller accent */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
        <mesh position={[-1.5, -0.6, 0.5]}>
          <octahedronGeometry args={[0.45, 0]} />
          <MeshDistortMaterial
            color="#a5b4fc"
            roughness={0.2}
            metalness={0.7}
            distort={0.15}
            speed={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
    </group>
  );
}

function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#818cf8" />
      <pointLight position={[-3, -2, 4]} intensity={0.6} color="#6366f1" />
      <SceneContent />
    </Canvas>
  );
}

export { HeroScene };
