import express from "express";
const app = express();
import { credentials } from "./config/credentials.js";








app.listen(credentials.PORT, ()=>{
  console.log(`Server is running on port ${credentials.PORT}`)
})