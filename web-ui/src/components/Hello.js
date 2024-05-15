import * as React from "react";
import cleaningSink from "../assets/cleaningSink.jpg";
import starIcon from "../assets/icons-star.png";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ContactForm from "../components/contactForm";
import { createTheme, ThemeProvider,responsiveFontSizes, GlobalStyles, Box, Typography, Button, Divider, Grid,  useTheme, useMediaQuery } from '@mui/material';


let customTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const VideoBackground = ({ src }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          height: '100%',
          minWidth: '100%',
          objectFit: 'cover',
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
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const navigate = useNavigate();

  const RegularBookingPage = () => {
    navigate("/bookingForm", { state: { name: "Home cleaning" } });
  };

  const RentalBookingPage = () => {
    navigate("/bookingForm", { state: { id: 1, name: "Rental Properties Cleaning" } });
  };
  // const MoveBookingPage = () => {
  //   navigate("/bookingForm", { state: { id: 1, name: "Move In/Out" } });
  // };

  const text = `At PurpleGlow, we believe in the power of a personal touch. "Elevate Your Clean with a Touch of Purple" is not just our slogan; it's our promise to you. It encapsulates our mission to provide an elite service that leaves your spaces not only sparkling clean but also imbued with a sense of tranquility and luxury that only PurpleGlow can offer.`;
  const text1 = `Book with PurpleGlow Cleaning Services today and step into a world where cleanliness meets luxury. Let us transform your environment into a haven of peace and purity, where every detail is taken care of, and all that's left for you to do is enjoy the PurpleGlow difference. Experience the ultimate in home and office cleaning—experience the PurpleGlow effect.`;

  return (
    <ThemeProvider theme={customTheme}>
      {/* expert home section */}
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Box
        sx={{
          position: 'relative',
          height: '40vh',
          overflow: 'hidden',
        }}
      >
        <VideoBackground src="https://d3lh4iw97b9uun.cloudfront.net/vaccum.mp4" />
        
        <Grid
          container
          sx={{ zIndex: 1, position: 'relative', height: '100%', px: 2 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}
            sx={{
              textAlign: { xs: 'center', md: 'center' },
              maxWidth: 'lg', // Sets a maximum width for large screens
              mx: 'auto' // Centers the grid item within the container
            }}
          >
            <Typography variant="h3" color="white" sx={{ fontWeight: 'bold', mb: 2 }}>
            Elevate Your Space With A Touch Of Purple
            </Typography>
            {/* <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>
              Phone number: TBD
            </Typography>
            <Typography variant="subtitle1" color="white" sx={{ mb: 2 }}>
              Email: TBD
            </Typography> */}
            <Button
              onClick={RegularBookingPage}
              sx={{ 
                backgroundColor: "#8C52FF", 
                '&:hover': { backgroundColor: "#7A45E5" }, 
                color: 'white', 
                mt: 2, 
                textTransform: 'none',
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
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
      {/* What are you looking for section */}
      <Grid container direction="column" sx={{ mt: 2.5, px: { xs: 2.5, md: 10 }, pt: 2.5, flexGrow: 1, pb: 6.25 }}>
      <Grid item>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          What are you looking for?
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            sx={{
              height: { xs: '70px', md: '170px' },
              borderRadius: '15px',
              backgroundColor: '#f0ecfc',
              justifyContent: 'space-between',
              color: 'black'
            }}
            variant="outlined"
            onClick={RegularBookingPage}
          >
            <Typography variant={isMdUp ? 'h6' : 'subtitle1'} sx={{ fontWeight: 'bold' }}>
              Home cleaning
            </Typography>
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            sx={{
              height: { xs: '70px', md: '170px' },
              borderRadius: '15px',
              backgroundColor: '#f0ecfc',
              justifyContent: 'space-between',
              color: 'black'
            }}
            variant="outlined"
            onClick={RentalBookingPage}
          >
            <Typography variant={isMdUp ? 'h6' : 'subtitle1'} sx={{ fontWeight: 'bold' }}>
              Rental Property Cleaning 
            </Typography>
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
      <Divider
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
{/* About us section */}
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: { xs: 2.5, md: 10 }, py: 5 }}>
      <Grid container spacing={4}>
        {/* Text Content Section */}
        <Grid  item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {/* <img src={starIcon} alt="Star" style={{ width: 40, height: 40, marginRight: theme.spacing(2) }} /> */}
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>About Us</Typography>
          </Box>
          
          <TypographyInfo icon={<AssignmentIcon sx={{ mr: 2 }} />} text="PurpleGlow Cleaning Services understands that a clean environment is the foundation of a peaceful and productive life, which is why we approach every task with meticulous care and precision. We go beyond the basics of cleaning to ensure that each space we touch transforms into a sanctuary of cleanliness, order, and serenity." />
          
          <TypographyInfo icon={<AssignmentIcon sx={{ mr: 2 }} />}   text={text}/>
          
          <TypographyInfo icon={<AssignmentIcon sx={{ mr: 2 }} />} text={text1} /> 
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={4}>
          <Box sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '15px',
            overflow: 'hidden',
            maxWidth: '100%',
            width: '100%',
            height: 'auto'
          }}>
            <img src={cleaningSink} alt="Cleaning" style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>

      <Divider
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
        variant="middle"
      />
      <Grid container spacing={2} sx={{ padding: { xs: '20px', md: '80px' }, mt: '20px' }}>
      {/* Text Content Section */}
      <Grid item xs={12} md={8} sx={{ pr: { md: '10px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img src={starIcon} alt="Star" style={{ width: '40px', height: '40px', marginRight: '8px' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Reviews</Typography>
        </Box>

        <TypographyInfo icon={<PersonIcon sx={{ mr: 2 }} />} text="We have gained valuable experience over the past 2.5 years, serving a wide range of customers. From local homes, Airbnb properties to luxurious residences." />
        <TypographyInfo icon={<MeetingRoomIcon sx={{ mr: 2 }} />} text="We are dedicated to providing exceptional cleaning services tailored to your needs. You can trust us to maintain a pristine and inviting environment in your home." />
        <TypographyInfo icon={<AssignmentIcon sx={{ mr: 2 }} />} text="Works with a 10-point exhaustive cleaning checklist." />
      </Grid>

      {/* Image Section */}
      <Grid item xs={12} md={4}>
        <Box sx={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '15px',
          overflow: 'hidden',
          maxWidth: '100%',
          width: '100%',
          height: 'auto'
        }}>
          <img src={cleaningSink} alt="Cleaning Sink" style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Grid>
    </Grid>

      <Divider
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
        variant="middle"
      />
      <Box
        sx={{
          paddingX: { xs: "20px", md: "80px" },
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
            flexDirection: { xs: "column", md: "row" }, // Row for larger screens
            justifyContent: "space-around", // Evenly distribute content horizontally
            alignItems: "center", // Center content vertically
            gap: "20px",
            width: "100%", // Full width of parent container
            margin: "0 auto", // Center horizontally
          }}
        >

            <ContactForm />
        </Box>
      </Box>

      <Divider variant="middle" />
    </ThemeProvider>
  );
}

const TypographyInfo = ({ icon, text }) => {
  return (
    <Box sx={{ display: 'flex', direction: 'column', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
};