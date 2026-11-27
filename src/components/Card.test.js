import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Card from './Card';
import { apiDelete } from '../api/apiFetch';

jest.mock('../api/apiFetch', () => ({
    apiDelete: jest.fn(),
}));

const mockRecord = {
    id: 1,
    caption: "My Card Title",
    avatar_url: "/avatar/1",
    delete_path: null,
    tags: [],
    description: "Some description",
    show_path: "/cards/1",
};

beforeEach(() => {
  process.env.REACT_APP_API_HOST = "http://localhost:4000";
});

test("renders record caption", () => {
    render(
        <MemoryRouter>
            <Card record={mockRecord} defaultImage="/placeholder.png" onDelete={jest.fn()} />
        </MemoryRouter>
    );

    expect(screen.getByText("My Card Title")).toBeInTheDocument();
});

test("renders record description", () => {
    render(
        <MemoryRouter>
            <Card record={mockRecord} defaultImage="/placeholder.png" onDelete={jest.fn()} />
        </MemoryRouter>
    );

    expect(screen.getByText("Some description")).toBeInTheDocument();
});

test("link has correct path", () => {
    render(
        <MemoryRouter>
            <Card record={mockRecord} defaultImage="/placeholder.png" onDelete={jest.fn()} />
        </MemoryRouter>
    );

  const link = screen.getByRole("link", { name: /view/i });
  expect(link).toHaveAttribute("href", "/cards/1");
});

test("img has correct avatar url", () => {
    render(
        <MemoryRouter>
            <Card record={mockRecord} defaultImage="/placeholder.png" onDelete={jest.fn()} />
        </MemoryRouter>
    );

  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "http://localhost:4000/avatar/1");
});

const mockRecordWithDelete = {
    id: 1,
    caption: "My Card Title",
    avatar_url: "/avatar/1",
    delete_path: "/cards/1",
    tags: [],
    description: "Some description",
    show_path: "/cards/1",
};

beforeEach(() => {
    process.env.REACT_APP_API_HOST = "http://localhost:4000";
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
});

test("calls apiDelete with delete_path when confirmed", async () => {
    apiDelete.mockResolvedValue(null);
    const onDelete = jest.fn();
    render(
        <MemoryRouter>
            <Card record={mockRecordWithDelete} defaultImage="/placeholder.png" onDelete={onDelete} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => expect(apiDelete).toHaveBeenCalledWith("/cards/1"));
});

test("calls onDelete with record.id on success", async () => {
    apiDelete.mockResolvedValue(null);
    const onDelete = jest.fn();
    render(
        <MemoryRouter>
            <Card record={mockRecordWithDelete} defaultImage="/placeholder.png" onDelete={onDelete} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => expect(onDelete).toHaveBeenCalledWith(1));
});

test("does not delete when user cancels confirm", () => {
    window.confirm = jest.fn(() => false);
    const onDelete = jest.fn();
    render(
        <MemoryRouter>
            <Card record={mockRecordWithDelete} defaultImage="/placeholder.png" onDelete={onDelete} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(apiDelete).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
});

test("does nothing when delete_path is null", () => {
    render(
        <MemoryRouter>
            <Card record={mockRecord} defaultImage="/placeholder.png" onDelete={jest.fn()} />
        </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toBeDisabled();
});

test("handles apiDelete error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    apiDelete.mockRejectedValue(new Error("fail"));
    const onDelete = jest.fn();
    render(
        <MemoryRouter>
            <Card record={mockRecordWithDelete} defaultImage="/placeholder.png" onDelete={onDelete} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith("Delete error:", expect.any(Error)));
    expect(onDelete).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
});
