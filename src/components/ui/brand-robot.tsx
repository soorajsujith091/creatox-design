"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function BrandRobot() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [moving, setMoving] = useState(true);
  const enabled = useRef(true);
  useEffect(() => { enabled.current = moving; }, [moving]);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch { setFailed(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
    camera.position.set(0, .35, 9.2);
    camera.lookAt(0, .25, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x303036, 3));
    const light = new THREE.DirectionalLight(0xffffff, 5); light.position.set(-3, 5, 5); scene.add(light);
    const redLight = new THREE.PointLight(0xe4002b, 18, 12); redLight.position.set(3, 1, 2); scene.add(redLight);
    const white = new THREE.MeshStandardMaterial({ color: 0x85858f, metalness: .85, roughness: .18 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x070708, metalness: .6, roughness: .2 });
    const red = new THREE.MeshStandardMaterial({ color: 0xe4002b, metalness: .5, roughness: .2, emissive: 0x6b0015, emissiveIntensity: .5 });
    const glow = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const bot = new THREE.Group(); scene.add(bot);
    function sphere(parent: THREE.Object3D, material: THREE.Material, x: number, y: number, z: number, sx: number, sy = sx, sz = sx) {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 32), material);
      mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz); parent.add(mesh); return mesh;
    }
    function ring(parent: THREE.Object3D, material: THREE.Material, x: number, y: number, z: number, radius: number, tube: number) {
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 16, 64), material); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
    }
    const head = new THREE.Group(); head.position.y = .95; bot.add(head);
    sphere(head, white, 0, 0, 0, .8, .75, .63);
    sphere(head, dark, 0, .01, .45, .61, .55, .23);
    ring(head, red, 0, .01, .58, .58, .035).scale.y = .93;
    sphere(head, red, -.82, 0, 0, .12, .3, .3); sphere(head, red, .82, 0, 0, .12, .3, .3);
    // Curved luminous eyes and smile, made from real tube geometry.
    function curve(points: THREE.Vector3[], parent: THREE.Object3D, radius = .024) {
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 32, radius, 8, false), glow); parent.add(mesh);
    }
    [-.23, .23].forEach(x => curve([new THREE.Vector3(x - .09, .06, .674), new THREE.Vector3(x - .07, .18, .685), new THREE.Vector3(x + .07, .18, .685), new THREE.Vector3(x + .09, .06, .674)], head));
    curve([new THREE.Vector3(-.18, -.16, .68), new THREE.Vector3(0, -.26, .70), new THREE.Vector3(.18, -.16, .68)], head);
    sphere(bot, dark, 0, .13, 0, .22, .18, .22);
    sphere(bot, white, 0, -.47, 0, .53, .68, .38);
    ring(bot, red, 0, -.35, .36, .16, .045); sphere(bot, dark, 0, -.35, .36, .12, .12, .04);
    // Illuminated AI core and antenna give the character a technical finish.
    const core = new THREE.MeshBasicMaterial({ color: 0xff204a });
    sphere(bot, core, 0, -.35, .41, .065, .065, .025);
    sphere(head, dark, 0, .82, 0, .035, .13, .035);
    sphere(head, core, 0, .97, 0, .055);
    [-.15, 0, .15].forEach(x => sphere(bot, core, x, -.69, .34, .025, .025, .015));
    const orbit = ring(bot, red, 0, -1.28, 0, .66, .012);
    orbit.rotation.x = Math.PI / 2;
    sphere(bot, red, 0, -1.05, 0, .28, .13, .26);
    const arm = new THREE.Group(); arm.position.set(-.48, -.04, 0); bot.add(arm);
    sphere(arm, dark, -.27, .04, 0, .32, .09, .09);
    sphere(arm, white, -.53, .08, 0, .23, .2, .19);
    sphere(arm, dark, -.76, .14, 0, .15, .13, .1);
    for (let i = 0; i < 4; i++) sphere(arm, dark, -.89, .02 + i * .09, .015, .14, .034, .036);
    sphere(bot, dark, .6, -.35, 0, .09, .28, .09);
    sphere(bot, white, .65, -.65, 0, .16, .23, .17);
    sphere(bot, dark, .66, -.9, .04, .12, .15, .09);
    let frame = 0, visible = true;
    const pointer = { x: 0, y: 0 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / Math.max(h, 1); camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(el); resize();
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(el);
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); pointer.x = (e.clientX - r.left) / r.width - .5; pointer.y = (e.clientY - r.top) / r.height - .5; };
    const leave = () => { pointer.x = 0; pointer.y = 0; };
    el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      const animated = enabled.current && !reduced.matches;
      const t = time / 1000;
      bot.position.y = animated ? Math.sin(t * 1.7) * .08 : 0;
      bot.rotation.y += ((animated ? pointer.x * .6 : 0) - bot.rotation.y) * .07;
      head.rotation.x += ((animated ? pointer.y * .18 : 0) - head.rotation.x) * .07;
      arm.rotation.z = animated ? -.25 + Math.sin(t * 2.3) * .18 : -.25;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
      el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave);
      scene.traverse(o => { if (o instanceof THREE.Mesh) o.geometry.dispose(); });
      [white, dark, red, glow, core].forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div className="agency-robot-wrap">
    <div ref={host} className="agency-robot" role="img" aria-label="Interactive 3D Creatox greeting robot with red accents"/>
    {failed ? <p className="agency-robot-note">Hello from Creatox.</p> : <button type="button" className="agency-robot-toggle" onClick={() => setMoving(!moving)} aria-pressed={!moving}>{moving ? "Pause robot" : "Animate robot"}</button>}
  </div>;
}
