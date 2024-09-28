import React from 'react';
import { render, screen } from '@testing-library/react';
import MiniCalendar from '../MiniCalendar';

test('renders MiniCalendar component', () => {
  render(<MiniCalendar />);
  const miniCalendarElement = screen.getByTestId('mini-calendar');
  expect(miniCalendarElement).toBeInTheDocument();
});