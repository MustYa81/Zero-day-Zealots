// Mock functions and utilities for waste management tests
export const mockAuth = {
  isLoggedIn: jest.fn().mockReturnValue(true),
  getCurrentUser: jest.fn().mockReturnValue({ id: 123, email: 'user@test.com' })
};

export const mockApi = {
  schedulePickup: jest.fn(),
  getPickupStatus: jest.fn(),
  submitFeedback: jest.fn()
};

export const renderWithProviders = (ui) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AuthProvider value={mockAuth}>
        <ApiProvider value={mockApi}>
          {children}
        </ApiProvider>
      </AuthProvider>
    )
  });
};