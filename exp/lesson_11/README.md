## Напишите тесты на поведение, используя sinon mock
  * После оплаты напитка посетителем, напиток попадает в учетную систему (для бухгалтерии, которая в конце дня считает выручку)
  * Если выбранный напиток закончился, то бармен отправляет смс, только один раз, с текстом "Напиток <имя> закончился. Закажите еще кегу." 
      
## Прочитайте следующие ресурсы
  * Статья Мартина Фаулера https://martinfowler.com/articles/mocksArentStubs.html
  * Roy Osherove. The Art of Unit Testing. 2nd edition.   
    - Глава 3. Using stubs to break dependencies.
    - Глава 4. Interaction testing using mock objects.