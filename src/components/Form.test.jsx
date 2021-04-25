import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from './Form';

test('renders our form', () => {
  render(<Form />);
  const buttonElement = screen.getByText(/Shorten!/i);
  expect(buttonElement).toBeInTheDocument();
});
