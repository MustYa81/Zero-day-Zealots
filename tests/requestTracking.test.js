import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockAuth, mockApi, renderWithProviders } from './testUtils';
import RequestTracking from '../components/RequestTracking';

describe('Request Tracking Functionality', () => {
  beforeEach(() => {
    mockApi.getPickupStatus.mockClear();
    mockAuth.isLoggedIn.mockReturnValue(true);
  });

  test('TC-01: Verify Real-Time Status Updates for Pickup Requests', async () => {
    // Mock initial status
    mockApi.getPickupStatus.mockResolvedValueOnce({ status: 'Pending' });
    
    // Mock updated status after delay
    setTimeout(() => {
      mockApi.getPickupStatus.mockResolvedValue({ status: 'Assigned' });
    }, 100);

    renderWithProviders(<RequestTracking requestId="PR-1001" />);

    // Check initial status
    expect(await screen.findByText(/Pending/i)).toBeInTheDocument();

    // Check updated status
    await waitFor(() => {
      expect(screen.getByText(/Assigned/i)).toBeInTheDocument();
    }, { timeout: 500 });
  });

  test('TC-02: Verify Notification on Pickup Request Status Change', async () => {
    const mockNotification = {
      show: jest.fn()
    };
    
    mockApi.getPickupStatus.mockResolvedValueOnce({ status: 'Pending' })
      .mockResolvedValueOnce({ status: 'Assigned' });

    renderWithProviders(
      <NotificationContext.Provider value={mockNotification}>
        <RequestTracking requestId="PR-1001" />
      </NotificationContext.Provider>
    );

    await waitFor(() => {
      expect(mockNotification.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Status Updated',
          message: 'Your pickup status changed to Assigned'
        })
      );
    }, { timeout: 500 });
  });

  test('TC-03: Verify Feedback Submission After Pickup Completion', async () => {
    mockApi.submitFeedback.mockResolvedValue({ success: true });
    renderWithProviders(<RequestTracking requestId="PR-1001" status="Completed" />);

    // Open feedback form
    fireEvent.click(screen.getByText(/Provide Feedback/i));

    // Fill out feedback
    fireEvent.click(screen.getByLabelText(/5 stars/i));
    fireEvent.change(screen.getByLabelText(/Comments/i), {
      target: { value: 'Great service!' }
    });

    // Submit feedback
    fireEvent.click(screen.getByRole('button', { name: /Submit Feedback/i }));

    // Verify submission
    await waitFor(() => {
      expect(mockApi.submitFeedback).toHaveBeenCalledWith({
        requestId: 'PR-1001',
        rating: 5,
        comment: 'Great service!',
        userId: 123
      });
      expect(screen.getByText(/Thank you for your feedback/i)).toBeInTheDocument();
    });
  });
});