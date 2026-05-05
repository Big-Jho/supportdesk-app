const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add a text"],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Note", noteSchema);
