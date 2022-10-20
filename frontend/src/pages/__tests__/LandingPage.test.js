import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

test('nav to submission', async () => {
  render(
  <Router>
  <LandingPage />
  </Router>);
  const user = userEvent;

  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

