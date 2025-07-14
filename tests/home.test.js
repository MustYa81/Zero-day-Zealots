import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './Home';
import dataService from '../services/dataService';

// Mock the dataService module
jest.mock('../services/dataService');

describe('Home Component', () => {
  beforeEach(() => {
    // Setup mock implementations
    dataService.getLocations.mockReturnValue(['Location A', 'Location B', 'Location C']);
    dataService.getWasteTypes.mockReturnValue(['General', 'Recyclable', 'Hazardous']);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with all form elements', () => {
    render(<Home />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Schedule a Waste Pickup')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Pickup Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Waste Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Preferred Pickup Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Additional Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit Request' })).toBeInTheDocument();
  });

  test('auto-focuses on name input on mount', () => {
    render(<Home />);
    expect(screen.getByLabelText('Full Name')).toHaveFocus();
  });

  test('shows error when required fields are empty', () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Submit Request'));
    
    expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all required fields.');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('submits successfully when all required fields are filled', () => {
    render(<Home />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Pickup Location'), { target: { value: 'Location A' } });
    fireEvent.change(screen.getByLabelText('Waste Type'), { target: { value: 'General' } });
    fireEvent.change(screen.getByLabelText('Preferred Pickup Date'), { target: { value: '2023-12-31' } });
    
    fireEvent.click(screen.getByText('Submit Request'));
    
    expect(screen.getByRole('status')).toHaveTextContent('Your waste pickup request has been submitted!');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    
    // Verify form is reset
    expect(screen.getByLabelText('Full Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Pickup Location')).toHaveValue('');
    expect(screen.getByLabelText('Waste Type')).toHaveValue('');
    expect(screen.getByLabelText('Preferred Pickup Date')).toHaveValue('');
    expect(screen.getByLabelText('Additional Description')).toHaveValue('');
  });

  test('handles optional description field correctly', () => {
    render(<Home />);
    
    // Fill required fields
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Pickup Location'), { target: { value: 'Location A' } });
    fireEvent.change(screen.getByLabelText('Waste Type'), { target: { value: 'General' } });
    fireEvent.change(screen.getByLabelText('Preferred Pickup Date'), { target: { value: '2023-12-31' } });
    
    // Fill optional description
    const testDescription = 'This is a test description';
    fireEvent.change(screen.getByLabelText('Additional Description'), { 
      target: { value: testDescription } 
    });
    
    fireEvent.click(screen.getByText('Submit Request'));
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('populates location dropdown from dataService', () => {
    render(<Home />);
    const options = screen.getAllByRole('option', { name: /Location/ });
    expect(options).toHaveLength(3); // 3 locations + 1 default
    expect(dataService.getLocations).toHaveBeenCalled();
  });

  test('populates waste type dropdown from dataService', () => {
    render(<Home />);
    const options = screen.getAllByRole('option', { name: /General|Recyclable|Hazardous/ });
    expect(options).toHaveLength(3); // 3 types + 1 default
    expect(dataService.getWasteTypes).toHaveBeenCalled();
  });
});