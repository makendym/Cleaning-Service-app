import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import logo from "../assets/Quick&Fast-Logo.png";
function Copyright() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", // Vertically align the items
        textAlign: "center",
        justifyContent: "center", // Center the content horizontally
      }}
    >
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
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Quick &amp; Fast
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "30vh",
        }}
      >
        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Box>
                <Typography variant="body1">About Us</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Terms &amp; Conditions</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Privacy Policy</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Reviews</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Contact Us</Typography>
              </Box>
            </Box>

            <Divider style={{ paddingTop: "20px" }} />

            <Box style={{ paddingTop: "20px", textAlign: "center" }}>
              <Typography variant="body1">Serving in: New York</Typography>
            </Box>

            <Divider style={{ paddingTop: "20px" }} />

            <Box
              style={{
                paddingTop: "20px",
                textAlign: "center",
                marginTop: "auto",
              }}
            >
              <Copyright />
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
