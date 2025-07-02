# CleanCity Test Plan & Strategy

## 1. 1.	Group Members
Sandra Chelangat - sandramitei5@gmail.com  
Mustafa Ibrahim -mustibr55@hotmail.com  
Mpendulo Maduna - mpendulodnyawose@gmail.com

## 2. Objectives
The objective of this test plan is to ensure that the Clean City waste management platform meets all the defined functional and non-functional requirements. It should be secure, performance, and user-friendly across supported devices and environments. The system will be validated under normal and peak load conditions.  

## 3. Scope
### ✅ The scope of this test plan includes the following:

•	User registration, authentication, and role management
•	Garbage pickup scheduling and confirmation
•	Admin dashboard analytics and control
•	Complaint submission and notification system
•	System response performance


## 4.	Inclusions
•	Test strategy document
•	Test case specification and design documents
•	Execution reports
•	Defect tracking reports
•	Performance test results

## 5.	Test Environments
Testing will be conducted in the following environments:

•	Development environment – local test servers
•	QA/Staging environment – pre-production hosted build
•	UAT environment – for user acceptance testing
•	Production environment – final validation (smoke only)  
Target Platforms:
•	Windows 10 – Chrome, Firefox, Edge
•	Android OS – Chrome

## 6.	Defect Reporting Procedure
Defects will be logged in JIRA using a standard template with detailed reproduction steps and screenshots. Defects will be triaged daily and prioritized based on severity. The QA team will provide daily status reports to the development lead.

## 7.	Test Schedule  

|     Task               | Start Date | End Date |  
|------------------------|-----------------------|  
| Test Planning          | June 30    | July 2   |  
| Test Case Design       | July 2     | July 2   |  
| Unit Testing           | July 3     | July 4   |  
| Integration Testing    | July 4     | July 6   |  
| System Testing         | July 7     | July 8   |  
| UAT & Regression       | July 9     | July 11  |  
| Test Closure           | July 12    | July 13  |  
| Bug Fixing & Retesting | July 13    | July 14  |  
| Report Creation and    | July 14    | July 16  |  
| Submission             |            |          |  



## 8.	Entry and Exit Criteria

### Entry Criteria:

•	Requirements and design documents are finalized and shared
•	Stable build is deployed to the test environment
•	Test cases are reviewed and signed off  

### Exit Criteria:  

•	All high and critical bugs resolved or accepted
•	Test execution completed with 95% pass rate
•	Test summary report prepared and approved by stakeholders


## 9. Tools
•	JIRA – Bug and task tracking
•	BrowserStack – Cross-browser/device testing
•	Jest – Unit and regression testing
•	Selenium – UI test automation
•	Postman – API testing
•	Excel/Word – Test case documentation and reporting


## 10.	Risks and Mitigation
•	Risk: Delay in build delivery → Mitigation: Add buffer time in schedule
•	Risk: Test data issues → Mitigation: Use mock data generators
•	Risk: Environment instability → Mitigation: Backup staging environment


## 11.	Approvals
All documents, including Test Plan, Test Cases, and Summary Reports, will be reviewed and approved by the QA Lead and Project Stakeholders before moving to the next testing phase.

---

# Test Strategy – Clean City Project


## Introduction
This Test Strategy document outlines the testing approach for the Clean City project, a waste management platform aimed at optimizing scheduling, reporting, and performance monitoring of garbage collection services. The objective is to ensure the system meets both functional and non-functional requirements before deployment.

## Test Objectives
•	Verify core functionalities such as waste scheduling, user reporting, and admin dashboards.
•	Ensure compatibility across major browsers and mobile devices.
•	Validate performance under expected and peak user loads.
 
## Scope of Testing
### In-scope:

•	User registration, login, and authentication
•	Waste pickup scheduling
•	Admin dashboard and analytics
•	Public complaint reporting
•	Notification and alert system Out-of-scope:
•	Payment integration (not in MVP)
•	Third-party map-based routing (placeholder APIs used)

## Test Levels  
•	Unit Testing – Performed by developers using Jest or similar.
•	Integration Testing – Verifying interfaces between modules (e.g., frontend- backend, user-API).
•	System Testing – End-to-end tests covering full user workflows.
•	Acceptance Testing – Final verification based on stakeholder requirements.
•	Regression Testing – Ensuring new code does not break existing features.


## Test Techniques
•	Black Box Testing: System, acceptance, and regression levels.
•	Decision Table Testing: For schedule validations and reporting logic.
•	Boundary Value Analysis: Waste capacity limits, location inputs.
•	Exploratory Testing: On UI/UX flows and dashboard usage.


## Test Environment
### Hardware:

•	Minimum: 4-core CPU, 8GB RAM (for testers)
 
•	Server: 8-core, 32GB RAM, SSD

### Software:

•	Backend: Node.js, Express.js
•	Frontend: React.js
•	Database: PostgreSQL
•	Test Framework: Jest, Selenium

### Network:

•	Stable connection with a minimum of 10 Mbps for remote testing
•	Localhost and deployed environments (e.g., AWS)

### Devices/Browsers:

•	Chrome (latest 2 versions)
•	Firefox (latest 2 versions)
•	Safari (latest 2 versions)
•	Edge (latest 2 versions)
•	Android and iOS devices


## Test Deliverables
•	Test Plan Document
•	Test Cases and Checklists
•	Bug Reports (GitHub Issues)
•	Test Summary Report
•	Automation Scripts (if any)


## Resource Planning
•	QA Engineer: Writes test cases, executes manual testing (2 resources). All members will participate.
 
•	Automation Engineer: Builds Selenium/Jest scripts (1 resource). All members will participate.
•	Project Manager: Oversees schedule and progress (1 resource). The group leader will guide the team.

## Risk Assessment and Mitigation
•	Risk: Late code delivery → Mitigation: Parallel test planning, buffer in schedule.
•	Risk: Lack of test data → Mitigation: Create mock data generator scripts.
•	Risk: Browser compatibility issues → Mitigation: Use BrowserStack for cross-browser testing.

## Test Exit Criteria
•	All high and critical bugs are resolved or accepted.
•	95% of planned test cases executed and passed.
•	Regression suite shows no breakage.
•	UAT sign-off team members.


## Test Metrics and Reporting
•	KPI 1: Test case execution rate
•	KPI 2: Defect density per module
•	KPI 3: Pass/fail rate by severity

## Reporting Structure:

Frequency: Weekly status reports
Format: PDF/Markdown + GitHub Issue links Recipients: Team members and Instructor.
 
