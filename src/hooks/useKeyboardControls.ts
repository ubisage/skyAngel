import { useEffect, useRef } from "react";

const useKeyboardControls = ({ isPaused, gameOver, setAircraftPosition }: any) => {
  const aircraftRef = useRef<HTMLDivElement | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const keysPressed = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && !gameOver) {
        e.preventDefault();
        setAircraftPosition((prev: any) => ({ ...prev, isPaused: !prev.isPaused }));
        return;
      }

      if (isPaused || gameOver || !gameContainerRef.current || !aircraftRef.current) return;

      keysPressed.add(e.key);

      const step = 20;
      const container = gameContainerRef.current.getBoundingClientRect();
      const aircraft = aircraftRef.current.getBoundingClientRect();
      const maxX = container.width - aircraft.width;
      const maxY = container.height - aircraft.height;

      setAircraftPosition((prev: any) => {
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

  return { aircraftRef, gameContainerRef };
};

export default useKeyboardControls;