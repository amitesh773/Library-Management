import Router from "express";
const router = Router();
import { createStudent, allStudent, singleStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import { verifytoken } from "../../middleware/authMiddleware.js";

router.post("/create",verifytoken,createStudent)
router.get("/all",verifytoken,allStudent)
router.get("/single/:id",verifytoken, singleStudent)
router.patch("/update/:id",verifytoken,updateStudent)
router.delete("/delete/:id",verifytoken,deleteStudent)


export default router