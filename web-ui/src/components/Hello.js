import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import cleaningSink from "../assets/cleaningSink.jpg";
import star from "../assets/icons-star.png";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ContactForm from "../components/contactForm";

let customTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

customTheme = responsiveFontSizes(customTheme);
export default function Hello() {
  const navigate = useNavigate();

  const RegularBookingPage = () => {
    navigate("/bookingForm", { state: { name: "Regular" } });
  };

  const CustomizedBookingPage = () => {
    navigate("/bookingForm", { state: { id: 1, name: "Customized" } });
  };
  const MoveBookingPage = () => {
    navigate("/bookingForm", { state: { id: 1, name: "Move In/Out" } });
  };
  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          flexGrow: 1,
          padding: "20px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingRight: { xs: "0px", md: "10px" },
            textAlign: { xs: "center", md: "left" },
            marginBottom: { xs: "20px", md: "0px" },
            alignItems: { xs: "center", md: "flex-start" },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              paddingRight: { xs: "0px", md: "10px" },
              textAlign: { xs: "center", md: "left" },
              marginBottom: { xs: "20px", md: "0px" },
              alignItems: { xs: "center", md: "flex-start" },
              position: "relative", // Add relative positioning
              zIndex: 1, // Set a higher z-index to ensure text is on top
            }}
          >
            <Typography
              variant="h2"
              color="white"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Expert home cleaning services.
            </Typography>
            <Typography variant="subtitle1" color="white" sx={{ mb: 2 }}>
              Get a specific room or full home cleaned at times that work best
              for you.
            </Typography>
            <Button
              style={{
                backgroundColor: "#8C52FF",
                width: "140px",
                alignSelf: { xs: "center", md: "flex-start" },
                marginBottom: "10px",
              }}
              variant="contained"
              color="primary"
              size="large"
              onClick={RegularBookingPage}
            >
              Book Now
            </Button>
            <Typography
              variant="subtitle2"
              color="white"
              style={{
                paddingTop: "15px",
                alignSelf: { xs: "center", md: "flex-start" },
                fontSize: "14px",
              }}
              sx={{ mb: 2 }}
            >
              Starting at $22 an hour
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw", // Take the entire viewport width
            height: "100%",
            zIndex: 0,
            overflow: "hidden", // Ensure the video doesn't overflow
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Center the video
              width: "auto",
              height: "100%", // Cover the entire height
              minWidth: "100%", // Ensure the video covers the width
              objectFit: "cover",
              opacity: "0.8",
            }}
          >
            <source
              src="https://d3lh4iw97b9uun.cloudfront.net/vaccum.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>

      <Divider
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
      <Box
        sx={{
          marginTop: "20px",
          paddingX: { xs: "20px", md: "80px" },
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          paddingBottom: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h4"
            color="inherit"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            What are you looking for?
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              mb: { xs: 2, md: 0 },
              mr: { xs: 0, md: 2 },
            }}
          >
            <Button
              sx={{
                width: "100%", // Button takes the full width on all screen sizes
                height: { xs: "70px", md: "170px" },
                borderRadius: "15px",
                backgroundColor: "#f0ecfc",
              }}
              variant="outlined"
              color="inherit"
              size="large"
              onClick={RegularBookingPage}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant={{ xs: "subtitle1", md: "h6" }}
                    color="inherit"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Regular cleaning
                  </Typography>
                  <Typography
                    variant={{ xs: "caption", md: "body1" }}
                    color="inherit"
                    sx={{ mb: 1 }}
                  >
                    Starts at $22/hour
                  </Typography>
                </Box>
                <ArrowForwardIosIcon />
              </Box>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              mb: { xs: 2, md: 0 },
              mr: { xs: 0, md: 2 },
            }}
          >
            <Button
              sx={{
                width: "100%", // Button takes the full width on all screen sizes
                height: { xs: "70px", md: "170px" },
                borderRadius: "15px",
                backgroundColor: "#f0ecfc",
              }}
              variant="outlined"
              color="inherit"
              size="large"
              onClick={CustomizedBookingPage}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant={{ xs: "subtitle1", md: "h6" }}
                    color="inherit"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Customized cleaning
                  </Typography>
                  <Typography
                    variant={{ xs: "caption", md: "body1" }}
                    color="inherit"
                    sx={{ mb: 1 }}
                  >
                    Starts at $22/hour
                  </Typography>
                </Box>
                <ArrowForwardIosIcon />
              </Box>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              mb: { xs: 2, md: 0 },
              mr: { xs: 0, md: 2 },
            }}
          >
            <Button
              sx={{
                width: "100%", // Button takes the full width on all screen sizes
                height: { xs: "70px", md: "170px" },
                borderRadius: "15px",
                backgroundColor: "#f0ecfc",
              }}
              variant="outlined"
              color="inherit"
              size="large"
              onClick={MoveBookingPage}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant={{ xs: "subtitle1", md: "h6" }}
                    color="inherit"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Move in/ out cleaning
                  </Typography>
                  <Typography
                    variant={{ xs: "caption", md: "body1" }}
                    color="inherit"
                    sx={{ mb: 1 }}
                  >
                    Starts at $32/hour
                  </Typography>
                </Box>
                <ArrowForwardIosIcon />
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          paddingX: { xs: "20px", md: "80px" },
          alignItems: "center",
          flexGrow: 1,
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            paddingTop: "10px",
            paddingRight: { xs: "0", md: "10px" },
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingBottom: "50px",
            width: { xs: "100%", md: "75%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <img
              src={star}
              alt="star"
              style={{
                width: "40px",
                height: "40px",
                alignItems: "center",
                marginBottom: { xs: "10px", md: "0" },
              }}
            />
            <Typography
              variant="h4"
              color="inherit"
              sx={{
                fontWeight: "bold",
                mb: { xs: 1, md: 0 },
                paddingLeft: { xs: "0", md: "15px" },
                marginTop: { xs: "10px", md: "0" },
              }}
            >
              Who Are We ?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box style={{ padding: "20px" }}>
              <PersonIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              We have gained valuable experience over the past 2.5 years,
              serving a wide range of customers. From local homes, Airbnb
              properties to luxurious residences.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box style={{ padding: "20px" }}>
              <MeetingRoomIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              We are dedicated to providing exceptional cleaning services
              tailored to your needs. You can trust us to maintain a pristine
              and inviting environment in your home.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box style={{ padding: "20px" }}>
              <AssignmentIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              Works with a 10-point exhaustive cleaning checklist
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "100%", // Set the maxWidth relative to the viewport width
            width: { xs: "100%", md: "80vh" },
            height: "auto",
            borderRadius: "15px",
          }}
        >
          <img
            src={cleaningSink}
            alt="profile"
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "auto",
              maxHeight: "100%",
              borderRadius: "15px",
            }}
          />
        </Box>
      </Box>

      <Divider
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
        variant="middle"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          paddingX: { xs: "20px", md: "80px" },
          alignItems: "center",
          flexGrow: 1,
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            paddingTop: "10px",
            paddingRight: { xs: "0", md: "10px" },
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingBottom: "50px",
            width: { xs: "100%", md: "75%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <img
              src={star}
              alt="star"
              style={{
                width: "40px",
                height: "40px",
                alignItems: "center",
                marginBottom: { xs: "10px", md: "0" },
              }}
            />
            <Typography
              variant="h4"
              color="inherit"
              sx={{
                fontWeight: "bold",
                mb: { xs: 1, md: 0 },
                paddingLeft: { xs: "0", md: "15px" },
                marginTop: { xs: "10px", md: "0" },
              }}
            >
              4.9+ Customer Ratings
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box style={{ padding: "20px" }}>
              <PersonIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              We have gained valuable experience over the past 2.5 years,
              serving a wide range of customers. From local homes, Airbnb
              properties to luxurious residences.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box style={{ padding: "20px" }}>
              <MeetingRoomIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              We are dedicated to providing exceptional cleaning services
              tailored to your needs. You can trust us to maintain a pristine
              and inviting environment in your home.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box style={{ padding: "20px" }}>
              <AssignmentIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              Works with a 10-point exhaustive cleaning checklist
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "100%", // Set the maxWidth relative to the viewport width
            width: { xs: "100%", md: "80vh" },
            height: "auto",
            borderRadius: "15px",
          }}
        >
          <img
            src={cleaningSink}
            alt="cleaningSink"
            style={{
              maxWidth: "100%",
              width: "100%", // Set the width relative to the viewport width
              height: "auto",
              borderRadius: "15px",
            }}
            xs
          />
        </Box>
      </Box>

      <Divider
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
      <Box
        sx={{
          paddingX: { xs: "20px", md: "80px" },
          marginTop: "20px",
          paddingTop: "10px",
          paddingRight: "10px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          paddingBottom: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Row for larger screens
            justifyContent: "space-around", // Evenly distribute content horizontally
            alignItems: "center", // Center content vertically
            gap: "20px",
            width: "100%", // Full width of parent container
            margin: "0 auto", // Center horizontally
          }}
        >

            <ContactForm />
        </Box>
      </Box>

      <Divider variant="middle" />
    </ThemeProvider>
  );
}
