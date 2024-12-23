import express from "express";
import crypto from "crypto";
import {paymentsApi, locationsApi} from "../util/square-client.js";

const router = express.Router();


router.post("/process-payment", async (req, res) => {
    const token = req.body.token;
    const idempotencyKey = req.body.idempotencyKey;

  // get the currency for the location
  const locationResponse = await locationsApi.retrieveLocation(process.env.SQ_LOCATION_ID);
  const currency = locationResponse.result.location.currency;

  // Charge the customer's card
  const requestBody = {
    idempotencyKey,
    sourceId: token,
    amountMoney: {
      amount: 100, // $1.00 charge
      currency,
    },
  };

  try {
    const {
      result: {payment},
    } = await paymentsApi.createPayment(requestBody);

    const result = JSON.stringify(
      payment,
      (key, value) => {
        return typeof value === "bigint" ? parseInt(value) : value;
      },
      4
    );

    res.json({
      result,
    });
  } catch (error) {
    res.json(error.result);
  }
});

export default router;