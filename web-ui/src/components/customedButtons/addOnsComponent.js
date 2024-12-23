import React from "react";
import {Grid, InputLabel, ToggleButtonGroup, ToggleButton} from "@mui/material";

import {
  blindsIcon,
  ceilingFanIcon,
  fridge,
  laundryMachineIcon,
  ovenIcon,
  windowIcon,
  baseboard,
  ironIcon,
  wallIcon,
  insideCabinet,
  foldingIcon,
  office
} from "../../assets";

const iconMapping = {
  "Deep Clean Specific Area": {
    icon: wallIcon,
    time: "1.5 hrs",
    price: "$40",
  },
  Ironing: {
    icon: ironIcon,
    time: "1.5 hrs",
    price: "$35",
  },
  Walls: {
    icon: wallIcon,
    time: "1.5 hrs",
    price: "$40",
  },
  "Fridge Basic Cleaning": {
    icon: fridge,
    time: "25 mins",
    price: "$20",
  },
  "Fridge Deep Cleaning": {
    icon: fridge,
    time: "1 hr",
    price: "$50",
  },
  "Laundry & Folding": {
    icon: laundryMachineIcon,
    time: "1.5 hrs",
    price: "$35",
  },
  Folding: {
    icon: foldingIcon,
    time: "45 mins",
    price: "$20",
  },
  "Inside Cabinets": {
    icon: insideCabinet,
    time: "1 hr",
    price: "$55",
  },
  "Interior Windows": {
    icon: windowIcon,
    time: "25 mins",
    price: "$30",
  },
  "Ceiling Fan": {
    icon: ceilingFanIcon,
    time: "25 mins",
    price: "$30",
  },
  "Inside Oven": {
    icon: ovenIcon,
    time: "1.5 hrs",
    price: "$45",
  },
  Office: {
    icon: office,
    time: "25 mins",
    price: "$30",
  },
  Baseboards: {
    icon: baseboard,
    time: "45 mins",
    price: "$20",
  },
  "Window Blinds": {
    icon: blindsIcon,
    time: "35 mins",
    price: "$35",
  },
};


const AddOnsComponent = ({addOns, setAddOns, names}) => {
  const handleAddOnChange = (event, newAddOns) => {
    setAddOns(newAddOns);
  };

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
      >
        <InputLabel sx={{textTransform: "none"}}>Add-ons</InputLabel>
      </Grid>
      <Grid
        container
        item
        xs={12}
        spacing={2}
      >
        {names.map((name, index) => {
          const addOn = iconMapping[name];
          if (!addOn) {
            console.error(`No icon mapping found for ${name}`);
            return null;
          }
          return (
            <Grid
              item
              xs={4}
              key={index}
            >
              <ToggleButtonGroup
                value={addOns}
                onChange={handleAddOnChange}
                aria-label="add-ons"
                fullWidth
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  "& .MuiToggleButtonGroup-grouped": {
                    flex: "1 0 30%",
                    maxWidth: "100%",
                    margin: "8px",
                    boxSizing: "border-box",
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
                  key={name}
                  value={name}
                  aria-label={name}
                  sx={{
                    padding: "8px",
                    borderRadius: "20px",
                    textTransform: "none",
                    width: "100%",
                    minWidth: "100%",
                    minHeight: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  <img
                      src={addOn.icon}
                      alt={`Icon ${index}`}
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  <div>{name}</div>
                  <div>{addOn.price}</div>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default AddOnsComponent;
