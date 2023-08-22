const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  package: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  kitchen: { type: String, required: true },
  dining_room: { type: String, required: true },
  supplies:{type: String,},
  kindOfPet:{type: String,},
  add_ons: { type: [String] },
  notes:{type: String,},
  booking_date:{type: Date, required: true },
  booking_time:{type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Bookings = mongoose.model("Bookings", BookingSchema);
module.exports = Bookings;