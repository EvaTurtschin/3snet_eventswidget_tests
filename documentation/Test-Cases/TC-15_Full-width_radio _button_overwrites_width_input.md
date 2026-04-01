## **TC-15 Activated "full-width" radio button overwrites previous width input**

***Priority***: P2
***Automation***: [YES](/tests/TC-15_Full-width_radio%20_button_overwrites_width_input.spec.ts)

***Steps***:

1. Enter a valid width value (values from 230 to 1020)

2. Activate the "Full width of container" radio button

3. Click the "Generate Preview" button

***Expected result***:

- In src, the width parameter is updated to "100%"

- Preview reloads to full width of the container