## **TC-03 Width input invalid values validation - boundary values**

***Priority***: P2  
***Automation***: [Yes](/tests/TC-03_Width_validation_limit_values_Negativ_check.spec.ts)

***Steps***:

1. Enter a width value less than the minimum (from 0 to 229 inclusive) and click "Generate preview".

2. Enter a width value greater than the maximum (from 1021 to 99999) and click "Generate preview".

***Expected result***:

- If entered < 230 → the field and iframe automatically set width = 230.

- If entered > 1020 → the field and iframe automatically set width = 1020.

- iframe and preview update correctly
