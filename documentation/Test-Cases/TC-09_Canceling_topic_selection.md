## **TC-09 Checking the topic selection cancellation function**

***Priority***: P1
***Automation***: [Yes](/tests/TC-09_Canceling_topic_selection.spec.ts)

***Steps***:

1. Select any topic from the list

2. Click the "Generate Preview" button

3. Check the updated event_group parameter in the iframe code

4. Cancel the topic selection

5. Click the "Generate Preview" button

***Expected result***:

- In src, the current event_group parameter is the last selected topic