'use client'
import { connectToMongoDB } from "@/lib/db";
import { motion } from "framer-motion";
import Link from 'next/link';

const Home: React.FC = () => {

  try {
    connectToMongoDB();
  } catch (error) {
    alert((error as Error)?.message)
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <motion.h1
        className="text-4xl text-white font-bold mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        Welcome to SKY ANGEL
      </motion.h1>
      <Link href="/game"
        className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:scale-110"
      >
        Start Game
      </Link>
    </div>
  );
};

export default Home;
