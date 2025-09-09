// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     isAdmin: Boolean
// });
// const User = mongoose.model("users", userSchema);
// module.exports = User;




const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
      resetPasswordToken: String,
  resetPasswordExpires: Date
});
const User = mongoose.model("users", userSchema);
module.exports = User;




