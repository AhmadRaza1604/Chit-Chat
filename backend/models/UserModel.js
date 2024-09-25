// UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  image:{
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationPin: {
    type: String,
  },
  verificationPinCreatedAt: {
    type: Date,
  },
},  { timestamps: true }
);

userSchema.methods.generateVerificationToken = function () {
  this.verificationToken = crypto.randomBytes(20).toString('hex');
};

const User = mongoose.model('users', userSchema);

module.exports = User;
