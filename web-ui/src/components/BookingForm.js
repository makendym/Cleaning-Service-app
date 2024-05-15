import React, { useEffect, useState } from "react";
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
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useMutation } from "@apollo/client";
// import { CREATE_BOOKING_MUTATION } from "../graphql";
import { Stack, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";
import { AVAILABILITY_QUERY } from "../graphql";
import {
  CREATE_APPOINTMENT_MUTATION,
  CREATE_CLIENT_MUTATION,
} from "../graphql";
import { useQuery } from "@apollo/client";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const names = [
  "Laundry wash and dry + Folding ",
  "Folding",
  "Ironing/Pressing",
  "Fridge Regular Cleaning",
  "Fridge DeepCleaning",
  "Walls",
  "Ceiling fan",
  "Interior Windows",
  "Window blinds",
  "Oven",
  "Fridge",
  "Baseboards",
];
const focusedColor = "#8C52FF";

// const Containers = styled.div`
//   width: 475px;
//   margin: 1em auto;
//   padding: 1em;
//   background-color: #fff;
//   color: #8c52ff;
//   border: 1px solid #f0f0f0;
//   border-radius: 10px;
//   text-align: center;
//   box-shadow: 0 2px 4px #00000018;
//   @media (max-width: 520px) {
//     width: 100%;
//   }
// `;

export default function BookingForm() {
  const location = useLocation();
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  // const [packages, setPackage] = useState(location.state.name || "Regular");
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [service, setService] = useState(location.state.name || "");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [addOns, setAddOns] = useState([]);
  const [pets, setPets] = useState("");
  const [supplies, setSupplies] = useState("");
  const [error, setError] = useState(false);
  const [kindOfPet, setKindOfPet] = useState("");
  const [notes, setNotes] = useState("");
  const [isDayPicked, setIsDayPicked] = useState(false);
  const [isTimePicked, setIsTimePicked] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [createdClientId, setCreatedClientId] = useState(null);
  const [createClient] = useMutation(CREATE_CLIENT_MUTATION);

  const {
    data,
    loading: availabilityLoading,
    error: availabilityError,
  } = useQuery(AVAILABILITY_QUERY, {
    variables: { date: date ? dayjs(date).startOf("day").toISOString() : "" },
    skip: !date, // Skip the query if date is null
    fetchPolicy: "network-only",
  });
  const [dayTimeSlots] = useState([]);
  const [frequency, setFrequency] = React.useState("");

  // useEffect(() => {
  //   console.log(data);
  //   if (data && !availabilityLoading && !availabilityError) {
  //     // Initialize an array of 7 elements for each day of the week
  //     const schedule = Array(7).fill(null);

  //     // Populate the array with timeSlots for each dayOfWeek
  //     data.availability.forEach(({ dayOfWeek, timeSlots }) => {
  //       schedule[dayOfWeek] = timeSlots || []; // Use an empty array for days with no time slots
  //     });

  //     console.log(schedule);
  //     setDayTimeSlots(schedule);
  //   }
  // }, [data, availabilityLoading, availabilityError]);

  // useEffect(() => {
  //   console.log(data);
  //   if (data && !availabilityLoading && !availabilityError) {
  //     // Assuming `data.availability` is structured as shown in your response
  //     const updatedSchedule = data.availability.reduce((acc, curr) => {
  //       acc[curr.dayOfWeek] = curr.timeSlots || [];
  //       return acc;
  //     }, Array(7).fill([]));

  //     console.log(updatedSchedule);
  //     setDayTimeSlots(updatedSchedule);
  //   }
  // }, [data, availabilityLoading, availabilityError]);
  useEffect(() => {
    if (data && !availabilityLoading && !availabilityError) {
      // Directly set the timeSlots for the selected date
      const slotsForSelectedDay =
        data.availability.length > 0 ? data.availability[0].timeSlots : [];
      setTimeSlots(slotsForSelectedDay);
    }
  }, [data, availabilityLoading, availabilityError]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const newTimeSlots = GenerateTimeSlots(newDate);
    setTimeSlots(newTimeSlots);
    setIsDayPicked(true);
  };

  const GenerateTimeSlots = (dates) => {
    const dayOfWeek = dates.day(); // Ensure this matches the day index used in dayTimeSlots
    return dayTimeSlots[dayOfWeek] || []; // Returns the time slots for the day, or an empty array if none
  };

  const handleStartTimeChange = (time) => {
    setSelectedTimeSlot(time);
    setStartTime(time);
    const selectedDateTime = date.format("MMM DD, YYYY") + " " + time;
    console.log("Selected Date and Time:", selectedDateTime);
    setIsTimePicked(true);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  // const TimeSlotSelector = ({ timeSlots, selectedTimeSlot, handleStartTimeChange }) => {
  //   return (
  //       <ToggleButtonGroup
  //           value={selectedTimeSlot}
  //           exclusive
  //           onChange={(event, newTimeSlot) => handleStartTimeChange(newTimeSlot)}
  //           aria-label="time slot"
  //       >
  //           {timeSlots.map((slot, index) => (
  //               <ToggleButton key={index} value={slot} aria-label={slot}>
  //                   {slot}
  //               </ToggleButton>
  //           ))}
  //       </ToggleButtonGroup>
  //   );
  // };
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const TimeSlotSelector = ({
    timeSlots,
    selectedTimeSlot,
    handleStartTimeChange,
  }) => {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography>Select a time slot:</Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {timeSlots.length > 0 ? (
            timeSlots.map((slot, index) => (
              <Grid key={index} item xs={4}>
                <ToggleButtonGroup
                  value={selectedTimeSlot}
                  exclusive
                  onChange={(event, newTimeSlot) =>
                    handleStartTimeChange(newTimeSlot)
                  }
                  aria-label="time slot"
                  fullWidth
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    "& .MuiToggleButtonGroup-grouped": {
                      margin: "5px",
                      width: "100%", // Ensures the button fills the grid item
                      "&.Mui-selected": {
                        backgroundColor: focusedColor, // Selected state background color
                        color: "#fff", // Selected state text color
                        "&:hover": {
                          backgroundColor: focusedColor, // Maintain color on hover
                        },
                      },
                    },
                  }}
                >
                  <ToggleButton
                    value={slot}
                    aria-label={slot}
                    sx={{ padding: "10px", borderRadius: "4px" }}
                  >
                    {slot}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography>No available time slots.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  };

  const steps = [
    "Choose day and time",
    "Add your information",
    "Create a package",
  ];

  const createClientDetails = async () => {
    //This function does not channge the client id after thet user submits and clicks book again but it return a new client ID  when the client reloads page
    if (!createdClientId) {
      // Check if client hasn't been created yet
      try {
        const { data } = await createClient({
          variables: {
            client: {
              first_name: firstName,
              last_name: lastName,
              phone_number: phoneNumber,
              email: email,
              address: address,
              city: city,
              state: state,
              zip: zip,
            },
          },
        });

        if (data && data.createClient && data.createClient.id) {
          console.log("Client created with ID:", data.createClient.id);
          setCreatedClientId(data.createClient.id); // Save the created client ID
          return true; // Indicate success
        }
      } catch (error) {
        console.error("Error creating client:", error);
        // Handle error, for example, by setting an error state
        return false; // Indicate failure
      }
    }
    return true; // Proceed if client already created
  };

  const handleNext = async () => {
    setError(false); // Reset the error state

    if (activeStep === 1) {
      const success = await createClientDetails();
      if (!success) {
        setError(true);
        return; // Halt the next step if client creation fails
      }
    }
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
      (service === "" ||
        type === "" ||
        bedrooms === "" ||
        bathrooms === "" ||
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

  // const [createBookingMutation] = useMutation(CREATE_BOOKING_MUTATION);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION);

  const handleServiceChange = (event) => {
    const newService = event.target.value;
    setService(newService); // Update the service state

    // Reset or update 'type' based on the selected service
    if (newService === "Home cleaning") {
      // If "Home cleaning" is selected and the current type isn't a valid option, reset or set a default value
      if (
        ![
          "Regular home cleaning",
          "Deep cleaning",
          "Move in/out cleaning",
        ].includes(type)
      ) {
        setType(""); // Reset to default or choose a valid initial type for "Home cleaning"
      }
    } else if (newService === "Rental Properties Cleaning") {
      // If "Rental properties" is selected and the current type isn't a valid option, reset or set a default value
      if (!["Basic cleaning", "Deep cleaning"].includes(type)) {
        setType(""); // Reset to default or choose a valid initial type for "Rental properties"
      }
    }
  };

  const handleKitchenChange = (event) => {
    setKitchen(event.target.value);
  };

  const handlePetsChange = (event) => {
    setPets(event.target.value);
  };
  const handleSuppliesChange = (event) => {
    setSupplies(event.target.value);
  };

  const finalStep = () => {
    if (
      activeStep === 2 &&
      (service === "" ||
        bedrooms === "" ||
        bathrooms === "" ||
        kitchen === "" ||
        pets === "" ||
        (pets === "yes" && kindOfPet === "") ||
        supplies === "")
    ) {
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

  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async () => {
    // Prepare the appointment data

    // Assuming `date` is a Dayjs object
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    // Convert startTime from 12-hour format to 24-hour format
    const time24hr = convertTo24Hour(startTime);

    // Combine date and time into an ISO 8601 DateTime string
    const appointmentDateTime = dayjs(`${formattedDate}T${time24hr}:00.000Z`);

    const endDateTime = appointmentDateTime.add(2, "hour");

    const appointmentData = {
      employee_created: "65f44d59832646270adaf864", // employee_id
      client_id: createdClientId, // Assuming createdClientId is correctly obtained earlier
      package: service,
      bedrooms: parseInt(bedrooms, 10),
      bathrooms: parseInt(bathrooms, 10),
      kitchen: kitchen,
      supplies: supplies,
      kindOfPet: kindOfPet,
      add_ons: addOns,
      notes: notes,
      start_time: appointmentDateTime.toISOString(), // Assuming `date` and `startTime` are correctly set
      end_time_expected: endDateTime.toISOString(), // This needs proper calculation based on your logic
      // Include any other fields as required by your GraphQL mutation
    };

    try {
      const response = await createAppointment({
        variables: {
          appointment: appointmentData, // Correctly passing the structured data
        },
      });

      console.log(
        "Appointment created successfully:",
        response.data.createAppointment
      );
      // Reset form state and handle post-creation logic here
      setDate(null);
      setStartTime("");
      setService("");
      setType("");
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
      setSupplies("");
      setKindOfPet("");
      setPets("");
      setAddOns([]);
      setNotes("");
      setStartTime("");
      setBookingSubmitted(true);

      handleEmailConfirmation();
      console.log("Email confirmation sent!");
    } catch (e) {
      console.error("Error creating appointment:", e);
      // Properly handle the error scenario, possibly updating the UI to inform the user
    }
  };

  // const handleSubmit = async () => {
  //   const bookingData = {
  //     createdAt: new Date(),
  //     first_name: firstName,
  //     last_name: lastName,
  //     email: email,
  //     phone_number: phoneNumber,
  //     booking_date: date ? date.startOf("day").toDate() : null,
  //     booking_time: startTime,
  //     address: address,
  //     city: city,
  //     state: state,
  //     zip: zip,
  //     package: service,
  //     bedrooms: parseInt(bedrooms, 10),
  //     bathrooms: parseInt(bathrooms, 10),
  //     kitchen: kitchen,
  //     supplies: supplies,
  //     kindOfPet: kindOfPet,
  //     add_ons: addOns,
  //     notes: notes,
  //   };

  //   const appointmentVariables = {
  //     appointment: {
  //       employee_created: "65f44d59832646270adaf864", // Replace with the actual employee ID
  //       client_id: createdClientId,
  //       client_name: `${firstName} ${lastName}`,
  //       contact: email,
  //       bedrooms: parseInt(bedrooms, 10),
  //       bathrooms: parseInt(bathrooms, 10),
  //       kitchen: kitchen,
  //       supplies: supplies,
  //       kindOfPet: kindOfPet,
  //       add_ons: addOns,
  //       notes: notes,
  //       // Ensure other required fields are included here
  //     },
  //   };
  //   try {
  //     const {
  //       data: { createBooking },
  //     } = await createAppointment({
  //       variables: {
  //         booking: appointmentVariables,
  //       },
  //     });

  //     console.log("Created Booking:", createBooking);
  //     setDate(null);
  //     setStartTime("");
  //     setService("");
  //     setType("");
  //     setFirstName("");
  //     setLastName("");
  //     setAddress("");
  //     setCity("");
  //     setState("");
  //     setEmail("");
  //     setPhoneNumber("");
  //     setBathrooms("");
  //     setBedrooms("");
  //     setZip("");
  //     setKitchen("");
  //     setSupplies("");
  //     setKindOfPet("");
  //     setPets("");
  //     setAddOns([]);
  //     setNotes("");

  //     setBookingSubmitted(true);

  //     handleEmailConfirmation();
  //     console.log("Email confirmation sent!");
  //   } catch (e) {
  //     console.error("Error creating booking:", e);
  //   }
  // };

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
            "&&:hover": {
              backgroundColor: focusedColor,
              color: "#FFFFFF",
            },
            "&&.Mui-selected": {
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
            // "&&:hover": {
            //   backgroundColor: focusedColor,
            // },
            "&&.Mui-selected": {
              backgroundColor: focusedColor,
              color: "#fff",
            },
            "&&.Mui-focusVisible": {
              backgroundColor: focusedColor,
            },
            "&&.Mui-focused": {
              backgroundColor: focusedColor,
            },
          },
        },
      },
    },
  });

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
                      <Grid
                        item
                        xs={12} // Adjust this to fit the entire row for the header and calendar
                        style={{
                          display: "flex",
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
                      </Grid>
                      <Grid
                        item
                        xs={12} // Adjust this to fit the entire row for time slots
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center", // Center horizontally
                          justifyContent: "center", // Center vertically
                        }}
                      >
                        {/* <Typography>Select a time slot:</Typography> */}
                        {/* <Grid
                          container
                          spacing={2}
                          justifyContent="center"
                          alignItems="center"
                        > */}
                        {/* <Grid item xs={12} style={{ textAlign: "center" }}> */}
                        {/* <Typography>Select a time slot:</Typography> */}
                        {/* {timeSlots.length > 0 ? (
                              timeSlots.map((slot, index) => (
                                <Button
                                  key={index}
                                  variant="outlined"
                                  sx={{}}
                                  style={{ margin: 2 }}
                                  onClick={() => handleStartTimeChange(slot)}
                                >
                                  {slot}
                                </Button>
                              ))
                            ) : (
                              <Typography>No available time slots.</Typography>
                            )} */}

                        <TimeSlotSelector
                          timeSlots={timeSlots}
                          selectedTimeSlot={selectedTimeSlot}
                          handleStartTimeChange={handleStartTimeChange}
                        />
                        {/* </Grid> */}
                        {/* </Grid> */}
                      </Grid>
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
                        Choose a service
                      </InputLabel>
                      <Select
                        error={error && service === ""}
                        value={service}
                        onChange={handleServiceChange}
                        variant="outlined"
                        fullWidth
                      >
                        <MenuItem value={"Home cleaning"}>
                          Home cleaning
                        </MenuItem>
                        <MenuItem value={"Rental Properties Cleaning"}>
                          Rental Properties Cleaning
                        </MenuItem>
                      </Select>
                      {error && service === "" && (
                        <Typography variant="caption" color="error">
                          Please choose a service.
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel id="demo-simple-select-label">
                        Type of service
                      </InputLabel>
                      <Select
                        error={error && type === ""}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        variant="outlined"
                        fullWidth
                      >
                        {service === "Home cleaning" && [
                          <MenuItem
                            key="Regular home cleaning"
                            value="Regular home cleaning"
                          >
                            Regular home cleaning
                          </MenuItem>,
                          <MenuItem key="Deep cleaning" value="Deep cleaning">
                            Deep cleaning
                          </MenuItem>,
                          <MenuItem
                            key="Move in/out cleaning"
                            value="Move in/out cleaning"
                          >
                            Move in/out cleaning
                          </MenuItem>,
                        ]}
                        {service === "Rental Properties Cleaning" && [
                          <MenuItem key="Basic cleaning" value="Basic cleaning">
                            Basic cleaning
                          </MenuItem>,
                          <MenuItem key="Deep cleaning" value="Deep cleaning">
                            Deep cleaning
                          </MenuItem>,
                        ]}
                      </Select>
                      {error && type === "" && (
                        <Typography variant="caption" color="error">
                          Please choose a type.
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel id="frequency-radio-group-label">
                        Frequency
                      </InputLabel>
                      <RadioGroup
                        row // This changes the layout to a row
                        aria-labelledby="frequency-radio-group-label"
                        value={frequency}
                        onChange={handleFrequencyChange}
                        name="frequency-radio-group"
                      >
                        <FormControlLabel
                          value="oneTime"
                          control={<Radio />}
                          label="One-time"
                        />
                        <FormControlLabel
                          value="daily"
                          control={<Radio />}
                          label="Daily"
                        />
                        <FormControlLabel
                          value="weekly"
                          control={<Radio />}
                          label="Weekly"
                        />
                        <FormControlLabel
                          value="everyOtherWeek"
                          control={<Radio />}
                          label="Every-other week"
                        />
                        <FormControlLabel
                          value="every4Weeks"
                          control={<Radio />}
                          label="Every 4 weeks"
                        />
                      </RadioGroup>
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
                          min: 0, // Minimum value
                          max: 5, // Maximum value
                          step: ".5",
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
                        <MenuItem value={"Dog"}>Dog</MenuItem>
                        <MenuItem value={"Cat"}>Cat</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
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
                    <Grid item xs={12}>
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
                        placeholder="Leave detailed instructions"
                        variant="outlined"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        multiline
                        rows={3}
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
                    <Button onClick={finalStep} disabled={bookingSubmitted}>
                      Book Appointment
                    </Button>
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
