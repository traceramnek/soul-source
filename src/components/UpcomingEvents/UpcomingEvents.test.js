import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpcomingEvents from './UpcomingEvents';

describe('<UpcomingEvents />', () => {
  test('it should mount', () => {
    render(<UpcomingEvents />);
    
    const upcomingEvents = screen.getByTestId('UpcomingEvents');

    expect(upcomingEvents).toBeInTheDocument();
  });
});