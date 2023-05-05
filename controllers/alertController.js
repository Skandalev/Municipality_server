const Alert = require("../models/alertModel");
const asyncHandler = require("express-async-handler");

const allAlert = asyncHandler(async (req, res) => {
  try {
    const alerts = await Alert.find({}).sort({ _id: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json(err);
  }
});

const addAlert = asyncHandler(async (req, res) => {
  const newAlert = new Alert(req.body);
  const validateAlert = await Alert.findOne({ title: req.body.title });

  console.log(validateAlert);
  if (!newAlert) {
    return res.status(401).json("Invalid data passed into request");
  }

  if (validateAlert) {
    return res.status(401).json("Title must be unique!");
  }

  try {
    await Alert.create(newAlert);
    res.status(200).json(newAlert);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteAlert = asyncHandler(async (req, res) => {
  try {
    await Alert.findOneAndDelete({ _id: req.params.id });
    res.status(200).json("Alert was successfully removed!");
  } catch (err) {
    res.status(500).json(err);
  }
});

const updateAlert = asyncHandler(async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAlert);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  allAlert,
  addAlert,
  deleteAlert,
  updateAlert,
};
