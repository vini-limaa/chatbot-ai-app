import { renderHook, act } from "@testing-library/react";
import useChat from "@/hooks/useChat";
import ChatProviderMock from "./ChatProviderMock";

describe("useChat Hook", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() => useChat(), {
      wrapper: ChatProviderMock,
    });

    expect(result.current.chatState.isLoading).toBe(false);
    expect(result.current.chatState.messages).toEqual([]);
  });

  it("should update isLoading state", () => {
    const { result } = renderHook(() => useChat(), {
      wrapper: ChatProviderMock,
    });

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.chatState.isLoading).toBe(true);
  });

  it("should send a message and update state", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: "1",
              author: "ChatBot",
              message: "Hello!",
              createdAt: "2025-02-07T12:03:00.000Z",
            },
          ]),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useChat(), {
      wrapper: ChatProviderMock,
    });

    await act(async () => {
      await result.current.sendMessage("Hello");
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.current.chatState.messages.length).toBe(1);
    expect(result.current.chatState.messages[0].message).toBe("Hello!");

    jest.restoreAllMocks();
  });
});
