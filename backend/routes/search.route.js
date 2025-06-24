import express from 'express';
import { getSearchHistory, removeSearchHistory, searchMovie, searchPerson, searchTv } from '../controller/search.controller.js';
import { get } from 'mongoose';

const router = express.Router();

router.get ("/person/:query", searchPerson);
router.get ("/movie/:query", searchMovie);
router.get ("/tv/:query", searchTv);

router.get("/history", getSearchHistory);

router.get("/history/:id", removeSearchHistory);

export default router;