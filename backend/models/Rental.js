const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  carId: String,
  carName: String,
  carImage: String,
  startDate: String,
  endDate: String,
  totalPrice: Number,
  status: {
    type: String,
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Rental", rentalSchema);