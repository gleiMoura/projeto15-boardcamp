import joi from "joi";
import connectDB from "../database.js";
import chalk from "chalk";

export async function validateCategory(req, res, next) {
    try {
        const category = req.body;

        const query = await connectDB.query("select name from categories where name=$1", [category.name])

        const categorySchema = joi.object({
            name: joi.string().required()
        });

        const validation = categorySchema.validate(category);

        if(query.rows[0]) return res.sendStatus(409);

        if (validation.error) {
            console.log(chalk.red(validation.error.details));
            return res.sendStatus(400);
        };

        
    } catch (error) {
        console.log(chalk.red("Something is wrong with categoryMiddleware: " + error));
        res.sendStatus(500);
    }

    next();
}