import connectDB from "../database.js";

export async function category( req, res ){
    try{
        const query = await connectDB.query("SELECT * FROM categories");

        if(!query.rows) return res.sendStatus(409);

        res.send(query.rows).status(200);
    }catch ( error ) {
        console.log(chalk.red("Something wrong in controllers/category: " + error));
        res.sendStatus(500);
    }
}