import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => { 
  res.send("auth user");
});




// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  
  res.send("register user");
  });

  

// then we have to hash the password before saving it to the database
// we can do this here but in order to keep the code clean we will do it in the user model



// @desc    Logout user/ clear cookie
// @route    Post /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
  

  res.send("Logged out successfully");
});



// @desc    Get user profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  // when we're login we have access to the user object in the request object so we can pass (req.user._id);
  
  res.send("get user profile");
});




// @desc    Update user profile
// @route    PUT /api/users/profile
// @access   Private

const updateUserProfile = asyncHandler(async (req, res) => {
  
  
  res.send("update user profile");
});



// @desc    Get  users
// @route    GET /api/users
// @access   Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("get  users");
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
