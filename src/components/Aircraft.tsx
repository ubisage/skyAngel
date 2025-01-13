"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AircraftProps {
  position: { x: number; y: number };
}

const Aircraft = forwardRef<HTMLDivElement, AircraftProps>(
  ({ position }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="absolute w-fit h-fit bg-transparent rounded-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <Image src={"/aircraft.png"} alt="aircraft" width={112} height={112} />
      </motion.div>
    );
  }
);

Aircraft.displayName = "Aircraft";
export default Aircraft;
