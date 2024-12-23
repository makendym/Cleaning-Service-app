const calculatePrice = (service, type, frequency, bedrooms, bathrooms,addOns) => {
    const baseRates = {
      home: {
        "Regular cleaning": { //Accurate
          oneTime: { 0: 160, 1: 167.75, 2: 183.85, 3: 191 },
          everyOtherWeek: { 0: 152.25, 1: 160, 2: 175.5, 3: 183.25 },
          weekly: { 0: 152.25, 1: 160, 2: 175.5, 3: 183.25 },
        },
        "Deep cleaning": { //not accurate and needs to be updated later -->TBD (This is here for error prevention purposes only)
          oneTime: { 0: 214, 1: 229.5, 2: 237.25, 3: 245 },
          everyOtherWeek: { 0: 200, 1: 215, 2: 225, 3: 235 },
          weekly: { 0: 190, 1: 205, 2: 215, 3: 225 },
        },
        "Move in/out cleaning": { //not accurate and needs to be updated later -->TBD (This is here for error prevention purposes only)
          oneTime: { 0: 214, 1: 229.5, 2: 237.25, 3: 245 },
          everyOtherWeek: { 0: 200, 1: 215, 2: 225, 3: 235 },
          weekly: { 0: 190, 1: 205, 2: 215, 3: 225 },
        },
      },
      rental: {
        "Basic cleaning": { // accurate
          oneTime: { 0: 173, 1: 180.75, 2: 188.5, 3: 196.25 },
        },
        "Deep cleaning": {//accurate
          oneTime: { 0: 214, 1: 229.5, 2: 237.25, 3: 245 },
        },
      },
    };
  
    const hoursRequired = {
      home: {
        "Regular cleaning": {//accurate
          oneTime: { 0: 2, 1: 2.5, 2: 3.5, 3: 4 },
          everyOtherWeek: { 0: 1.5, 1: 2, 2: 3, 3: 3.5 },
          weekly: { 0: 1.5, 1: 2, 2: 3, 3: 3.5 },
        },
        "Deep cleaning": { //not accurate and needs to be updated later -->TBD (This is here for error prevention purposes only)
          oneTime: { 0: 2, 1: 2.5, 2: 3.5, 3: 4 },
          everyOtherWeek: { 0: 1.5, 1: 2, 2: 3, 3: 3.5 },
          weekly: { 0: 1.5, 1: 2, 2: 3, 3: 3.5 },
        },
        "Move in/out cleaning": { //not accurate and needs to be updated later -->TBD (This is here for error prevention purposes only)
          oneTime: { 0: 2, 1: 2.5, 2: 3.5, 3: 4 },
          everyOtherWeek: { 0: 1.5, 1: 2, 2: 3, 3: 3.5 },
          weekly: { 0: 1.5, 1: 2, 2: 3, 3: 3.5 },
        },
      },
      rental: {
        "Basic cleaning": { //accurate
          oneTime: { 0: 2, 1: 2.5, 2: 3, 3: 3.5 },
        },
        "Deep cleaning": { //accurate
          oneTime: { 0: 4, 1: 5, 2: 5.5, 3: 6 },
        },
      },
    };
  
    const extraCharges = {
      home: {
        "Regular cleaning": { bathroom: 10, bathroomTime: 0.25, bedroom: 25, bedroomTime: 0.42 },
        "Deep cleaning": { bathroom: 15, bathroomTime: 0.33, bedroom: 35, bedroomTime: 0.5 },
      },
      rental: {
        "Basic cleaning": { bathroom: 15, bathroomTime: 0.25, bedroom: 25, bedroomTime: 0.5 },
        "Deep cleaning": { bathroom: 25, bathroomTime: 0.5, bedroom: 35, bedroomTime: 0.75 },
      },
    };
  
    const addOnDetails = {
      "Deep Clean Specific Area": { time: 1.5, price: 40 },
      Ironing: { time: 1.5, price: 35 },
      Walls: { time: 1.5, price: 40 },
      "Fridge Basic Cleaning": { time: 0.42, price: 20 }, // 25 mins = 0.42 hrs
      "Fridge Deep Cleaning": { time: 1, price: 50 },
      "Laundry & Folding": { time: 1.5, price: 35 },
      Folding: { time: 0.75, price: 20 }, // 45 mins = 0.75 hrs
      "Inside Cabinets": { time: 1, price: 55 },
      "Interior Windows": { time: 0.42, price: 30 }, // 25 mins = 0.42 hrs
      "Ceiling Fan": { time: 0.42, price: 30 }, // 25 mins = 0.42 hrs
      "Inside Oven": { time: 1.5, price: 45 },
      Office: { time: 0.42, price: 30 }, // 25 mins = 0.42 hrs
      Baseboards: { time: 0.75, price: 20 }, // 45 mins = 0.75 hrs
      "Window Blinds": { time: 0.58, price: 35 } // 35 mins = 0.58 hrs
    };
    
    
    const isHomeService = service === "Home cleaning";
    const isRentalService = service === "Rental Properties Cleaning";
    let serviceType = isHomeService ? "home" : isRentalService ? "rental" : null;
  
    if (!serviceType) return {};
  
    if (!baseRates[serviceType] || !baseRates[serviceType][type] || !baseRates[serviceType][type][frequency]) {
      console.error("Invalid service type, type, or frequency");
      return {};
    }
  
    // Calculate base price and hours for up to 3 bedrooms
    let basePrice = baseRates[serviceType][type][frequency][Math.min(bedrooms, 3)] || 0;
    let hours = hoursRequired[serviceType][type][frequency][Math.min(bedrooms, 3)] || 0;
  
    const extraCharge = extraCharges[serviceType][type];
  
    // Add extra charges and time for half bathrooms after the first full bathroom
    if (bathrooms > 1) {
      const extraBathrooms = (bathrooms - 1) * 2; // Convert full bathrooms to half bathroom units
      basePrice += extraBathrooms * extraCharge.bathroom;
      hours += extraBathrooms * extraCharge.bathroomTime;
    }
  
    // Add extra charges and time for bedrooms over 3
    if (bedrooms > 3) {
      const extraBedrooms = bedrooms - 3;
      basePrice += extraBedrooms * extraCharge.bedroom;
      hours += extraBedrooms * extraCharge.bedroomTime;
    }

    addOns.forEach(addOn => {
        const addOnDetail = addOnDetails[addOn];
        if (addOnDetail) {
          basePrice += addOnDetail.price;
          hours += addOnDetail.time;
        }
      });
  
    const employeeRate = 15.5;
    const employeeCost = hours * employeeRate;
    const taxes = 0.0888 * basePrice;
    const discountRates = {
      oneTime: 0,
      everyOtherWeek: 0.1,
      weekly: 0.15,
    };
    const discount = discountRates[frequency] * basePrice;
    const profit = 70;
  
    const total = basePrice + taxes;
    const discountTotal = total - discount - profit;
  
    return {
      basePrice,
      taxes,
      total,
      hours,
      discount,
      profit,
      discountTotal,
      employeeCost,
    };
};
  
export default calculatePrice;