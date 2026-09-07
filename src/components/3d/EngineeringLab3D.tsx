import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioManager } from '../../utils/audioSFX';
import { PROJECTS, EXPERIENCES } from '../../data/portfolioData';
import { X, Cpu, Zap, Sparkles, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EngineeringLab3DProps {
  onResetCameraTrigger?: number;
}

export const EngineeringLab3D: React.FC<EngineeringLab3DProps> = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeModal, setActiveModal] = useState<'projects' | 'eda' | 'ai' | 'experience' | null>(null);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060810);
    scene.fog = new THREE.FogExp2(0x060810, 0.035);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 4.5, 9);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    const pointLightSky = new THREE.PointLight(0x38bdf8, 2.5, 15);
    pointLightSky.position.set(-3, 4, 3);
    scene.add(pointLightSky);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 2, 15);
    pointLightPurple.position.set(3, 4, -2);
    scene.add(pointLightPurple);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Interactive Objects Group
    const interactiveGroup = new THREE.Group();
    scene.add(interactiveGroup);

    // 1. Workstation Desk & Monitor (Full-Stack & Projects)
    const deskGeo = new THREE.BoxGeometry(2.4, 0.1, 1.2);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(-2, 0.5, 0);
    interactiveGroup.add(desk);

    const monitorGeo = new THREE.BoxGeometry(1.2, 0.7, 0.05);
    const monitorMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6 });
    const monitor = new THREE.Mesh(monitorGeo, monitorMat);
    monitor.position.set(-2, 1.05, -0.2);
    monitor.userData = { id: 'projects', label: '🖥️ Workstation (Full-Stack Projects)' };
    interactiveGroup.add(monitor);

    // 2. Server Rack (RabbitMQ & EDA)
    const rackGeo = new THREE.BoxGeometry(1, 2.2, 0.8);
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.9 });
    const rack = new THREE.Mesh(rackGeo, rackMat);
    rack.position.set(2.2, 1.1, -1);
    rack.userData = { id: 'eda', label: '⚡ RabbitMQ Server Rack (EDA & Microservices)' };
    interactiveGroup.add(rack);

    // Pulsing LED lights on server rack
    const ledGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(2.2, 1.8, -0.58);
    scene.add(led);

    // 3. Data & AI Neural Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(0.6, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      emissive: 0x059669,
      emissiveIntensity: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(0, 1.4, -1.8);
    sphere.userData = { id: 'ai', label: '🧠 Data & AI Sphere (NLP & ML Models)' };
    interactiveGroup.add(sphere);

    // 4. Engineering Blueprint Desk (Experience & EMSI)
    const blueprintGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16);
    const blueprintMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.4 });
    const blueprint = new THREE.Mesh(blueprintGeo, blueprintMat);
    blueprint.position.set(0, 0.4, 1.2);
    blueprint.userData = { id: 'experience', label: '📜 Engineering Desk (EMSI & Experience)' };
    interactiveGroup.add(blueprint);

    // Particle Stars Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 15;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.05, color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Raycasting for Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveGroup.children);

      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData.id) {
          container.style.cursor = 'pointer';
          setHoveredObject(obj.userData.label);
          audioManager.playHover();
        }
      } else {
        container.style.cursor = 'default';
        setHoveredObject(null);
      }
    };

    const onPointerClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveGroup.children);

      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id as 'projects' | 'eda' | 'ai' | 'experience';
        if (id) {
          audioManager.playSwoosh();
          setActiveModal(id);
        }
      }
    };

    window.addEventListener('mousemove', onPointerMove);
    renderer.domElement.addEventListener('click', onPointerClick);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Sphere rotation
      sphere.rotation.y = time * 0.4;
      sphere.rotation.x = time * 0.2;
      sphere.position.y = 1.4 + Math.sin(time * 2) * 0.08;

      // LED blink
      ledMat.color.setHex(Math.sin(time * 6) > 0 ? 0xf59e0b : 0x10b981);

      // Slow particle rotation
      particles.rotation.y = time * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[650px] sm:h-[750px] bg-[#060810] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Hover Label HUD */}
      {hoveredObject && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-950/90 border border-sky-500/40 text-sky-300 font-mono text-xs shadow-lg backdrop-blur-md animate-pulse">
          {hoveredObject} (Click to inspect)
        </div>
      )}

      {/* Instructions Pill */}
      <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur-md hidden sm:block">
        💡 Hover & Click 3D objects to explore Sami's Lab
      </div>

      {/* Modals for 3D Objects */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 z-10 max-h-[80vh] overflow-y-auto font-sans"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase font-bold">
                    <Cpu className="w-4 h-4" /> Workstation // Full-Stack Projects
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">Featured Full-Stack Repositories</h3>
                  <div className="space-y-3">
                    {PROJECTS.map((proj) => (
                      <div key={proj.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-200">{proj.title}</h4>
                          <span className="text-xs font-mono text-sky-400">{proj.subtitle}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModal === 'eda' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
                    <Zap className="w-4 h-4" /> Server Rack // Event-Driven Systems
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">RabbitMQ & Message Brokers</h3>
                  <p className="text-sm text-slate-300">
                    Spécialiste de l'architecture orientée événements découplée, du traitement asynchrone par lots, et de l'intégration de brokers RabbitMQ pour les volumes transactionnels élevés.
                  </p>
                </div>
              )}

              {activeModal === 'ai' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
                    <Sparkles className="w-4 h-4" /> Neural Sphere // Data & AI Intelligence
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">NLP & Machine Learning Pipelines</h3>
                  <p className="text-sm text-slate-300">
                    Conception de modèles NLP pour la détection sémantique d'anomalies de catalogues et l'analyse prédictive d'engagement client.
                  </p>
                </div>
              )}

              {activeModal === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase font-bold">
                    <FileText className="w-4 h-4" /> Blueprint Desk // EMSI & Career
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">Al Barid Bank & Formation EMSI</h3>
                  <div className="space-y-3">
                    {EXPERIENCES.map((exp) => (
                      <div key={exp.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div className="font-bold text-slate-200">{exp.role} - {exp.company}</div>
                        <p className="text-xs text-slate-400 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
