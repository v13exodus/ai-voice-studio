import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Workspace from './components/Workspace';

const App: React.FC = () => {
  const [showWorkspace, setShowWorkspace] = useState(false);

  useEffect(() => {
    // Check for a persistent guest session ID
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

  return (
    <>
      {showWorkspace ? <Workspace /> : <WelcomeScreen onStart={handleStart} />}
    </>
  );
};

export default App;
