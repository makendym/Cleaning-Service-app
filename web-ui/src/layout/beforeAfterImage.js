import React, {useState, useEffect} from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {Closet, CounterTop, Sink, Stove} from "../assets";

let customTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
function useResponsive() {
  const [isLarge, setIsLarge] = useState(window.innerWidth > 960);

  useEffect(() => {
    function handleResize() {
      setIsLarge(window.innerWidth > 960);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isLarge;
}
export default function BeforeAfterImage() {
  const testimonials = [
    {name: "Closet", title: "Freelance React Developer", image: Closet},
    {name: "Counter Top", title: "Digital Marketer", image: CounterTop},
    {name: "Sink", title: "Graphic Designer", image: Sink},
    {name: "Stove", title: "Graphic Designer", image: Stove},
    {name: "Sink Again", title: "Graphic Designer", image: Sink},
    {name: "Stove Again", title: "Graphic Designer", image: Stove},
  ];

  const isLarge = useResponsive();
  const chunkSize = isLarge ? 2 : 1;
  const chunks = [];
  for (let i = 0; i < testimonials.length; i += chunkSize) {
    chunks.push(testimonials.slice(i, i + chunkSize));
  }

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
          <Box sx={{textAlign: "center"}}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{fontWeight: "medium"}}
            >
              BEFORE/ AFTER
            </Typography>
            <Typography
              variant="h4"
              sx={{mt: 2, fontWeight: "bold"}}
            >
              Witness the Difference and Our Results
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "55%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "40%",
              background:
                "linear-gradient(90deg, #8c52ff -0.40%, #9764fd 22.86%, #a175fb 48.36%, #ab85f9 73.33%, #b595f6 99.34%)",
              borderRadius: "20px",
              opacity: 0.3,
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />

          <Carousel
            indicators
            animation="slide"
            navButtonsAlwaysVisible
            swipe
            autoPlay={false}
            duration={300}
            indicatorIconButtonProps={{
              style: {marginTop: "60px", marginBottom: "60px"},
            }}
          >
            {chunks.map((chunk, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                justifyContent="center"
                sx={{
                  mt: {xs: 5, md: 6},
                  padding: "20px",
                }}
              >
                {chunk.map((testimonial, idx) => (
                  <Grid
                    item
                    xs={12}
                    sm={4} // Ensure full width usage for each item on small screens, half-width on larger screens
                    key={idx}
                  >
                    <Card
                      raised
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{flex: "1 0 auto"}}>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                        <Box sx={{mt: 2, textAlign: "center"}}>
                          {" "}
                          {/* Ensures text content is pushed to the bottom */}
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {testimonial.title}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Carousel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

// const testimonials = [
//   {name: "Closet", title: "Freelance React Developer", image: Closet},
//   {name: "Counter Top", title: "Digital Marketer", image: CounterTop},
//   {name: "Sink", title: "Graphic Designer", image: Sink},
//   {name: "Stove", title: "Graphic Designer", image: Stove},
//   {name: "Sink", title: "Graphic Designer", image: Sink},
//   {name: "Stove", title: "Graphic Designer", image: Stove},
// ];
