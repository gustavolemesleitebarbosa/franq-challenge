import React from "react";
import { render, screen } from "@testing-library/react";
import { PriceChart } from "./priceChart";
import "@testing-library/jest-dom";

jest.mock("react-chartjs-2", () => ({
  Line: jest
    .fn()
    .mockImplementation(({ data, options }) => (
      <div
        data-testid="mock-line-chart"
        data-options={JSON.stringify(options)}
        data-data={JSON.stringify(data)}
      />
    )),
}));

describe("<PriceChart />", () => {
  const mockProps = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    dataSet1: [10, 20, 30, 25, 40],
    legendTitle: "Bitcoin Price",
    title: "Bitcoin Price Chart 2023",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Line component", () => {
    render(<PriceChart {...mockProps} />);
    expect(screen.getByTestId("mock-line-chart")).toBeInTheDocument();
  });
});
