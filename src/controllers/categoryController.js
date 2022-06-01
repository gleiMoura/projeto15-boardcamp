import connectDB from "../database.js";
import chalk from "chalk";

export async function getCategories(req, res) {
    try {
        const query = await connectDB.query("SELECT * FROM categories");

        if (!query.rows) return res.sendStatus(409);

        res.send(query.rows).status(200);
    } catch (error) {
        console.log(chalk.red("Something wrong in categoryController: " + error));
        res.sendStatus(500);
    }
}

export async function putCategory(req, res) {
    const { name } = req.body;

    try {
        const query = await connectDB.query("INSERT INTO categories (name) VALUES ($1)", [name]);

        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red("Something wrong in categoryController: " + error));
        res.sendStatus(500);
    }
}