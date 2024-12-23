import React, {useState} from "react";
import {
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

let customTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: "8px !important", // Increase the border radius
          marginBottom: "8px", // Optional: ensures margin between accordions
          "&:before": {
            display: "none", // This removes the default divider line when accordion is expanded
          },
          "&.Mui-expanded": {
            margin: "auto", // Removes additional margin added on expansion
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            minHeight: 48, // Keeps the height consistent, adjust as needed
          },
          content: {
            "&.Mui-expanded": {
              margin: "12px 0", // Adjusts vertical margin when expanded
            },
          },
        },
      },
    },
  },
});

export default function Faq() {
  const [expanded, setExpanded] = useState(false); // Initialize with false indicating all are collapsed

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Toggle expanded state based on current state
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          py: {xs: 4, sm: 8, lg: 10, width: "100%"},
          backgroundColor: "#f7f7f7",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{textAlign: "center", mb: 5}}>
            <Typography
              variant="h2"
              sx={{mt: 2, fontWeight: "bold"}}
            >
              FAQ
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{fontWeight: "medium"}}
            >
              Need Help?
            </Typography>
          </Box>
          <Box sx={{textAlign: "left"}}>
            {faqSections.map((faq, index) => (
              <Box
                key={index}
                sx={{mb: 1}}
              >
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <AccordionSummary
                    key={index}
                    expandIcon={
                      expanded === `panel${index}` ? (
                        <RemoveIcon />
                      ) : (
                        <AddIcon />
                      )
                    }
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography
                      key={index}
                      variant="subtitle1"
                      sx={{fontWeight: "bold"}}
                    >
                      {faq.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key={index}>
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{fontWeight: "medium"}}
                    >
                      {faq.info}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const faqSections = [
  {
    title: "What cleaning service should I book?",
    info: "Choosing the right cleaning service depends on your needs. We offer various options, including basic cleaning, deep cleaning, move-in/move-out cleaning, and specialty services. If you’re unsure, we are happy to help you determine the best option based on the size of your home and your specific requirements!",
  },
  {
    title: "Will I know the housekeeper's name before she comes to clean?",
    info: "Certainly, when you get a confirmation email, you can see the name and the photo of the housekeeper assigned to your booking.",
  },
  {
    title: "Do you bring all the necessary supplies to complete the job?",
    info: "Yes, we bring all necessary supplies, excluding vacuum, broom, and toilet bowl brush.",
  },
  {
    title: "What methods of payment do you accept?",
    info: "WWe accept all major credit cards. Payment details are securely handled through our online booking system for your convenience.",
  },
  {
    title: "What’s your cancellation/ rescheduling policy?",
    info: "You can cancel or reschedule your service without a fee 48 hours before your scheduled service. You will be charged 25% of the service cost for cancellations made 24 hours before your service date and 50% of the service cost for anything under 24 hours notice.",
  },
];
