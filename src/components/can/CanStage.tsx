"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { Flavour } from "@/lib/flavours";
import type { ScrollProgress } from "./useScrollProgress";

export type CanStageProps = {
  progress: ScrollProgress;
  flavour: Flavour;
  /** Gesamtrotation in Umdrehungen über den Scrollweg */
  turns?: number;
  /** wird gerufen, wenn die Frametime das Budget reißt (mobil) → statischer Fallback */
  onPerfFail?: () => void;
};

/** Label als Laufzeit-CanvasTexture: Wortmarke + Sortenname, keine Asset-Dateien. */
function createLabelTexture(flavour: Flavour): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.wrapS = THREE.RepeatWrapping;

  const draw = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // next/font vergibt interne Familiennamen – aus den CSS-Variablen auflösen.
    const rootStyle = getComputedStyle(document.documentElement);
    const displayFont =
      rootStyle.getPropertyValue("--font-display").trim() || "Impact";
    const bodyFont = rootStyle.getPropertyValue("--font-body").trim() || "system-ui";

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#101014";
    ctx.fillRect(0, 0, size, size);

    // Flavour-Band unten
    ctx.fillStyle = flavour.farbe;
    ctx.fillRect(0, 790, size, size - 790);
    ctx.fillStyle = "#0B0B0C";
    ctx.textAlign = "center";
    for (const x of [256, 768]) {
      ctx.font = `700 40px ${bodyFont}, system-ui, sans-serif`;
      ctx.fillText(flavour.name.toUpperCase(), x, 880, 440);
      ctx.font = `600 24px ${bodyFont}, system-ui, sans-serif`;
      ctx.fillText("500 MG ELEKTROLYTE · 0 G ZUCKER", x, 930, 420);
    }

    // Wortmarke vertikal, zweimal um den Umfang
    ctx.fillStyle = flavour.farbe;
    ctx.font = `400 220px ${displayFont}, Impact, sans-serif`;
    for (const x of [256, 768]) {
      ctx.save();
      ctx.translate(x, 400);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("sodaLYTE", 0, 80, 620);
      ctx.restore();
    }

    texture.needsUpdate = true;
  };

  draw();
  // Anton lädt asynchron – nachzeichnen, sobald die Fonts bereit sind.
  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.ready.then(() => {
      draw();
      invalidate();
    });
  }

  return texture;
}

function CanMesh({
  progress,
  flavour,
  turns = 1.5,
  segments,
  onPerfFail,
}: CanStageProps & { segments: number }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef(progress.get());
  const current = useRef(progress.get());
  const perf = useRef({ last: 0, samples: 0, slow: 0, done: false });
  const invalidateThree = useThree((s) => s.invalidate);

  const labelTexture = useMemo(() => createLabelTexture(flavour), [flavour]);
  useEffect(() => () => labelTexture.dispose(), [labelTexture]);

  useEffect(() => {
    const unsubscribe = progress.subscribe((p) => {
      target.current = p;
      invalidateThree();
    });
    invalidateThree();
    return unsubscribe;
  }, [progress, invalidateThree]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    // Frametime-Budget: nur direkt aufeinanderfolgende Frames zählen
    // (frameloop="demand" hat naturgemäß große Lücken).
    const p = perf.current;
    const now = performance.now();
    if (p.last > 0 && now - p.last < 100 && !p.done) {
      p.samples += 1;
      if (now - p.last > 34) p.slow += 1;
      if (p.samples >= 40) {
        p.done = true;
        if (p.slow / p.samples > 0.5 && window.innerWidth < 768) {
          onPerfFail?.();
        }
      }
    }
    p.last = now;

    // Dämpfung Richtung Ziel – nie setState, nur Refs.
    const t = target.current;
    const c = current.current;
    const next = c + (t - c) * Math.min(1, delta * 7);
    current.current = next;

    const totalRot = turns * Math.PI * 2;
    g.rotation.y = next * totalRot;
    // Leichter Kipp + Scale am Anfang
    const intro = Math.min(1, next / 0.22);
    g.rotation.x = (1 - intro) * 0.3;
    const s = 0.92 + intro * 0.08;
    g.scale.setScalar(s);

    if (Math.abs(t - next) > 0.0008) invalidateThree();
  });

  return (
    <group ref={group}>
      {/* Rumpf mit Label */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.53, 2.45, segments, 1, true]} />
        <meshStandardMaterial map={labelTexture} metalness={0.35} roughness={0.5} />
      </mesh>
      {/* Schulter oben */}
      <mesh position={[0, 1.33, 0]}>
        <cylinderGeometry args={[0.46, 0.55, 0.22, segments, 1, true]} />
        <meshStandardMaterial color="#cfcfd4" metalness={1} roughness={0.22} />
      </mesh>
      {/* Falz / Rand */}
      <mesh position={[0, 1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.44, 0.035, 12, segments]} />
        <meshStandardMaterial color="#dcdce2" metalness={1} roughness={0.18} />
      </mesh>
      {/* Deckel */}
      <mesh position={[0, 1.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.44, segments]} />
        <meshStandardMaterial color="#8e8e96" metalness={1} roughness={0.3} />
      </mesh>
      {/* Bodenverjüngung */}
      <mesh position={[0, -1.31, 0]}>
        <cylinderGeometry args={[0.53, 0.42, 0.18, segments, 1, true]} />
        <meshStandardMaterial color="#b9b9c0" metalness={1} roughness={0.28} />
      </mesh>
      <mesh position={[0, -1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, segments]} />
        <meshStandardMaterial color="#6f6f76" metalness={1} roughness={0.35} />
      </mesh>
    </group>
  );
}

/**
 * 3D-Bühne der Dose. Bekommt Progress von außen (useScrollProgress) und ist
 * dadurch austauschbar gegen einen Bildsequenz-Scrubber (siehe README).
 */
export default function CanStage(props: CanStageProps) {
  const segments =
    typeof window !== "undefined" && window.innerWidth < 768 ? 48 : 96;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.25, 10.5], fov: 24 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      {/* Key Light */}
      <spotLight position={[4, 6, 6]} angle={0.5} penumbra={0.8} intensity={120} />
      {/* Rim Light */}
      <directionalLight position={[-5, 3, -4]} intensity={2.2} color="#ffffff" />
      <CanMesh {...props} segments={segments} />
      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.45}
        scale={8}
        blur={2.6}
        far={3}
        resolution={256}
        frames={1}
      />
      {/* Studio-Env ohne externe Assets: Lightformer statt HDRI-Download */}
      <Environment frames={1} resolution={256}>
        <Lightformer intensity={2} position={[0, 4, 5]} scale={[8, 4, 1]} />
        <Lightformer intensity={1.2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer intensity={0.8} position={[5, 0, -2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color={props.flavour.farbe} />
      </Environment>
    </Canvas>
  );
}
