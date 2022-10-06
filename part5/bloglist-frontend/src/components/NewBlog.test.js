// let us go ahead
import "@testing-library/jest-dom";
import "@testing-library/react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";
import React from "react";

describe("Testing New Blog form", () => {
  test("Form calls the submit function correctly", async () => {
    const mockNewBlog = jest.fn((title, url, author, e) => {
      e.preventDefault();
    });

    render(
      <NewBlog
        DisplayTemporaryNotification={() => null}
        handleNewBlog={mockNewBlog}
      />
    );

    const user = userEvent.setup();
    const titleInput = screen.getByTestId("titleInput");
    const urlInput = screen.getByTestId("urlInput");
    const authorInput = screen.getByTestId("authorInput");
    const submitButton = screen.getByRole("button");

    await user.type(titleInput, "free software is important");
    await user.type(urlInput, "www.gnu.org");
    await user.type(authorInput, "Richard Stallman");
    await user.click(submitButton);
    expect(mockNewBlog.mock.calls[0][0]).toBe("free software is important");
    expect(mockNewBlog.mock.calls.length).toBe(1);
  });
});
