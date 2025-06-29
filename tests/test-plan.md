# CleanCity Test Plan & Strategy

## 1. Overview
**Purpose**: Ensure reliability of sensor data ingestion, mobile route handling, Firebase sync, and web/dashboard interactions across the CleanCity system components.

## 2. Objectives
- Validate sensor-to-gateway communication.
- Confirm correct Firebase writes/reads for bin status & location.
- Test driver app routing (shortest path) to collection points.
- Ensure municipal dashboard displays real-time statuses.
- Catch regressions and performance issues early.

## 3. Scope
### ✅ In‑Scope
- Sensor data ingestion (unit/integration).
- Firebase CRUD operations.
- Mobile app: route generation and UI.
- Dashboard UI components.
- API endpoints (if any).
- End-to-end flows across devices and cloud.

### ❌ Out-of-Scope
- Hardware-level sensor engineering.
- Non-functional aspects like cost or scalability.

## 4. Test Strategy
### 4.1 Test Types
- **Unit Tests**: sensor data parsing, route calculation functions.
- **Integration Tests**: Firebase interactions (mock + real).
- **E2E Tests**: Simulate driver using mobile app, verify UI reflects backend state.
- **UI Regression**: Dashboard components with visual tests.
- **Performance/Stress**: Firebase writes at scale/day, mobile route calculation under many bins.

### 4.2 Testing Tools
- **Backend & Data**: Jest / Mocha + chai.
- **Firebase Mocks**: `firebase-mock` or emulator suite.
- **Mobile app**: Detox or Appium (React Native / Flutter assumptions).
- **Web Dashboard**: Cypress + Percy for visual diff.
- **Performance**: k6 or JMeter on API/Firebase endpoints.

## 5. Environment & Dependencies
- Node.js v16+
- Firebase emulator or test project
- Android/iOS emulator or real devices
- Web browser (Chrome, Firefox) for dashboard

## 6. Test Data
- Mock sensor payloads: realistic/edge values.
- Bin location sets: single and clusters.
- Claimed/collected bin scenarios.
- Empty vs. full bin boundary cases.

## 7. Responsibility
| Role           | Responsibilities                          |
|----------------|-------------------------------------------|
| QA Engineer    | Write test code, manage CI integration    |
| Dev Team       | Build and verify feature parity           |
| DevOps         | Setup emulators, CI/CD environments       |

## 8. Test Schedule
- **Unit/Integration**: Ongoing with development
- **E2E & UI**: After major feature branches, weekly
- **Performance**: Monthly or post‑release

## 9. Risks & Mitigations
- **Firebase quota limits** → Use emulator or tear-down in CI
- **Mobile testing friction** → Use emulators and TestFlight/Play alpha
- **Sensor data drift** → Introduce fuzz testing on payloads

## 10. Deliverables
- Test suites in `tests/`
- CI pipeline with pass/fail
- Coverage reports (>= 80%)
- Bug summaries, performance logs

---

### ✅ Next Steps:
1. Add this file to your repo:
   ```bash
   mkdir -p tests
   cp test-plan.md tests/test-plan.md
   git add tests/test-plan.md
   git commit -m "Add initial CleanCity test plan & strategy"
