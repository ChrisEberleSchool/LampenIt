import React, { useState } from 'react';
import styles from './Home.module.css';
import backgroundImage from '../../assets/space.png';

export default function Home() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setOffset({ x, y });
  };

  return (
    <div
      className={styles.parallaxContainer}
      onMouseMove={handleMouseMove}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={styles.overlayText}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <h1>Under Construction</h1>
        <p>Switching to fully self-hosted model</p>
      </div>
    </div>
  );
}
