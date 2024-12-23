import { Client } from 'square';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    userAgentDetail: "sample_app_node_payment"
};

const defaultClient = new Client(config);

export const paymentsApi = defaultClient.paymentsApi;
export const locationsApi = defaultClient.locationsApi;
