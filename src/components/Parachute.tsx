"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ParachuteProps {
  position: { x: number; y: number };
}

const Parachute = forwardRef<HTMLDivElement, ParachuteProps>(
  ({ position }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="absolute w-16 h-16 bg-transparent mix-blend-darken rounded-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <Image src={"/parachute.jpg"} alt="Parachute" width={64} height={64} />
      </motion.div>
    );
  }
);

Parachute.displayName = "Parachute";
export default Parachute;
