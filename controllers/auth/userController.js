import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../models/User.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

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

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );
    res.cookie('jwtToken', jwtToken, {
      httpOnly: true,
      secure: true,
    })
    return res.status(200).json({ message: 'Login successful', success: true, jwtToken, email, name: user.name });
  } catch (err) {
    console.error(err); // Error clearly show karega
    return res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};
const authMiddlewares = (req, res, next) => {
      const Token = req.cookies.jwtToken;
//   const auth = req.headers["authorization"];
  if (!Token) {
    return res.status(403).json({ message: "Unauthorized jwt token is required" });
  }
  try{
        const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
  }catch(err){
        return res.status(403).json({message: "Unauthorized"})
  }
  next();
};

export { registration, login };
