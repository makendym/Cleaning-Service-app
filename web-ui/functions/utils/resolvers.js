const { Book } = require('./models/Book');
const Bookings = require('./models/Bookings');
const Availability  = require('./models/AvailabilitySchema');
const {
    Appointment,
    Client,
    Employee,
    Service,
    ServiceBooked,
    ServiceProvided,
  } = require('./models/BookingSchema');

  const resolvers = {
    Query: {
      hello: (_, { name }) => `Hello ${name}`,
      books: async () => await Book.find({}),
      bookings: async () => await Bookings.find({}),
      appointments: async () => await Appointment.find({}),
      employees: async () => await Employee.find({}),
      clients: async () => await Client.find({}),
      services: async () => await Service.find({}),
      servicesProvided: async () => await ServiceProvided.find({}),
      servicesBooked: async () => await ServiceBooked.find({}),
      // Modified availability query to accept a date parameter and return available slots
      availability: async (_, { date }) => {
          const targetDate = new Date(date);
          const targetDay = targetDate.getUTCDay(); // Use UTC day to avoid time zone issues
        
          // Fetch the availability for the given day of the week
          const availableSlots = await Availability.findOne({ dayOfWeek: targetDay });
          if (!availableSlots) {
            // No availability set for this day
            return [];
          }
        
          // Define start and end of the target day in UTC to match the input date's time zone
          const startOfDay = new Date(Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate(), 0, 0, 0));
          const endOfDay = new Date(Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate(), 23, 59, 59));
        
          const appointmentsOnDate = await Appointment.find({
            start_time: { $gte: startOfDay, $lte: endOfDay },
          });
        
          // Convert time slot string to minutes from the start of the day, adjusting for UTC
          function timeSlotToMinutes(slot) {
            const [time, modifier] = slot.split(" ");
            let [hours, minutes] = time.split(":").map(Number);
        
            if (modifier === "PM" && hours < 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;
        
            return hours * 60 + minutes;
          }
        
          // Calculate booked slots as minutes from start of day, considering UTC hours
          const bookedSlots = appointmentsOnDate.map(appointment => {
            const startMinutes = appointment.start_time.getUTCHours() * 60 + appointment.start_time.getUTCMinutes();
            const endMinutes = appointment.end_time_expected.getUTCHours() * 60 + appointment.end_time_expected.getUTCMinutes();
            
            return { start: startMinutes, end: endMinutes };
          });
        
          // Filter available slots against booked slots
          const filteredSlots = availableSlots.timeSlots.filter(slot => {
            const slotStart = timeSlotToMinutes(slot);
            const slotEnd = slotStart + 30; // Assuming each slot is 30 minutes long
            return !bookedSlots.some(({ start, end }) => slotStart < end && slotEnd > start);
          });
        
          console.log("Available Slots After Filtering: ", filteredSlots);
        
          return [{ dayOfWeek: targetDay, timeSlots: filteredSlots }];
        },
        
    },
    Mutation: {
      create: async (_, { title, year }) => {
        const newBook = new Book({ title, year });
        await newBook.save();
        return newBook;
      },
      delete: async (_, { id }) => {
        const result = await Book.deleteOne({ _id: id });
        if (result.acknowledged && result.deletedCount === 1) {
          return id;
        }
        return null;
      },
      edit: async (_, { id, title, year }) => {
        const result = await Book.updateOne(
          { _id: id },
          { $set: { title, year } }
        );
        if (result.acknowledged && result.modifiedCount === 1) {
          return await Book.findOne({ _id: id });
        }
        return null;
      },
      createBooking: async (_, { booking }) => {
        const newBooking = new Bookings(booking);
        await newBooking.save();
        return newBooking;
      },
      // Add mutations for creating Employee, Client, Service, ServiceProvided, ServiceBooked
      createAppointment: async (_, { appointment }) => {
        const newAppointment = new Appointment(appointment);
        await newAppointment.save();
        return newAppointment;
      },
      createEmployee: async (_, { employee }) => {
        const newEmployee = new Employee(employee);
        await newEmployee.save();
        return newEmployee;
      },
  
      createClient: async (_, { client }) => {
        const newClient = new Client(client);
        await newClient.save();
        return newClient;
      },
      createService: async (_, { service }) => {
        const newService = new Service(service);
        await newService.save();
        return newService;
      },
      createServiceProvided: async (_, { serviceProvided }) => {
        const newServiceProvided = new ServiceProvided(serviceProvided);
        await newServiceProvided.save();
        return newServiceProvided;
      },
      createServiceBooked: async (_, { serviceBooked }) => {
        const newServiceBooked = new ServiceBooked(serviceBooked);
        await newServiceBooked.save();
        return newServiceBooked;
      },
      createAvailability: async (_, { availability }) => {
        const newAvailability = new Availability(availability);
        await newAvailability.save();
        return newAvailability;
      },
      // Include additional mutations as necessary for deleting or editing entities
    },
    Appointment: {
      // Assuming `employee_created` and `client_id` are the fields in your Appointment model that contain the ObjectId references
      employee_created: async (appointment) => {
        // Fetch and return the Employee document based on the employee_created ObjectId
        return await Employee.findById(appointment.employee_created);
      },
      client_id: async (appointment) => {
        // Fetch and return the Client document based on the client_id ObjectId
        return await Client.findById(appointment.client_id);
      },
      // Add other field resolvers as necessary for the Appointment type
    },
  };
  
module.exports = resolvers;
