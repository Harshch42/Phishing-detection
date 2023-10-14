const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { default: axios } = require("axios");
const { response } = require("express");

//@desc Register a User
//@route POST /api/users
//@cccess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ message: "Please fill in all fields" });
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(403).json({ message: "User already exists!" });
  }

  // Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating new User
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //if created the user
  if (newUser) {
    res.status(201).json({
      //201 status : OK
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

//@desc Authenticate a User
//@route POST /api/users/login
//@cccess Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, googleId } = req.body;

  if (password) {
    const user = await User.findOne({ email });

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    }
  } else {
    const user = await User.findOne({ googleId });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    }
  }

  res.status(400).json({ message: "Invalid Credentials" });
});

//@desc Get USer Data
//@route GET /api/users/me
//@access Private

const getUser_Me = asyncHandler(async (req, res) => {
  //req.user is user whose token is verified that comes from the authMiddleWare
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//@desc Get GoogleOAuthUrl
//@route GET /api/users/getGoogleOAuthUrl
//@access Public

const getGoogleOAuthUrl = asyncHandler(async (req, res) => {
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;
  const url =
    oauth2Endpoint +
    "?client_id=" +
    GOOGLE_CLIENT_ID +
    "&redirect_uri=" +
    GOOGLE_REDIRECT_URI +
    "&response_type=code&include_granted_scopes=true&state=pass-through-value&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  res.status(200).json(url);
});

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc POST Google Access token
//@route POST /api/users/getGoogleAuthCode
//@access Public
const getGoogleAuthCode = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`;

  try {
    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { access_token } = response?.data;

    const googleUserInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
    );
    const { id, name, email } = googleUserInfo.data;

    if (!name) {
      res.status(400).json({
        message: "Please complete your Google first or Login via email",
      });
      return;
    }

    const user = await User.findOne({ googleId: id });
    if (user) {
      res.status(201).json({
        //201 status : OK
        _id: user.id,
        name: user.name,
        email: user.email,
        googleId: user.googleId,
      });
    } else if (await User.findOne({ email })) {
      const userByEmail = await User.findOne({ email });
      res.status(400).json({
        message:
          "Your email is registered, please login via email instead of Google",
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        googleId: id,
      });
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        googleId: newUser.googleId,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    if (updatedUser) {
      console.log(updatedUser);
      res.status(201).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(500).json({ message: "Something Went Wrong!" });
    }
  } else if (user && user.googleId) {
    res.status(403).json({
      message:
        "You can't change the password for a logged in with Google account",
    });
  } else {
    res.status(404).json({ message: "User Not found!" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUser_Me,
  getGoogleOAuthUrl,
  getGoogleAuthCode,
  updatePassword,
};
