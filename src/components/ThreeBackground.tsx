"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth || 800;
    const height = mount.clientHeight || window.innerHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Galaxy particle system
    const particleCount = 6000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOptions = [
      new THREE.Color(0xa855f7),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xec4899),
      new THREE.Color(0xf59e0b),
      new THREE.Color(0x8b5cf6),
    ];

    for (let i = 0; i < particleCount; i++) {
      const arm = i % 3;
      const armAngle = (arm / 3) * Math.PI * 2;
      const t = i / particleCount;
      const angle = t * Math.PI * 12 + armAngle;
      const radius = t * 38 + Math.random() * 4;

      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 3;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const galaxy = new THREE.Points(particleGeo, particleMat);
    scene.add(galaxy);

    // Floating wireframe meshes
    const meshes: { mesh: THREE.Mesh; speedX: number; speedY: number; floatOffset: number }[] = [];
    const geoTypes = [
      new THREE.IcosahedronGeometry(1.8, 0),
      new THREE.OctahedronGeometry(1.6, 0),
      new THREE.TetrahedronGeometry(1.7, 0),
      new THREE.IcosahedronGeometry(1.2, 1),
    ];

    const meshColors = [0xa855f7, 0x06b6d4, 0xec4899, 0xf59e0b, 0x10b981, 0x3b82f6];

    for (let i = 0; i < 8; i++) {
      const geo = geoTypes[i % geoTypes.length];
      const mat = new THREE.MeshBasicMaterial({
        color: meshColors[i % meshColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20 - 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      meshes.push({
        mesh,
        speedX: 0.003 + Math.random() * 0.004,
        speedY: 0.004 + Math.random() * 0.004,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // Connecting lines between close particles (ring decoration)
    const ringGeo = new THREE.TorusGeometry(15, 0.05, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.15,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(22, 0.04, 8, 100),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.1 })
    );
    ring2.rotation.x = Math.PI / 5;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.001;

      galaxy.rotation.y = time * 0.15;
      galaxy.rotation.x = Math.sin(time * 0.1) * 0.08;

      ring1.rotation.z = time * 0.08;
      ring2.rotation.z = -time * 0.05;
      ring2.rotation.x = Math.PI / 5 + Math.sin(time * 0.3) * 0.05;

      meshes.forEach(({ mesh, speedX, speedY, floatOffset }, i) => {
        mesh.rotation.x += speedX;
        mesh.rotation.y += speedY;
        mesh.position.y += Math.sin(time * 0.8 + floatOffset + i) * 0.008;
      });

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.025;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}
