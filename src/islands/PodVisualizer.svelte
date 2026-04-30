<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { VARIANTS } from "../data/pods";
  import type { Variant } from "../data/pods";

  export let podId: string = "H";
  $: pod = VARIANTS.find(v => v.id === podId) ?? VARIANTS[0];
  $: if (pod && scene) rebuildPod();

  let container: HTMLDivElement;
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let raf = 0;
  let resizeObs: ResizeObserver | null = null;
  let podGroup: THREE.Group;
  let theta = 0;

  function hexToNum(hex: string) { return parseInt(hex.replace("#",""), 16); }

  function buildPod(p: Variant) {
    if (podGroup) { scene.remove(podGroup); podGroup.traverse(o => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); if (Array.isArray(o.material)) o.material.forEach(m=>m.dispose()); else o.material.dispose(); } }); }
    podGroup = new THREE.Group();
    const col = hexToNum(p.color);
    const colDim = hexToNum(p.color.slice(0,7) + "44".slice(0,2));

    // Main body cylinder
    const bodyGeo = new THREE.CylinderGeometry(p.diamM * 12, p.diamM * 12, p.lenM * 24, 32, 1, false);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0a1c30, emissive: 0x010810, metalness: 0.7, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    podGroup.add(body);

    // Nose cone
    const noseGeo = new THREE.ConeGeometry(p.diamM * 12, p.diamM * 20, 32);
    const noseMat = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.1, metalness: 0.5, roughness: 0.4 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.y = p.lenM * 12 + p.diamM * 10;
    podGroup.add(nose);

    // Tail cap
    const tailGeo = new THREE.CylinderGeometry(p.diamM * 10, p.diamM * 12, p.diamM * 8, 32);
    const tailMat = new THREE.MeshStandardMaterial({ color: 0x080f1c, metalness: 0.5, roughness: 0.5 });
    const tail = new THREE.Mesh(tailGeo, tailMat);
    tail.position.y = -(p.lenM * 12 + p.diamM * 4);
    podGroup.add(tail);

    // Payload zone highlight ring
    const ringGeo = new THREE.TorusGeometry(p.diamM * 12.5, 0.8, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.6 });
    [p.lenM * 8, 0, -p.lenM * 8].forEach(yOff => {
      if (Math.abs(yOff) <= p.lenM * p.payloadFrac * 12 + 2) {
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = yOff;
        podGroup.add(ring);
      }
    });

    // Axis label lines
    const lineMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.3 });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-p.diamM * 20, 0, 0), new THREE.Vector3(p.diamM * 20, 0, 0)
    ]);
    podGroup.add(new THREE.Line(lineGeo, lineMat));

    // Isolation cage for Manna-I/B (inner structure)
    if (p.id === "I" || p.id === "B") {
      const innerR = p.diamM * 8;
      const innerH = p.lenM * 18;
      const innerGeo = new THREE.CylinderGeometry(innerR, innerR, innerH, 16, 1, true);
      const innerMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.15, side: THREE.DoubleSide, wireframe: false });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      inner.position.y = 0;
      podGroup.add(inner);

      // Strut connections
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const strutPts = [
          new THREE.Vector3(Math.cos(angle) * p.diamM * 12, p.lenM * (i % 2 === 0 ? 6 : -6), Math.sin(angle) * p.diamM * 12),
          new THREE.Vector3(Math.cos(angle) * innerR, p.lenM * (i % 2 === 0 ? 4 : -4), Math.sin(angle) * innerR),
        ];
        const sGeo = new THREE.BufferGeometry().setFromPoints(strutPts);
        podGroup.add(new THREE.Line(sGeo, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.4 })));
      }
    }

    // Thermal blanket wrap for Manna-B
    if (p.id === "B") {
      const wrapGeo = new THREE.CylinderGeometry(p.diamM * 13, p.diamM * 13, p.lenM * 20, 32, 1, true);
      const wrapMat = new THREE.MeshBasicMaterial({ color: 0xffe066, transparent: true, opacity: 0.08, side: THREE.DoubleSide });
      podGroup.add(new THREE.Mesh(wrapGeo, wrapMat));
    }

    scene.add(podGroup);
  }

  function rebuildPod() { if (pod) buildPod(pod); }

  function init() {
    if (!container) return;
    const W = container.clientWidth, H = container.clientHeight;
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060d1a, 0.003);
    camera = new THREE.PerspectiveCamera(45, W / H, 0.5, 4000);
    camera.position.set(160, 40, 200);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x102030, 1.4));
    const key = new THREE.DirectionalLight(0xfff8e0, 2);
    key.position.set(200, 300, 200);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x004488, 0.6);
    fill.position.set(-200, -100, 100);
    scene.add(fill);

    // Blueprint grid ground
    const gridHelper = new THREE.GridHelper(800, 40, 0x1e488c, 0x0d2040);
    gridHelper.position.y = -120;
    scene.add(gridHelper);

    // Stars
    const sCount = 800;
    const sPos = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i*3] = (Math.random()-0.5)*3000; sPos[i*3+1]=(Math.random()-0.5)*3000; sPos[i*3+2]=(Math.random()-0.5)*3000;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ size: 1.5, color: 0x3a5880, transparent: true, opacity: 0.5 })));

    buildPod(pod);

    resizeObs = new ResizeObserver(() => {
      const W2 = container.clientWidth, H2 = container.clientHeight;
      camera.aspect = W2/H2; camera.updateProjectionMatrix(); renderer.setSize(W2,H2);
    });
    resizeObs.observe(container);
  }

  function tick() {
    theta += 0.005;
    if (podGroup) podGroup.rotation.y = theta;
    const cx = Math.cos(theta * 0.3) * 20;
    camera.position.set(160 + cx, 40, 200);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  onMount(() => { init(); raf = requestAnimationFrame(tick); });
  onDestroy(() => { cancelAnimationFrame(raf); resizeObs?.disconnect(); renderer?.dispose(); });
</script>

<div class="pod-vis-wrap">
  <div class="canvas-host" bind:this={container}></div>
  <div class="vis-label">
    <span class="vis-id" style="color:{pod.color}">{pod.name}</span>
    <span class="vis-desc">{pod.full} — ⌀{pod.diamM}m × {pod.lenM}m</span>
  </div>
</div>

<style>
.pod-vis-wrap { position:relative; border:1px solid #1e488c; border-radius:14px; overflow:hidden; background:#060d1a; aspect-ratio:4/3; }
.canvas-host { position:absolute; inset:0; }
.vis-label { position:absolute; bottom:14px; left:14px; display:flex; flex-direction:column; gap:2px; background:rgba(6,13,26,.8); border:1px solid #1e488c; border-radius:8px; padding:8px 14px; backdrop-filter:blur(6px); }
.vis-id { font-family:'Orbitron',monospace; font-size:14px; font-weight:700; }
.vis-desc { font-family:'Share Tech Mono',monospace; font-size:10px; color:#3a5880; }
</style>
