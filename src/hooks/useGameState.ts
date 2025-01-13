import { useState } from "react";

const CONTAINER_WIDTH = 1024;
const CONTAINER_HEIGHT = 768;
const ENTITY_WIDTH = 64;
const ENTITY_HEIGHT = 64;

const useGameState = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [fuel, setFuel] = useState(10);
  const [time, setTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [aircraftPosition, setAircraftPosition] = useState({
    x: 0,
    y: Math.floor(CONTAINER_HEIGHT / 2),
  });
  const [starPosition, setStarPosition] = useState({
    x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
    y: 0,
  });
  const [parachutePosition, setParachutePosition] = useState({
    x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
    y: 0,
  });
  const [birdPosition, setBirdPosition] = useState({
    x: CONTAINER_WIDTH,
    y: Math.floor(Math.random() * (CONTAINER_HEIGHT - ENTITY_HEIGHT)),
  });

  const handlePauseToggle = () => setIsPaused((prev) => !prev);

  const handleRestart = () => {
    setIsPaused(false);
    setFuel(10);
    setTime(0);
    setStars(0);
    setGameOver(false);
    setAircraftPosition({ x: 0, y: Math.floor(CONTAINER_HEIGHT / 2) });
    setStarPosition({
      x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
      y: 0,
    });
    setBirdPosition({
      x: CONTAINER_WIDTH,
      y: Math.floor(Math.random() * (CONTAINER_HEIGHT - ENTITY_HEIGHT)),
    });
    setParachutePosition({
      x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
      y: 0,
    });
  };

  return {
    isPaused,
    fuel: { get: () => fuel, add: (value: number) => setFuel((prev) => prev + value) },
    stars: { get: () => stars, increment: () => setStars((prev) => prev + 1) },
    time: { get: () => time, update: (value: number) => setTime(value) },
    gameOver: { get: () => gameOver, set: setGameOver },
    aircraftPosition: { get: () => aircraftPosition, update: setAircraftPosition },
    starPosition: { get: () => starPosition, reset: () => setStarPosition({
      x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
      y: -ENTITY_HEIGHT,
    }) },
    parachutePosition: { get: () => parachutePosition, reset: () => setParachutePosition({
      x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
      y: -ENTITY_HEIGHT,
    }) },
    birdPosition: { get: () => birdPosition, update: setBirdPosition },
    handlePauseToggle,
    handleRestart,
  };
};

export default useGameState;