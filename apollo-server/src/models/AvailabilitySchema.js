import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
    dayOfWeek: {
        type: Number, // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        required: true,
    },
    timeSlots: [{ 
        type: String, // Time slots like "10:00 AM", "10:30 AM", etc.
    }],
});

export const Availability = mongoose.model("Availability", AvailabilitySchema);
