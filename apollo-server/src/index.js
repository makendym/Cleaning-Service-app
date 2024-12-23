import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import { paymentsApi } from './util/square-client.js';
import { resolvers } from '../resolvers.js';
import { typeDefs } from './models/typeDefs.js';
import cors from 'cors';  // Import cors
import routes from './routes/index.js';

dotenv.config();

// Extend BigInt.prototype to handle JSON serialization
BigInt.prototype.toJSON = function () {
    return this.toString();
};
  
const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connection
const pass = process.env.DB_PASSWORD;
const mongoDB = `mongodb+srv://midouinmakendy:${pass}@cluster0.05pe0za.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', true);

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
}).then(db => {
    console.info('📚 Connected to db', db?.connections[0]?._connectionString);
}).catch(err => {
    console.error('Error connecting to db', err);
});

// Express middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Specify your frontend URL
    credentials: true,
}));

// Payment Route
app.post('/process-payment', async (req, res) => {
    console.log('Square Access Token:', process.env.SQUARE_ACCESS_TOKEN); // Debug log
    const { sourceId, amount } = req.body;
    const idempotencyKey = crypto.randomUUID();

    try {
        const requestBody = {
            idempotencyKey,
            sourceId,
            amountMoney: {
                amount: parseInt(amount, 10), // Ensure amount is an integer
                currency: 'USD',
            },
        };

        const { result } = await paymentsApi.createPayment(requestBody);
        console.log('Payment result:', result); // Debug log

        res.status(200).json(result);
    } catch (error) {
        console.error('Error processing payment:', error); // Debug log
        res.status(500).json(error.result);
    }
});

// Use routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
} else {
    // development error handler
    // will print stacktrace
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
});

// Start Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection
    csrfPrevention: false, // Disable CSRF prevention
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        cors: {
            origin: '*', // Allow all origins
            methods: ['POST', 'GET'],
            allowedHeaders: ['Content-Type', 'Authorization']
        },
    });
    console.info(`🚀 Apollo Server ready at ${url}`);
};

startServer();