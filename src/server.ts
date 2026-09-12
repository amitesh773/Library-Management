import express from "express";
const app = express();
import { credentials } from "./config/credentials.js";
import { dbConnection } from "./config/dbConnection.js";
dbConnection()






app.listen(credentials.PORT, ()=>{
  console.log(`Server is running on port ${credentials.PORT}`)
})