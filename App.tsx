import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Workspace from './components/Workspace';

const App: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    setHasMounted(true);
    const userId = localStorage.getItem('anonymousUserId');
    if (userId) {
      setShowWorkspace(true);
    }
  }, []);

  const handleStart = () => {
    // Create a guest session ID if one doesn't exist
    let userId = localStorage.getItem('anonymousUserId');
    if (!userId) {
      userId = `guest_${new Date().getTime()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem('anonymousUserId', userId);
    }
    setShowWorkspace(true);
  };

  // On the server and during the initial client render, render nothing.
  // This prevents a mismatch between server and client content, fixing the hydration error.
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {showWorkspace ? <Workspace /> : <WelcomeScreen onStart={handleStart} />}
    </>
  );
};

export default App;
