import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Modal,
  Fade,
  Backdrop,
  MenuItem,
  Select,
  InputLabel,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const CustomDatePicker = ({
  date,
  handleDateChange,
  timeSlots,
  selectedTimeSlot,
  handleStartTimeChange,
  error,
  isDayPicked,
  isTimePicked,
}) => {
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const initialSelectedTimeSlot = selectedTimeSlot || '';

  const handleDateModalOpen = () => setDateModalOpen(true);
  const handleDateModalClose = () => setDateModalOpen(false);
  const handleTimeModalOpen = () => setTimeModalOpen(true);
  const handleTimeModalClose = () => {
    setTimeModalOpen(false);
    setTimePickerVisible(true); // Reset visibility for the next opening
  };

  const handleTimeSlotChange = (newTimeSlot) => {
    handleStartTimeChange(newTimeSlot);
    setTimePickerVisible(true);
  };

  const handleDateChangeInternal = (newDate) => {
    handleDateChange(newDate); // Update the date state in the parent component
    handleDateModalClose(); // Close the date modal when date is selected
    handleTimeModalOpen(); // Open the time modal
  };

  const backToCalendar = () => {
    handleTimeModalClose();
    handleDateModalOpen();
  };

  const boxStyle = {
    cursor: 'pointer',
    border: '1px solid gray',
    padding: '8px',
    borderRadius: '20px',
    height: '54px', // Set height to match the Select component
    width: '100%', // Full width
    display: 'flex', // Added display: flex
    alignItems: 'center', // Vertically align the text
    textAlign: 'left',
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={2} sx={{ paddingBottom: "30px", paddingTop: "20px" }}>
        <Grid
          item
          xs={12}
          sm={6} // Set to half the width on small screens, full width on larger screens
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel id="date-select-label">Select Date</InputLabel>
          <Box onClick={handleDateModalOpen} sx={boxStyle}>
            {date ? dayjs(date).format("MMMM D, YYYY") : 'Choose a date'}
          </Box>
        </Grid>
        {timePickerVisible && (
          <Grid
            item
            xs={12}
            sm={6} // Set to half the width on small screens, full width on larger screens
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputLabel id="time-select-label">Select Time</InputLabel>
            <Select
              value={initialSelectedTimeSlot}
              onChange={(event) => handleTimeSlotChange(event.target.value)}
              fullWidth
              sx={{ height: '54px' }} // Set height to match the DatePicker modal
            >
              {timeSlots.map((slot, index) => (
                <MenuItem key={index} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        )}
        
        {error && !isDayPicked && (
          <Typography variant="caption" color="error">
            Please pick a day before proceeding.
          </Typography>
        )}
        {error && !isTimePicked && (
          <Typography variant="caption" color="error">
            Please pick a time before proceeding.
          </Typography>
        )}
      </Grid>
      <DateModal
        date={date}
        handleDateChange={handleDateChangeInternal}
        dateModalOpen={dateModalOpen}
        handleDateModalClose={handleDateModalClose}
      />
      <TimeSlotSelector
        timeSlots={timeSlots}
        selectedTimeSlot={selectedTimeSlot}
        handleStartTimeChange={handleTimeSlotChange}
        modalOpen={timeModalOpen}
        handleModalClose={handleTimeModalClose}
        handleBack={backToCalendar}
      />
    </Box>
  );
};

const DateModal = ({ date, handleDateChange, dateModalOpen, handleDateModalClose }) => {
  return (
    <Modal
      aria-labelledby="date-picker-modal-title"
      aria-describedby="date-picker-modal-description"
      open={dateModalOpen}
      onClose={handleDateModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={dateModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw", // Responsive width
            maxWidth: 400, // Maximum width for larger screens
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="date-picker-modal-title" variant="h6" component="h2">
              Select a Date
            </Typography>
            <IconButton onClick={handleDateModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DateCalendar
            value={date}
            disablePast
            views={["year", "month", "day"]}
            onChange={handleDateChange}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

const TimeSlotSelector = ({
  timeSlots,
  selectedTimeSlot,
  handleStartTimeChange,
  modalOpen,
  handleModalClose,
  handleBack,
}) => {
  return (
    <Modal
      aria-labelledby="time-slot-modal-title"
      aria-describedby="time-slot-modal-description"
      open={modalOpen}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={modalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw", // Responsive width
            maxWidth: 400, // Maximum width for larger screens
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography id="time-slot-modal-title" variant="h6" component="h2">
              Select a Time Slot
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <Grid key={index} item xs={4}>
                  <ToggleButtonGroup
                    value={selectedTimeSlot}
                    exclusive
                    onChange={(event, newTimeSlot) => handleStartTimeChange(newTimeSlot)}
                    aria-label="time slot"
                    fullWidth
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      "& .MuiToggleButtonGroup-grouped": {
                        width: "100%",
                        "&.Mui-selected": {
                          backgroundColor: "#8C52FF",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#8C52FF",
                          },
                        },
                        "&:focus": {
                          outline: "none",
                        },
                        "&:focus-visible": {
                          outline: "none",
                        },
                      },
                    }}
                  >
                    <ToggleButton value={slot} aria-label={slot} sx={{ padding: "8px", borderRadius: "20px" }}>
                      {slot}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography>No available time slots.</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
export default CustomDatePicker;
