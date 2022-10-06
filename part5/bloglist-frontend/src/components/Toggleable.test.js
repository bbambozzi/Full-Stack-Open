import "@testing-library/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Toggleable from "./Toggleable";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("Togglable", () => {
  test("Togglable button to show appears", () => {
    render(<Toggleable buttonLabel={"Show Content"} />);
    const toggleButton = screen.getByText("Show Content");
    expect(toggleButton).toBeDefined();
  });
  test("After show button is clicked, new content appears.", async () => {
    render(
      <Toggleable buttonLabel={"Show Content"}>
        <p>I like trains!</p>
      </Toggleable>
    );
    const toggleButton = screen.getByText("Show Content");
    const user = userEvent.setup();
    await user.click(toggleButton);
    const shownDiv = screen.getByText("I like trains!");
    expect(shownDiv).toBeDefined();
    expect(shownDiv).not.toHaveStyle("display: none");
  });
  test("If show button is not clicked, no content is shown", () => {
    render(
      <Toggleable buttonLabel={"Show Content"}>
        <p>I like trains!</p>
      </Toggleable>
    );
    const hiddenDiv = screen.getByTestId("divThatHides");
    expect(hiddenDiv).toBeDefined();
    expect(hiddenDiv).toHaveStyle("display: none");
  });
});
