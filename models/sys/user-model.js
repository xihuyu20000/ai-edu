const mongoose = require('mongoose')

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    realname: { type: String },
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      set: (val) => require("bcrypt").hashSync(val, 10),
    },
    style: {
      // 类型：staff、student
      type: String,
      required: true,
    },
    canlogin: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: "未启用",
    },
    org: {
      type: mongoose.ObjectId,
      ref: "Org",
    },
    mainRole: {
      type: mongoose.ObjectId,
      ref: "Role",
    },
    otherRoles: {
      type: ["Role"],
    },
  })
);

module.exports = { User };
