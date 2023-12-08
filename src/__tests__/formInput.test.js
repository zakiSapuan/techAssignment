import FormInput from "../components/formHelper/formInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";

const mockPayload = {
  key: "name",
  name: "Name",
  disabled: false,
  onClick: jest.fn((payload) => (result = payload)),
};

describe("Form Input Sanity Test", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("should return nothing if parameter supplied does not meet data requirement", () => {
    render(<FormInput payload={{ ...mockPayload, name: "" }} />);
    expect(screen.queryByTitle("Name")).not.toBeInTheDocument();
  });

  test("should return an input form", () => {
    render(<FormInput payload={mockPayload} />);
    expect(screen.getByTitle("Name")).toBeInTheDocument();
  });

  test("should be able to populate input form", () => {
    render(<FormInput payload={mockPayload} />);

    const formInput = screen.getByTitle("Name");
    expect(formInput).toBeInTheDocument();

    const formInputValue = screen.getByRole("textbox");
    userEvent.type(formInputValue, "For Testing");
    expect(formInputValue).toHaveValue("For Testing");
  });

  test("should be disabled from clicking", () => {
    render(<FormInput payload={{ ...mockPayload, disabled: true }} />);

    const formInput = screen.getByTitle("Name");
    expect(formInput).toBeInTheDocument();

    const formInputValue = screen.getByRole("textbox");
    userEvent.type(formInputValue, "For Testing");
    expect(formInputValue).not.toHaveValue("For Testing");
  });
});
