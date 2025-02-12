/* eslint-disable react/display-name */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MessageList from "./MessageList";
import { IMessage } from "@/models/IMessage";
import useChat from "@/hooks/useChat";

jest.mock("react-markdown", () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

jest.mock("@/hooks/useChat");

jest.mock("@/utils/formatTimestamp", () => ({
  formatTimestamp: jest.fn(() => "12:03 PM"),
}));

const mockedUseChat = useChat as jest.Mock;

describe("MessageList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it("renders empty list when there are no messages and no typing indicator", () => {
    mockedUseChat.mockReturnValue({
      chatState: {
        isTyping: false,
        messages: [],
      },
    });

    render(<MessageList />);

    const chatBox = screen.getByRole("log");
    expect(chatBox).toBeInTheDocument();

    const articles = screen.queryAllByRole("article");
    expect(articles).toHaveLength(0);

    const typingIndicator = screen.queryByRole("status");
    expect(typingIndicator).not.toBeInTheDocument();
  });

  it("renders messages correctly", () => {
    const message: IMessage = {
      id: "1",
      author: "ChatBot",
      message: "Hello world!",
      createdAt: "2025-02-07T12:03:00.000Z",
    };

    mockedUseChat.mockReturnValue({
      chatState: {
        isTyping: false,
        messages: [message],
      },
    });

    render(<MessageList />);

    const article = screen.getByRole("article", {
      name: "Message from ChatBot",
    });
    expect(article).toBeInTheDocument();

    expect(article).toHaveTextContent("Hello world!");
    expect(article).toHaveTextContent("ChatBot:");
    expect(article).toHaveTextContent("12:03 PM");
  });

  it("displays typing indicator when isTyping is true", () => {
    mockedUseChat.mockReturnValue({
      chatState: {
        isTyping: true,
        messages: [],
      },
    });

    render(<MessageList />);

    const typingIndicator = screen.getByRole("status");
    expect(typingIndicator).toBeInTheDocument();
  });

  it("applies loaded class after mount", async () => {
    mockedUseChat.mockReturnValue({
      chatState: {
        isTyping: false,
        messages: [],
      },
    });

    const { container } = render(<MessageList />);

    const allDivs = container.querySelectorAll("div");
    const dynamicDiv = allDivs[allDivs.length - 1];

    await waitFor(() => {
      expect(dynamicDiv.className).toContain("loaded");
    });
  });
});
