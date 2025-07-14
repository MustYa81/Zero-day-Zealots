import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockAuth, mockApi, renderWithProviders } from './testUtils';
import PickupScheduling from '../components/PickupScheduling';

describe('Pickup Scheduling Functionality', () => {
  beforeEach(() => {
    mockApi.schedulePickup.mockClear();
    mockAuth.isLoggedIn.mockReturnValue(true);
  });

  test('TC-01: Verify Successful Pickup Scheduling with Required Fields', async () => {
    mockApi.schedulePickup.mockResolvedValue({ success: true, date: '2023-12-01' });
    renderWithProviders(<PickupScheduling />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Date/i), { 
      target: { value: '2023-12-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Waste Type/i), { 
      target: { value: 'Recyclable' } 
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { 
      target: { value: 'Medium' } 
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Verify the expected behavior
    await waitFor(() => {
      expect(mockApi.schedulePickup).toHaveBeenCalledWith({
        date: '2023-12-01',
        wasteType: 'Recyclable',
        quantity: 'Medium',
        userId: 123
      });
      expect(screen.getByText(/Pickup scheduled for 2023-12-01/i)).toBeInTheDocument();
    });
  });

  test('TC-02: Reject Pickup Dates <24 Hours in Advance', async () => {
    const today = new Date().toISOString().split('T')[0];
    renderWithProviders(<PickupScheduling />);

    // Attempt to schedule for today
    fireEvent.change(screen.getByLabelText(/Date/i), { 
      target: { value: today } 
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Verify error message
    expect(await screen.findByText(/Date must be at least 24 hours in advance/i)).toBeInTheDocument();
    expect(mockApi.schedulePickup).not.toHaveBeenCalled();
  });

  test('TC-03: Verify Time Slot Availability', async () => {
    mockApi.getTimeSlots.mockResolvedValue(['9 AM-12 PM', '1 PM-4 PM']);
    renderWithProviders(<PickupScheduling />);

    // Select a valid date
    fireEvent.change(screen.getByLabelText(/Date/i), { 
      target: { value: '2023-12-01' } 
    });

    // Verify time slots appear
    await waitFor(() => {
      expect(screen.getByText(/9 AM-12 PM/i)).toBeInTheDocument();
      expect(screen.getByText(/1 PM-4 PM/i)).toBeInTheDocument();
    });
  });

  test('TC-04: Block Multiple Pickups on the Same Date', async () => {
    mockApi.schedulePickup.mockRejectedValue({ 
      error: 'Only one pickup per day is allowed' 
    });
    renderWithProviders(<PickupScheduling />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Date/i), { 
      target: { value: '2023-12-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Waste Type/i), { 
      target: { value: 'Recyclable' } 
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { 
      target: { value: 'Medium' } 
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Verify error message
    expect(await screen.findByText(/Only one pickup per day is allowed/i)).toBeInTheDocument();
  });
});