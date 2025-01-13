"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface StarProps {
  position: { x: number; y: number };
}

const Star = forwardRef<HTMLDivElement, StarProps>(({ position }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="absolute w-16 h-16 bg-transparent  rounded-full"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <Image src={"/star.svg"} alt="Star" width={64} height={64} />
    </motion.div>
  );
});

Star.displayName = "Star";
export default Star;
