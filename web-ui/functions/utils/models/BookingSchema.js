const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date_created: { type: Date, default: Date.now },
  employee_created: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  package: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  kitchen: { type: String, required: true },
  supplies:{type: String,},
  kindOfPet:{type: String,},
  add_ons: { type: [String] },
  notes:{type: String,},
  start_time: { type: Date },
  end_time_expected: { type: Date },
  end_time: { type: Date },
  price_expected: { type: Number },
  price_full: { type: Number },
  price_final: { type: Number },
  canceled: { type: Boolean },
  cancellation_reason: { type: String },
  // Add any other fields specific to your booking logic here
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  // Include other employee fields here
});

const ClientSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  // Include other client fields here
});

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // Duration in minutes
  price: { type: Number, required: true },
  // Additional fields as needed, e.g., category, availability, etc.
});

const ServiceProvidedSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    // If a specific employee is required to provide the service
  },
  availability: { type: String },
  customizations: [{ type: String }],
  active: { type: Boolean, default: true },
  // Additional fields as necessary, such as specific conditions, requirements, etc.
});

const ServiceBookedSchema = new mongoose.Schema({
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
    serviceProvided: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceProvided',
      required: true
    },
    specialRequests: { type: String },
    serviceStartTime: { type: Date, required: true },
    serviceEndTime: { type: Date, required: true },
    // You might include price here if it can vary from the standard service price based on customizations or discounts.
    priceAtBooking: { type: Number },
    status: { type: String, default: 'booked' } // For example, 'booked', 'completed', 'cancelled'
    // Any other fields relevant to the booking of the service
  });
  
// You would also define schemas for ServiceProvided, ServiceBooked, Service, etc. according to the ERD.

const Appointment = mongoose.model("Appointment", AppointmentSchema);
const Employee = mongoose.model("Employee", EmployeeSchema);
const Client = mongoose.model("Client", ClientSchema);
const Service = mongoose.model("Service", ServiceSchema);
const ServiceProvided = mongoose.model("ServiceProvided", ServiceProvidedSchema);
const ServiceBooked = mongoose.model("ServiceBooked", ServiceBookedSchema);

module.exports = {
  Appointment,
  Employee,
  Client,
  Service,
  ServiceProvided,
  ServiceBooked
}