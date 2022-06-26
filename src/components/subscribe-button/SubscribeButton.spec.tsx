import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    render(<SubscribeButton priceId="" />);
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });
  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });
    render(<SubscribeButton priceId="" />);
    const subscribeButton = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButton);
    expect(signInMocked).toHaveBeenCalled();
  });
  it("redirects to posts when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: "fake-active-subscription",
      },
      status: "authenticated",
    });
    render(<SubscribeButton priceId="" />);
    const subscribeButton = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButton);
    expect(pushMock).toHaveBeenCalled();
  });
});
