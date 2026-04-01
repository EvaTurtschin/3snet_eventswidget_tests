## **TC-07 Country Selection Check** (Limited by implementation of selection options)

***Priority***: P1
***Automation***: [Yes](/tests/TC-07_Country_selection.spec.ts)

***Steps***:

1. Select countries

2. Select all

3. Click the "Generate Preview" button

***Expected result***:

- The src contains the parameter event_country=on

- The value is correctly transmitted
