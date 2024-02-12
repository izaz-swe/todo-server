const mongoose = require("mongoose");
const uuidv4 = require('uuid').v4;
const userAccountSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
}
);
const UserAccount = mongoose.model("user", userAccountSchema);
module.exports = UserAccount;