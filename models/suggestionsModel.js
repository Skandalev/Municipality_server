const mongoose = require("mongoose");
const suggestionsSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        body: { type: String, required: true },
        fullName:{type:String, required:true},
        picture: {type: String}
    },
    { timestamps: true }
  );

const Suggestions = mongoose.model("Suggestions", suggestionsSchema);
module.exports = Suggestions;