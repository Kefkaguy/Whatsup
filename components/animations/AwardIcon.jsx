"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function AwardIcon({ size = 80 }) {
  return (
    <motion.div
      className="text-[#D0FE1D]"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
    >
      <Award size={size} strokeWidth={1.5} />
    </motion.div>
  );
}
