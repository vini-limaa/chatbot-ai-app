import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ChatInput from "./ChatInput";
import useChat from "@/hooks/useChat";
import "@testing-library/jest-dom";

jest.mock("@/hooks/useChat");
const mockedUseChat = useChat as jest.Mock;

describe("ChatInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the input and send button", () => {
    mockedUseChat.mockReturnValue({
      chatState: { isTyping: false },
    });

    const onSendMessage = jest.fn();
    render(<ChatInput onSendMessage={onSendMessage} />);

    const formContainer = screen.getByRole("form", {
      name: "Chat Input Area",
    });
    expect(formContainer).toBeInTheDocument();

    const inputField = screen.getByRole("textbox", {
      name: "Type your message here",
    });
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveAttribute("placeholder", "Type a message...");

    const sendButton = screen.getByRole("button", {
      name: "Send message",
    });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toHaveTextContent("Send");
  });

  it("should call onSendMessage and clear the input", async () => {
    mockedUseChat.mockReturnValue({
      chatState: { isTyping: false },
    });

    const onSendMessage = jest.fn().mockResolvedValue(undefined);
    render(<ChatInput onSendMessage={onSendMessage} />);

    const inputField = screen.getByRole("textbox", {
      name: "Type your message here",
    });
    const sendButton = screen.getByRole("button", {
      name: "Send message",
    });

    fireEvent.change(inputField, { target: { value: "Hello world!" } });
    expect(inputField).toHaveValue("Hello world!");

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(onSendMessage).toHaveBeenCalledTimes(1);
    expect(onSendMessage).toHaveBeenCalledWith("Hello world!");
    expect(inputField).toHaveValue("");
  });

  it("should not call onSendMessage if the input is empty or contains only whitespace", async () => {
    mockedUseChat.mockReturnValue({
      chatState: { isTyping: false },
    });

    const onSendMessage = jest.fn();
    render(<ChatInput onSendMessage={onSendMessage} />);

    const inputField = screen.getByRole("textbox", {
      name: "Type your message here",
    });
    const sendButton = screen.getByRole("button", {
      name: "Send message",
    });

    fireEvent.change(inputField, { target: { value: "   " } });
    expect(inputField).toHaveValue("   ");

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(onSendMessage).not.toHaveBeenCalled();
  });

  it("should disable the input and button and display 'Generating...' when isTyping is true", () => {
    mockedUseChat.mockReturnValue({
      chatState: { isTyping: true },
    });

    const onSendMessage = jest.fn();
    render(<ChatInput onSendMessage={onSendMessage} />);

    const inputField = screen.getByRole("textbox", {
      name: "Type your message here",
    });
    expect(inputField).toBeDisabled();

    const sendButton = screen.getByRole("button");

    expect(sendButton).toBeDisabled();
    expect(sendButton).toHaveTextContent("Generating...");
    expect(sendButton).toHaveAttribute(
      "aria-label",
      "Message is being generated"
    );
  });
});
