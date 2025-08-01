import express from "express";
import { registerAdmin, loginAdmin, getAllUsers, deleteUser, updateUser } from "../controllers/adminController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected routes
router.get("/users", adminOnly, getAllUsers);
router.delete("/users/:id", adminOnly, deleteUser);
router.put("/users/:id", adminOnly, updateUser);

export default router;
