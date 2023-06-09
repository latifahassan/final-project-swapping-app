import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('does the h1 say SWAPP bit by bit-test', () => {
  render(<App />);
  const h1Element = screen.getByText(/SWAPP bit by bit-test/i);
  expect(h1Element).toBeInTheDocument();
});