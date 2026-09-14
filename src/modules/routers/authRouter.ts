import Router from "express";
const router = Router();
import { singup, login,profile,logout } from "../controllers/authController.js";
import { verifytoken } from "../../middleware/authMiddleware.js";

router.post("/singup",singup)
router.post("/login",login)
router.get("/profile",verifytoken,profile)
router.post("/logout",verifytoken,logout)


export default router