import * as React from "react";
import cleaningSink from "../assets/cleaningSink.jpg";
// import starIcon from "../assets/icons-star.png";
import {useNavigate} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PersonIcon from "@mui/icons-material/Person";
// import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ContactForm from "../components/contactForm";
import Reviews from "../layout/reviews";
import BeforeAfterImage from "../layout/beforeAfterImage";
import Faq from "../layout/faq";
import WhyUs from "../layout/whyUs";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  GlobalStyles,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const focusedColor = "#8C52FF";

let customTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "10px 22px",
          backgroundColor: "#f0ecfc", // Default background
          color: "black", // Default color
          borderColor: "transparent",
          "&:hover": {
            backgroundColor: focusedColor, // Ensure this color is defined and correct
            color: "white",
            outline: "none", // Removing any browser-applied outline
            borderColor: "transparent", // Ensuring no border color is causing the blue highlight
          },
          "&&.Mui-selected, &&.Mui-focusVisible": {
            backgroundColor: "#f0ecfc",
            color: focusedColor,
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px rgba(140, 82, 255, 0.5)",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "0 0 0 2px rgba(140, 82, 255, 0.5)",
          },
        },
      },
    },
  },
});

const VideoBackground = ({src}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
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
          transform: "translate(-50%, -50%)",
          width: "auto",
          height: "100%",
          minWidth: "100%",
          objectFit: "cover",
          opacity: 0.8,
        }}
        src={src}
      />
    </Box>
  );
};
customTheme = responsiveFontSizes(customTheme);
export default function Hello() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();

  const RegularBookingPage = () => {
    navigate("/bookingForm", {state: {name: "Home cleaning"}});
  };

  const RentalBookingPage = () => {
    navigate("/bookingForm", {
      state: {id: 1, name: "Rental Properties Cleaning"},
    });
  };


  return (
    <ThemeProvider theme={customTheme}>
      {/* expert home section */}
      <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: "none"}}} />
      <Box
        sx={{
          position: "relative",
          height: "40vh",
          overflow: "hidden",
        }}
      >
        <VideoBackground src="https://d3lh4iw97b9uun.cloudfront.net/vaccum.mp4" />

        <Grid
          container
          sx={{zIndex: 1, position: "relative", height: "100%", px: 2}}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            sx={{
              textAlign: {xs: "center", md: "center"},
              maxWidth: "lg",
              mx: "auto",
            }}
          >
            <Typography
              variant="h3"
              color="white"
              sx={{fontWeight: "bold", mb: 2}}
            >
              Elevate Your Space With A Touch Of Purple
            </Typography>
            <Button
              onClick={RegularBookingPage}
              sx={{
                backgroundColor: "#8C52FF",
                "&:hover": {backgroundColor: "#7A45E5"},
                color: "white",
                mt: 2,
                textTransform: "none",
                borderRadius: "20px",
              }}
              variant="contained"
              size="large"
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider
        style={{paddingTop: "20px", paddingBottom: "20px"}}
        variant="middle"
      />
      {/* What are you looking for section */}
      <Box sx={{overflow: "hidden", px: {xs: 2.5, md: 10}, py: 5}}>
        <Box
          sx={{
            width: "100%",
            paddingY: "50px",
            paddingX: {xs: "20px", md: "80px"},
            backgroundColor: "#f7f7f7",
            margin: "0 auto",
          }}
        >
          {/* <Box sx={{overflow: "hidden", px: {xs: 2.5, md: 10}, py: 5}}> */}
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row"},
              justifyContent: "space-around",
              alignItems: "center",
              textAlign: "center",
              gap: "10px",
              width: "100%",
              margin: "0 auto",
              paddingX: {xs: "20px", md: "80px"},
              backgroundColor: "#f7f7f7",
            }}
          > */}
          <Grid
            container
            direction="column"
            sx={{
              mt: 2.5,
              px: {xs: 2.5, md: 10},
              pt: 2.5,
              flexGrow: 1,
              pb: 6.25,
            }}
          >
            <Grid item>
              <Typography
                variant="h4"
                sx={{fontWeight: "bold", mb: 8, textAlign: "center"}}
              >
                What are you looking for?
              </Typography>
            </Grid>
            <Grid
              item
              container
              spacing={8}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  fullWidth
                  sx={{
                    height: {xs: "70px", md: "170px"},
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: 3,
                  }}
                  variant="outlined"
                  onClick={RegularBookingPage}
                >
                  <Typography
                    variant={isMdUp ? "h6" : "subtitle1"}
                    sx={{fontWeight: "bold", flexGrow: 1, textAlign: "center"}}
                  >
                    Home cleaning
                  </Typography>
                  <ArrowForwardIosIcon />
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  fullWidth
                  sx={{
                    height: {xs: "70px", md: "170px"},
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: 3,
                  }}
                  variant="outlined"
                  onClick={RentalBookingPage}
                >
                  <Typography
                    variant={isMdUp ? "h6" : "subtitle1"}
                    sx={{fontWeight: "bold", flexGrow: 1, textAlign: "center"}}
                  >
                    Rental Property Cleaning
                  </Typography>
                  <ArrowForwardIosIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* </Box> */}
          {/* </Box> */}

          <Divider
            style={{paddingTop: "10px", paddingBottom: "10px"}}
            variant="middle"
          />
          {/* About us section */}

          <Box sx={{overflow: "hidden", px: {xs: 2.5, md: 10}, py: 5}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: {xs: "column", md: "row"},
                justifyContent: "space-around",
                alignItems: "center",
                gap: "20px",
                width: "100%",
                paddingY: "50px",
                paddingX: {xs: "20px", md: "80px"},
                margin: "0 auto",
              }}
            >
              <Grid
                container
                spacing={4}
                alignItems="stretch" // Ensure that each Grid item stretches to fill the container
              >
                {/* Text Content Section */}
                <Grid
                  item
                  xs={12}
                  md={8}
                >
                  <Box sx={{mb: 2, textAlign: "center"}}>
                    <Typography
                      variant="h4"
                      sx={{fontWeight: "bold"}}
                    >
                      About Us
                    </Typography>
                  </Box>
                  <TypographyInfo
                    coloredText="PurpleGlow. Cleaning Services"
                    text=" understands that a clean environment is the foundation of a peaceful and productive life, which is why we approach every task with meticulous care and precision. We go beyond the basics of cleaning to ensure that each space we touch transforms into a sanctuary of cleanliness, order, and serenity."
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      At PurpleGlow, we believe in the power of a personal
                      touch.
                      {" "}
                      <span style={{color: focusedColor}}>
                        "Enhance your Space with a Touch of Purple" 
                      </span>
                      {" "}
                       is not just our slogan; it's our promise to you. It
                      encapsulates our mission to provide an elite service that
                      leaves your spaces not only sparkling clean but also
                      imbued with a sense of tranquility and luxury that only
                      PurpleGlow can offer.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1">
                      Book with{" "}
                      <span style={{color: focusedColor}}>
                        PurpleGlow. Cleaning Services
                      </span>{" "}
                      today and step into a world where cleanliness meets
                      luxury. Let us transform your environment into a haven of
                      peace and purity, where every detail is taken care of, and
                      all that's left for you to do is enjoy the PurpleGlow
                      difference. Experience the ultimate in home and office
                      cleaning—experience the PurpleGlow effect.
                    </Typography>
                  </Box>
                </Grid>

                {/* Image Section */}
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex", // Ensures flex behavior
                    justifyContent: "center", // Center horizontally in the grid
                    alignItems: "center", // Center vertically in the grid
                  }}
                >
                  <Box
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      borderRadius: "15px",
                      overflow: "hidden",
                      width: "100%", // Ensure the Box takes full width of the Grid item
                    }}
                  >
                    <img
                      src={cleaningSink}
                      alt="Cleaning"
                      style={{width: "100%"}}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider
            style={{paddingTop: "10px", paddingBottom: "10px"}}
            variant="middle"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row"}, // Row for larger screens
              justifyContent: "space-around", // Evenly distribute content horizontally
              alignItems: "center", // Center content vertically
              gap: "20px",
              width: "100%", // Full width of parent container
              margin: "0 auto", // Center horizontally
              paddingX: {xs: "20px", md: "80px"},
              marginTop: "20px",
              paddingTop: "10px",
            }}
          >
            <WhyUs />
          </Box>

          <Divider
            style={{paddingTop: "10px", paddingBottom: "10px"}}
            variant="middle"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row"}, // Row for larger screens
              justifyContent: "space-around", // Evenly distribute content horizontally
              alignItems: "center", // Center content vertically
              gap: "20px",
              width: "100%", // Full width of parent container
              margin: "0 auto", // Center horizontally
              paddingX: {xs: "20px", md: "80px"},
              marginTop: "20px",
              paddingTop: "10px",
            }}
          >
            <Reviews />
          </Box>
          <Divider
            style={{paddingTop: "20px", paddingBottom: "20px"}}
            variant="middle"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row"}, // Row for larger screens
              justifyContent: "space-around", // Evenly distribute content horizontally
              alignItems: "center", // Center content vertically
              gap: "20px",
              width: "100%", // Full width of parent container
              margin: "0 auto", // Center horizontally
              paddingX: {xs: "20px", md: "80px"},
              marginTop: "20px",
              paddingTop: "10px",
            }}
          >
            <BeforeAfterImage />
          </Box>
          <Divider
            style={{paddingTop: "20px", paddingBottom: "20px"}}
            variant="middle"
          />
          <Box
            sx={{
              paddingX: {xs: "20px", md: "80px"},
              marginTop: "20px",
              paddingTop: "50px",
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              paddingBottom: "50px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ContactForm />
          </Box>
          <Divider variant="middle" />
          <Box
            sx={{
              paddingX: {xs: "20px", md: "80px"},
              marginTop: "20px",
              paddingTop: "50px",
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              paddingBottom: "50px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Faq />
          </Box>
          <Divider variant="middle" />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const TypographyInfo = ({coloredText, text}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="body1">
        <span style={{color: focusedColor}}>{coloredText}</span>
        {text}
      </Typography>
    </Box>
  );
};
