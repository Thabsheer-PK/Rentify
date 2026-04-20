const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
  name: String,
  brand: String,
  model: Number,
  type: String,
  fuel: String,
  transmission: String,
  location: String,
  price: Number,
  category: String,
  seats: Number,
  mileage: String,
  description: String,
  owner: {
    name: String,
    phone: Number,
    verified: Boolean
  },

  images: [String],

  availability: Boolean,
  rating: Number
})

module.exports = mongoose.model("Vehicle", vehicleSchema);