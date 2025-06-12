// journalistRoutes.js
// This file defines routes for fetching articles by journalist ID or name.
// It is used for endpoints like /api/journalists/:id/articles and /api/journalists/name/:name/articles

import { Router } from "express";
import { getArticlesByJournalistId, getArticlesByJournalistName } from "../controllers/journalistController.js";

const journalistRouter = Router();

// GET /api/journalists/:id/articles
// Returns all articles written by a journalist with the given ID
journalistRouter.get("/:id/articles", getArticlesByJournalistId); // <-- Fixed missing slash

// GET /api/journalists/name/:name/articles
// Returns all articles written by a journalist with the given name
journalistRouter.get("/name/:name/articles", getArticlesByJournalistName);

export default journalistRouter;
