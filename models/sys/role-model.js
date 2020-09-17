const mongoose = require('mongoose')

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    label: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
    },
    org: {
      type: mongoose.ObjectId,
      ref: "Org",
    },
    resList: {
      type: ["Res"],
    },
  })
);

module.exports = {Role}