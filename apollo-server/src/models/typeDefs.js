import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar GraphQLDateTime
  scalar GraphQLDate
  scalar GraphQLTime

  type Query {
    hello(name: String): String
    books: [Book]
    bookings: [Booking]
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

  type Mutation {
    create(title: String, year: Int): Book
    delete(id: ID): ID
    edit(id: ID, title: String, year: Int): Book
    createBooking(booking: BookingInput!): Booking
  }
`;
