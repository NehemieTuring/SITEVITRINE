import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/assets/studio-1.png',
  '/assets/studio-2.png',
  '/assets/studio-3.png',
  '/assets/studio-4.png'
];

const ImageSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Win concept Music Studio"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-brand/20 pointer-events-none" />
      
      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === i
                ? 'bg-white w-6 scale-110 shadow-lg'
                : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
