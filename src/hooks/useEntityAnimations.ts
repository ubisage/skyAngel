import { useEffect } from "react";

const SPEED = 4; // Adjust speed for animations

const useEntityAnimations = ({
  starPosition,
  updateStarPosition,
  parachutePosition,
  updateParachutePosition,
  birdPosition,
  updateBirdPosition,
  isPaused,
  gameContainerRef,
}: {
  starPosition: { x: number; y: number };
  updateStarPosition: (callback: (prev: { x: number; y: number }) => { x: number; y: number }) => void;
  parachutePosition: { x: number; y: number };
  updateParachutePosition: (callback: (prev: { x: number; y: number }) => { x: number; y: number }) => void;
  birdPosition: { x: number; y: number };
  updateBirdPosition: (callback: (prev: { x: number; y: number }) => { x: number; y: number }) => void;
  isPaused: boolean;
  gameContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (isPaused) return;

    const containerHeight = gameContainerRef.current?.offsetHeight || 768;
    const containerWidth = gameContainerRef.current?.offsetWidth || 1024;

    const interval = setInterval(() => {
      // Update star position (falling down)
      updateStarPosition((prev) => ({
        x: prev.x,
        y: prev.y + SPEED,
      }));

      // Update parachute position (falling down)
      updateParachutePosition((prev) => ({
        x: prev.x,
        y: prev.y + SPEED,
      }));

      // Update bird position (moving left)
      updateBirdPosition((prev) => ({
        x: prev.x - SPEED,
        y: prev.y,
      }));

      // Reset positions if entities move out of bounds
      if (starPosition.y > containerHeight) {
        updateStarPosition({
          x: Math.floor(Math.random() * (containerWidth - 64)), // Randomize X position
          y: -64, // Reset to above the screen
        });
      }

      if (parachutePosition.y > containerHeight) {
        updateParachutePosition({
          x: Math.floor(Math.random() * (containerWidth - 64)), // Randomize X position
          y: -64, // Reset to above the screen
        });
      }

      if (birdPosition.x + 64 < 0) {
        updateBirdPosition({
          x: containerWidth, // Reset to the right side
          y: Math.floor(Math.random() * (containerHeight - 64)), // Randomize Y position
        });
      }
    }, 16); // ~60 frames per second

    return () => clearInterval(interval);
  }, [isPaused, starPosition, parachutePosition, birdPosition, gameContainerRef, updateStarPosition, updateParachutePosition, updateBirdPosition]);
};

export default useEntityAnimations;