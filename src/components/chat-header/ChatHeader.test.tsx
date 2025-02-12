import React from "react";
import { render, screen } from "@testing-library/react";
import ChatHeader from "./ChatHeader";

describe("ChatHeader Component", () => {
  it("should render the header with the userName", () => {
    const userName = "Vinicius Lima";
    render(<ChatHeader userName={userName} />);

    const header = screen.getByRole("header", { name: "Chat Header" });
    expect(header).toBeInTheDocument();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(userName);
  });
});
