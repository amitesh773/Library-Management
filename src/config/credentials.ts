import dotenv from "dotenv";
dotenv.config()
import type{ Dialect } from "sequelize";

export const credentials = {
    PORT: process.env.PORT,
    DB_NAME : process.env.DB_NAME as string,
    DB_USER : process.env.DB_USER as string,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_HOST : process.env.DB_HOST as string,
    DB_PORT : Number(process.env.DB_PORT),
    DB_DIALECT : process.env.DB_DIALECT as Dialect,

    JWT_SECRET: process.env.JWT_SECRET as string,

    MAIL_HOST: process.env.MAIL_HOST as string,
    MAIL_PORT: Number(process.env.MAIL_PORT),
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM: process.env.MAIL_FORM


}