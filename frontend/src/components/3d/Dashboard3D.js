'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, Bounds } from '@react-three/drei';

function MedicalCross() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.5;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 2, 0.5]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.3}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#14b8a6"
            color="#0f766e"
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 0.5, 0.5]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.3}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#14b8a6"
            color="#0f766e"
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Dashboard3D() {
  return (
    <div className="absolute right-0 top-0 w-[400px] h-[400px] opacity-60 pointer-events-none -z-10 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#14b8a6" />
        <Bounds fit clip observe margin={1.2}>
          <MedicalCross />
        </Bounds>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
