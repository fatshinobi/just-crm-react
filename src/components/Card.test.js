import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Card from './Card';

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
