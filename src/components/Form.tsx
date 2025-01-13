import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { createRank } from "@/lib/action";

interface FormValueProps {
  setRank: Dispatch<SetStateAction<number>>;
  time: number;
  stars: number;
}

const Form: React.FC<FormValueProps> = ({ stars, time, setRank }) => {
    const [error, setError] = useState("")
  const ref = useRef<HTMLFormElement>(null);

  return (
    <div>
    <form
      ref={ref}
      className="flex items-center gap-2 justify-center"
      action={async (FormData) => {
          ref.current?.reset();
          const rank = await createRank(FormData);
          if(rank.Error){
              setError(rank.Error)
            }
            if (rank?.rank) {
                const rankValue = rank.rank;
                setRank(rankValue);
        }
    }}
    >
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="px-4 py-2 rounded text-gray-700"
        required
        />
      <input type="hidden" name="stars" value={stars} />
      <input type="hidden" name="time" value={time} />
      <SubmitBtn />
    </form>
    {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
  );
};

export default Form;
