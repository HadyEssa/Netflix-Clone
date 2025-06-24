import express from 'express';
import {
  getMovieTrailers,
  getTrendingMovie,
  getMovieDetails,
  getSimilarMovie,
  getMovieByCategory,
} from "../controller/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/Similar", getSimilarMovie);
router.get("/:Category", getMovieByCategory);

export default router;