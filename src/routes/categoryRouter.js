
import { Router } from "express";
import { category } from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("/categories", category);

export default categoryRouter;

