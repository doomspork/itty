import React from 'react';
import { render, screen } from '@testing-library/react';
import Success from './Success';

test('renders our new shortened URL', () => {
  render(<Success />);
  const buttonElement = screen.getByText(/Together we've done it/i);
  expect(buttonElement).toBeInTheDocument();
});
