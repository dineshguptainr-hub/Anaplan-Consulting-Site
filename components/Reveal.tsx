"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Extra delay in ms, for staggering siblings. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper: fades and lifts its children the first time they
 * enter the viewport, then stops observing. Renders children fully visible
 * immediately when the visitor prefers reduced motion.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0) scale(1)" : "translateY(42px) scale(0.97)",
        transition:
          "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
