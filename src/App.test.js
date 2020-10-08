import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


test('renders App without errors', () => {
  render(<App />);
});

test('renders the form header', () => {
  render (<App />);
  const header = screen.getByText(/add new animal/i);
  expect(header).toBeInTheDocument();

  // additional assertions
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/add new animal/i);
  
  // negative assertions
  expect(header).not.toBeFalsy();
  expect(header).not.toHaveTextContent(/add new giraffe/i);
});