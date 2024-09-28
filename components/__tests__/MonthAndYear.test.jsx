// components/__tests__/MonthAndYear.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthAndYear from '../MonthAndYear';

test('renders MonthAndYear component', () => {
  render(<MonthAndYear />);
  const monthAndYearElement = screen.getByTestId('month-and-year');
  expect(monthAndYearElement).toBeInTheDocument();
});