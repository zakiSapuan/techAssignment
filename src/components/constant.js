const podNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
export const podLocation = [
  "Green Room",
  "Red Room",
  "Blue Room",
  "Orange Room",
  "Black Room",
  "White Room",
  "Yellow Room",
  "Brown Room",
];
const bookingTiming = [
  "12",
  "12.30",
  "1",
  "1.30",
  "2",
  "2.30",
  "3",
  "3.30",
  "4",
  "4.30",
  "5",
  "5.30",
  "6",
  "6.30",
  "7",
  "7.30",
];
const bookingDuration = ["30 mins", "1 hour", "1.5 hours", "2 hours"];

export const formItems = [
  {
    key: "name",
    name: "Name",
    type: "textInput",
  },
  {
    key: "nric",
    name: "NRIC/FIN",
    type: "textInput",
  },
  {
    key: "podNumber",
    name: "Pod Number",
    type: "dropdown",
    values: podNumbers,
  },
  {
    key: "podLocation",
    name: "Pod Location",
    type: "textInput",
    values: podLocation,
    disabled: true,
  },
  {
    key: "dateOfBooking",
    name: "Date Of Booking",
    type: "datePicker",
  },
  {
    key: "timingOfBooking",
    name: "Timing Of Booking",
    type: "dropdown",
    values: bookingTiming,
    showPostText: "PM",
  },
  {
    key: "durationOfBooking",
    name: "Duration Of Booking",
    type: "dropdown",
    values: bookingDuration,
    validation: "validateBookingTimeSlot",
    helperText: "*Duration of booking cannot exceed past opening hours",
  },
];

export const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 16,
  },
};

export const endTimeItem = [
  {
    key: "endTime",
    name: "End Time",
    type: "textInput",
    showPostText: "PM",
  },
];
