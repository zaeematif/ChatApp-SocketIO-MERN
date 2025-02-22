import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized - No token provided " });
    }

    //check token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized - No token provided " });
    }

    //find user with user_id
    const user = await User.findOne({ _id: decoded.userId }).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found " });
    }
    

    //load the user info onto request 
    req.user = user;
    //call the next controller/middleware
    next();
    
  } catch (error) {
    console.log("Error in protected middleware: ", error.message);
    
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
