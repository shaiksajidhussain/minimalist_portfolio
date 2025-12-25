"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

// Sample globe data
const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: "#06b6d4",
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: "#6366f1",
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: "#06b6d4",
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: "#3b82f6",
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: "#6366f1",
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: "#3b82f6",
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#6366f1",
  },
];

// Minimal globe countries data - simplified version
const countriesData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "India" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [68.1766, 7.9667],
            [97.3992, 7.9667],
            [97.3992, 35.5133],
            [68.1766, 35.5133],
            [68.1766, 7.9667],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "United States" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-125, 24],
            [-66, 24],
            [-66, 49],
            [-125, 49],
            [-125, 24],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Brazil" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-73.9833, -33.7683],
            [-29.3372, -33.7683],
            [-29.3372, 5.2419],
            [-73.9833, 5.2419],
            [-73.9833, -33.7683],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "China" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [73.5, 18],
            [135.1, 18],
            [135.1, 53.5],
            [73.5, 53.5],
            [73.5, 18],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Europe" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-10, 35],
            [40, 35],
            [40, 71],
            [-10, 71],
            [-10, 35],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Africa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-18, -35],
            [52, -35],
            [52, 37],
            [-18, 37],
            [-18, -35],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Australia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [113, -44],
            [154, -44],
            [154, -10],
            [113, -10],
            [113, -44],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Southeast Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [95, -10],
            [141, -10],
            [141, 20],
            [95, 20],
            [95, -10],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Japan" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [130, 30],
            [145, 30],
            [145, 45],
            [130, 45],
            [130, 30],
          ],
        ],
      },
    },
  ],
};

function GlobeComponent({ globeConfig, data }) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial();
    if (globeMaterial) {
      globeMaterial.color = new Color(globeConfig.globeColor || "#1d072e");
      globeMaterial.emissive = new Color(globeConfig.emissive || "#000000");
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
      globeMaterial.shininess = globeConfig.shininess || 0.9;
    }
  }, [isInitialized, globeConfig.globeColor, globeConfig.emissive, globeConfig.emissiveIntensity, globeConfig.shininess]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const arcs = data;
    let points = [];
    
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i
    );

    globeRef.current
      .hexPolygonsData(countriesData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => d.startLat)
      .arcStartLng((d) => d.startLng)
      .arcEndLat((d) => d.endLat)
      .arcEndLng((d) => d.endLng)
      .arcColor((e) => e.color)
      .arcAltitude((e) => e.arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => e.order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => e.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);
  }, [isInitialized, data]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));
      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffffff, 0);
  }, [gl, size]);

  return null;
}

function World({ globeConfig, data }) {
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight || "#38bdf8"} intensity={0.6} />
      <directionalLight color={globeConfig.directionalLeftLight || "#ffffff"} position={new Vector3(-400, 100, 400)} />
      <directionalLight color={globeConfig.directionalTopLight || "#ffffff"} position={new Vector3(-200, 500, 200)} />
      <pointLight color={globeConfig.pointLight || "#ffffff"} position={new Vector3(-200, 500, 200)} intensity={0.8} />
      <GlobeComponent globeConfig={globeConfig} data={data} />
      <OrbitControls enablePan={false} enableZoom={false} minDistance={cameraZ} maxDistance={cameraZ} autoRotateSpeed={1} autoRotate={true} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI - Math.PI / 3} />
    </Canvas>
  );
}

function genRandomNumbers(min, max, count) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

export function GlobeDemo() {
  const { colors } = useTheme();

  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 400,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative w-full" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Global Reach & Impact
          </h2>
          <p className="text-base md:text-lg font-normal text-gray-600 dark:text-gray-300 max-w-md mt-2 mx-auto">
            Building solutions for clients worldwide with proven expertise across continents.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700"
          style={{ height: "500px" }}
        >
          <World globeConfig={globeConfig} data={sampleArcs} />
        </motion.div>
      </div>
    </section>
  );
}

export default GlobeDemo;
