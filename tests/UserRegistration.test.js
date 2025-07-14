/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load the HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../path/to/UserRegistration.js'), 'utf8');

describe('UserRegistration Component', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = html.toString();
  });

  beforeEach(() => {
    // Reset form inputs before each test
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
    
    // Hide any error/success messages
    document.getElementById('register-error').style.display = 'none';
    document.getElementById('register-success').style.display = 'none';
  });

  describe('Initial Render', () => {
    test('renders the registration page container', () => {
      const page = document.getElementById('register-page');
      expect(page).not.toBeNull();
      expect(page.style.display).toBe('none'); // Initially hidden
    });

    test('displays correct title and headings', () => {
      const title = document.querySelector('#register-page .page-title');
      expect(title.textContent).toBe('Register for CleanCity');
      
      const cardTitles = document.querySelectorAll('#register-page .card h2, #register-page .card h3');
      expect(cardTitles[0].textContent).toBe('Create Account');
      expect(cardTitles[1].textContent).toBe('Security Notice');
    });

    test('contains all required form fields', () => {
      const form = document.getElementById('register-form');
      expect(form).not.toBeNull();
      
      const inputs = form.querySelectorAll('input');
      expect(inputs.length).toBe(4);
      expect(document.getElementById('register-name')).not.toBeNull();
      expect(document.getElementById('register-email')).not.toBeNull();
      expect(document.getElementById('register-password')).not.toBeNull();
      expect(document.getElementById('register-confirm-password')).not.toBeNull();
    });

    test('has password requirement note', () => {
      const note = document.querySelector('#register-form small.text-muted');
      expect(note.textContent).toContain('Password must be at least 3 characters long');
    });

    test('has login link', () => {
      const loginLink = document.querySelector('#register-page a[data-page="login"]');
      expect(loginLink).not.toBeNull();
      expect(loginLink.textContent).toContain('Login here');
    });
  });

  describe('Form Validation', () => {
    test('requires all fields to be filled', () => {
      const form = document.getElementById('register-form');
      const submitEvent = new Event('submit', { cancelable: true });
      
      form.dispatchEvent(submitEvent);
      
      const errorElement = document.getElementById('register-error');
      expect(errorElement.style.display).not.toBe('none');
      expect(errorElement.textContent).toContain('Please fill in all required fields');
    });

    test('validates email format', () => {
      const form = document.getElementById('register-form');
      const emailInput = document.getElementById('register-email');
      
      // Test invalid email
      emailInput.value = 'invalid-email';
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const errorElement = document.getElementById('register-error');
      expect(errorElement.style.display).not.toBe('none');
      expect(errorElement.textContent).toContain('Please enter a valid email address');
      
      // Test valid email
      emailInput.value = 'valid@example.com';
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      expect(errorElement.style.display).toBe('none');
    });

    test('validates password length', () => {
      const form = document.getElementById('register-form');
      const passwordInput = document.getElementById('register-password');
      
      // Test short password
      passwordInput.value = '12';
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const errorElement = document.getElementById('register-error');
      expect(errorElement.style.display).not.toBe('none');
      expect(errorElement.textContent).toContain('Password must be at least 3 characters');
      
      // Test valid password
      passwordInput.value = '1234';
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      expect(errorElement.style.display).toBe('none');
    });

    test('validates password confirmation', () => {
      const form = document.getElementById('register-form');
      const passwordInput = document.getElementById('register-password');
      const confirmInput = document.getElementById('register-confirm-password');
      
      // Set different passwords
      passwordInput.value = 'password123';
      confirmInput.value = 'different';
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const errorElement = document.getElementById('register-error');
      expect(errorElement.style.display).not.toBe('none');
      expect(errorElement.textContent).toContain('Passwords do not match');
      
      // Set matching passwords
      confirmInput.value = 'password123';
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      expect(errorElement.style.display).toBe('none');
    });
  });

  describe('Security Notice', () => {
    test('displays security information', () => {
      const securityNotice = document.querySelector('#register-page .card ul');
      expect(securityNotice).not.toBeNull();
      
      const items = securityNotice.querySelectorAll('li');
      expect(items.length).toBe(4);
      expect(items[0].textContent).toContain('Hashed using secure algorithms');
      expect(items[1].textContent).toContain('Validated with stronger requirements');
      expect(items[2].textContent).toContain('Protected against common attacks');
      expect(items[3].textContent).toContain('Stored securely in a database');
    });
  });
});