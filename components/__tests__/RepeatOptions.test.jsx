// components/__tests__/RepeatOptions.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RepeatOptions from '../RepeatOptions';

test('renders RepeatOptions component', () => {
  render(<RepeatOptions />);
  const repeatOptionsElement = screen.getByTestId('repeat-options');
  expect(repeatOptionsElement).toBeInTheDocument();
});

test('opens custom options on custom option click', () => {
  render(<RepeatOptions />);
  const customOption = screen.getByText('custom');
  fireEvent.click(customOption);
  const customOptionsElement = screen.getByTestId('repeat-options-custom-dropdown');
  expect(customOptionsElement).toBeInTheDocument();
});