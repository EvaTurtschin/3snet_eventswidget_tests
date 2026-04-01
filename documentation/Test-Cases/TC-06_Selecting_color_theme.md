## **TC-06 Check selecting color theme for preview generation**

***Priority***: P1  
***Automation***: [Yes](/tests/TC-06_Selecting_color_theme.spec.ts)

***Steps***:

1. Select a color theme (non-default, turquoise)

2. Click "Generate preview"

***Expected result***:

- In src, the theme parameter is updated and matches the selection  
- preview reloads with new theme
