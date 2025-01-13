import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BirdProps {
  position: { x: number; y: number };
}

const Bird = forwardRef<HTMLDivElement, BirdProps>(({ position }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="absolute w-16 h-16 bg-transparent mix-blend-darken  rounded-full"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <Image
        src={"/bird.jpg"}
        alt="Bird"
        width={64}
        height={64}
        style={{ transform: `scaleX(-1)` }}
      />
    </motion.div>
  );
});

Bird.displayName = "Bird";
export default Bird;
