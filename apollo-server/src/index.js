import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {resolvers} from '../resolvers.js';
import {typeDefs} from './models/typeDefs.js';
import mongoose from 'mongoose';

const server = new ApolloServer({typeDefs, resolvers});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
const pass = "jDhifHm3xdBcE7Qi"
const mongoDB = `mongodb+srv://midouinmakendy:${pass}@cluster0.05pe0za.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true);
const db = await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
});

console.info('📚 Connected to db', db?.connections[0]?._connectionString);
console.info(`🚀 Server ready at ${url}`);