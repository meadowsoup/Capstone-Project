import mongoose from "mongoose";
import crypto from "crypto"; // built-in Node.js module //! bcrypts, jsonwebtoken, express-validator (dependencies)!

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

// password functionality
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hashedPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

// password validation
userSchema.methods.validatePassword = function (password) {
  const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return this.hashedPassword === hashedPassword;
};


export const User = mongoose.model("User", userSchema);
