"use client";

const CONTAINER_WIDTH = 1024;
const CONTAINER_HEIGHT = 768;
const ENTITY_WIDTH = 64;
const ENTITY_HEIGHT = 64;
const SPEED = 8;

import { useState, useEffect, useRef } from "react";
import Aircraft from "@/components/Aircraft";
import Bird from "@/components/Bird";
import Parachute from "@/components/Parachute";
import Star from "@/components/Star";
import PauseButton from "@/components/PauseButton";
import Clouds from "@/components/Clouds";
import GameOver from "@/components/Gameover";
import HUD from "@/components/HUD";

const Game: React.FC = () => {

    
  const [isPaused, setIsPaused] = useState(false);
  const [fuel, setFuel] = useState(10);
  const [time, setTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const aircraftRef = useRef<HTMLDivElement | null>(null);
  const starRef = useRef<HTMLDivElement | null>(null);
  const parachuteRef = useRef<HTMLDivElement | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<HTMLDivElement | null>(null);
  const [aircraftPosition, setAircraftPosition] = useState({
    x: 0,
    y: Math.floor(CONTAINER_HEIGHT / 2),
  });
 const [starPosition, setStarPosition] = useState({
    x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
    y: 0,
  });
  const [birdPosition, setBirdPosition] = useState({
    x: CONTAINER_WIDTH,
    y: Math.floor(Math.random() * (CONTAINER_HEIGHT - ENTITY_HEIGHT)),
  });
  const [parachutePosition, setParachutePosition] = useState({
    x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
    y: 0,
  });

  const container = gameContainerRef?.current?.getBoundingClientRect();

  // Handle Game Over
  useEffect(() => {
    if (fuel <= 0) setGameOver(true);
  }, [fuel]);

  // Timer and Fuel Decrease
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused && !gameOver) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
        setFuel((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, gameOver]);

  // Handle Keyboard Events for Aircraft Movement
  useEffect(() => {
    const keysPressed = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
        
        if (e.key === " " && !gameOver) {
            e.preventDefault()
            setIsPaused((prev) => !prev);
            return; 
          }
      
      if (
        isPaused ||
        gameOver ||
        !gameContainerRef.current ||
        !aircraftRef.current
      )
        return;

      keysPressed.add(e.key);

      const step = 20; // Movement step size
      const container = gameContainerRef.current.getBoundingClientRect();
      const aircraft = aircraftRef.current.getBoundingClientRect();
      const maxX = container.width - aircraft.width;
      const maxY = container.height - aircraft.height;

      setAircraftPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysPressed.has("ArrowUp")) newY = Math.max(prev.y - step, 0);
        if (keysPressed.has("ArrowDown")) newY = Math.min(prev.y + step, maxY);
        if (keysPressed.has("ArrowLeft")) newX = Math.max(prev.x - step, 0);
        if (keysPressed.has("ArrowRight")) newX = Math.min(prev.x + step, maxX);

        return { x: newX, y: newY };
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPaused, gameOver]);


  // Collision Logic
  useEffect(() => {
    const detectCollisions = () => {
      if (birdRef.current && aircraftRef.current) {
        const aircraftRect = aircraftRef.current.getBoundingClientRect();
        const birdRect = birdRef.current.getBoundingClientRect();
        if (
          aircraftRect.left < birdRect.right &&
          aircraftRect.right > birdRect.left &&
          aircraftRect.top < birdRect.bottom &&
          aircraftRect.bottom > birdRect.top
        ) {
          setGameOver(true);
        }
      }
      if (aircraftRef.current && starRef.current) {
        const aircraftRect = aircraftRef.current.getBoundingClientRect();
        const starRect = starRef.current.getBoundingClientRect();
        if (
          aircraftRect.left < starRect.right &&
          aircraftRect.right > starRect.left &&
          aircraftRect.top < starRect.bottom &&
          aircraftRect.bottom > starRect.top
        ) {
          setStars((prev) => prev + 1);
          setStarPosition({
            x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
            y: -ENTITY_HEIGHT,
          });
        }
      }
      if (aircraftRef.current && parachuteRef.current) {
        const aircraftRect = aircraftRef.current.getBoundingClientRect();
        const parachuteRect = parachuteRef.current.getBoundingClientRect();
        if (
          aircraftRect.left < parachuteRect.right &&
          aircraftRect.right > parachuteRect.left &&
          aircraftRect.top < parachuteRect.bottom &&
          aircraftRect.bottom > parachuteRect.top
        ) {
          setFuel((prev) => prev + 10);
          setParachutePosition({
            x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
            y: -ENTITY_HEIGHT,
          });
        }
      }
    };

    const interval = setInterval(detectCollisions, 100);
    return () => clearInterval(interval);
  }, [aircraftPosition, isPaused, gameOver]);

//   Animation logic for Star 
  useEffect(() => {
    let starTimer: NodeJS.Timeout;
    if (isPaused) return;
    if (container?.bottom && starPosition.y < container.bottom) {
      starTimer = setInterval(() => {
        setStarPosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + SPEED,
        }));
      }, 24);
      return () => clearInterval(starTimer);
    } else {
      setStarPosition({
        x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
        y: -ENTITY_HEIGHT,
      });
    }
  }, [isPaused, starPosition, container?.bottom]);

  //   Animation logic for Parachute
  useEffect(() => {
    let parachuteTimer: NodeJS.Timeout;
    if (isPaused) return;
    if (container?.bottom && parachutePosition.y < container.bottom) {
      parachuteTimer = setInterval(() => {
        setParachutePosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + SPEED,
        }));
      }, 24);
      return () => clearInterval(parachuteTimer);
    } else {
      setParachutePosition({
        x: Math.floor(Math.random() * (CONTAINER_WIDTH - ENTITY_WIDTH)),
        y: -ENTITY_HEIGHT,
      });
    }
  }, [isPaused, parachutePosition, container?.bottom]);

  //   Animation logic for Bird
  useEffect(() => {
    let birdTimer: NodeJS.Timeout;
    if (!birdRef.current) return;
    if (isPaused) return;
    const birdRect = birdRef.current.getBoundingClientRect();
    if (container?.left && birdRect.right > container.left) {
      birdTimer = setInterval(() => {
        setBirdPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x - SPEED,
        }));
      }, 24);
      return () => clearInterval(birdTimer);
    } else {
      setBirdPosition({
        x: CONTAINER_WIDTH,
        y: Math.floor(Math.random() * (CONTAINER_HEIGHT - ENTITY_HEIGHT)),
      });
    }
  }, [isPaused, birdPosition, container?.left]);

  const handlePauseToggle = () => setIsPaused(!isPaused);

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

  return (
    <div className="relative w-screen h-screen bg-blue-500 overflow-hidden flex items-center justify-center">
      {/* Game Container */}
      <div
        ref={gameContainerRef}
        className="relative w-[1024px] h-[768px] bg-sky-500 overflow-hidden"
      >
        {!gameOver && (
          <>
            <Aircraft ref={aircraftRef} position={aircraftPosition} />
            <Clouds />
            <Bird ref={birdRef} position={birdPosition} />
            <Parachute ref={parachuteRef} position={parachutePosition} />
            <Star ref={starRef} position={starPosition} />
            <HUD time={time} stars={stars} fuel={fuel} />
            <PauseButton onPause={handlePauseToggle} isPaused={isPaused} />
          </>
        )}

        {/* Pause Button */}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <GameOver onRestart={handleRestart} time={time} stars={stars} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
