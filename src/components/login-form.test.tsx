import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./login-form";
import { account } from "@/lib/appwrite";
import toast from "react-hot-toast";
import * as nextNavigation from "next/navigation";

// Mock the dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/appwrite", () => ({
  account: {
    createEmailPasswordSession: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("<LoginForm />", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("submits the form with valid data", async () => {
    (account.createEmailPasswordSession as jest.Mock).mockResolvedValue({});

    render(<LoginForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "StrongPass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Sucesso. Seja bem-vindo!");
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("shows error toast for failed login attempt", async () => {
    const mockError = new Error("Invalid credentials");
    (account.createEmailPasswordSession as jest.Mock).mockRejectedValue(
      mockError,
    );

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(<LoginForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "StrongPass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Login failed:", mockError);
      expect(toast.error).toHaveBeenCalledWith(
        "Falha no login. Verifique os dados e tente novamente.",
      );
    });

    consoleSpy.mockRestore();
  });

  it("navigates to register page when clicking Sign Up button", () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockRouter.push).toHaveBeenCalledWith("/register");
  });
});
