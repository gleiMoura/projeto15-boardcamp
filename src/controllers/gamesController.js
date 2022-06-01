import connectDB from "../database.js";
import chalk from "chalk";

export async function getGames(req, res) {
    try {
        const { name } = req.query;
        const regex = `/^[a-zA-z]${name}/`;
        const games = await connectDB.query("select * from games limit 50");
        const gamesList = games.rows.map(element => {
            if (regex.test(element.name)) {
                return element
            }
        });

        if (!name) {
            return res.send(games.rows).status(200);
        } else {
            return res.send(gamesList).status(200);
        }
    } catch (error) {
        console.log(chalk.red("Algo deu errado no servidor. gamesController: " + error));
        res.sendStatus(500);
    }
};

export async function putGame(req, res) {
    try {
        const { name } = req.body;
        const { image } = req.body;
        const { slockTotal } = req.body;
        const { categoryId } = req.body;
        const { pricePerDay } = req.body;

        const requestion = await connectDB.query("insert into games (name, image, slockTotal, categoryId, pricePerDay) values ($1, $2, $3, $4, $5)", [name, image, slockTotal, categoryId, pricePerDay]);

        console.log(requestion);

        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red("Something wrong in server (gamesController) " + error));
        red.sendStatus(500);
    }
}