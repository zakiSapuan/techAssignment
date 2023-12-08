const dayjs = require("dayjs");

const validateBookingTimeSlot = (formValues) => {
  const {
    timingOfBooking,
    durationOfBooking,
    dateOfBooking,
    currentDate: currentDatePayload,
  } = formValues;
  const currentDate = dayjs(currentDatePayload) || dayjs();
  const hoursAndMins = timingOfBooking.split(".");
  const startTime = dayjs(dateOfBooking)
    .hour(parseInt(hoursAndMins[0]) + 12)
    .minute(hoursAndMins[1] || "00");
  let endDate;

  switch (durationOfBooking) {
    case "30 mins":
      endDate = dayjs(startTime).add("30", "minute");
      break;

    default:
      const extractedValue = durationOfBooking.slice(
        0,
        durationOfBooking.length - 5
      );
      const valueToInt = parseFloat(extractedValue);
      endDate = dayjs(startTime).add(`${valueToInt * 60}`, "minute");
      break;
  }

  if (endDate > dayjs(startTime).hour(20).minute("00")) return "pastStoreTime";
  if (startTime < currentDate) return "pastCurrentTime";

  return {
    endTime: dayjs(endDate).add("12", "hour").format("h.mm"),
    startTime: dayjs(startTime).format("h.mm"),
    dateOfBooking: dayjs(dateOfBooking).format("D MMM YYYY"),
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
