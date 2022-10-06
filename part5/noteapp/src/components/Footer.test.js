import { screen, render } from "@testing-library/react";
import Footer from "./Footer";

test("Basic footer test", () => {
  render(<Footer />);
  const footer = screen.getByText(
    "Note app, Department of Computer Science, University of Helsinki 2022"
  );
  expect(footer).toBeDefined();
});
