import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Note from "./Note";
import UserEvent from "@testing-library/user-event";

test("renders content", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };
  const mockFunction = jest.fn();
  render(<Note note={note} toggleImportance={mockFunction} />);
  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
  const user = UserEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);
  expect(mockFunction.mock.calls).toHaveLength(1);
});
