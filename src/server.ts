import express, { urlencoded } from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
import { credentials } from "./config/credentials.js";
import { dbConnection } from "./config/dbConnection.js";
dbConnection()

// Model 
import "./models/user.js"
import "./models/book.js"
import "./models/teacher.js"

import auth from "./modules/routers/authRouter.js";
import book from "./modules/routers/bookRouter.js";
import student from "./modules/routers/studentRouter.js"

app.use("/auth",auth)
app.use("/book", book)
app.use("/student",student)


app.listen(credentials.PORT, ()=>{
  console.log(`Server is running on port ${credentials.PORT}`)
})