import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import Box from "@mui/material/Box";
import logo from "../assets/PurpleGlow-logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// #CE6CE6 - purple
const customTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default function Example() {
  const navigate = useNavigate();
  const BookingPage = () => {
    navigate("/bookingForm", { state: { name: "Home cleaning" } });
  };

  const location = useLocation();

  const [isTransparent, setIsTransparent] = useState(true);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop === 0) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: isTransparent
            ? "rgba(255, 255, 255, 0.9)" // Adjust the alpha value here
            : "#ffffff",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={isTransparent ? 0 : 1}
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: isTransparent ? "transparent" : "#ffffff",
            paddingRight: "2px",
            paddingLeft: "2px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexGrow: 1,
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow
                  borderRadius: "50%", // Use a circular border radius
                  width: { xs: "60px", sm: "100px" }, // Adjust width for different screen sizes
                  height: { xs: "60px", sm: "100px" }, // Adjust height for different screen sizes
                  overflow: "hidden", // Hide any overflowing content
                }}
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "100%", // Make the image width fit its container
                      height: "100%", // Make the image height fit its container
                      borderRadius: "50px",
                    }}
                  />
                </Link>
              </Box>

              <Box>
                <Typography variant="h6" color="inherit" noWrap style={{ fontFamily: 'League Spartan, sans-serif', fontSize: '22px', fontWeight: 'bold' }}>
                  PurpleGlow.
                </Typography>
                <Typography variant="subtitle1" color="inherit" noWrap style={{ fontFamily: 'League Spartan', fontSize: '16px' }}>
                  Cleaning Services
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexGrow: 1,
              }}
            >
              <Box sx={{ my: 1, mx: 1 }}>
                {location.pathname === "/bookingForm" ? null : (
                  <Button
                    onClick={BookingPage}
                    style={{ color: "#8C52FF" }}
                    color="inherit"
                    variant="outlined"
                  >
                    Book Now
                  </Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
