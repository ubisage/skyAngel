interface HudProps {
  time: number;
  fuel: number;
  stars: number;
}

const HUD: React.FC<HudProps> = ({ time, fuel, stars }) => {
  return (
    <div
      className="w-fit px-3 py-2 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
    >
      <p>Time: {time}s</p>
      <p>Fuel: {fuel}</p>
      <p>Stars: {stars}</p>
    </div>
  );
};

export default HUD;
