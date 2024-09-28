// components/__tests__/RepeatOptionsCustomDropdown.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import RepeatOptionsCustomDropdown from '../RepeatOptionsCustomDropdown';

test('renders RepeatOptionsCustomDropdown component', () => {
  render(<RepeatOptionsCustomDropdown />);
  const customDropdownElement = screen.getByTestId('repeat-options-custom-dropdown');
  expect(customDropdownElement).toBeInTheDocument();
});