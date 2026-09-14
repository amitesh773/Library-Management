import {Sequelize} from "sequelize";
import { credentials } from "./credentials.js";

export const sequelize = new Sequelize(
    credentials.DB_NAME,
    credentials.DB_USER,
    credentials.DB_PASSWORD,
    {
        host: credentials.DB_HOST,
        port: credentials.DB_PORT,
        dialect: credentials.DB_DIALECT,
        logging: false
    }
)

export async function dbConnection() {
    try {
        await sequelize.authenticate();
        console.log("MySql conneced successfully");

        await sequelize.sync({alter: true});
        console.log("Sequelize syncked successfully")
        
    } catch (error) {
        console.error("Database Error: ",error)
    }
}