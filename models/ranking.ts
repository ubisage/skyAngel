import mongoose, { Document, Model, ObjectId } from "mongoose";

// Type definitions
export interface IRanking {
  name: string;
  time: number;
  stars: number;
}

export interface IRankingDocument extends IRanking, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRankingWithRank extends IRankingDocument {
  rank?: number;
}


//Schema
const rankingSchema = new mongoose.Schema<IRankingDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Ranking: Model<IRankingDocument> =
  mongoose.models?.Ranking || mongoose.model("Ranking", rankingSchema);

export default Ranking;