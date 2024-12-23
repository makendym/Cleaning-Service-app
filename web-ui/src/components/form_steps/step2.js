import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

const Step2 = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, phoneNumber, setPhoneNumber, address, setAddress, city, setCity, state, setState, zip, setZip, error }) => {
  return (
    <Grid container spacing={2} sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
      <Grid item xs={12} sm={6}>
        <TextField
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          variant="outlined"
          autoFocus
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {error && firstName === "" && (
          <Typography variant="caption" color="error">
            Please enter your first name.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {error && lastName === "" && (
          <Typography variant="caption" color="error">
            Please enter your last name.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && email === "" && (
          <Typography variant="caption" color="error">
            Please enter your email.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="phoneNumber"
          label="Phone Number"
          type="telephone"
          id="phoneNumber"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {error && phoneNumber === "" && (
          <Typography variant="caption" color="error">
            Please enter your phone number.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="address"
          label="Street Address"
          name="address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && address === "" && (
          <Typography variant="caption" color="error">
            Please enter your address.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {error && city === "" && (
          <Typography variant="caption" color="error">
            Please enter your city.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="state"
          label="State"
          name="state"
          variant="outlined"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        {error && state === "" && (
          <Typography variant="caption" color="error">
            Please enter your state.
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="zip"
          label="Zip Code"
          name="zip"
          variant="outlined"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        {error && zip === "" && (
          <Typography variant="caption" color="error">
            Please enter your zip code.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Step2;
