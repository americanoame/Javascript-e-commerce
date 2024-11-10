import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    // we are calling the function generateToken from the utils folder
    // and passing the response object and the user id to it

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(user._id),
      // we could send it back in the json and we srtore in the frontend
      // in local storage but we will use cookies instead of local storage,
      // so we send the token in the cookie on the server and we can
      // access it on the client side for security reasons
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});





// then we have to hash the password before saving it to the database in oder to compare it with the password that the user entered
// we can do this here but in order to keep the code clean we will do it in the user model

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // if the user doesn't exist we i wanna Create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // then we have to hash the password before saving it to the database
  // we can do this here but in order to keep the code clean we will do it in the user model
});







// @desc    Logout user/ clear cookie
// @route    Post /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).send("Logged out successfully");
});







// @desc    Get user profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  // when we're login we have access to the user object in the request object so we can pass (req.user._id);

  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route    PUT /api/users/profile
// @access   Private



const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    console.log(req.body);
    // we only wanna update field that we send in the request body 
    // in this case we only wanna update the name and email || if it's not there we wanna keep the old value
    // 
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email; // the reason we are doing this is beacuse the password is hashed 
    // and we don't wanna update it unless the user send the password  if (req.body.password) {

    if (req.body.password) {
      user.password = req.body.password;
    }
    
    // then we going to save the user then will return the user data and we will put on updataedUser variable 
    const updatedUser = await user.save();

    // then we will send the updated user data back to the client
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});





// @desc    Get  users
// @route    GET /api/users
// @access   Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  // when we're login we have access to the user object in the request object so we can pass (req.user._id);
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});





// @desc     Get user by ID
// @route    GET /api/users/:id
// @access   Private/Admin

const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});





// @desc     Delete user
// @route    DELETE /api/users/:id
// @access   Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc     Update user
// @route    PUT /api/users/:id
// @access   Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
