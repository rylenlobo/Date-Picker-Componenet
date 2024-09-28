import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from '../Calendar';

test('renders Calendar component', () => {
  render(<Calendar />);
  const calendarElement = screen.getByTestId('calendar');
  expect(calendarElement).toBeInTheDocument();
});