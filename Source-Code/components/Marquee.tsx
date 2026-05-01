"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
}

export default function Marquee({
  children,
  className = "",
  speed = 30,
  pauseOnHover = true,
  direction = "left",
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
    >
      <div
        className={`flex w-max gap-6 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
