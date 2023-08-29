import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

// TODO remove, this demo shouldn't need to reset the theme.
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
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
                flexDirection: "column",
                alignItems: "center", // Center the content horizontally
                gap: "20px",
                [theme.breakpoints.up("md")]: {
                  flexDirection: "row", // Align items in a row on larger screens
                  justifyContent: "center", // Center horizontally on larger screens
                },
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center the content horizontally
                paddingTop: "20px",
              }}
            >
              <Typography variant="body1">Serving in: New York</Typography>
            </Box>

            <Divider style={{ paddingTop: "20px" }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center the content horizontally
                paddingTop: "20px",
                marginTop: "auto",
              }}
            >
              {/* Your additional content here */}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
