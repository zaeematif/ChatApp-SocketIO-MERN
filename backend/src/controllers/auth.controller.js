import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

//SIGNUP
export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ msg: "Provide all the fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be 6 characters" });
    }

    const user = await User.findOne({ email });

    //check is user already exist
    if (user) return res.status(400).json({ msg: "Email already exists" });

    const salt = await bcrypt.genSalt(10); //generates a random string to hash with the password
    const hashedPassword = await bcrypt.hash(password, salt); //hash the password

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.pro,
      });
    } else {
      res.status(400).json({ msg: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);

    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    //generate Token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.pro,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);

    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//LOGOUT
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ msg: "Logged Out Succesfully" });
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(400).json({ msg: "Internal Server Error" });
  }
};

//UPDATE
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ msg: "Profile picture required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json({ msg: "Updated user profile picture" });
  } catch (error) {
    console.log("Error in Updated profile: ", error.message);

    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//CHECK AUTH
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in Check Auth: ", error.message);

    res.status(500).json({ msg: "Internal Server Error" });
  }
};
