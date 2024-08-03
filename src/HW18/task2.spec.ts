/* 
Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
 - проверить исчезновение спиннера с помощью waitFor* методов
 - проверить действительно ли пользователь с логином AQA User вошел в систему
 - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный

 Рекомендации по использованию:
 - метод $$ поиска по всем элементам
 - for .. of  для перебора коллекции элементов
 - метод click() для клика по элементу в цикле
 - Проверить background-color можно двумя способами:
    1. По CSS стилю.  element.getCSSProperty('background-color)  https://webdriver.io/docs/api/element/getCSSProperty
    2. По отсутствию класса, отвечающего за добавление красного бэкграунда.  element.getAttribute('class') https://webdriver.io/docs/api/element/getAttribute
*/

describe('Task2', () => {

    const url = 'https://anatoly-karpovich.github.io/aqa-course-project/#';
    const emailInputField = 'input#emailinput';
    const passwordInputField = 'input#passwordinput';
    const submitButton = 'button[type="submit"]';
    const spinner = '.spinner-border';
    const dropdownTitle = 'a#dropdownUser1';
    const leftsideMenuItems = 'ul.flex-column li a.nav-link';

    const creds = {
        email: 'aqacourse@gmail.com',
        password: 'password',
        login: 'AQA User'
    };
    const redBackgroundColor = '#dc3545'

    before(async() => {
        browser.maximizeWindow();
        browser.url(url);
    });

    it('should check background-color leftside menu elements', async () => {

        await $(emailInputField).setValue(creds.email);
        await $(passwordInputField).setValue(creds.password);

        await $(submitButton).click();

        await $(spinner).waitForDisplayed({reverse: true});

        const userName = await $(dropdownTitle).getText();
        expect(userName).toEqual(creds.login);

        const leftsideMenuItemsArray = await $$(leftsideMenuItems);

        for (const item of leftsideMenuItemsArray) {
            await $(item).click();
            await $(spinner).waitForDisplayed({reverse: true});                     //пока не пропал спиннер элемент бэкграунда нет

            const backgroundColor = await item.getCSSProperty('background-color');  //приходит обект
            console.log(backgroundColor);
            console.log(backgroundColor.parsed.hex);
            
            expect(backgroundColor.parsed.hex).not.toEqual(redBackgroundColor)
        }
    });
});