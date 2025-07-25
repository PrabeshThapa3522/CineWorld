
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../services/emailService.js"; // Assuming you have an email service

// Generate a random 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Step 1: Add Admin
export const addAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  // Check if the admin already exists
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  // Hash the password
  let admin;
  const hashedPassword = await bcrypt.hash(password, 10); // Use async version

  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return res.status(500).json({ message: "Unable to store admin" });
  }

  return res.status(201).json({ admin });
};

// Step 2: Admin Login and Send OTP
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  // Find admin by email
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  // Compare passwords
  const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  // Generate OTP and send to email
  const otp = generateOtp();
  const otpExpiration = Date.now() + 600000; // OTP expires in 10 minutes

  try {
    existingAdmin.otp = otp;
    existingAdmin.otpExpiration = otpExpiration;
    await existingAdmin.save();
    await sendOtpEmail(email, otp); // Assuming sendOtpEmail is implemented
  } catch (err) {
    return res.status(500).json({ message: "Error sending OTP" });
  }

  return res.status(200).json({ message: "OTP sent to email" });
};

// Step 3: Verify Admin OTP
export const verifyAdminOtp = async (req, res) => {
  const { email, otp } = req.body;

  // Validate input
  if (!email || !otp) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  // Find admin by email
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  // Validate OTP and expiration
  if (existingAdmin.otp !== otp || existingAdmin.otpExpiration < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // Generate JWT after successful OTP verification
  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  // Clear OTP fields
  existingAdmin.otp = null;
  existingAdmin.otpExpiration = null;
  await existingAdmin.save();

  return res.status(200).json({
    message: "Authentication Complete",
    token,
    id: existingAdmin._id,
  });
};

// Step 4: Send OTP for Admin (Separate Function)
export const sendOtpForAdmin = async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email) {
    return res.status(422).json({ message: "Email is required" });
  }

  // Find admin by email
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  // Generate OTP and send to email
  const otp = generateOtp();
  const otpExpiration = Date.now() + 600000; // OTP expires in 10 minutes

  try {
    existingAdmin.otp = otp;
    existingAdmin.otpExpiration = otpExpiration;
    await existingAdmin.save();
    await sendOtpEmail(email, otp); // Assuming sendOtpEmail is implemented
  } catch (err) {
    return res.status(500).json({ message: "Error sending OTP" });
  }

  return res.status(200).json({ message: "OTP sent to email" });
};

// Step 5: Get All Admins
export const getAdmins = async (req, res) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};

// Step 6: Get Admin By ID
export const getAdminById = async (req, res) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  return res.status(200).json({ admin });
};






