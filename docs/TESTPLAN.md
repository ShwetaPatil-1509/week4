# COBOL Account Management Test Plan

This test plan covers all business logic in the current COBOL application (`main.cob`, `operations.cob`, `data.cob`).

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Startup menu displays correctly | App compiled and running | 1. Launch app 2. Observe initial output | Menu displayed with options 1-4 and prompt |  |  |  |
| TC-002 | View balance returns initial account value | App started, storage-balance = 1000.00 | 1. Enter 1 (View Balance) | Display "Current balance: 1000.00" |  |  |  |
| TC-003 | Credit account increases balance | App started, balance = 1000.00 | 1. Enter 2; 2. Enter amount 250.00 | Display new balance 1250.00 after credit |  |  |  |
| TC-004 | Debit account decreases balance when sufficient funds | App started, balance = 1000.00 | 1. Enter 3; 2. Enter amount 300.00 | Display new balance 700.00 after debit |  |  |  |
| TC-005 | Debit account rejects when insufficient funds | App started, balance = 1000.00 | 1. Enter 3; 2. Enter amount 1200.00 | Display "Insufficient funds for this debit." and balance unchanged |  |  |  |
| TC-006 | Data persistence simulation across operations | App started | 1. Credit 200.00 2. View balance 3. Debit 100.00 4. View balance | First view after credit is 1200.00, second view after debit is 1100.00 |  |  |  |
| TC-007 | Invalid menu option handling | App started | 1. Enter 5 or 0 | Display error "Invalid choice, please select 1-4." and re-prompt menu |  |  |  |
| TC-008 | Exit option ends program | App started | 1. Enter 4 | Display "Exiting the program. Goodbye!" and terminate |  |  |  |
