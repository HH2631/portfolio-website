import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import useMousePosition from '../../hooks/useMousePosition';
import Canvas3DErrorBoundary from './Canvas3DWrapper';

function Particles({ count = 400, reducedMotion }) {
  const mesh = useRef();
  const { normalized } = useMousePosition();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const geo = mesh.current.geometry;
    const posArr = geo.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArr[i3 + 1] += Math.sin(t * 0.3 + i * 0.1) * 0.002;
      posArr[i3] += Math.cos(t * 0.2 + i * 0.05) * 0.001;
    }
    geo.attributes.position.needsUpdate = true;

    mesh.current.rotation.y = normalized.x * 0.08;
    mesh.current.rotation.x = -normalized.y * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6C63FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GradientMesh() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.z = t * 0.02;
    mesh.current.position.y = Math.sin(t * 0.15) * 0.5;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]} scale={[12, 12, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial
        color="#6C63FF"
        transparent
        opacity={0.015}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ParticleField() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas3DErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Particles count={400} reducedMotion={reducedMotion} />
          <GradientMesh />
          <ambientLight intensity={0.5} />
        </Canvas>
      </Canvas3DErrorBoundary>
      {/* Gradient mesh overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07] animate-float-slow"
          style={{ background: 'radial-gradient(circle, #6C63FF, transparent 70%)', top: '10%', left: '15%' }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.05] animate-float"
          style={{ background: 'radial-gradient(circle, #00D4FF, transparent 70%)', bottom: '20%', right: '10%' }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #FF3CAC, transparent 70%)', top: '60%', left: '50%' }}
        />
      </div>
    </div>
  );
}
