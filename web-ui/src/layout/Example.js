import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import GlobalStyles from "@mui/material/GlobalStyles";
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
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box>
              <Link to="/">
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
            </Box>
            <Box>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Quick &amp; Fast
              </Typography>
              <Typography
                variant="subtitle1"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Cleaning Services
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Box sx={{ my: 1, mx: 1 }}>
              <Button
                onClick={BookingPage}
                style={{ color: "#8C52FF" }}
                color="inherit"
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Book Now
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
