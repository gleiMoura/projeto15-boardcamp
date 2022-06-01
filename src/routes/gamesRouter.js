import { Router } from "express";
import { getGames, putGame } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddlewares.js";

const gamesRouter = Router();
gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, putGame)

export default gamesRouter;

