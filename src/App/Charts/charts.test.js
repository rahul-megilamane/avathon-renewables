import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Charts from '.';

beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

const props = {
  deviceAssetLocation: "Minneapolis",
  faultDeviceData: [
    { asset_id: 1, code: 101, description: "Error 101", duration_seconds: 3600, category: "Network" }
  ],
  totalDevicesInAsset: [1],
  deviceData: [{ id: 1, device_name: "Device A" }]
};

test('renders charts and allows toggling chart type', async () => {
  render(<Charts {...props} />);

  await waitFor(() => {
    expect(screen.getByText(/By Alarm Code/)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByLabelText(/Frequency/i));
  expect(screen.getByLabelText(/Frequency/i)).toBeChecked();
});