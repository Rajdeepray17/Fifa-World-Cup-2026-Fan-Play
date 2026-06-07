import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';

/**
 * IntroVideo — Fullscreen FIFA intro video.
 * - Exposes a `play()` method via ref so the parent can trigger playback
 *   after a user gesture (required by browsers to allow audio).
 * - Freezes on final frame when ended.
 * - Calls `onVideoEnd` when playback finishes.
 * - Audio is NOT muted.
 */
const IntroVideo = forwardRef(function IntroVideo({ onVideoEnd }, ref) {
  const videoRef = useRef(null);
  const [hasEnded, setHasEnded] = useState(false);

  /* Expose play() to parent */
  useImperativeHandle(ref, () => ({
    play: () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      const p = video.play();
      if (p) {
        p.catch(() => {
          // Last resort: play muted, then unmute shortly after
          video.muted = true;
          video.play().then(() => {
            setTimeout(() => { video.muted = false; }, 200);
          }).catch(() => {});
        });
      }
    },
    skip: () => {
      const video = videoRef.current;
      if (!video) return;
      // Seek to the end of the video
      video.currentTime = video.duration || 999;
    },
  }));

  /* Listen for video end */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setHasEnded(true);
      video.pause(); // freeze on final frame
      if (onVideoEnd) onVideoEnd();
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [onVideoEnd]);

  return (
    <motion.div
      className="video-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <video
        ref={videoRef}
        src="/assets/videos/FIFA Intro.mp4"
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ objectPosition: 'center center' }}
      />

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </motion.div>
  );
});

export default IntroVideo;
