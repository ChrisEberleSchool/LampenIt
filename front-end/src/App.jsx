import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UnderConstruction from './components/UnderConstruction.jsx';

function Home() {
  return <UnderConstruction />;
}

function NotFound() {
  return <UnderConstruction />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
