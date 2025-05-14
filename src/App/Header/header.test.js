import { render, screen, fireEvent } from '@testing-library/react';
import Header from '.';

const mockProps = {
  deviceAssetLocation: "Minneapolis",
  setAssetLocation: jest.fn(),
  dashboardData: {
    totalAlarmDuration: "12",
    totalCountOfAlarms: 5,
    deviceWithMaxAlarms: "Device 1",
    maxDurationAlarm: "4"
  }
};

test('renders header and shows correct dashboard data', () => {
  render(<Header {...mockProps} />);
  
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
  expect(screen.getByText("Minneapolis")).toBeInTheDocument();
  expect(screen.getByText("12")).toBeInTheDocument(); 
  expect(screen.getByText("Device 1")).toBeInTheDocument();
});

test('location dropdown changes location', () => {
  render(<Header {...mockProps} />);
  const locationBtn = screen.getByText("Minneapolis");
  fireEvent.click(locationBtn);
  const newLocation = screen.getByText("Colorado");
  fireEvent.click(newLocation);
  expect(mockProps.setAssetLocation).toHaveBeenCalledWith("Colorado");
});