const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestaps: true }
);

// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model("citizenUser", UserSchema);
module.exports = User;
