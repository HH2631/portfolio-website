import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import useMousePosition from '../../hooks/useMousePosition';
import Canvas3DErrorBoundary from './Canvas3DWrapper';

function Icosahedron() {
  const mesh = useRef();
  const { normalized } = useMousePosition();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.15 + normalized.y * 0.3;
    mesh.current.rotation.y = t * 0.2 + normalized.x * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#6C63FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.3;
    mesh.current.rotation.z = t * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={[2.5, -1.2, -1]} scale={0.5}>
        <torusKnotGeometry args={[1, 0.3, 64, 16]} />
        <meshStandardMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

function Octahedron() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.4;
    mesh.current.rotation.z = t * 0.15;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={[-2, 1.5, -0.5]} scale={0.7}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FF3CAC"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

function Sphere() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={[1.5, 2, -2]} scale={0.8}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#6C63FF"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function FloatingGeometry({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas3DErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} color="#6C63FF" />
          <directionalLight position={[-5, -5, 3]} intensity={0.3} color="#00D4FF" />
          <Icosahedron />
          <TorusKnot />
          <Octahedron />
          <Sphere />
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
}
