
import express from "express";
import {
  addAdmin,
  adminLogin,
  getAdminById,
  getAdmins,
  // Only keep necessary functions here
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

// Route for adding admin (signup)
adminRouter.post("/signup", addAdmin);

// Route for admin login (sends OTP)
adminRouter.post("/login", adminLogin);





// Route for getting all admins (you can restrict this if needed)
adminRouter.get("/", getAdmins);

// Route for getting a specific admin by ID
adminRouter.get("/:id", getAdminById);

export default adminRouter;



