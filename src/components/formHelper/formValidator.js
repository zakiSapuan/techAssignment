import moment from "moment";

const validateBookingTimeSlot = (formValues) => {
  const timeOfBooking = formValues.timingOfBooking;
  const durationOfBooking = formValues.durationOfBooking;
  const hoursAndMins = timeOfBooking.split(".");
  const startTime = moment()
    .hours(parseInt(hoursAndMins[0]) + 12)
    .minutes(hoursAndMins[1] || "00");

  switch (durationOfBooking) {
    case "30 mins":
      const endDateHalfHour = moment(startTime).add("30", "minutes");
      if (endDateHalfHour > moment(startTime).hours(20).minutes("00"))
        return true;
      break;

    default:
      const extractedValue = durationOfBooking.slice(
        0,
        durationOfBooking.length - 5
      );
      const valueToInt = parseFloat(extractedValue);
      const endDate = moment(startTime).add(`${valueToInt * 60}`, "minutes");
      if (endDate > moment(startTime).hours(20).minutes("00")) return true;
  }
  return;
};

const validateAllRequiredFormValues = (formValues, listOfFormItems) => {
  const result = listOfFormItems.filter((item) => {
    if (!formValues[item.key] || !formValues[item.key] === {}) return item;
    return;
  });

  if (result.length) return true;
  return;
};

const validateForm = (payload, listOfFormItems) => {
  if (validateAllRequiredFormValues(payload, listOfFormItems))
    return "Please fill up all forms";
  if (validateBookingTimeSlot(payload))
    return "The duration selected exceeds the store's opening time";
  return;
};

export default validateForm;
