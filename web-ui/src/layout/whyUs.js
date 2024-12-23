import React from "react";
import {securityIcon, cleaningIcon, optionsIcon} from "../assets";
import {
  Container,
  Grid,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";

let customTheme = createTheme({
  typography: {
    // fontFamily: "'Poppins', sans-serif",
  },
});
const focusedColor = "#8C52FF";
export default function WhyUs() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          py: {xs: 4, sm: 8, lg: 10},
          width: "100%",
          backgroundColor: "#f7f7f7",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{textAlign: "center", mb: 5}}>
            <Typography
              variant="h4"
              sx={{mt: 2, fontWeight: "bold"}}
            >
               Reasons to choose{" "}
              <span style={{color: focusedColor}}>
                PurpleGlow. Cleaning Services
              </span>
            </Typography>
          </Box>
          <Box sx={{textAlign: "left", paddingY: 8}}>
            <Grid
              container
              spacing={4}
            >
              {WhyUsSection.map((whyUs, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                >
                  <Box sx={{textAlign: "center"}}>
                    <img
                      src={whyUs.icon}
                      alt={`Icon ${index}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        color: focusedColor,
                      }}
                    />

                    <Typography
                      variant="h6"
                      sx={{mt: 2}}
                    >
                      {whyUs.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const WhyUsSection = [
  {
    icon: cleaningIcon,
    title: "We bring our own cleaning solutions!",
  },
  {
    icon: optionsIcon,
    title: "You have the option to provide your own custom supplies",
  },
  {
    icon: securityIcon,
    title: "100% secure payments",
  },
];
