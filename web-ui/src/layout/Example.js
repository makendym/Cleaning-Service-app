import React, {useState, useEffect} from "react";
import logo from "../assets/PurpleGlow-logo.png";
import {useNavigate, useLocation} from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  createTheme,
  ThemeProvider,
  IconButton
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from '@mui/icons-material/Instagram';
import {Link} from "react-router-dom";

const focusedColor = "#8C52FF";
// #CE6CE6 - purple
const customTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h6: {
      fontSize: '1.25rem', // Default font size for h6
      fontWeight: 'bold',
      '@media (max-width:600px)': { // Media query for small devices
        fontSize: '1rem', // Smaller font size on small devices
      }
    },
    subtitle1: {
      fontSize: '1rem', // Default font size for subtitle1
      '@media (max-width:600px)': { // Media query for small devices
        fontSize: '0.8rem', // Smaller font size on small devices
      }
    }
  }
});

export default function Example() {
  const navigate = useNavigate();
  const BookingPage = () => {
    navigate("/bookingForm", {state: {name: "Home cleaning"}});
  };

  const location = useLocation();

  const [isTransparent, setIsTransparent] = useState(true);

  const phoneNumber = "+13477545156";
  const emailAddress = "contact.purpleglow.cleaning@gmail.com";
  const instagram = "https://www.instagram.com/purpleglow.cleaning";
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
      <AppBar position="static" color="default" sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: isTransparent ? "" : "rgba(255, 255, 255, 0.9)", // Using state to change background color
        padding: "10px 20px 10px",
        transition: 'background-color 0.3s', // Smooth transition for background color change
        borderRadius: "0px 0px 0px 0px"
      }}>
        <Toolbar disableGutters>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={6} md={4} container alignItems="center" spacing={1}>
              <Grid item>
                <Link to="/" style={{ textDecoration: "none", display: 'flex', alignItems: 'center' }}>
                  <img src={logo} alt="Logo" style={{ width: 60, height: 60, borderRadius: "50%" }} />
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  PurpleGlow.
                </Typography>
                <Typography variant="subtitle1">
                  Cleaning Services
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} md={8} container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <IconButton href={`tel:${phoneNumber}`} color="inherit" sx={{color: focusedColor}}>
                  <PhoneIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href={`mailto:${emailAddress}`} color="inherit" sx={{color: focusedColor}}>
                  <EmailIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton href={instagram} color="inherit" sx={{color: focusedColor}}>
                  <InstagramIcon />
                </IconButton>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
                {location.pathname !== "/bookingForm" && (
                  <Button onClick={BookingPage} variant="outlined" sx={{ color:focusedColor, borderColor: focusedColor }}>
                    Book Now
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
  
}
