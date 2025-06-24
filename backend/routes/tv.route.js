import express  from 'express';
import { getTrendingTv,getTvTrailers,getTvDetails,getSimilarTv,getTvByCategory,} from "../controller/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/Similar", getSimilarTv);
router.get("/:Category", getTvByCategory);

export default router;