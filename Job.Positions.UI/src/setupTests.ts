// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./components/Form";

test("renders form and validates budget", () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);

  const budgetInput = screen.getByLabelText(/Budget/i);
  fireEvent.change(budgetInput, { target: { value: -10 } });

  fireEvent.submit(screen.getByRole("form"));
  expect(handleSubmit).not.toHaveBeenCalled();
  expect(screen.getByText(/Budget must be non-negative!/i)).toBeInTheDocument();
});
