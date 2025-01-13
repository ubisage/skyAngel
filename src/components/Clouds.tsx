"use client";

import { useEffect, useRef, useState } from "react";

const Cloud: React.FC<{ position: { x: number; y: number } }> = ({
  position,
}) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "200px",
        height: "100px",
      }}
    >
      <svg viewBox="0 0 105 105">
        <path
          fill="white"
          stroke="white"
          opacity={0.6}
          strokeLinejoin="round"
          d="M 25,60 
           a 20,20 1 0,0 0,40 
           h 50 
           a 20,20 1 0,0 0,-40 
           a 10,10 1 0,0 -15,-10 
           a 15,15 1 0,0 -35,10  
           z"
        />
      </svg>
    </div>
  );
};

const Clouds: React.FC = () => {
  const [clouds, setClouds] = useState<
    { x: number; y: number; speed: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const generateClouds = () => {
      const containerWidth = containerRef.current?.clientWidth || 1024;
      const containerHeight = containerRef.current?.clientHeight || 768;
      const numberOfClouds = 5;
      const newClouds = [];
      for (let i = 0; i < numberOfClouds; i++) {
        newClouds.push({
          x: containerWidth,
          y: (Math.random() * containerHeight) / 2, 
          speed: Math.random() * 2 + 1, 
        });
      }

      setClouds(newClouds);
    };

    generateClouds(); 
  }, []);

  useEffect(() => {
    const animateClouds = () => {
      setClouds((prevClouds) => {
        return prevClouds.map((cloud) => {
          const containerWidth = containerRef.current?.clientWidth || 1024;
          const newX = cloud.x - cloud.speed;
          const x = newX < -200 ? containerWidth : newX;
          return { ...cloud, x };
        });
      });
      requestAnimationFrame(animateClouds);
    };

    animateClouds();
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full">
      {clouds.map((cloud, index) => (
        <Cloud key={index} position={{ x: cloud.x, y: cloud.y }} />
      ))}
    </div>
  );
};

export default Clouds;
