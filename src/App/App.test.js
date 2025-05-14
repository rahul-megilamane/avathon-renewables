import { render, screen, waitFor } from '@testing-library/react';
import App from '.';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders dashboard and chart components', async () => {
  render(<App />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  
  // Check initial location
  expect(screen.getByText("Minneapolis")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Total Alarm Duration/i)).toBeInTheDocument();
  });
});