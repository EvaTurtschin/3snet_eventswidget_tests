## **TC-11 Checking invalid width input values (letters)**

***Priority***: P1
***Automation***: [YES](/tests/TC-11_Invalid_width_input_letters.spec.ts)

***Steps***:

1. Enter letter values "oiuzcftz" in the width input field

2. Generate code

***Expected result***:

- The input field automatically returns the width to the default value of 230.

- iframe and preview are correctly updated