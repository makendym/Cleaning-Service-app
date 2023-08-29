const { ApolloServer } = require('apollo-server-lambda');
const resolvers = require('./utils/resolvers.js');
const typeDefs = require('./utils/models/typeDefs'); 
const mongoose = require('mongoose');
//const { gql } = require("graphql-tag");
// const  Book  = require('./utils/models/Book');
// const Bookings = require('./utils/models/Bookings');

// const typeDefs = gql`
//   scalar GraphQLDateTime
//   scalar GraphQLDate
//   scalar GraphQLTime

//   type Query {
//     bookings: [Booking]
//   }

//   type Booking {
//     id: ID
//     createdAt: GraphQLDateTime
//     updatedAt: GraphQLDateTime
//     first_name: String
//     last_name: String
//     phone_number: String
//     email: String
//     address: String
//     state: String
//     city: String
//     zip: String
//     package: String
//     bedrooms: Int
//     bathrooms: Int
//     kitchen: String
//     dining_room: String
//     supplies: String
//     kindOfPet: String
//     add_ons: [String]
//     notes: String
//     booking_date: GraphQLDateTime
//     booking_time: String
//   }
//   input BookingInput {
//     createdAt: GraphQLDateTime
//     first_name: String
//     last_name: String
//     phone_number: String
//     email: String
//     address: String
//     state: String
//     city: String
//     zip: String
//     package: String
//     bedrooms: Int
//     bathrooms: Int
//     kitchen: String
//     dining_room: String
//     supplies: String
//     kindOfPet: String
//     add_ons: [String]
//     notes: String
//     booking_date: GraphQLDateTime
//     booking_time: String
//   }

//   type Mutation {
//     delete(id: ID): ID
//     createBooking(booking: BookingInput!): Booking
//   }
// `;

// const resolvers = {
//     Query: {
//         bookings: async () => await Bookings.find({}),
//     },
//     Mutation: {
//         createBooking: async (_, { booking }) => {
//             const newBooking = new Bookings(booking);
//             await newBooking.save();
//             return newBooking;
//           },

//     }
// };





const server = new ApolloServer({
  typeDefs, 
  resolvers
});

const pass = "jDhifHm3xdBcE7Qi";
const mongoDB = `mongodb+srv://midouinmakendy:${process.env.REACT_APP_DBPASS}@cluster0.05pe0za.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true);

// Connect to MongoDB using the promise-based approach
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.info('📚 Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });
  

const db = mongoose.connection;
db.once('open', () => {
  console.info('📚 Connected to db', db?.client?._connectionString);
});

const serverHandler = server.createHandler({
    cors: {
      origin: '*'
    }
  });
  
  exports.handler = (event, context, callback) => {
    return serverHandler(
      {
        ...event,
        requestContext: event.requestContext || {},
      },
      context,
      callback
    );
  };