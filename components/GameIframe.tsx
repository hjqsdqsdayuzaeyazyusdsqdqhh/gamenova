"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  url: string;
  title: string;
}

export function isValidIframe(url: string): boolean {
  if (!url || !url.startsWith("https://")) return false;
  if (url.includes("gamemonetize")) return true;
  return url.startsWith("https://html5.gamedistribution.com/rvvASMiM/") && url.endsWith("/index.html");
}

export default function GameIframe({ url, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const isValid = url && url.length >= 10 && isValidIframe(url);

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

  const handleReload = () => {
    setHasError(false);
    setIsLoading(true);
    setStuck(false);
    setReloadKey((k) => k + 1);
  };

  const handleIframeLoad = () => {
    console.log(`[GameNova] iframe loaded: ${title} | ${url}`);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(`[GameNova] loading game: ${title} | ${url}`);
    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn(`[GameNova] iframe stuck: ${title}`);
        setStuck(true);
        setHasError(true);
        setIsLoading(false);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [isLoading, reloadKey, title, url]);

  if (!isValid) {
    return (
      <div className="w-full min-h-[700px] bg-black rounded-2xl border border-white/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-400 font-semibold">Game not available</p>
          <p className="text-gray-600 text-sm mt-1">Invalid or missing game source</p>
        </div>
      </div>
    );
  }

  const iframeSrc = url;

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-2xl overflow-hidden border border-white/5 flex ${
        isFullscreen ? "w-screen h-screen" : "w-full min-h-[700px]"
      }`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black z-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading game...</p>
          </div>
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 bg-black z-20 flex items-center justify-center">
          <div className="text-center max-w-sm mx-auto px-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-400 font-semibold">
              {stuck ? "Game not available here" : "Game not available"}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {stuck
                ? "This game may be blocked or unavailable for embedding. Try another game."
                : "The game failed to load. Try again."}
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={handleReload}
                className="px-4 py-2 glass rounded-xl text-accent text-sm hover:bg-accent/10 transition"
              >
                Retry
              </button>
              {stuck && (
                <Link
                  href="/games"
                  className="px-4 py-2 bg-accent text-dark font-semibold rounded-xl text-sm hover:opacity-90 transition"
                >
                  Try another game
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <iframe
          key={reloadKey}
          ref={iframeRef}
          src={iframeSrc}
          title={title}
          width="100%"
          height="700px"
          style={{ border: "none", width: "100%", height: "700px" }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; gamepad; storage-access"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={() => {
            console.error(`[GameNova] iframe error: ${title}`);
            setHasError(true);
          }}
        />
      )}

      {!hasError && (
        <div className="absolute top-4 right-4 z-30 flex gap-2">
          <button
            onClick={handleReload}
            className="glass text-white px-3 py-2 rounded-xl hover:bg-accent hover:text-dark transition-all flex items-center gap-2 text-sm"
            title="Reload game"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Reload</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="glass text-white px-3 py-2 rounded-xl hover:bg-accent hover:text-dark transition-all flex items-center gap-2 text-sm"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
