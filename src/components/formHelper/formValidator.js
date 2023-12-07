import moment from "moment";

const validateBookingTimeSlot = (formValues) => {
  const timeOfBooking = formValues.timingOfBooking;
  const durationOfBooking = formValues.durationOfBooking;
  const dateOfBooking = formValues.dateOfBooking;
  const hoursAndMins = timeOfBooking.split(".");
  const startTime = moment(dateOfBooking)
    .hours(parseInt(hoursAndMins[0]) + 12)
    .minutes(hoursAndMins[1] || "00");

  switch (durationOfBooking) {
    case "30 mins":
      const endDateHalfHour = moment(startTime).add("30", "minutes");

      if (endDateHalfHour > moment(startTime).hours(20).minutes("00"))
        return true;
      if (startTime < moment()) return "pastCurrentTime";

      return moment(endDateHalfHour).add("12", "hours").format("h.mm");

    default:
      const extractedValue = durationOfBooking.slice(
        0,
        durationOfBooking.length - 5
      );
      const valueToInt = parseFloat(extractedValue);
      const endDate = moment(startTime).add(`${valueToInt * 60}`, "minutes");

      if (endDate > moment(startTime).hours(20).minutes("00"))
        return "pastStoreTime";
      if (startTime < moment()) return "pastCurrentTime";

      return moment(endDate).add("12", "hours").format("h.mm");
  }
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
    return { errorMessage: "Please fill up all forms" };

  const validatedBookingTimeslot = validateBookingTimeSlot(payload);
  if (validatedBookingTimeslot === "pastStoreTime")
    return {
      errorMessage: "The duration selected exceeds the store's opening time",
    };
  if (validatedBookingTimeslot === "pastCurrentTime")
    return { errorMessage: "Time selected is not available" };

  return validatedBookingTimeslot;
};

export default validateForm;
