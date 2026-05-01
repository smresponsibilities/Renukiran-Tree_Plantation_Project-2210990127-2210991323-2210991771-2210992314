"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";


interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
  glare?: boolean;
}
  
// Component for tilt card effect
export default function TiltCard({ children, className = "", tiltDegree = 4, glare = true }: TiltCardProps) {
  const ngo_ref = useRef<HTMLDivElement>(null);
  const [ngo_transform, setNgoTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const ngo_handleMouseMove = (e: React.MouseEvent) => {
    if (!ngo_ref.current) return;
    const ngo_rect = ngo_ref.current.getBoundingClientRect();
    const ngo_x = (e.clientX - ngo_rect.left) / ngo_rect.width;
    const ngo_y = (e.clientY - ngo_rect.top) / ngo_rect.height;
    setNgoTransform({
      rotateX: (ngo_y - 0.5) * -tiltDegree * 2,
      rotateY: (ngo_x - 0.5) * tiltDegree * 2,
      glareX: ngo_x * 100,
      glareY: ngo_y * 100,
    });
  };

  const ngo_handleMouseLeave = () => {
    setNgoTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <motion.div
      ref={ngo_ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={ngo_handleMouseMove}
      onMouseLeave={ngo_handleMouseLeave}
      animate={{
        rotateX: ngo_transform.rotateX,
        rotateY: ngo_transform.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${ngo_transform.glareX}% ${ngo_transform.glareY}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)`,
            opacity: ngo_transform.rotateX !== 0 || ngo_transform.rotateY !== 0 ? 1 : 0,
          }}
        />
      )}
    </motion.div>
  );
}
