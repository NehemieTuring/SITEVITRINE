import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Maximize, Settings, X } from 'lucide-react';
import useMouseIdle from '../../hooks/useMouseIdle';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UniversalPlayerProps {
  src: string;
  poster?: string;
  type?: 'audio' | 'video';
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

const UniversalPlayer: React.FC<UniversalPlayerProps> = ({ 
  src, 
  poster, 
  type = 'video', 
  title, 
  subtitle,
  onClose 
}) => {
  const videoRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const isIdle = useMouseIdle(4000);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative rounded-xl overflow-hidden group bg-black shadow-2xl transition-all duration-300",
        type === 'audio' ? "h-auto py-8 px-6 border border-white/10" : "aspect-video"
      )}
    >
      {type === 'video' ? (
        <video 
          ref={videoRef as any}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
        />
      ) : (
        <div className="flex flex-col items-center">
          <audio 
            ref={videoRef as any}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-brand to-accent flex items-center justify-center p-4">
             <div className={cn("w-full h-full rounded-full border-4 border-white/20 flex items-center justify-center", isPlaying && "animate-spin-slow")}>
                {type === 'audio' ? <Volume2 size={40} className="text-white" /> : null}
             </div>
          </div>
          <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/60 mb-6">{subtitle}</p>
        </div>
      )}

      {/* Overlay controls - auto hide */}
      <AnimatePresence>
        {(!isIdle || !isPlaying) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="text-white">
                {type === 'video' && (
                  <>
                    <h3 className="font-bold text-lg drop-shadow-md">{title}</h3>
                    <p className="text-sm text-white/70">{subtitle}</p>
                  </>
                )}
              </div>
              {onClose && (
                <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md">
                   <X size={20} />
                </button>
              )}
            </div>

            <div className="flex flex-col space-y-4">
               {/* Progress bar */}
               <div className="relative w-full h-1 group/progress cursor-pointer">
                  <input 
                    type="range" 
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full bg-accent transition-all duration-150" style={{ width: `${progress}%` }} />
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-white">
                     <button onClick={togglePlay} className="p-2 transition-transform hover:scale-110">
                        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                     </button>
                     <div className="flex items-center space-x-4">
                        <Volume2 size={20} />
                        <input 
                           type="range" 
                           min="0"
                           max="1"
                           step="0.01"
                           value={volume}
                           onChange={(e) => {
                             const v = parseFloat(e.target.value);
                             setVolume(v);
                             if (videoRef.current) videoRef.current.volume = v;
                           }}
                           className="w-20 h-1 rounded-full appearance-none bg-white/20 cursor-pointer"
                        />
                     </div>
                     <span className="text-sm font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-white">
                     <button className="p-2 text-white/50 hover:text-white transition-colors"><Settings size={20} /></button>
                     {type === 'video' && (
                        <button onClick={toggleFullscreen} className="p-2 hover:text-accent transition-colors">
                           <Maximize size={20} />
                        </button>
                     )}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play button overlay when idle and paused */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-20 h-20 rounded-full bg-accent/40 backdrop-blur-md flex items-center justify-center pointer-events-auto cursor-pointer" onClick={togglePlay}>
             <Play size={40} className="text-white fill-white ml-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalPlayer;
