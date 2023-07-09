const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

// @desc  POST users
// @route POST /api/users
// @access private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Add All Fields.");
  }

  //  Check if user exist

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data.");
  }
});

// @desc  POST Authenticate
// @route POST /api/users
// @access private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data.");
  }
});

// @desc  GET user
// @route GET /api/user
// @access private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
     res.status(201).json({
        id : _id,
        name,
        email
    })
});

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn : "30d"
    })
}

module.exports = { registerUser, loginUser, getMe };
