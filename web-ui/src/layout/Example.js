import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import Box from "@mui/material/Box";
import logo from "../assets/Quick&Fast-Logo.png";
import { useNavigate } from "react-router-dom";
// #CE6CE6 - purple
const customTheme = createTheme({
  typography: {
    fontFamily: "Squada One",
  },
});

export default function Example() {
  const navigate = useNavigate();
  const BookingPage = () => {
    navigate("/bookingForm");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ position: "sticky", top: 0, zIndex: 100 }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexGrow: 1,
                gap: "20px",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50px",
                  }}
                />
              </Link>
              <Box>
                <Typography variant="h6" color="inherit" noWrap>
                  Quick &amp; Fast
                </Typography>
                <Typography variant="subtitle1" color="inherit" noWrap>
                  Cleaning Services
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ my: 1, mx: 1 }}>
                <Button
                  onClick={BookingPage}
                  style={{ color: "#8C52FF" }}
                  color="inherit"
                  variant="outlined"
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
