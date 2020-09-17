const mongoose = require("mongoose");

const Res = mongoose.model(
  "Res",
  new mongoose.Schema({
    pid: {
      type: mongoose.ObjectId,
      ref: "Res",
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    level: {
      type: Number,
    },
    openStyle: {
      type: String,
    },
    resStyle: {
      type: String,
    },
    path: {
      type: String,
    },
    showOrder: {
      type: Number,
    },
    children: {
      type: ["Res"],
    },
  })
);

module.exports = {Res}