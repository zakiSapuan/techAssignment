import moment from "moment";

const validateBookingTimeSlot = (formValues) => {
  const {
    timingOfBooking,
    durationOfBooking,
    dateOfBooking,
    currentDate: currentDatePayload,
  } = formValues;
  const currentDate = moment(currentDatePayload) || moment();
  const hoursAndMins = timingOfBooking.split(".");
  const startTime = moment(dateOfBooking)
    .hours(parseInt(hoursAndMins[0]) + 12)
    .minutes(hoursAndMins[1] || "00");
  let endDate;

  switch (durationOfBooking) {
    case "30 mins":
      endDate = moment(startTime).add("30", "minutes");
      break;

    default:
      const extractedValue = durationOfBooking.slice(
        0,
        durationOfBooking.length - 5
      );
      const valueToInt = parseFloat(extractedValue);
      endDate = moment(startTime).add(`${valueToInt * 60}`, "minutes");
      break;
  }

  if (endDate > moment(startTime).hours(20).minutes("00"))
    return "pastStoreTime";
  if (startTime < currentDate) return "pastCurrentTime";

  return {
    endTime: moment(endDate).add("12", "hours").format("h.mm"),
    startTime: moment(startTime).format("h.mm"),
  };
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
