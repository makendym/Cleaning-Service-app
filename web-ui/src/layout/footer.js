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
                flexDirection: "row", // Display links in a row
                alignItems: "center",
                gap: "20px",
                justifyContent: "center",
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column", // Align links in a column on smaller screens
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", md: "inherit" }, // Set smaller font size for xs screens
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", md: "inherit" }, // Set smaller font size for xs screens
                }}
              >
                Terms &amp; Conditions
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", md: "inherit" }, // Set smaller font size for xs screens
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", md: "inherit" }, // Set smaller font size for xs screens
                }}
              >
                Reviews
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", md: "inherit" }, // Set smaller font size for xs screens
                }}
              >
                Contact Us
              </Typography>
            </Box>

            <Divider style={{ paddingTop: "20px" }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                alignItems: "center",
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
