import React from 'react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}
