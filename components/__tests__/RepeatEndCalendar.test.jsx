// components/__tests__/RepeatEndCalendar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import RepeatEndCalendar from '../RepeatEndCalendar';

test('renders RepeatEndCalendar component', () => {
  render(<RepeatEndCalendar />);
  const repeatEndCalendarElement = screen.getByTestId('repeat-end-calendar');
  expect(repeatEndCalendarElement).toBeInTheDocument();
});