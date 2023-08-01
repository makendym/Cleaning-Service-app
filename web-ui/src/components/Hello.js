import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import Box from "@mui/material/Box";
import cleaningMirror from "../assets/cleaningMirror.jpg";
import cleaningSink from "../assets/cleaningSink.jpg";
import star from "../assets/icons-star.png";
import profile from "../assets/Profile.jpg";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
const HELLO_QUERY = gql`
  query Query($name: String) {
    hello(name: $name)
  }
`;

let customTheme = createTheme({
  typography: {
    fontFamily: "Squada One",
  },
});

customTheme = responsiveFontSizes(customTheme);
export default function Hello() {
  const navigate = useNavigate();
  const BookingPage = () => {
    navigate("/bookingForm");
  };

  const { data, loading, error } = useQuery(HELLO_QUERY, {
    variables: { name: "Brythanie" },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) {
    console.error("HELLO_QUERY error", error);
  }

  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />

      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingRight: "10px",
          }}
        >
          <Typography
            variant="h2"
            color="inherit"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Expert home cleaning services.
          </Typography>
          <Typography variant="subtitle1" color="inherit" sx={{ mb: 2 }}>
            Get a specific room or full home cleaned at times that work best for
            you.
          </Typography>
          <Button
            style={{ backgroundColor: "#8C52FF", width: "140px" }}
            variant="contained"
            color="primary"
            size="large"
            onClick={BookingPage}
          >
            Book Now
          </Button>
          <Typography
            variant="subtitle2"
            color="inherit"
            style={{
              paddingTop: "15px",
              paddingRight: "10px",
              paddingLeft: "5px",
              fontSize: "14px",
            }}
            sx={{ mb: 2 }}
          >
            Starting at $22 an hour
          </Typography>
        </Box>
        <Box
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            maxWidth: "100%", // Set the maxWidth relative to the viewport width
            width: "60vh",
            height: "auto",
            borderRadius: "15px",
          }}
        >
          <img
            src={cleaningMirror}
            alt="cleaningMirror"
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "auto",
              borderRadius: "15px",
            }}
          />
        </Box>
      </Box>

      <Divider
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
      <Box
        sx={{
          marginTop: "20px",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          paddingBottom: "50px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "column", flexGrow: 1 }}>
          <Typography
            variant="h4"
            color="inherit"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            What are you looking for?
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <Button
              sx={{
                width: { xs: "100%", md: "400px" },
                height: { xs: "150px", md: "200px" },
                borderRadius: "15px",
                mb: { xs: 2, md: 0 },
                mr: { xs: 0, md: 2 },
                backgroundColor: "#f0ecfc",
              }}
              variant="outlined"
              color="inherit"
              size="large"
              onClick={BookingPage}
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
                    variant="h6"
                    color="inherit"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Regular Cleaning
                  </Typography>
                  <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
                    Starts at $22/hour
                  </Typography>
                </Box>
                <ArrowForwardIosIcon />
              </Box>
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Button
              sx={{
                width: { xs: "100%", md: "400px" },
                height: { xs: "150px", md: "200px" },
                borderRadius: "15px",
                mb: { xs: 2, md: 0 },
                mr: { xs: 0, md: 2 },
                backgroundColor: "#f0ecfc",
              }}
              variant="outlined"
              color="inherit"
              size="large"
              onClick={BookingPage}
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
                    variant="h6"
                    color="inherit"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Move in/ out cleaning
                  </Typography>
                  <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
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
              flexDirection: "row",
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
              }}
            />
            <Typography
              variant="h4"
              color="inherit"
              sx={{
                fontWeight: "bold",
                mb: 1,
                paddingLeft: "15px",
                marginTop: "10px",
              }}
            >
              Who am I ?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              width: "75%",
            }}
          >
            <Box style={{ padding: "20px" }}>
              {" "}
              <PersonIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              I have gained valuable cleaning experience over the past 2.5
              years, serving a wide range of customers. From local homes to
              luxurious residences and even Airbnb properties, I have had the
              privilege of ensuring clean and comfortable living spaces for many
              satisfied clients.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              width: "75%",
            }}
          >
            <Box style={{ padding: "20px" }}>
              <MeetingRoomIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              With my expertise and attention to detail, I am dedicated to
              providing exceptional cleaning services tailored to your specific
              needs. You can trust me to maintain a pristine and inviting
              environment in your home or rental property.
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
            width: "80vh",
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
          marginTop: "20px",
          paddingTop: "20px",
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
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
              flexDirection: "row",
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
              }}
            />
            <Typography
              variant="h4"
              color="inherit"
              sx={{
                fontWeight: "bold",
                mb: 1,
                paddingLeft: "15px",
                marginTop: "10px",
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
              width: "75%",
            }}
          >
            <Box style={{ padding: "20px" }}>
              {" "}
              <PersonIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              I have gained valuable cleaning experience over the past 2.5
              years, serving a wide range of customers. From local homes to
              luxurious residences and even Airbnb properties, I have had the
              privilege of ensuring clean and comfortable living spaces for many
              satisfied clients.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              width: "75%",
            }}
          >
            <Box style={{ padding: "20px" }}>
              <MeetingRoomIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              With my expertise and attention to detail, I am dedicated to
              providing exceptional cleaning services tailored to your specific
              needs. You can trust me to maintain a pristine and inviting
              environment in your home or rental property.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              width: "75%",
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
            width: "80vh",
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
          />
        </Box>
      </Box>
      <Divider
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
      <Box
        sx={{
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
            flexDirection: "column",
            width: "fit-content", // Adjust the width to fit the contents inside
            margin: "0 auto", // Center the inner box horizontally
          }}
        >
          <Typography
            variant="h4"
            color="inherit"
            sx={{ mb: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Got questions?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              flexGrow: 1,
            }}
          >
            <Box style={{ padding: "20px" }}>
              <EmailIcon />
            </Box>
            <Typography
              variant="body1"
              color="inherit"
              sx={{ mb: 1, paddingTop: "20px" }}
            >
              <Typography
                variant="body1"
                color="inherit"
                sx={{ fontWeight: "bold", paddingRight: "10px" }}
              >
                Email us:
              </Typography>
              Brythanie.Despagne20@gmail.com
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
              <PhoneInTalkIcon />
            </Box>
            <Typography variant="body1" color="inherit" sx={{ mb: 1 }}>
              <Typography
                variant="body1"
                color="inherit"
                sx={{ fontWeight: "bold", paddingRight: "15px" }}
              >
                Call us:
              </Typography>
              845-428-3520
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box>
        {loading && "Loading..."}
        {error && "Error (check console logs)"}
        {!loading && !error}
      </Box>
    </ThemeProvider>
  );
}
