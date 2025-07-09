// __tests__/dataService.test.js

// Mock localStorage
import '../__tests__/setup.js';
import { dataService } from '../script';

describe('dataService.getAllPickupRequests', () => {
  test('should return array of pickup requests', () => {
    const requests = dataService.getAllPickupRequests();
    expect(Array.isArray(requests)).toBe(true);
    expect(requests.length).toBeGreaterThan(0);
  });
});