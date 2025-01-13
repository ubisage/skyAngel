"use server";
import Ranking, { IRankingWithRank } from "../../models/ranking";
import { connectToMongoDB } from "./db";

export const createRank = async (formData: FormData) => {
  await connectToMongoDB();

  // Extract data from formData
  const name = formData.get("name")?.toString();
  const stars = parseInt(formData.get("stars")?.toString() || "0");
  const time = parseInt(formData.get("time")?.toString() || "0");

  try {
    if (!name?.trim().length) {
        return { Error: "Name is required" };
      }
    // Create a new ranking
    const newRanking = await Ranking.create({ name, stars, time });

    // Fetch all rankings and sort them by stars and time
    const rankings = await Ranking.find().lean();
    const sortedRankings: IRankingWithRank[] = rankings.sort((a, b) => {
      if (b.stars === a.stars) {
        return b.time - a.time; // Sort by time (descending)
      }
      return b.stars - a.stars; // Sort by stars (descending)
    });

    // Assigning ranks to  the sorted list
    let rank = 1;
    const rankingsWithRanks = sortedRankings.map((ranking, index, arr) => {
      // If the current ranking is the same as the previous one, they get the same rank
      if (
        index > 0 &&
        arr[index].stars === arr[index - 1].stars &&
        arr[index].time === arr[index - 1].time
      ) {
        ranking.rank = arr[index - 1].rank;
      } else {
        ranking.rank = rank;
      }
      rank++;
      return ranking;
    });

    // Find the rank of the newly added ranking
    const newRank = rankingsWithRanks.find(
      (ranking) => ranking._id.toString() === newRanking._id.toString()
    )?.rank;

    // Return the rank of the new entry
    return { rank: newRank };
  } catch (error) {
    return { Error: "Error while storing the ranking" };
  }
};

//Server Action to get all the documnets- not needed fo rnow
export const getRankings = async () => {
  await connectToMongoDB();
  try {
    const rankings = await Ranking.find().lean();
    return rankings;
  } catch (error) {
    return { Error: "No rankings" };
  }
};
