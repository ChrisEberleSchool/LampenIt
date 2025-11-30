import React from 'react';
import styles from './Home.module.css';
import backgroundImage from '../../assets/space.png';
import Particles from '../../components/particles/Particles';

export default function Home() {
  return (
    <div
      className={styles.parallaxContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Particles />   {/* <-- Move here so it's above the background */}

      <div className={styles.overlayText}>
        <h1>Under Construction</h1>
        <p>Switching to fully self-hosted model</p>
      </div>
    </div>
  );
}
