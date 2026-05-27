'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, ContactShadows } from '@react-three/drei';

function AbstractMedicalShape() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.5, 0.4, 200, 32]} />
        <MeshDistortMaterial 
          color="#0f766e" 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.2} 
          metalness={0.8}
          wireframe={true}
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </Float>
  );
}

export default function LoginDiorama() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-slate-950 overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#14b8a6" />
        <spotLight position={[-10, -10, -5]} intensity={0.5} color="#0f766e" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <AbstractMedicalShape />
        
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.7} 
          scale={20} 
          blur={2} 
          far={4.5} 
          color="#0f766e" 
        />
      </Canvas>
    </div>
  );
}
