// src/components/SplashScreen.js
import React, {useState } from 'react';
import { useEffect } from 'react';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return null;

  return (
    <div className='h-screen flex items-center justify-center bg-gold'>
      <img src='./src/assets/images/logo.svg' alt="logo" className='h-48' />
    </div>
  );
};

export default SplashScreen;
