import React from "react";
import {Grid, InputLabel, ToggleButtonGroup, ToggleButton} from "@mui/material";

const frequencyOptions = [
  {value: "oneTime", label: "One-time"},
  {value: "weekly", label: "Weekly"},
  {value: "everyOtherWeek", label: "Every-other week"},
];

const FrequencyComponent = ({frequency, handleFrequencyChange}) => {
  return (
    <>
      <Grid
        item
        xs={12}
      >
        <InputLabel
          id="frequency-toggle-group-label"
          sx={{textTransform: "none"}}
        >
          Frequency
        </InputLabel>
      </Grid>
      <Grid
        container
        item
        xs={12}
      >
        <ToggleButtonGroup
          value={frequency}
          exclusive
          onChange={handleFrequencyChange}
          aria-label="frequency"
          fullWidth
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
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
          {frequencyOptions.map((option, index) => (
            <ToggleButton
              key={index}
              value={option.value}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </>
  );
};

export default FrequencyComponent;
