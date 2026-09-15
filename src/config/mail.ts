import nodemailer from "nodemailer";
import { credentials } from "./credentials.js";

export const transporter = nodemailer.createTransport({
  host: credentials.MAIL_HOST,
  port: credentials.MAIL_PORT,
  secure: false,
  auth: {
    user: credentials.MAIL_USER,
    pass: credentials.MAIL_PASSWORD
  }
})