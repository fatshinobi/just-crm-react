import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

beforeEach(() => {
  process.env.REACT_APP_API_HOST = "http://localhost:4000";
  global.fetch = jest.fn();
  Storage.prototype.setItem = jest.fn();
});

test('renders Log In text', () => {
    render(<Login setAccessToken={() => {}} />);
    expect(screen.getByText("Log In")).toBeInTheDocument();
});

test("renders login form", () => {
    const { container } = render(<Login setAccessToken={() => {}} />);
    expect(container.querySelector("form")).toBeInTheDocument();
});

test("renders email, password fields of the form", () => {
    const { container } = render(<Login setAccessToken={() => {}} />);
    const email = container.querySelector('input[name="email"]');
    const password = container.querySelector('input[name="password"]');
    expect(email).toHaveAttribute("type", "email");
    expect(password).toHaveAttribute("type", "password");
});

test("renders submit button of the form", () => {
    render(<Login setAccessToken={() => {}} />);

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

test("submits login and stores tokens on success", async () => {
    const setAccessToken = jest.fn();
    global.fetch.mockResolvedValue({
        ok: true,
        headers: { get: () => "Bearer abc" },
        json: async () => ({ id: 1, name: "Alice" }),
    });

    render(<Login setAccessToken={setAccessToken} />);

    fireEvent.change(document.querySelector('input[name="email"]'), {
        target: { value: "a@b.com" },
    });
    fireEvent.change(document.querySelector('input[name="password"]'), {
        target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:4000/login",
        expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ user: { email: "a@b.com", password: "secret" } }),
        })
    );
    expect(localStorage.setItem).toHaveBeenCalledWith("accessToken", "Bearer abc");
    expect(setAccessToken).toHaveBeenCalledWith(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("userDataId", 1);
    expect(localStorage.setItem).toHaveBeenCalledWith("userDataName", "Alice");
});
