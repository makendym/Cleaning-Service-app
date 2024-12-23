import React, {useEffect, useState} from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";
import {useLocation} from "react-router-dom";
import {useQuery, useMutation} from "@apollo/client";
import {
  AVAILABILITY_QUERY,
  CREATE_APPOINTMENT_MUTATION,
  CREATE_CLIENT_MUTATION,
} from "../graphql";

// import Step1 from "./form_steps/step1";
import Step2 from "./form_steps/step2";
import Step3 from "./form_steps/step3";
import PricingSummary from "./form_steps/priceSummary";
import calculatePrice from "./form_steps/priceCalculation";
// import PaymentComponent from "./form_steps/paymentForm";
const names = [
  "Laundry & Folding",
  "Folding",
  "Ironing",
  "Fridge Basic Cleaning",
  "Fridge Deep Cleaning",
  "Walls",
  "Ceiling Fan",
  "Interior Windows",
  "Window Blinds",
  "Inside Oven",
  "Baseboards",
  "Deep Clean Specific Area",
  "Inside Cabinets",
  "Office",
];
const focusedColor = "#8C52FF";

export default function BookingForm() {
  const location = useLocation();
  const [date, setDate] = useState(dayjs());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
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
  const [dayTimeSlots] = useState([]);
  const [frequency, setFrequency] = useState("");
  const [prices, setPrices] = useState({});

  console.log("Expected Duration (prices):", prices.hours);
  const {
    data,
    loading: availabilityLoading,
    error: availabilityError,
  } = useQuery(AVAILABILITY_QUERY, {
    variables: {
      date: date ? dayjs(date).startOf("day").toISOString() : "",
      expectedDuration: prices.hours,
    },
    skip: !date,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (
      activeStep === 1 &&
      date &&
      data &&
      !availabilityLoading &&
      !availabilityError
    ) {
      // Directly set the timeSlots for the selected date
      const slotsForSelectedDay =
        data.availability.length > 0 ? data.availability[0].timeSlots : [];
      setTimeSlots(slotsForSelectedDay);
    }
  }, [data, date, availabilityLoading, availabilityError, activeStep]);

  useEffect(() => {
    const handlePriceSummary = () => {
      const calculatedPrices =
        service !== "" &&
        type !== "" &&
        frequency !== "" &&
        bedrooms !== "" &&
        bathrooms !== ""
          ? calculatePrice(
              service,
              type,
              frequency,
              bedrooms,
              bathrooms,
              addOns
            )
          : {
              basePrice: 0,
              taxes: 0,
              total: 0,
              hours: 0,
              discount: 0,
              profit: 0,
              discountTotal: 0,
              employeeCost: 0,
            };

      setPrices(calculatedPrices);
    };

    handlePriceSummary();
    console.log(prices.hours);
  }, [service, type, frequency, bedrooms, bathrooms, addOns, prices.hours]);

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
    if (date) {
      setSelectedTimeSlot(time);
      const selectedDateTime = date.format("MMM DD, YYYY") + " " + time;
      console.log("Selected Date and Time:", selectedDateTime);
      setIsTimePicked(true);
    } else {
      console.error("Date is not selected.");
    }
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const createClientDetails = async () => {
    if (!createdClientId) {
      try {
        const {data} = await createClient({
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
          setCreatedClientId(data.createClient.id);
          return true;
        }
      } catch (error) {
        console.error("Error creating client:", error);
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    setError(false);

    if (activeStep === 0) {
      const success = await createClientDetails();
      if (!success) {
        setError(true);
        return;
      }
    }
    if (activeStep === 1 && !isDayPicked) {
      setError(true);
    } else if (activeStep === 1 && !isTimePicked) {
      setError(true);
    } else if (
      activeStep === 0 &&
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
      activeStep === 1 &&
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
    setDate(dayjs());
    setSelectedTimeSlot(null);
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
    setFrequency("");
    setIsDayPicked(false);
    setIsTimePicked(false);
    setCreatedClientId(null);
  };

  const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION);

  const handleServiceChange = (event) => {
    const newService = event.target.value;
    setService(newService);

    if (newService === "Home cleaning") {
      if (
        !["Regular cleaning", "Deep cleaning", "Move in/out cleaning"].includes(
          type
        )
      ) {
        setType("");
      }
    } else if (newService === "Rental Properties Cleaning") {
      if (!["Basic cleaning", "Deep cleaning"].includes(type)) {
        setType("");
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
      activeStep === 1 &&
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
          from_name: "PurpleGlow Cleaning Services",
          to_name: `${firstName + " " + lastName}`,
          from_email: "makendymidouin99@gmail.com",
          to_email: email,
          service_type: service,
          scheduled_date: dayjs(date).format("MMMM D, YYYY"),
          scheduled_time: selectedTimeSlot,
          service_address: `${address}, ${city}, ${state} ${zip}`,
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
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const time24hr = convertTo24Hour(selectedTimeSlot);
    const appointmentDateTime = dayjs(`${formattedDate}T${time24hr}:00.000Z`);

    const endDateTime = appointmentDateTime.add(prices.hours, "hour");

    const appointmentData = {
      employee_created: "65f44d59832646270adaf864",
      client_id: createdClientId,
      package: service,
      bedrooms: parseInt(bedrooms, 10),
      bathrooms: parseInt(bathrooms, 10),
      kitchen: kitchen,
      supplies: supplies,
      kindOfPet: kindOfPet,
      add_ons: addOns,
      notes: notes,
      start_time: appointmentDateTime.toISOString(),
      end_time_expected: endDateTime.toISOString(),
    };

    try {
      const response = await createAppointment({
        variables: {
          appointment: appointmentData,
        },
      });

      console.log(
        "Appointment created successfully:",
        response.data.createAppointment
      );
      setDate(dayjs());
      setSelectedTimeSlot(null);
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
      setFrequency("");
      setBookingSubmitted(true);
      setCreatedClientId(null);
      handleEmailConfirmation();
      console.log("Email confirmation sent!");
    } catch (e) {
      console.error("Error creating appointment:", e);
    }
  };

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
            borderRadius: "20px",
            padding: "12px 22px",
            fontWeight: "bold",
            "&&:hover": {
              backgroundColor: focusedColor,
              color: "#FFFFFF",
            },
            "&&.Mui-selected": {
              backgroundColor: focusedColor,
              color: "#FFFFFF",
            },
            "&&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px rgba(140, 82, 255, 0.5)",
            },
            "&&:focus-visible": {
              outline: "none",
              boxShadow: "0 0 0 2px rgba(140, 82, 255, 0.5)",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            "& .MuiOutlinedInput-notchedOutline": {},
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: focusedColor,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: focusedColor,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label.Mui-focused": {
              color: focusedColor,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: focusedColor,
            },
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: focusedColor,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
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
            "&&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px rgba(140, 82, 255, 0.5)",
            },
            "&&:focus-visible": {
              outline: "none",
              boxShadow: "0 0 0 2px rgba(140, 82, 255, 0.5)",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{paddingBottom: "50px"}}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <Container
              component="main"
              maxWidth="sm"
            >
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{m: 1, bgcolor: "#8C52FF"}}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                >
                  Book Now
                </Typography>

                <Box sx={{width: "100%"}}>
                  <Stepper
                    activeStep={activeStep}
                    sx={{paddingBottom: "20px", paddingTop: "20px"}}
                  >
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      return (
                        <Step
                          key={label}
                          {...stepProps}
                        >
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  {/* {activeStep === 0 && (
                    <Step1
                      date={date}
                      handleDateChange={handleDateChange}
                      timeSlots={timeSlots}
                      selectedTimeSlot={selectedTimeSlot}
                      handleStartTimeChange={handleStartTimeChange}
                      error={error}
                      isDayPicked={isDayPicked}
                      isTimePicked={isTimePicked}
                    />
                  )} */}
                  {activeStep === 0 && (
                    <Step2
                      firstName={firstName}
                      setFirstName={setFirstName}
                      lastName={lastName}
                      setLastName={setLastName}
                      email={email}
                      setEmail={setEmail}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      address={address}
                      setAddress={setAddress}
                      city={city}
                      setCity={setCity}
                      state={state}
                      setState={setState}
                      zip={zip}
                      setZip={setZip}
                      error={error}
                    />
                  )}
                  {activeStep === 1 && !bookingSubmitted && (
                    <Step3
                      service={service}
                      handleServiceChange={handleServiceChange}
                      type={type}
                      setType={setType}
                      frequency={frequency}
                      handleFrequencyChange={handleFrequencyChange}
                      bedrooms={bedrooms}
                      setBedrooms={setBedrooms}
                      bathrooms={bathrooms}
                      setBathrooms={setBathrooms}
                      kitchen={kitchen}
                      handleKitchenChange={handleKitchenChange}
                      pets={pets}
                      handlePetsChange={handlePetsChange}
                      supplies={supplies}
                      handleSuppliesChange={handleSuppliesChange}
                      addOns={addOns}
                      setAddOns={setAddOns}
                      notes={notes}
                      setNotes={setNotes}
                      error={error}
                      names={names}
                      kindOfPet={kindOfPet}
                      setKindOfPet={setKindOfPet}
                      setBookingSubmitted={setBookingSubmitted}
                      prices={prices}
                      date={date}
                      handleDateChange={handleDateChange}
                      timeSlots={timeSlots}
                      selectedTimeSlot={selectedTimeSlot}
                      handleStartTimeChange={handleStartTimeChange}
                      // error={error}
                      isDayPicked={isDayPicked}
                      isTimePicked={isTimePicked}
                    />
                  )}
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
                        <Typography
                          variant="h6"
                          gutterBottom
                        >
                          Thank you for your booking!
                        </Typography>
                        <Typography variant="subtitle1">
                          We have received your booking details.
                        </Typography>
                        <Button
                          style={{marginTop: "20px"}}
                          onClick={handleReset}
                        >
                          Book Again
                        </Button>
                      </Grid>
                    </React.Fragment>
                  )}
                  {!bookingSubmitted && activeStep !== steps.length && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        pt: 2,
                        paddingY: "20px",
                      }}
                    >
                      <React.Fragment>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{mr: 1}}
                        >
                          Back
                        </Button>
                        <Box sx={{flex: "1 1 auto"}} />
                      </React.Fragment>

                      {activeStep === steps.length - 1 ? (
                        <Button
                          onClick={finalStep}
                          disabled={bookingSubmitted}
                          variant="contained"
                          sx={{
                            backgroundColor: focusedColor,
                            color: "#FFFF",
                          }}
                        >
                          Book Appointment
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          variant="contained"
                          sx={{
                            backgroundColor: focusedColor,
                            color: "#FFFF",
                          }}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Container>
          </Grid>
          {activeStep === 1 && (
            <Grid
              item
              xs={12}
              md={3.5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{width: "100%"}}>
                <PricingSummary
                  prices={prices}
                  category={service}
                  service={type}
                  frequency={frequency}
                  bedrooms={bedrooms}
                  bathrooms={bathrooms}
                  extras={addOns}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

const steps = ["Add your information", "Create a package"];
