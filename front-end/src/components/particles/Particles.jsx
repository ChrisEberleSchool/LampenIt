import { useEffect, useRef } from "react";
import styles from "./Particles.module.css";

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const mouse = { x: null, y: null };
    let particles = [];
    const particleCount = 150;
    const maxDistance = 175;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;

      canvas.style.width = cssWidth + "px";
      canvas.style.height = cssHeight + "px";

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = 2.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= window.innerWidth) this.vx *= -1;
        if (this.y <= 0 || this.y >= window.innerHeight) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle =
              "rgba(255,255,255," + (1 - dist / maxDistance) + ")";
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const dxm = p.x - mouse.x;
          const dym = p.y - mouse.y;
          const distM = Math.sqrt(dxm * dxm + dym * dym);

          if (distM < maxDistance) {
            // --- draw line ---
            ctx.beginPath();
            ctx.strokeStyle =
              "rgba(255,255,255," + (1 - distM / maxDistance) + ")";
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          
            // --- apply repulsion force ---
            const forceStrength = (maxDistance - distM) / maxDistance; // 0 → 1
            const force = forceStrength * 0.5; // damping factor (lower = slower)
          
            // Push particle away from mouse
            p.vx += (dxm / distM) * force;
            p.vy += (dym / distM) * force;
          
            // Limit maximum velocity
            const maxSpeed = 1.0;
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > maxSpeed) {
              p.vx = (p.vx / speed) * maxSpeed;
              p.vy = (p.vy / speed) * maxSpeed;
            }
          }
        }

      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particlesCanvas}></canvas>;
}
