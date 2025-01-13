"use client";
import { motion } from "framer-motion";
import Form from "./Form";
import { useState } from "react";

interface GameOverProps {
  onRestart: () => void;
  time: number;
  stars: number;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart, time, stars }) => {
  const [rank, setRank] = useState(-1);

  return (
    <motion.div
      className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          duration: 1.5,
        }}
      >
        <motion.h1
          className="text-6xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          GAME OVER
        </motion.h1>
          {/* Show details and restart button  */}
        {rank>-1 && (
          <>
            <motion.button
              className="px-6 py-3 bg-red-600 rounded-lg shadow-lg text-xl font-semibold hover:bg-red-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRestart}
            >
              Restart
            </motion.button>
            <div>
              You rank is <span className="text-xl">{rank}</span>
            </div>
          </>
        )}
        {/* Show form when u dont have a rank  */}
        {!(rank>-1) && <Form stars={stars} time={time} setRank={setRank} />}

        <motion.div
          className="mt-10 text-lg text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 1,
            ease: "easeOut",
          }}
        >
          Thanks for playing!
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default GameOver;
