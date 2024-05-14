import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar GraphQLDateTime
  scalar GraphQLDate
  scalar GraphQLTime

  type Query {
    hello(name: String): String
    books: [Book]
    bookings: [Booking]
    appointments: [Appointment]
    employees: [Employee]
    clients: [Client]
    services: [Service]
    servicesProvided: [ServiceProvided]
    servicesBooked: [ServiceBooked]
    availability(date: String!): [Availability]
  }

  type Book {
    id: ID
    title: String
    year: Int
  }

  type Booking {
    id: ID
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    first_name: String
    last_name: String
    phone_number: String
    email: String
    address: String
    state: String
    city: String
    zip: String
    package: String
    bedrooms: Int
    bathrooms: Int
    kitchen: String
    supplies: String
    kindOfPet: String
    add_ons: [String]
    notes: String
    booking_date: GraphQLDateTime
    booking_time: String
  }
  input BookingInput {
    createdAt: GraphQLDateTime
    first_name: String
    last_name: String
    phone_number: String
    email: String
    address: String
    state: String
    city: String
    zip: String
    package: String
    bedrooms: Int
    bathrooms: Int
    kitchen: String
    supplies: String
    kindOfPet: String
    add_ons: [String]
    notes: String
    booking_date: GraphQLDateTime
    booking_time: String
  }

  type Appointment {
    id: ID
    date_created: GraphQLDateTime
    employee_created: Employee
    client_id: Client
    package: String
    bedrooms: Int
    bathrooms: Int
    kitchen: String
    supplies: String
    kindOfPet: String
    add_ons: [String]
    notes: String
    start_time: GraphQLDateTime
    end_time_expected: GraphQLDateTime
    end_time: GraphQLDateTime
    price_expected: Float
    price_full: Float
    price_final: Float
    canceled: Boolean
    cancellation_reason: String
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }

  type Employee {
    id: ID
    first_name: String
    last_name: String
  }

  type Client {
    id: ID
    first_name: String
    last_name: String
    phone_number: String
    email: String
    address: String
    state: String
    city: String
    zip: String
  }

  type Service {
    id: ID
    name: String
    description: String
    duration: Int
    price: Float
  }

  type ServiceProvided {
    id: ID
    service: Service
    employee: Employee
    availability: String
    customizations: [String]
    active: Boolean
  }

  type ServiceBooked {
    id: ID
    appointment: Appointment
    serviceProvided: ServiceProvided
    specialRequests: String
    serviceStartTime: GraphQLDateTime
    serviceEndTime: GraphQLDateTime
    priceAtBooking: Float
    status: String
  }

  input AppointmentInput {
    id: ID
    date_created: GraphQLDateTime
    employee_created: ID!
    client_id: ID!
    package: String
    bedrooms: Int
    bathrooms: Int
    kitchen: String
    supplies: String
    kindOfPet: String
    add_ons: [String]
    notes: String
    start_time: GraphQLDateTime
    end_time_expected: GraphQLDateTime
    end_time: GraphQLDateTime
    price_expected: Float
    price_full: Float
    price_final: Float
    canceled: Boolean
    cancellation_reason: String
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }
  
  input ClientInput {
    first_name: String!
    last_name: String!
    phone_number: String
    email: String
    address: String
    state: String
    city: String
    zip: String
  }
  input EmployeeInput {
    first_name: String
    last_name: String
  }

  input ServiceInput {
    name: String!
    description: String
    duration: Int!
    price: Float!
  }

  input ServiceProvidedInput {
    serviceId: ID!
    employeeId: ID
    availability: String
    customizations: [String]
    active: Boolean
  }

  input ServiceBookedInput {
    appointmentId: ID!
    serviceProvidedId: ID!
    specialRequests: String
    serviceStartTime: GraphQLDateTime!
    serviceEndTime: GraphQLDateTime
    priceAtBooking: Float
    status: String
  }
  type Availability {
    dayOfWeek: Int
    timeSlots: [String]
  }
  input AvailabilityInput {
    dayOfWeek: Int
    timeSlots: [String]
  }


  type Mutation {
    create(title: String, year: Int): Book
    delete(id: ID): ID
    edit(id: ID, title: String, year: Int): Book
    createBooking(booking: BookingInput!): Booking
    createAppointment(appointment: AppointmentInput!): Appointment
    createEmployee(employee: EmployeeInput): Employee
    createClient(client: ClientInput!): Client
    createService(service: ServiceInput!): Service
    createServiceProvided(serviceProvided: ServiceProvidedInput!): ServiceProvided
    createServiceBooked(serviceBooked: ServiceBookedInput!): ServiceBooked
    createAvailability(availability: AvailabilityInput!): Availability
  }
`;