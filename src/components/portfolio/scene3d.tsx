"use client";

import { useMemo, useRef, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPIDER_RED = new THREE.Color("#e62429");

/** Rotating wireframe icosahedron — the "core" */
function CoreShape() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.x += delta * 0.12;
      outer.current.rotation.y += delta * 0.18;
      outer.current.position.y = Math.sin(t * 0.6) * 0.18;
    }
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.25;
      inner.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.6, 1]} />
        <meshBasicMaterial color={SPIDER_RED} wireframe transparent opacity={0.32} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color="#f2f2f5" wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

/** Sphere shell of nodes with connecting lines — "the network" */
function NetworkSphere() {
  const group = useRef<THREE.Group>(null);

  const { positions, linePoints } = useMemo(() => {
    const COUNT = 190;
    const R = 4.4;
    const pos = new Float32Array(COUNT * 3);
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      // fibonacci sphere for even distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = R * (0.9 + Math.random() * 0.25);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    // connect nearby nodes
    const segs: number[] = [];
    const MAX_DIST = 1.35;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < MAX_DIST) {
          segs.push(
            pts[i].x, pts[i].y, pts[i].z,
            pts[j].x, pts[j].y, pts[j].z
          );
        }
      }
    }
    return { positions: pos, linePoints: new Float32Array(segs) };
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.045;
      group.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={SPIDER_RED}
          size={0.055}
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePoints, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#e62429" transparent opacity={0.14} />
      </lineSegments>
    </group>
  );
}

/** Drifting ambient particles for depth */
function DustField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const COUNT = 420;
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.4;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8a8a93" size={0.03} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/** Group that gently rotates toward the pointer (parallax) */
function ParallaxGroup({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += (target.current.x * 0.14 - g.rotation.y) * 0.04;
    g.rotation.x += (target.current.y * 0.1 - g.rotation.x) * 0.04;
  });

  return <group ref={ref}>{children}</group>;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function Scene3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Guard: reduce motion preference or no WebGL -> CSS-only background.
    // State update is deferred to a rAF callback (async) on purpose.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !hasWebGL()) return;
    const id = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 cyber-grid opacity-60 [background:radial-gradient(ellipse_at_center,rgba(230,36,41,0.14),transparent_62%)]"
      />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <ParallaxGroup>
          <CoreShape />
          <NetworkSphere />
          <DustField />
        </ParallaxGroup>
      </Canvas>
    </div>
  );
}
