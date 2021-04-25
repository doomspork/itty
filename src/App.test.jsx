import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders our initial form component', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Shorten!/i);
  expect(buttonElement).toBeInTheDocument();
});
