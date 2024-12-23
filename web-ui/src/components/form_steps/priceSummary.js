import React from "react";
import { Paper, Typography, Grid, Divider } from "@mui/material";

const convertHoursToHrMin = (hours) => {
  if (hours === undefined) return `0 Hr 0 Min`;
  const hr = Math.floor(hours);
  const min = Math.round((hours - hr) * 60);
  return `${hr} Hr ${min} Min`;
};

const PricingSummary = ({
  prices,
  category,
  service,
  frequency,
  bedrooms,
  bathrooms,
  extras,
}) => {
  const bookSummaryMapping = {
    Category: {
      key: "Category",
      value: category,
    },
    Service: {
      key: "Service",
      value: service,
    },
    Frequency: {
      key: "Frequency",
      value: frequency,
    },
    Bedrooms: {
      key: "Bedrooms",
      value: bedrooms,
    },
    Bathrooms: {
      key: "Bathrooms",
      value: bathrooms,
    },
  };

  const extrasList = {
    "Deep Clean Specific Area": { addOn: "Deep Clean Specific Area", price: 40 },
    Ironing: { addOn: "Ironing", price: 35 },
    Walls: { addOn: "Walls", price: 40 },
    "Fridge Basic Cleaning": { addOn: "Fridge Basic Cleaning", price: 20 },
    "Fridge Deep Cleaning": { addOn: "Fridge Deep Cleaning", price: 50 },
    "Laundry & Folding": { addOn: "Laundry & Folding", price: 35 },
    Folding: { addOn: "Folding", price: 20 },
    "Inside Cabinets": { addOn: "Inside Cabinets", price: 55 },
    "Interior Windows": { addOn: "Interior Windows", price: 30 },
    "Ceiling Fan": { addOn: "Ceiling Fan", price: 30 },
    "Inside Oven": { addOn: "Inside Oven", price: 45 },
    Office: { addOn: "Office", price: 30 },
    Baseboards: { addOn: "Baseboards", price: 20 },
    "Window Blinds": { addOn: "Window Blinds", price: 35 }
  };

  const fixedWidth = 150; // Adjust this value as needed
  
  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: "100%" }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Booking Summary
          </Typography>
        </Grid>
        <Divider style={{ paddingTop: "10px", paddingBottom: "10px" }} variant="middle" />
        {category && (
          <Grid item container alignItems="center">
            <Grid item sx={{ width: fixedWidth }}>
              <Typography sx={{ fontWeight: "light" }}>
                {bookSummaryMapping["Category"].key}
              </Typography>
            </Grid>
            {":"}
            <Grid item>
              <Typography sx={{ fontWeight: "bold", paddingLeft: "10px", }}>
                {bookSummaryMapping["Category"].value}
              </Typography>
            </Grid>
          </Grid>
        )}
        {service && (
          <Grid item container alignItems="center">
            <Grid item sx={{ width: fixedWidth }}>
              <Typography sx={{ fontWeight: "light" }}>
                {bookSummaryMapping["Service"].key}
              </Typography>
            </Grid>
            {":"}
            <Grid item>
              <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
                {bookSummaryMapping["Service"].value}
              </Typography>
            </Grid>
          </Grid>
        )}
        {frequency && (
          <Grid item container alignItems="center">
            <Grid item sx={{ width: fixedWidth }}>
              <Typography sx={{ fontWeight: "light" }}>
                {bookSummaryMapping["Frequency"].key}
              </Typography>
            </Grid>
            {":"}
            <Grid item>
              <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
                {bookSummaryMapping["Frequency"].value}
              </Typography>
            </Grid>
          </Grid>
        )}
        {bedrooms !== undefined && (
          <Grid item container alignItems="center">
            <Grid item sx={{ width: fixedWidth }}>
              <Typography sx={{ fontWeight: "light" }}>
                {bookSummaryMapping["Bedrooms"].key}
              </Typography>
            </Grid>
            {":"}
            <Grid item>
              <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
                {bookSummaryMapping["Bedrooms"].value}
              </Typography>
            </Grid>
          </Grid>
        )}
        {bathrooms !== undefined && (
          <Grid item container alignItems="center">
            <Grid item sx={{ width: fixedWidth }}>
              <Typography sx={{ fontWeight: "light" }}>
                {bookSummaryMapping["Bathrooms"].key}
              </Typography>
            </Grid>
            {":"}
            <Grid item>
              <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
                {bookSummaryMapping["Bathrooms"].value}
              </Typography>
            </Grid>
          </Grid>
        )}
        {extras.length > 0 && (
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Add Ons
            </Typography>
            {extras.map((extra, index) => (
              <Grid item container key={index} alignItems="center">
                <Grid item sx={{ width: fixedWidth, paddingLeft: "10px" }}>
                  <Typography sx={{ fontWeight: "light" }}>{extrasList[extra].addOn}</Typography>
                </Grid>
                {":"}
                <Grid item>
                  <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
                    ${extrasList[extra].price.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
        <Grid item container alignItems="center">
          <Grid item sx={{ width: fixedWidth }}>
            <Typography sx={{ fontWeight: "light" }}>Length</Typography>
          </Grid>
          {":"}
          <Grid item>
            <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
              {convertHoursToHrMin(prices.hours)}
            </Typography>
          </Grid>
        </Grid>
        <Divider style={{ paddingTop: "10px", paddingBottom: "10px" }} variant="middle" />
        <Grid item container alignItems="center">
          <Grid item sx={{ width: fixedWidth }}>
            <Typography variant="body1" sx={{ fontWeight: "light" }}>
              Total Before Tax
            </Typography>
          </Grid>
          {":"}
          <Grid item>
            <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
              ${prices.basePrice.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container alignItems="center">
          <Grid item sx={{ width: fixedWidth }}>
            <Typography variant="body1" sx={{ fontWeight: "light" }}>
              Taxes
            </Typography>
          </Grid>
          {":"}
          <Grid item>
            <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
              ${prices.taxes.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container alignItems="center">
          <Grid item sx={{ width: fixedWidth }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total
            </Typography>
          </Grid>
          {":"}
          <Grid item>
            <Typography sx={{ fontWeight: "bold", paddingLeft: "10px" }}>
              ${prices.total.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PricingSummary;
