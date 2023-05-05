const asyncHandler = require("express-async-handler");
const generateToken = require("../config/genarateToken");
const User = require("../models/userModel");

// api/user   POST gets in body firstName,lastName,phone,password  and optionally isAdmin default false
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, isAdmin } = req.body;
  console.log(req.body);
  if (!firstName || !phone || !email || !lastName) {
    res.status(400);
    throw new Error("please Enter all the fiels");
  }
  const userExist = await User.findOne({ phone });
  if (userExist) {
    res.status(400).send({ message: "userExist" });
  } else {
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      isAdmin,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        token: generateToken(user._id),
        isAdmin,
      });
    } else {
      throw new Error("Failed to create User try again later");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Wrong Phone ");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { phone: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
const patchUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const userfound = await User.findByIdAndUpdate(req.params.id, req.body);
  const userUpdated = await User.findById(req.params.id);
  if (userfound && userUpdated) {
    res.status(200).json(userUpdated);
  } else {
    res.status(404).json({ message: "cant find this user" });
  }
});

module.exports = { registerUser, authUser, allUsers, patchUser };
