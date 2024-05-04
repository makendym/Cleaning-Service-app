import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setForm({
        name: "",
        email: "",
        message: "",
      });
      setLoading(false);
    }, 2000); // Simulated delay for 2 seconds
  };

  const commonStyles = {
    fontFamily: "League Spartan, sans-serif",
    fontSize: "22px",
    fontWeight: "bold",
  };
  return (
    <Box
      sx={{
        ...commonStyles,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5", // Light grey background
        padding: 3,
        borderRadius: 2,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "auto",
        width: "100%",
      }}
    >
      {/* Heading outside the form but inside the container for overall alignment */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "League Spartan, sans-serif",
          fontWeight: "bold", // Assuming you want the bold weight; adjust as necessary
          marginBottom: "8px", // gutterBottom equivalent, adjust the value as needed
          color: "text.primary", // Use theme's color
        }}
        gutterBottom
      >
        Contact Us
      </Typography>

      {/* Form container */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }} // Ensure the form takes the full width of the container
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="name"
              required
              fullWidth
              id="name"
              label="Your Name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Your Email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="message"
              label="Your Message"
              id="message"
              autoComplete="off"
              multiline
              rows={4}
              value={form.message}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#8C52FF",
            "&:hover": { backgroundColor: "#7A45E5" },
            color: "white",
            mt: 2,
            textTransform: "none",
          }}
          size="large"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Box>
  );
}

export default ContactForm;
