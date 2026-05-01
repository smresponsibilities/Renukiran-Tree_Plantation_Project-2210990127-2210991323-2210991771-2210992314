"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

// simple counter
export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const [ngo_count, setNgoCount] = useState(0);
  const ngo_ref = useRef<HTMLSpanElement>(null);
  const ngo_isInView = useInView(ngo_ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!ngo_isInView) return;

    let ngo_startTime: number;
    const ngo_animate = (timestamp: number) => {
      if (!ngo_startTime) ngo_startTime = timestamp;
      const ngo_progress = Math.min((timestamp - ngo_startTime) / (duration * 1000), 1);
      const ngo_eased = 1 - Math.pow(1 - ngo_progress, 3);
      setNgoCount(Math.floor(ngo_eased * end));
      if (ngo_progress < 1) {
        requestAnimationFrame(ngo_animate);
      } else {
        setNgoCount(end);
      }
    };
    requestAnimationFrame(ngo_animate);
  }, [ngo_isInView, end, duration]);

  return (
    <motion.span
      ref={ngo_ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={ngo_isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{ngo_count.toLocaleString()}{suffix}
    </motion.span>
  );
}
