import React, {useState} from "react";
import {
  Grid,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/VpnKey";
import DoormanIcon from "@mui/icons-material/Apartment";
import OtherIcon from "@mui/icons-material/MoreHoriz";

const entryMethodOptions = [
  {value: "home", label: "Home", icon: <HomeIcon />},
  {value: "doorman", label: "Doorman", icon: <DoormanIcon />},
  {value: "key", label: "Hidden Key", icon: <KeyIcon />},
  {value: "other", label: "Other", icon: <OtherIcon />},
];

const EntryMethodComponent = ({entryMethod, setEntryMethod}) => {
  const [customEntryMethod, setCustomEntryMethod] = useState("");

  const handleEntryMethodChange = (event, newEntryMethod) => {
    setEntryMethod(newEntryMethod);
    if (newEntryMethod !== "other") {
      setCustomEntryMethod("");
    }
  };

  const handleCustomEntryMethodChange = (event) => {
    setCustomEntryMethod(event.target.value);
    setEntryMethod(event.target.value);
  };

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <InputLabel
          id="demo-simple-select-label"
          sx={{textTransform: "none"}}
        >
          How do we get in ?
        </InputLabel>
      </Grid>
      <Grid
        container
        item
        xs={12}
        spacing={1}
      >
        {entryMethodOptions.map((option,index) => (
          <Grid
            key={index}
            item
            xs={3}
          >
            <ToggleButtonGroup
              key={index}
              value={entryMethod}
              exclusive
              onChange={handleEntryMethodChange}
              aria-label="entry-method"
              fullWidth
              sx={{
                "& .MuiToggleButtonGroup-grouped": {
                  maxWidth: "100%",
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
                key={index}
                value={option.value}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  minWidth: "100%",
                  minHeight: "80px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                {option.icon} {option.label}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        ))}
      </Grid>
      {entryMethod === "other" && (
        <Grid
          item
          xs={12}
        >
          <TextField
            label="Please specify"
            variant="outlined"
            fullWidth
            value={customEntryMethod}
            onChange={handleCustomEntryMethodChange}
            sx={{marginTop: "20px"}}
          />
        </Grid>
      )}
    </>
  );
};

export default EntryMethodComponent;
