import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Card from './Card';

test("renders record caption", () => {
  const mockRecord = {
    id: 1,
    caption: "My Card Title",
    avatar_url: null,
    delete_path: null,
    tags: [],
    description: "Some description",
    show_path: "/cards/1",
  };

  render(
    <MemoryRouter>
      <Card record={mockRecord} defaultImage="/placeholder.png" onDelete={jest.fn()} />
    </MemoryRouter>
  );

  expect(screen.getByText("My Card Title")).toBeInTheDocument();
});
