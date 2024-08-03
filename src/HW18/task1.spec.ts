/* 
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Loading
- Дождаться появления каждой ссылки на странице (их 2)
- кликнуть по ссылке Example 1: Element on page that is hidden
  - дождаться появления кнопки start
  - кликнуть по кнопке start
  - дождаться появления текста "Hello World!" в теге h4 с помощью метода waitForElementWithText(), который вам надо разработать!:)

 Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text)
 у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
  - Использовать browser.waitUntil с комбинацией проверок (элемент виден и тест верный)
  - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента
*/
async function waitForElementWithText (selector: string, text: string, timeout: number) {
    await browser.waitUntil(
        async () => {
            const elementWithText = await $(selector);
            const actualText = await elementWithText.getText()
            return await elementWithText.isDisplayed() && actualText === text
        },
        {
            timeout: timeout,
            timeoutMsg: `Selector ${selector} wasn't found or text doesn't match ${text}`
        }
    )
}

describe('Task 1', () => {
    const url = 'https://the-internet.herokuapp.com/';
    const dynamicLoadingPageLocator = 'a[href="/dynamic_loading"]';
    const examplesLocator = 'div.example a';
    const example1Locator = 'a[href="/dynamic_loading/1"]';
    const startButtonLocator = 'div#start button';
    const finishTextLocator = 'div#finish h4'

    before(async () => {
        await browser.maximizeWindow();
        await browser.url(url);
    });

    it('should wait for element with text', async () => {
        const dynamicLoadingPageLink =  await $(dynamicLoadingPageLocator)
        await dynamicLoadingPageLink.click();

        const examplesLinksArray = await $$(examplesLocator)
        await browser.waitUntil(
            async () => {
                if(examplesLinksArray.length === 2) {
                    const isDisplayed = await examplesLinksArray.every(el => el.isDisplayed())
                    return isDisplayed
                }
                throw new Error("Bad locator");
            },
            {
                timeoutMsg: 'One of the links is still not displayed'
            }
        )
        const examle1Link = await $(example1Locator);
        await examle1Link.click();

        const startButton = await $(startButtonLocator);
        await startButton.waitForDisplayed();
        await startButton.click()

        const expectedText = 'Hello World!'
        await waitForElementWithText(finishTextLocator, expectedText, 10000)
    });
});