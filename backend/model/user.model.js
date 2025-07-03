import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  id: Number, // Matches the TMDB ID used in search controllers
  image: String,
  title: String,
  searchType: String,
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: [searchHistorySchema], // Use sub-schema for consistency
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
