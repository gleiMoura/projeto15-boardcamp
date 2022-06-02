import connectDB from "../database.js";
import chalk from "chalk";

export async function getGames(req, res) {
    try {
        const { name } = req.query;
        const games = await connectDB.query(`select games.*,categories.name as "categoryName" from games join categories on games."categoryId" = categories.id limit 50`);

        if (!name) {
            return res.send(games.rows).status(200);
        } else {
            const regex = new RegExp(name, "i");

            const gamesList = games.rows.map(element => {
                if (regex.test(element.name)) {
                    return element
                }
            });

            return res.send(gamesList).status(200);
        }
    } catch (error) {
        console.log(chalk.red("Something is wrong in server. gamesController: " + error));
        res.sendStatus(500);
    }
};

export async function putGame(req, res) {
    try {
        const { name } = req.body;
        const { image } = req.body;
        const { stockTotal } = req.body;
        const { categoryId } = req.body;
        const { pricePerDay } = req.body;

        await connectDB.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay})`);

        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red("Something wrong in server (gamesController) " + error));
        res.sendStatus(500);
    }
}