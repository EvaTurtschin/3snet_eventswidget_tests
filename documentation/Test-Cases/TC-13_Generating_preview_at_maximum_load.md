## **TC-13 Checking preview generation at maximum load < 2sec**

***Priority***: P1
***Automation***: [YES](/tests/TC-13_Generating_preview_at_maximum_load.spec.ts)

***Steps***:

1. Select Theme = Select all

2. Select countries = Select all

3. Enter maximum width value 1020

4. Enter maximum height value 720

5. Activate radio button Full container width

6. Activate radio button Full block height

7. Select any color theme (not default turquoise)

8. Click the "Copy code" button

9. Generate preview

***Expected result***:

- The measured preview generation time does not exceed the allowable (for example, take 2sec)