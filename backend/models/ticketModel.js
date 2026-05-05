const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please add a product"],
      enum: [
        "iMac",
        "iPhone",
        "iPad",
        "iPad Pro",
        "Apple Pencil",
        "Apple Watch",
        "Airpod",
        "Airpod Pro",
        "Macbook Pro",
        "Macbook Air",
        "Macbook Neo",
        "Mac Mini",
        "Mac Studio",
      ],
    },
    description: {
      type: String,
      required: [true, "Please add a password"],
    },
    status: {
      type: String,
      required: true,
      enum: ["opened", "closed", "new"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Ticket", ticketSchema);
