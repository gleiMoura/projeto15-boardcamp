import pg from "pg";
import chalk from "chalk";

const {Pool} = pg;

let connectDB;

try{
    connectDB = new Pool ({
        connectionString: process.env.DATABASE_URL,
    });
    console.log(chalk.green("Database is working!"));
}catch (e){
    console.log(chalk.red("Database is not working, error: " + e));
}

export default connectDB