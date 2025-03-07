"use client";

import React, { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnterLink = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest("button")
      ) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousemove", handleMouseEnterLink);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousemove", handleMouseEnterLink);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        a,
        button,
        [role="button"] {
          cursor: none;
        }
      `}</style>
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/* Outer cursor */}
        <div
          className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${clicked ? "scale-90" : "scale-100"} ${linkHovered ? "w-10 h-10 bg-purple-500/20" : "w-8 h-8 bg-purple-500/10"}`}
          style={{
            backdropFilter: "blur(1px)",
            border: "1px solid rgba(157, 78, 221, 0.3)",
          }}
        ></div>

        {/* Inner cursor */}
        <div
          className={`absolute w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${clicked ? "scale-150" : "scale-100"} ${linkHovered ? "scale-150 bg-purple-300" : ""}`}
        ></div>
      </div>
    </>
  );
};

export default CustomCursor;
