"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  url: string;
  title: string;
}

export default function GameIframe({ url, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isPlaceholder = url.includes("example.com");

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await containerRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-2xl overflow-hidden border border-white/5 ${
        isFullscreen ? "w-screen h-screen" : "w-full aspect-video"
      }`}
    >
      {isPlaceholder && (
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-card to-dark flex items-center justify-center z-20 flex-col gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center animate-pulse-slow">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white font-semibold text-lg">{title}</p>
            <p className="text-gray-500 text-sm mt-1">
              Connect a real game provider to start playing
            </p>
          </div>
        </div>
      )}

      {!isPlaceholder && isLoading && (
        <div className="absolute inset-0 bg-dark z-10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {shouldLoad && (
        <iframe
          src={url}
          title={title}
          className={`w-full h-full ${isPlaceholder ? "opacity-0" : ""}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      )}

      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-30 glass text-white px-3 py-2 rounded-xl hover:bg-accent hover:text-dark transition-all flex items-center gap-2 text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        {isFullscreen ? "Exit" : "Fullscreen"}
      </button>
    </div>
  );
}
