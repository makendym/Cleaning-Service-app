import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKING_MUTATION } from "../graphql";
import { Stack, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "styled-components";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import emailjs from "@emailjs/browser";

const names = ["Laundry and Folding", "Oven", "Fridge", "Baseboards"];
const focusedColor = "#8C52FF";

const Containers = styled.div`
  width: 475px;
  margin: 1em auto;
  padding: 1em;
  background-color: #fff;
  color: #8c52ff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px #00000018;
  @media (max-width: 520px) {
    width: 100%;
  }
`;
export default function BookingForm() {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [packages, setPackage] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [diningRoom, setDiningRoom] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [addOns, setAddOns] = useState([]);
  const [pets, setPets] = useState("");
  const [supplies, setSupplies] = useState("");
  const [error, setError] = useState(false);
  const [kindOfPet, setKindOfPet] = useState("");
  const [notes, setNotes] = useState("");
  const [isDayPicked, setIsDayPicked] = useState(false);
  const [isTimePicked, setIsTimePicked] = useState(false);

  const steps = [
    "Choose day and time",
    "Add your information",
    "Create a package",
  ];

  const handleNext = () => {
    setError(false); // Reset the error state

    // Check if the current step has incomplete fields and set the error state accordingly
    if (activeStep === 0 && !isDayPicked) {
      setError(true);
    } else if (activeStep === 0 && !isTimePicked) {
      setError(true);
    } else if (
      activeStep === 1 &&
      (firstName === "" ||
        lastName === "" ||
        email === "" ||
        phoneNumber === "" ||
        address === "" ||
        city === "" ||
        state === "" ||
        zip === "")
    ) {
      setError(true);
    } else if (
      activeStep === 2 &&
      (packages === "" ||
        bedrooms === "" ||
        bathrooms === "" ||
        diningRoom === "" ||
        kitchen === "" ||
        pets === "" ||
        (pets === "yes" && kindOfPet === "") ||
        supplies === "")
    ) {
      setError(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setBookingSubmitted(false);
  };

  const [createBookingMutation] = useMutation(CREATE_BOOKING_MUTATION);

  const handleChange = (event) => {
    setPackage(event.target.value);
  };

  const handleKitchenChange = (event) => {
    setKitchen(event.target.value);
  };
  const handleDiningChange = (event) => {
    setDiningRoom(event.target.value);
  };

  const handlePetsChange = (event) => {
    setPets(event.target.value);
  };
  const handleSuppliesChange = (event) => {
    setSupplies(event.target.value);
  };

  const finalStep = () => {
    if (activeStep === 2 && date === null) {
      setError(true);
    } else {
      handleSubmit();
    }
  };

  const handleEmailConfirmation = () => {
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: "Cleaning Services",
          to_name: `${firstName + " " + lastName}`,
          from_email: "makendymidouin99@gmail.com",
          to_email: email,
          message:
            "Your booking has been confirmed! Thank you for booking with us.",
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("EmailJS Response:", response);
        },
        (error) => {
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  const handleSubmit = async () => {
    const bookingData = {
      createdAt: new Date(),
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      booking_date: date ? date.startOf("day").toDate() : null,
      booking_time: startTime,
      address: address,
      city: city,
      state: state,
      zip: zip,
      package: packages,
      bedrooms: parseInt(bedrooms, 10),
      bathrooms: parseInt(bathrooms, 10),
      kitchen: kitchen,
      dining_room: diningRoom,
      supplies: supplies,
      kindOfPet: kindOfPet,
      add_ons: addOns,
      notes: notes,
    };

    try {
      const {
        data: { createBooking },
      } = await createBookingMutation({
        variables: {
          booking: bookingData,
        },
      });

      console.log("Created Booking:", createBooking);
      handleEmailConfirmation();
      console.log("Email confirmation sent!");
      setDate(null);
      setStartTime("");
      setPackage("");
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setState("");
      setEmail("");
      setPhoneNumber("");
      setBathrooms("");
      setBedrooms("");
      setZip("");
      setKitchen("");
      setDiningRoom("");
      setSupplies("");
      setKindOfPet("");
      setPets("");
      setAddOns([]);
      setNotes("");

      setBookingSubmitted(true);
    } catch (e) {
      console.error("Error creating booking:", e);
    }
  };

  // Define your custom theme
  const theme = createTheme({
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
    components: {
      MuiStepIcon: {
        styleOverrides: {
          root: {
            "&.Mui-active": {
              color: "#8C52FF",
            },
            "&.Mui-completed": {
              color: "#8C52FF",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#FFFFFF",
            color: "#8C52FF",
            "&:hover": {
              backgroundColor: focusedColor,
              color: "#FFFFFF",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              //   borderWidth: 1,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: focusedColor,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: focusedColor, // Change border color when focused
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // Input label when focused
            "& label.Mui-focused": {
              color: focusedColor,
            },
            // Focused color for input with variant='standard'
            "& .MuiInput-underline:after": {
              borderBottomColor: focusedColor,
            },
            // Focused color for input with variant='filled'
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: focusedColor,
            },
            // Focused color for input with variant='outlined'
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: focusedColor,
              },
            },
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: focusedColor, // Change the hover background color
            },
            "&.Mui-selected ": {
              backgroundColor: focusedColor, // Change the selected background color
            },
          },
        },
      },
    },
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const handleDateChange = (newDate) => {
    setDate(newDate);

    // Replace this logic with your actual implementation to generate time slots
    const newTimeSlots = generateTimeSlots(newDate);
    setTimeSlots(newTimeSlots);

    setIsDayPicked(true);
  };

  // Replace this function with your logic to generate time slots
  const generateTimeSlots = (dates) => {
    const dayOfWeek = dates.day(); // Get the day of the week (0 for Sunday, 1 for Monday, ...)

    // Define time slots for each day of the week
    const dayTimeSlots = [
      [], // Sunday (no time slots)
      ["10:00 AM", "11:00 AM", "12:00 PM"], // Monday
      [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
      ], // Tuesday
      ["10:00 AM", "11:00 AM", "12:00 PM"], // Wednesday (no time slots)
      [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
      ], // Thursday
      [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
      ], // Friday (no time slots)
      [], // Saturday (no time slots)
    ];

    return dayTimeSlots[dayOfWeek];
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    const selectedDateTime = date.format("MMM DD, YYYY") + " " + startTime;
    console.log("Selected Date and Time:", selectedDateTime);
    setIsTimePicked(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container
          component="main"
          maxWidth="xs"
          style={{ paddingBottom: "50px" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#8C52FF" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Book Now
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Stepper
                activeStep={activeStep}
                sx={{ paddingBottom: "20px", paddingTop: "20px" }}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel
                        {...labelProps}
                        StepIconProps={
                          {
                            // classes: {
                            //   root: "custom-step-icon",
                            //   active: "custom-step-icon-active",
                            //   completed: "custom-step-icon-completed",
                            // },
                          }
                        }
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              {activeStep === 0 && (
                <React.Fragment>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        paddingBottom: "20px",
                        paddingTop: "20px",
                      }}
                    >
                      <Containers
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          flexDirection: "column",
                          alignItems: "center", // Center horizontally
                          justifyContent: "center", // Center vertically
                        }}
                      >
                        <Typography>Pick a Day and Time</Typography>
                        <DateCalendar
                          value={date}
                          disablePast
                          views={["year", "month", "day"]}
                          onChange={handleDateChange}
                        />
                        <div>
                          <Typography>Select a time slot:</Typography>
                          <ul
                            style={{
                              listStyle: "none",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center", // Center horizontally
                              paddingTop: 10,
                              margin: 0,
                              padding: 0,
                              gap: "10px", // Add gap for spacing between time slots
                              flexWrap: "wrap",
                            }}
                          >
                            {timeSlots.map((timeSlot, index) => (
                              <li
                                key={index}
                                style={{
                                  marginBottom: "10px",
                                }}
                              >
                                <Button
                                  onClick={() =>
                                    handleStartTimeChange(timeSlot)
                                  }
                                  style={{
                                    backgroundColor:
                                      startTime === timeSlot
                                        ? focusedColor
                                        : "",
                                    color:
                                      startTime === timeSlot ? "white" : "",
                                  }}
                                >
                                  {timeSlot}
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Containers>
                      {error && !isDayPicked && (
                        <Typography variant="caption" color="error">
                          Please pick a day before proceeding.
                        </Typography>
                      )}
                      {error && !isTimePicked && (
                        <Typography variant="caption" color="error">
                          Please pick a time before proceeding.
                        </Typography>
                      )}
                    </Grid>
                  </Box>
                </React.Fragment>
              )}

              {activeStep === 1 && (
                <React.Fragment>
                  <Grid
                    container
                    spacing={2}
                    sx={{ paddingBottom: "20px", paddingTop: "20px" }}
                  >
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
                </React.Fragment>
              )}

              {activeStep === 2 && !bookingSubmitted ? (
                <React.Fragment>
                  <Grid
                    container
                    spacing={2}
                    sx={{ paddingBottom: "20px", paddingTop: "20px" }}
                  >
                    <Grid item xs={12}>
                      <InputLabel id="demo-simple-select-label">
                        Choose a package
                      </InputLabel>
                      <Select
                        error={error && packages === ""}
                        value={packages}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value={"Customized"}>Customized</MenuItem>
                        <MenuItem value={"Move In/Out"}>Move In/Out</MenuItem>
                      </Select>
                      {error && packages === "" && (
                        <Typography variant="caption" color="error">
                          Please choose a package.
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel> Number of bedrooms</InputLabel>
                      <TextField
                        required
                        error={error && bedrooms === ""}
                        fullWidth
                        id="bedrooms"
                        name="bedrooms"
                        variant="outlined"
                        type="number"
                        value={bedrooms}
                        inputProps={{
                          min: 1, // Minimum value
                          max: 5, // Maximum value
                        }}
                        helperText={
                          error && bedrooms === ""
                            ? "Please enter the number of bedrooms."
                            : " "
                        }
                        onChange={(e) => setBedrooms(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel> Number of bathrooms</InputLabel>
                      <TextField
                        required
                        error={error && bathrooms === ""}
                        fullWidth
                        id="bathrooms"
                        name="bathrooms"
                        variant="outlined"
                        type="number"
                        value={bathrooms}
                        inputProps={{
                          min: 1, // Minimum value
                          max: 5, // Maximum value
                        }}
                        helperText={
                          error && bedrooms === ""
                            ? "Please enter the number of bathrooms."
                            : " "
                        }
                        onChange={(e) => setBathrooms(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel id="demo-simple-select-label">
                        Type of Kitchen
                      </InputLabel>
                      <Select
                        error={error && kitchen === ""}
                        labelId="demo-simple-select-label"
                        id="kitchen"
                        value={kitchen}
                        onChange={handleKitchenChange}
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value={"Kosher"}>Kosher</MenuItem>
                        <MenuItem value={"Non Kosher"}>Non Kosher</MenuItem>
                      </Select>
                      {error && kitchen === "" && (
                        <Typography variant="caption" color="error">
                          Please enter an option.
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel id="demo-simple-select-label">
                        Include dining room
                      </InputLabel>
                      <Select
                        error={error && diningRoom === ""}
                        labelId="demo-simple-select-label"
                        id="diningRoom"
                        value={diningRoom}
                        onChange={handleDiningChange}
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value={"yes"}>Yes</MenuItem>
                        <MenuItem value={"no"}>No</MenuItem>
                      </Select>
                      {error && diningRoom === "" && (
                        <Typography variant="caption" color="error">
                          Please enter an option.
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel id="demo-simple-select-label">
                        Any pets?
                      </InputLabel>
                      <Select
                        error={error && pets === ""}
                        labelId="demo-simple-select-label"
                        id="pets"
                        value={pets}
                        onChange={handlePetsChange}
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value={"yes"}>Yes</MenuItem>
                        <MenuItem value={"no"}>No</MenuItem>
                      </Select>
                      {error && pets === "" && (
                        <Typography variant="caption" color="error">
                          Please enter an option.
                        </Typography>
                      )}
                      {pets === "yes" && (
                        <TextField
                          required
                          fullWidth
                          id="kindOfPet"
                          name="kindOfPet"
                          variant="outlined"
                          placeholder="Enter the type of pet"
                          value={kindOfPet}
                          helperText={
                            error && kindOfPet === ""
                              ? "Please enter the type of pet"
                              : " "
                          }
                          onChange={(e) => setKindOfPet(e.target.value)}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel id="demo-simple-select-label">
                        Have Supplies?
                      </InputLabel>
                      <Select
                        error={error && supplies === ""}
                        labelId="demo-simple-select-label"
                        id="supplies"
                        value={supplies}
                        onChange={handleSuppliesChange}
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value={"yes"}>Yes</MenuItem>
                        <MenuItem value={"no"}>No</MenuItem>
                      </Select>
                      {error && supplies === "" && (
                        <Typography variant="caption" color="error">
                          Please enter an option.
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel> Add-ons</InputLabel>
                      <Select
                        multiple
                        value={addOns}
                        onChange={(e) => setAddOns(e.target.value)}
                        variant="outlined"
                        fullWidth
                        renderValue={(selected) => (
                          <Stack gap={1} direction="row" flexWrap="wrap">
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                onDelete={() =>
                                  setAddOns(
                                    addOns.filter((item) => item !== value)
                                  )
                                }
                                deleteIcon={
                                  <CancelIcon
                                    onMouseDown={(event) =>
                                      event.stopPropagation()
                                    }
                                  />
                                }
                              />
                            ))}
                          </Stack>
                        )}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel> Notes</InputLabel>
                      <TextField
                        placeholder="Leave detailed instrutions"
                        variant="outlined"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        multiline
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              ) : null}

              {bookingSubmitted && (
                <React.Fragment>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      paddingBottom: "20px",
                      paddingTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Thank you for your booking!
                    </Typography>
                    <Typography variant="subtitle1">
                      We have received your booking details.
                    </Typography>
                    <Button style={{ marginTop: "20px" }} onClick={handleReset}>
                      Book Again
                    </Button>
                  </Grid>
                </React.Fragment>
              )}

              {!bookingSubmitted && activeStep !== steps.length && (
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <React.Fragment>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                  </React.Fragment>

                  {activeStep === steps.length - 1 ? (
                    <Button onClick={finalStep}>Book Appointment</Button>
                  ) : (
                    <Button onClick={handleNext}>Next</Button>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
