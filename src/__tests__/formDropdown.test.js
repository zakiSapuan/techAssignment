import FormDropdown from "../components/formHelper/formDropdown";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { formItems } from "../components/constant";

const mockPayload = {
  ...formItems[formItems.length - 1],
  onClick: jest.fn(),
};

describe("Form Dropdown Sanity Test", () => {
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
    render(<FormDropdown payload={{ ...mockPayload, name: "" }} />);
    expect(screen.queryByTitle("Duration Of Booking")).not.toBeInTheDocument();
  });

  test("should return a dropdown form", () => {
    render(<FormDropdown payload={mockPayload} />);
    expect(screen.getByTitle("Duration Of Booking")).toBeInTheDocument();
    expect(
      screen.getByText("*Duration of booking cannot exceed past opening hours")
    ).toBeInTheDocument();
  });
});
