/* eslint-disable react/display-name */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  it("should render MessageList when not loading", () => {
    mockedUseChat.mockReturnValue({
      sendMessage: jest.fn(),
      chatState: { isLoading: false, messages: [] },
    });

    render(<Chat />);

    const mainContainer = screen.getByRole("main", {
      name: "Chat Application",
    });
    expect(mainContainer).toBeInTheDocument();

    const messageList = screen.getByTestId("message-list");
    expect(messageList).toBeInTheDocument();

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should render the loading container when isLoading is true", () => {
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

    expect(screen.queryByTestId("message-list")).not.toBeInTheDocument();
  });

  it("should call sendMessage twice with correct parameters when sending a message", async () => {
    const sendMessageMock = jest.fn().mockResolvedValue(undefined);
    mockedUseChat.mockReturnValue({
      sendMessage: sendMessageMock,
      chatState: { isLoading: false, messages: [] },
    });

    render(<Chat />);

    const inputField = screen.getByRole("textbox", {
      name: "Type your message here",
    });
    const sendButton = screen.getByRole("button", {
      name: "Send message",
    });

    fireEvent.change(inputField, { target: { value: "Test message" } });
    expect(inputField).toHaveValue("Test message");

    await waitFor(async () => {
      fireEvent.click(sendButton);
    });

    expect(sendMessageMock).toHaveBeenCalledTimes(2);
    expect(sendMessageMock).toHaveBeenNthCalledWith(1, {
      message: "Test message",
    });
    expect(sendMessageMock).toHaveBeenNthCalledWith(2, {
      message: "Test message",
      generate: true,
    });
  });
});
