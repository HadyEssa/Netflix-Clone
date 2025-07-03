import express from "express";
import {
  getSearchHistory,
  removeSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controller/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getSearchHistory);
router.delete("/history/:id", removeSearchHistory); // Changed to DELETE

export default router;
