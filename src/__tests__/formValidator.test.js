import validateForm from "../components/formHelper/formValidator";
import { formItems } from "../components/constant";
const mockPayload = {
  name: "John",
  nric: "S1234567A",
  podNumber: 2,
  podLocation: "Red Room",
  dateOfBooking: "13 Dec 2023",
  timingOfBooking: "1.30",
  durationOfBooking: "1.5 hours",
  currentDate: "2023-12-13T13:00:00",
};

describe("Form Validator Sanity Test", () => {
  test("should return an error if all required forms are not filled", () => {
    const result = validateForm({ ...mockPayload, name: "" }, formItems);

    expect(result).toBeDefined();
    expect(result.errorMessage).toBeDefined();
    expect(result.errorMessage).toEqual("Please fill up all forms");
  });

  test("should return an error if selected timing exceeds opening hours", () => {
    const result = validateForm(
      {
        ...mockPayload,
        timingOfBooking: "6.30",
        durationOfBooking: "2 hours",
      },
      formItems
    );

    expect(result).toBeDefined();
    expect(result.errorMessage).toBeDefined();
    expect(result.errorMessage).toEqual(
      "The duration selected exceeds the store's opening time"
    );
  });

  test("should return an error if selected date and time is earlier than current datetime", () => {
    const result = validateForm(
      {
        ...mockPayload,
        timingOfBooking: "12.30",
        durationOfBooking: "2 hours",
        currentDate: "2023-12-14T13:00:00",
      },
      formItems
    );

    expect(result).toBeDefined();
    expect(result.errorMessage).toBeDefined();
    expect(result.errorMessage).toEqual("Time selected is not available");
  });

  test("should return start and end time for 30 mins booking", () => {
    const result = validateForm(
      {
        ...mockPayload,
        durationOfBooking: "30 mins",
      },
      formItems
    );

    expect(result).toBeDefined();
    expect(result.errorMessage).not.toBeDefined();
    expect(result.endTime).toBeDefined();
    expect(result.startTime).toBeDefined();
    expect(result.endTime).toEqual("2.00");
    expect(result.startTime).toEqual("1.30");
  });

  test("should return start and end time for hours type booking", () => {
    const result = validateForm(
      {
        ...mockPayload,
      },
      formItems
    );

    expect(result).toBeDefined();
    expect(result.errorMessage).not.toBeDefined();
    expect(result.endTime).toBeDefined();
    expect(result.startTime).toBeDefined();
    expect(result.endTime).toEqual("3.00");
    expect(result.startTime).toEqual("1.30");
  });
});
