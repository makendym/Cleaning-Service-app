import React from "react";
import {
  Grid,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {DateCalendar} from "@mui/x-date-pickers";

const Step1 = ({
  date,
  handleDateChange,
  timeSlots,
  selectedTimeSlot,
  handleStartTimeChange,
  error,
  isDayPicked,
  isTimePicked,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{paddingBottom: "20px", paddingTop: "20px"}}
      >
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Pick a Day and Time</Typography>
          <DateCalendar
            value={date}
            disablePast
            views={["year", "month", "day"]}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TimeSlotSelector
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            handleStartTimeChange={handleStartTimeChange}
          />
        </Grid>
        {error && !isDayPicked && (
          <Typography
            variant="caption"
            color="error"
          >
            Please pick a day before proceeding.
          </Typography>
        )}
        {error && !isTimePicked && (
          <Typography
            variant="caption"
            color="error"
          >
            Please pick a time before proceeding.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

const TimeSlotSelector = ({
  timeSlots,
  selectedTimeSlot,
  handleStartTimeChange,
}) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        style={{textAlign: "center"}}
      >
        <Typography>Select a time slot:</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        spacing={1}
      >
        {timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => (
            <Grid
              key={index}
              item
              xs={4}
            >
              <ToggleButtonGroup
                value={selectedTimeSlot}
                exclusive
                onChange={(event, newTimeSlot) =>
                  handleStartTimeChange(newTimeSlot)
                }
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
                <ToggleButton
                  value={slot}
                  aria-label={slot}
                  sx={{padding: "8px", borderRadius: "20px"}}
                >
                  {slot}
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          ))
        ) : (
          <Grid
            item
            xs={12}
            style={{textAlign: "center"}}
          >
            <Typography>No available time slots.</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Step1;
