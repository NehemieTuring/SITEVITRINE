import { useState, useEffect } from 'react';

const useMouseIdle = (timeout: number = 4000) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer: any;
    const startTimer = () => {
      timer = setTimeout(() => {
        setIsIdle(true);
      }, timeout);
    };

    const handleInteraction = () => {
      setIsIdle(false);
      clearTimeout(timer);
      startTimer();
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    startTimer();

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      clearTimeout(timer);
    };
  }, [timeout]);

  return isIdle;
};

export default useMouseIdle;
