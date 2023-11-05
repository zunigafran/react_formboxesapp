import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

function addBox(boxList, height = "2", width = "2", color = "peachpuff") {
  const heightInput = boxList.getByLabelText("Height");
  const widthInput = boxList.getByLabelText("Width");
  const backgroundInput = boxList.getByLabelText("Background Color");
  fireEvent.change(backgroundInput, { target: { value: color } });
  fireEvent.change(widthInput, { target: { value: width } });
  fireEvent.change(heightInput, { target: { value: height } });
  const button = boxList.getByRole("button", { name: "Add a new box!" });
  fireEvent.click(button);
}

it("renders without crashing", function () {
  render(<BoxList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a new box", function () {
  const boxList = render(<BoxList />);

  // no boxes yet
  expect(boxList.queryByText("X")).toBeNull();

  addBox(boxList);

  // expect to see a box
  const removeButton = boxList.getByText("X");
  expect(removeButton).toBeTruthy();

  // Use getComputedStyle to get the computed styles
  const computedStyles = window.getComputedStyle(removeButton.previousSibling);

  // Make assertions based on computed styles
  expect(computedStyles.getPropertyValue("width")).toBe("2em");
  expect(computedStyles.getPropertyValue("height")).toBe("2em");
  expect(computedStyles.getPropertyValue("background-color")).toBe("peachpuff");

  // expect form to be empty
  expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});
