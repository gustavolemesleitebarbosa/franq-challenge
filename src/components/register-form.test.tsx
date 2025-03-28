import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "./register-form";
import * as nextNavigation from "next/navigation";
import "@testing-library/jest-dom";

// Mock the dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/appwrite", () => ({
  account: {
    create: jest.fn(),
    createEmailPasswordSession: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  },
});

describe("RegisterForm", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders form fields correctly", () => {
    render(<RegisterForm />);

    expect(screen.getByRole("textbox", { name: /Nome/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /E-mail/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Registrar/i }),
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByRole("textbox", { name: /e-mail/i }), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Por favor, insira um endereço de e-mail válido."),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for mismatched passwords", async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/^senha$/i), {
      target: { value: "StrongPass123" },
    });

    fireEvent.change(screen.getByLabelText(/confirmar senha/i), {
      target: { value: "DifferentPass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrar/i }));

    await waitFor(() => {
      expect(screen.getByText("As senhas não coincidem.")).toBeInTheDocument();
    });
  });
});
