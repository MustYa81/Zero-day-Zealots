import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserLogin from './UserLogin';

describe('UserLogin Component', () => {
  beforeEach(() => {
    render(<UserLogin />);
  });

  describe('Initial Render', () => {
    test('renders the login page container', () => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    test('displays correct title and headings', () => {
      expect(screen.getByRole('heading', { name: /Login to CleanCity/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /User Authentication/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Demo Accounts/i })).toBeInTheDocument();
    });

    test('contains all required form fields', () => {
      expect(screen.getByLabelText(/Email Address \*/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password \*/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    test('has register link', () => {
      expect(screen.getByRole('link', { name: /Register here/i })).toBeInTheDocument();
    });

    test('displays demo accounts information', () => {
      expect(screen.getByText(/Use these accounts for testing:/i)).toBeInTheDocument();
      expect(screen.getByText(/Regular User/i)).toBeInTheDocument();
      expect(screen.getByText(/user@cleancity.com/i)).toBeInTheDocument();
      expect(screen.getByText(/password123/i)).toBeInTheDocument();
      expect(screen.getByText(/Admin User/i)).toBeInTheDocument();
      expect(screen.getByText(/admin@cleancity.com/i)).toBeInTheDocument();
      expect(screen.getByText(/admin123/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    test('shows error when submitting empty form', () => {
      const submitButton = screen.getByRole('button', { name: /Sign In/i });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('login-error')).toBeVisible();
      expect(screen.getByTestId('login-error')).toHaveTextContent(/Please fill in all required fields/i);
    });

    test('validates email format', () => {
      const emailInput = screen.getByLabelText(/Email Address \*/i);
      const submitButton = screen.getByRole('button', { name: /Sign In/i });

      // Test invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('login-error')).toBeVisible();
      expect(screen.getByTestId('login-error')).toHaveTextContent(/Please enter a valid email address/i);

      // Test valid email
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
      fireEvent.click(submitButton);
      expect(screen.getByTestId('login-error')).not.toBeVisible();
    });

    test('requires password', () => {
      const emailInput = screen.getByLabelText(/Email Address \*/i);
      const submitButton = screen.getByRole('button', { name: /Sign In/i });

      // Fill only email
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      expect(screen.getByTestId('login-error')).toBeVisible();
      expect(screen.getByTestId('login-error')).toHaveTextContent(/Please fill in all required fields/i);
    });
  });

  describe('Error/Success Messages', () => {
    test('error message is hidden by default', () => {
      expect(screen.getByTestId('login-error')).not.toBeVisible();
    });

    test('success message is hidden by default', () => {
      expect(screen.getByTestId('login-success')).not.toBeVisible();
    });
  });

  describe('Demo Accounts Section', () => {
    test('displays correct demo accounts layout', () => {
      const demoAccountsSection = screen.getByText(/Demo Accounts/i).closest('.card');
      const gridItems = demoAccountsSection.querySelectorAll('div > div');
      
      expect(gridItems.length).toBe(2);
      expect(gridItems[0]).toHaveTextContent(/Regular User/i);
      expect(gridItems[1]).toHaveTextContent(/Admin User/i);
    });
  });
});