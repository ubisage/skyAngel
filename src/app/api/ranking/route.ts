// To be used if needed to get all ranks that are present

import { connectToMongoDB } from '@/lib/db';
const getRankings = async () => {
  const { db } = await connectToMongoDB(); 
  const rankings = await db?.collection('rankings').find().toArray(); 
  return rankings?rankings:[];
};

export  async function GET() {
    try {
        const rankings = await getRankings();
    return Response.json({ rankings }) 
  } catch (error) {
    return Response.json({ error: (error as Error)?.message || "Couldn't load rankings" },
    { status: 500 }) // Handle errors
  }
}
