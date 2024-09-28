// components/__tests__/RepeatOptionsDropdown.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import RepeatOptionsDropdown from '../RepeatOptionsDropdown';

test('renders RepeatOptionsDropdown component', () => {
  render(<RepeatOptionsDropdown />);
  const dropdownElement = screen.getByTestId('repeat-options-dropdown');
  expect(dropdownElement).toBeInTheDocument();
});