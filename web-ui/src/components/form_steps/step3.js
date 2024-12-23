import React, {useState} from "react";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddOnsComponent from "../customedButtons/addOnsComponent";
import EntryMethodComponent from "../customedButtons/entryMethodComponent";
import FrequencyComponent from "../customedButtons/frequencyComponent";
// import PaymentComponent from "./paymentForm";
import CustomDatePicker from "../customedCalendars/customedDatePicker";

const Step3 = ({
  service,
  handleServiceChange,
  type,
  setType,
  frequency,
  handleFrequencyChange,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  kitchen,
  handleKitchenChange,
  pets,
  handlePetsChange,
  supplies,
  handleSuppliesChange,
  addOns,
  setAddOns,
  notes,
  setNotes,
  error,
  names,
  kindOfPet,
  setKindOfPet,
  setBookingSubmitted,
  prices,
  date,
  handleDateChange,
  timeSlots,
  selectedTimeSlot,
  handleStartTimeChange,
  isDayPicked,
  isTimePicked,
}) => {
  const [entryMethod, setEntryMethod] = useState("");

  // const handleEntryMethodChange = (event, newEntryMethod) => {
  //   setEntryMethod(newEntryMethod);
  // };
  const bedroomsOptions = [0, 1, 2, 3, 4, 5];
  const bathroomOptions = [1, 1.5, 2, 2.5, 3, 3.5];

  return (
    <Grid
      container
      spacing={2}
      sx={{paddingBottom: "20px", paddingTop: "20px"}}
    >
      <Grid
        item
        xs={12}
      >
        <Grid
          container
          spacing={2}
          sx={{paddingBottom: "20px", paddingTop: "20px"}}
        >
          <Grid
            item
            xs={12}
          >
            <InputLabel id="demo-simple-select-label">
              Choose a service
            </InputLabel>
            <Select
              error={error && service === ""}
              value={service}
              onChange={handleServiceChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={"Home cleaning"}>Home cleaning</MenuItem>
              <MenuItem value={"Rental Properties Cleaning"}>
                Rental Properties Cleaning
              </MenuItem>
            </Select>
            {error && service === "" && (
              <Typography
                variant="caption"
                color="error"
              >
                Please choose a service.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputLabel id="demo-simple-select-label">
              Type of service
            </InputLabel>
            <Select
              error={error && type === ""}
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="outlined"
              fullWidth
            >
              {service === "Home cleaning" && [
                <MenuItem
                  key="Regular cleaning"
                  value="Regular cleaning"
                >
                  Regular cleaning
                </MenuItem>,
                <MenuItem
                  key="Deep cleaning"
                  value="Deep cleaning"
                >
                  Deep cleaning
                </MenuItem>,
                <MenuItem
                  key="Move in/out cleaning"
                  value="Move in/out cleaning"
                >
                  Move in/out cleaning
                </MenuItem>,
              ]}
              {service === "Rental Properties Cleaning" && [
                <MenuItem
                  key="Basic cleaning"
                  value="Basic cleaning"
                >
                  Basic cleaning
                </MenuItem>,
                <MenuItem
                  key="Deep cleaning"
                  value="Deep cleaning"
                >
                  Deep cleaning
                </MenuItem>,
              ]}
            </Select>
            {error && type === "" && (
              <Typography
                variant="caption"
                color="error"
              >
                Please choose a type.
              </Typography>
            )}
          </Grid>
          {service === "Home cleaning" && (
            <Grid
              item
              xs={12}
            >
              <FrequencyComponent
                frequency={frequency}
                handleFrequencyChange={handleFrequencyChange}
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="bedrooms-select-label">
              Number of bedrooms
            </InputLabel>
            <Select
              error={error && bedrooms === ""}
              labelId="bedrooms-select-label"
              fullWidth
              id="bedrooms-select"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              variant="outlined"
            >
              {bedroomsOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
            {error && bedrooms === "" && (
              <Typography
                variant="caption"
                color="error"
              >
                Please select the number of bedrooms.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="bathrooms-select-label">
              Number of bathrooms
            </InputLabel>
            <Select
              error={error && bathrooms === ""}
              labelId="bathrooms-select-label"
              fullWidth
              id="bathrooms-select"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              variant="outlined"
            >
              {bathroomOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
            {error && bathrooms === "" && (
              <Typography
                variant="caption"
                color="error"
              >
                Please select the number of bathrooms.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <CustomDatePicker
              date={date}
              handleDateChange={handleDateChange}
              timeSlots={timeSlots}
              selectedTimeSlot={selectedTimeSlot}
              handleStartTimeChange={handleStartTimeChange}
              error={error}
              isDayPicked={isDayPicked}
              isTimePicked={isTimePicked}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-label">
              Type of Kitchen
            </InputLabel>
            <Select
              error={error && kitchen === ""}
              labelId="demo-simple-select-label"
              id="kitchen"
              value={kitchen}
              onChange={handleKitchenChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={"Kosher"}>Kosher</MenuItem>
              <MenuItem value={"Non Kosher"}>Non Kosher</MenuItem>
            </Select>
            {error && kitchen === "" && (
              <Typography
                variant="caption"
                color="error"
              >
                Please enter an option.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-label">Any pets?</InputLabel>
            <Select
              error={error && pets === ""}
              labelId="demo-simple-select-label"
              id="pets"
              value={pets}
              onChange={handlePetsChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={"Dog"}>Dog</MenuItem>
              <MenuItem value={"Cat"}>Cat</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            {error && pets === "" && (
              <Typography
                variant="caption"
                color="error"
              >
                Please enter an option.
              </Typography>
            )}
            {pets === "Other" && (
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id="kindOfPet"
                  name="kindOfPet"
                  variant="outlined"
                  placeholder="Enter the type of pet"
                  value={kindOfPet}
                  sx={{marginTop: "20px"}}
                  helperText={
                    error && kindOfPet === ""
                      ? "Please enter the type of pet"
                      : " "
                  }
                  onChange={(e) => setKindOfPet(e.target.value)}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputLabel id="demo-simple-select-label">
              Have Supplies?
            </InputLabel>
            <Select
              error={error && supplies === ""}
              labelId="demo-simple-select-label"
              id="supplies"
              value={supplies}
              onChange={handleSuppliesChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={"yes"}>Yes</MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </Select>
            {error && supplies === "" && (
              <Typography
                variant="caption"
                color="error"
              >
                Please enter an option.
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <AddOnsComponent
              addOns={addOns}
              setAddOns={setAddOns}
              names={names}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <InputLabel> Notes</InputLabel>
            <TextField
              placeholder="Leave detailed instructions"
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          {service === "Rental Properties Cleaning" && (
            <Grid
              item
              xs={12}
            >
              <Grid
                container
                spacing={2}
              >
                <EntryMethodComponent
                  entryMethod={entryMethod}
                  setEntryMethod={setEntryMethod}
                />
              </Grid>
            </Grid>
          )}
          {/* <Grid
            item
            xs={12}
          >
            <InputLabel> Payment Information</InputLabel>
            <PaymentComponent
              prices={prices}
              onPaymentSuccess={() => setBookingSubmitted(true)}
            />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Step3;
