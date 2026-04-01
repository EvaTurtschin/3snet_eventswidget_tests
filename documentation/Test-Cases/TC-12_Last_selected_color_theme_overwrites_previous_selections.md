## **TC-12 Last selected color theme overwrites previous selections**

***Priority***: P1
***Automation***: [YES](/tests/TC-12_Last_selected_color_theme_overwrites_previous_selections.spec.ts)

***Steps***:

1. Select the first color theme (not default, for example purple)

2. Select the second color theme (for example blue)

3. Select the third color theme (turquoise)

4. Select the fourth color theme (for example green)

5. Generate preview

***Expected result***:

- In src, the theme parameter is updated to the last selected one

- The preview reloads with the last selected color theme