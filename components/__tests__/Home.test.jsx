// __tests__/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from "@app/page.tsx"

test('renders the entire app and checks if all components are present', () => {
  render(<Home />);
  
  // Check if Calendar component is present
  const calendarElement = screen.getByTestId('calendar');
  expect(calendarElement).toBeInTheDocument();

  // Check if DatePicker component is present
  const datePickerElement = screen.getByPlaceholderText('Select a date');
  expect(datePickerElement).toBeInTheDocument();

  // Check if MiniCalendar component is present
  const miniCalendarElement = screen.getByTestId('mini-calendar');
  expect(miniCalendarElement).toBeInTheDocument();

  // Check if MonthAndYear component is present
  const monthAndYearElement = screen.getByTestId('month-and-year');
  expect(monthAndYearElement).toBeInTheDocument();

  // Check if RepeatEndCalendar component is present
  const repeatEndCalendarElement = screen.getByTestId('repeat-end-calendar');
  expect(repeatEndCalendarElement).toBeInTheDocument();

  // Check if RepeatOptions component is present
  const repeatOptionsElement = screen.getByTestId('repeat-options');
  expect(repeatOptionsElement).toBeInTheDocument();

  // Check if RepeatOptionsCustomDropdown component is present
  const customDropdownElement = screen.getByTestId('repeat-options-custom-dropdown');
  expect(customDropdownElement).toBeInTheDocument();

  // Check if RepeatOptionsDropdown component is present
  const dropdownElement = screen.getByTestId('repeat-options-dropdown');
  expect(dropdownElement).toBeInTheDocument();
});