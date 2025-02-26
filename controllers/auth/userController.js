import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../models/User.js";
import dotenv from "dotenv";

console.log(jwt)

dotenv.config();

const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists, you can log in.', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new UserModel({ name, email, password: hashedPassword });
    await userModel.save();

    return res.status(200).json({ message: 'Registration successful', success: true });
  } catch (err) {
    console.error(err); // Isko bhi add karo taaki error clearly dikhe
    return res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Wrong password", success: false });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ 
      message: "Login successful", 
      success: true, 
      token,   // Send token in response
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Error", success: false });
  }
};


const authMiddleware = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access. Token missing." });
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer TOKEN_VALUE"
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.result = decoded; // Attach user data to request
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};



export { registration, login, authMiddleware }