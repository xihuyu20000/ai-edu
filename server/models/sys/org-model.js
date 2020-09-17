const mongoose = require("mongoose");

const Org = mongoose.model(
  "Org",
  new mongoose.Schema({
    pid: {
      type: mongoose.ObjectId,
      ref: "Org",
      default: null,
    },
    label: {
      type: String,
      required: true,
      unique:true
    },
    icon: {
      type: String,
    },
    address: {
      type: String,
    },
    manager: {
      type: String,
    },
    desc: {
      type: String,
    },
    showOrder: {
      type: Number,
    },
    children: {
      type: ["Org"],
    },
  })
);

module.exports = { Org };
