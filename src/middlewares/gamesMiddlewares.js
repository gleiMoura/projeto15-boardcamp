import joi from "joi";
import chalk from "chalk";
import connectDB from "../database.js";

export async function validateGame(req, res) {
    try {
        const game = req.body;
        const gameSchema = joi.object({
            name: joi.string().required(),
            image: joi.string().required(),
            stockTotal: joi.number().required(),
            categoryId: joi.number().required(),
            pricePerDay: joi.number().required(),
        });
        const validate = gameSchema.validate(game);

        const existCategoryId = await connectDB.query("select id from categories where id=$1", [game.categoryId]);

        const existName = await connectDB.query("select name from games where name=$1", [game.name]);
        
        if(validate.error) {
            console.log(validate.error.details);
            return res.sendStatus(400);
            
        };

        if (game.stockTotal < 0 || game.pricePerDay < 0 || !existCategoryId.rows[0]) return res.sendStatus(400);

        console.log(existName.rowCount) 
    } catch (error) {
        console.log(chalk.red("Something is wrong in the Server: " + error));
        res.sendStatus(500);
    }
}