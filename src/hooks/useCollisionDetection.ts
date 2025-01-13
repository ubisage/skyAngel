// import { useEffect } from "react";

// const useCollisionDetection = ({
//   aircraftRef,
//   birdRef,
//   starRef,
//   parachuteRef,
//   setGameOver,
//   setStars,
//   setFuel,
//   resetStarPosition,
//   resetParachutePosition,
// }: any) => {
//   useEffect(() => {
//     const detectCollisions = () => {
//       if (aircraftRef.current && birdRef.current) {
//         const aircraftRect = aircraftRef.current.getBoundingClientRect();
//         const birdRect = birdRef.current.getBoundingClientRect();
//         if (
//           aircraftRect.left < birdRect.right &&
//           aircraftRect.right > birdRect.left &&
//           aircraftRect.top < birdRect.bottom &&
//           aircraftRect.bottom > birdRect.top
//         ) {
//           setGameOver(true);
//         }
//       }

//       if (aircraftRef.current && starRef.current) {
//         const aircraftRect = aircraftRef.current.getBoundingClientRect();
//         const starRect = starRef.current.getBoundingClientRect();
//         if (
//           aircraftRect.left < starRect.right &&
//           aircraftRect.right > starRect.left &&
//           aircraftRect.top < starRect.bottom &&
//           aircraftRect.bottom > starRect.top
//         ) {
//           setStars();
//           resetStarPosition();
//         }
//       }

//       if (aircraftRef.current && parachuteRef.current) {
//         const aircraftRect = aircraftRef.current.getBoundingClientRect();
//         const parachuteRect = parachuteRef.current.getBoundingClientRect();
//         if (
//           aircraftRect.left < parachuteRect.right &&
//           aircraftRect.right > parachuteRect.left &&
//           aircraftRect.top < parachuteRect.bottom &&
//           aircraftRect.bottom > parachuteRect.top
//         ) {
//           setFuel(10);
//           resetParachutePosition();
//         }
//       }
//     };

//     const interval = setInterval(detectCollisions, 100);
//     return () => clearInterval(interval);
//   }, [aircraftRef, birdRef, starRef, parachuteRef]);
// };

// export default useCollisionDetection;
