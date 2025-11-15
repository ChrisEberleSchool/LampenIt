import React from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <main>
      <Outlet /> {/* Child pages render here */}
    </main>
  );
}
