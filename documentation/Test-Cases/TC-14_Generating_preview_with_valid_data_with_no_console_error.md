## **TC-14 Verify preview generation with valid data and no console errors**

***Priority***: P1  
***Automation***: [YES](/tests/TC-14_Generating_preview_with_valid_data_with_no_console_error.spec.ts)

***Steps***:

1. Select any Topic  
2. Select any Country  
3. Enter maximum width value 1020  
4. Enter minimum height value 240  
5. Select any color theme (not default turquoise)  
6. Click the "Copy code" button  
7. Generate the preview

***Expected result***:

- Verify the console has no errors
