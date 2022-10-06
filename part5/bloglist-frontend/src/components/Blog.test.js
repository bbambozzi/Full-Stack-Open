import "@testing-library/jest-dom";
import "@testing-library/react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import React from "react";

const blog = {
  url: "www.test.com",
  likes: 0,
  author: "mr author",
  title: "testing is important",
  id: 0,
};

const blog1 = {
  url: "www.ilovetesting.com",
  likes: 2,
  author: "alala",
  title: "testtitle",
  id: 1,
};

describe("Testing single blogs display and methods", () => {
  test("Single blog is shown correctly", () => {
    const blogArray = [blog, blog1];

    const mockRefreshAllBlogs = jest.fn();
    const mockHandleLike = jest.fn();

    render(
      <>
        {blogArray.map((singleBlog) => (
          <Blog
            key={singleBlog.id}
            blog={singleBlog}
            refreshAllBlogs={mockRefreshAllBlogs}
            handleLike={mockHandleLike}
            allowRemove={true}
          />
        ))}
      </>
    );
    const singleBlog = screen.getAllByTestId(`blogDivContainer`);
    expect(singleBlog[0]).toBeDefined();
    expect(singleBlog[0]).not.toHaveStyle("display: none");
  });
  test("Single blog does not show information at first", () => {
    const blogArray = [blog, blog1];

    const mockRefreshAllBlogs = jest.fn();
    const mockHandleLike = jest.fn();

    render(
      <>
        {blogArray.map((singleBlog) => (
          <Blog
            key={singleBlog.id}
            blog={singleBlog}
            refreshAllBlogs={mockRefreshAllBlogs}
            handleLike={mockHandleLike}
            allowRemove={true}
          />
        ))}
      </>
    );

    const divThatHides = screen.getAllByTestId("divThatHides");
    expect(divThatHides[0]).toHaveStyle("display: none");
  });
  test("Div shows content when hidden", async () => {
    const blogArray = [blog, blog1];

    const mockRefreshAllBlogs = jest.fn();
    const mockHandleLike = jest.fn();

    render(
      <>
        {blogArray.map((singleBlog) => (
          <Blog
            key={singleBlog.id}
            blog={singleBlog}
            refreshAllBlogs={mockRefreshAllBlogs}
            handleLike={mockHandleLike}
            allowRemove={true}
          />
        ))}
      </>
    );

    const divThatHides = screen.getAllByTestId("divThatHides");
    expect(divThatHides[0]).toHaveStyle("display: none");
    const user = userEvent.setup();
    const elements = screen.getAllByText("show");
    const button = elements[0];
    await user.click(button);
    const testDiv = screen.getAllByTestId("divThatHides")[0];
    expect(testDiv).not.toHaveStyle("display: none");
  });
  test("The like handler is called when the like button is pressed", async () => {
    const blogArray = [blog, blog1];

    const mockRefreshAllBlogs = jest.fn();
    const mockHandleLike = jest.fn();
    render(
      <>
        {blogArray.map((singleBlog) => (
          <Blog
            key={singleBlog.id}
            blog={singleBlog}
            refreshAllBlogs={mockRefreshAllBlogs}
            handleLike={mockHandleLike}
            allowRemove={true}
          />
        ))}
      </>
    );
    const divThatHides = screen.getAllByTestId("divThatHides");
    expect(divThatHides[0]).toHaveStyle("display: none");
    const user = userEvent.setup();
    const elements = screen.getAllByText("show");
    const button = elements[0];
    await user.click(button);
    const testDiv = screen.getAllByTestId("divThatHides")[0];
    expect(testDiv).not.toHaveStyle("display: none");
    const likeButton = screen.getAllByText("Like!")[0];
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandleLike.mock.calls.length).toBe(2); // calls is an array
  });
});
