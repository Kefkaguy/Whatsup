"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ConfettiBurst({ count = 20, size = 8 }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 2;
        const color = `hsl(${Math.floor(Math.random() * 360)},90%,60%)`;
        return (
          <motion.div
            key={i}
            className="absolute top-0 rounded-full"
            style={{ left: `${x}%`, width: size, height: size, backgroundColor: color }}
            initial={{ y: "-10%", rotate: 0 }}
            animate={{ y: "110%", rotate: 360 }}
            transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
