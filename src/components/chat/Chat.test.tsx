/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";
import Chat from "./Chat";
import useChat from "@/hooks/useChat";
import "@testing-library/jest-dom";

jest.mock("@/hooks/useChat");

jest.mock("@/components/messages/MessageList", () => () => (
  <div data-testid="message-list">Mocked MessageList</div>
));

const mockedUseChat = useChat as jest.Mock;

describe("Chat Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render ChatHeader, MessageList and ChatInput", () => {
    mockedUseChat.mockReturnValue({
      sendMessage: jest.fn(),
      chatState: { isLoading: false, messages: [] },
    });

    render(<Chat />);

    const mainContainer = screen.getByRole("main", {
      name: "Chat Application",
    });
    expect(mainContainer).toBeInTheDocument();

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Vinicius Lima");

    const messageList = screen.getByTestId("message-list");
    expect(messageList).toBeInTheDocument();

    const inputField = screen.getByRole("textbox", {
      name: "Type your message here",
    });
    expect(inputField).toBeInTheDocument();

    const loadingAlert = screen.queryByRole("alert");
    expect(loadingAlert).not.toBeInTheDocument();
  });

  it("should render the loading container", () => {
    mockedUseChat.mockReturnValue({
      sendMessage: jest.fn(),
      chatState: { isLoading: true, messages: [] },
    });
    render(<Chat />);

    const mainContainer = screen.getByRole("main", {
      name: "Chat Application",
    });
    expect(mainContainer).toBeInTheDocument();

    const loadingAlert = screen.getByRole("alert");
    expect(loadingAlert).toBeInTheDocument();
    expect(loadingAlert).toHaveTextContent("Loading messages...");

    const messageList = screen.queryByTestId("message-list");
    expect(messageList).not.toBeInTheDocument();

    const header = screen.getByRole("heading", { level: 1 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Vinicius Lima");

    const inputField = screen.getByRole("textbox", {
      name: "Type your message here",
    });
    expect(inputField).toBeInTheDocument();
  });

  it("should render MessageList when chatState contains messages", () => {
    mockedUseChat.mockReturnValue({
      sendMessage: jest.fn(),
      chatState: {
        isLoading: false,
        messages: [
          {
            id: "1",
            author: "ChatBot",
            message: "Test message",
            createdAt: "2025-02-07T12:03:00.000Z",
          },
        ],
      },
    });
    render(<Chat />);

    const messageList = screen.getByTestId("message-list");
    expect(messageList).toBeInTheDocument();
  });
});
