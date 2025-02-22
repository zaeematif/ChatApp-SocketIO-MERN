import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //generate a token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //set token in cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 1000, //7 days
    httpOnly: true, //only http can access this cookie -    XSS attack prevention
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
