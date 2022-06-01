import { Router } from "express";
import { getCategories, putCategory } from "../controllers/categoryController.js";
import { validateCategory } from "../middlewares/categoryMiddleware.js";

const categoryRouter = Router();
categoryRouter.get("/categories", getCategories);
categoryRouter.post("/categories", validateCategory, putCategory);

export default categoryRouter;

