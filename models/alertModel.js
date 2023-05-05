const mongoose = require("mongoose");

const alertSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    subTitle: { type: String, required: true },
    body: { type: String, required: true },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Alert = mongoose.model("Alert", alertSchema);
module.exports = Alert;
