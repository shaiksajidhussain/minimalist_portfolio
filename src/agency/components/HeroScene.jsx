import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

const Panel = ({ position, rotation, size, glow = false, palette }) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={size} />
      <meshPhysicalMaterial
      color={glow ? palette.glow : palette.panel}
      transparent
      opacity={glow ? 0.28 : 0.14}
      roughness={0.05}
      metalness={0.08}
      clearcoat={1}
      clearcoatRoughness={0.12}
      side={THREE.DoubleSide}
    />
    <Edges color={palette.stroke} threshold={15} />
    {glow ? (
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.55, 40]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.45} />
      </mesh>
    ) : null}
  </mesh>
);

const Sculpture = ({ pointer, palette }) => {
  const group = useRef(null);

  useFrame(({ clock }, delta) => {
    const groupNode = group.current;
    if (!groupNode) return;
    const targetY = -0.18 + pointer.current.x * 0.28;
    const targetX = 0.04 + pointer.current.y * -0.12;
    groupNode.rotation.y = THREE.MathUtils.damp(groupNode.rotation.y, targetY, 2.2, delta);
    groupNode.rotation.x = THREE.MathUtils.damp(groupNode.rotation.x, targetX, 2.2, delta);
    groupNode.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.06;
  });

  return (
    <group ref={group} position={[-0.35, 0.02, 0]} scale={1.35}>
      <Panel position={[-0.55, 0.08, 0.15]} rotation={[0.04, 0.42, 0.1]} size={[1.35, 2.05]} palette={palette} />
      <Panel position={[0.38, -0.04, 0]} rotation={[0.02, -0.06, 0.02]} size={[1.25, 1.9]} glow palette={palette} />
      <mesh position={[-0.7, 0.05, 0.4]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.03, 1.15, 0.03]} />
        <meshBasicMaterial color={palette.accent} />
      </mesh>
      <mesh rotation={[1.25, 0.15, -0.4]} position={[0, -0.05, -0.2]}>
        <torusGeometry args={[1.15, 0.008, 12, 80]} />
        <meshBasicMaterial color={palette.stroke} transparent opacity={0.75} />
      </mesh>
    </group>
  );
};

const HeroScene = ({ pointer, active, palette }) => (
  <Canvas
    className="hero-canvas"
    camera={{ position: [0, 0, 5.2], fov: 32 }}
    dpr={[1, 1.5]}
    frameloop={active ? 'always' : 'never'}
    gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
  >
    <ambientLight intensity={0.55} />
    <pointLight position={[1.8, 0.6, 2.4]} intensity={18} color={palette.accent} distance={8} />
    <pointLight position={[-2.2, -0.8, 1.5]} intensity={6} color={palette.violet} distance={8} />
    <Sculpture pointer={pointer} palette={palette} />
  </Canvas>
);

export default HeroScene;
