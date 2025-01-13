interface PauseButtonProps {
  onPause: () => void;
  isPaused: boolean;
}

const PauseButton: React.FC<PauseButtonProps> = ({ onPause, isPaused }) => {
  return (
    <button
      onClick={onPause}
      className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded"
    >
      {isPaused ? "Resume" : "Pause"}
    </button>
  );
};

export default PauseButton;
