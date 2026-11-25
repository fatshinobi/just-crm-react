import { render, screen } from '@testing-library/react';
import Login from './Login';

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
