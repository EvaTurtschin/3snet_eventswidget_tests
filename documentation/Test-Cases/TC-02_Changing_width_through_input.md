## **TC-02 Проверка изменение ширины превью через input**

***Priority***: P1
***Automation***: [Yes](/tests/TC-02_Changing_width_through_input.spec.ts)

***Steps***:

1. Ввести новое валидное значение ширины (значения от 230 до 1020)

2. Нажать "Сгенерировать превью"

***Expected result***:

- width обновлён в коде iframe

- width превью соответствует введённому значению