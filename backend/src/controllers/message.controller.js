import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

//GET SIDEBAR USERS
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // $ne - not equal to loggedUserId - send all usesrs except logged user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in get Sidebar users: ", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//GET ALL MESSAGES FOR A USER
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get messages: ", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//SEND MESSAGES
export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    let imageUrl;
    

    //if image present - upload on cloudinary
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getRecieverSocketId(receiverId)

    //if user online send to receiver
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Error in send message: ", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
