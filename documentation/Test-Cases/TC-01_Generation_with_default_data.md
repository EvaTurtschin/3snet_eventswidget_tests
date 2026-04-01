## **TC-01 Generation of iframe code and preview with default values**

***Priority***: P1
***Automation***: [Yes](/tests/TC-01_Generation_with_default_data.spec.ts)

***Preconditions***: Page is loaded

***Steps***:

1. Without changing settings, click "Generate Preview"

***Expected result***:

preview and iframe code are displayed

***In the generated code***:

- id is present

- correct src

- width matches the default value

- height matches the default value

- frameborder="0"