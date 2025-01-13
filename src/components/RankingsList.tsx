"use client";

import { useEffect, useState } from "react";

// Define the types for the ranking data
interface Ranking {
  _id: string;
  name: string;
  time: number;
  stars: number;
}

// Define the state types
interface RankingsListState {
  rankings: Ranking[];
  loading: boolean;
  error: string | null;
}

const RankingsList: React.FC = () => {
  const [state, setState] = useState<RankingsListState>({
    rankings: [],
    loading: true,
    error: null,
  });

  // Fetch rankings using the async function
  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await fetch("/api/ranking"); // Assuming API endpoint for rankings
        const data: { rankings: Ranking[] } = await response.json();
        setState({ rankings: data.rankings, loading: false, error: null });
      } catch (err) {
        setState({
          rankings: [],
          loading: false,
          error: "Error fetching rankings",
        });
      }
    }

    fetchRankings();
  }, []);

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>{state.error}</div>;

  return (
    <div>
      {state.rankings.map((ranking) => (
        <div key={ranking._id} className=" flex items-center justify-between">
          <h3>{ranking.name}</h3>
          <p>Time: {ranking.time}s</p>
          <p>Stars: {ranking.stars}</p>
        </div>
      ))}
    </div>
  );
};

export default RankingsList;
