"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  distance?: string;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  distance = "20px",
  once = true,
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial styles
    let initialTransform = "";
    switch (direction) {
      case "up":
        initialTransform = `translateY(${distance})`;
        break;
      case "down":
        initialTransform = `translateY(-${distance})`;
        break;
      case "left":
        initialTransform = `translateX(${distance})`;
        break;
      case "right":
        initialTransform = `translateX(-${distance})`;
        break;
      case "none":
        initialTransform = "scale(0.95)";
        break;
    }

    element.style.opacity = "0";
    element.style.transform = initialTransform;
    element.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
    element.style.transitionDelay = `${delay}s`;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0) translateX(0) scale(1)";
          hasAnimated.current = true;

          // Disconnect observer if animation should only happen once
          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!entry.isIntersecting && !once && hasAnimated.current) {
          element.style.opacity = "0";
          element.style.transform = initialTransform;
          hasAnimated.current = false;
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px",
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [delay, direction, distance, duration, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
