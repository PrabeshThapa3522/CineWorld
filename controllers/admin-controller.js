import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Step 1: Add Admin (Signup)
export const addAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let admin;
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return res.status(500).json({ message: "Unable to store admin" });
  }

  return res.status(201).json({ message: "Signup successful", admin });
};

// Step 2: Admin Login (No OTP)
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let admin;
  try {
    admin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
  if (!isPasswordCorrect) return res.status(401).json({ message: "Incorrect Password" });

  // Generate JWT
  const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

  return res.status(200).json({
    message: "Login successful",
    token,
    id: admin._id,
    email: admin.email,
  });
};

// Step 3: Get Admin by ID
export const getAdminById = async (req, res) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!admin) return res.status(404).json({ message: "Admin not found" });

  return res.status(200).json({ admin });
};

// Step 4: Get All Admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({ admins });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



