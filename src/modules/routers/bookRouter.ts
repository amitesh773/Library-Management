import Router from "express";
const router = Router();
import { createBook, allBook, singleBook, updateBook, deleteBook } from "../controllers/bookController.js";
import { verifytoken } from "../../middleware/authMiddleware.js";


router.post("/create",verifytoken, createBook)
router.get("/all",verifytoken,allBook)
router.get("/single/:id",verifytoken,singleBook)
router.patch("/update/:id",verifytoken,updateBook)
router.delete("/delete/:id",verifytoken,deleteBook)


export default router