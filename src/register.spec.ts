const url = 'https://anatoly-karpovich.github.io/demo-login-form/';
const registerButtonSelector = 'input.button#registerOnLogin';
const register2ButtonSelector= 'input.button#register';
const usernameRegisterSelector = 'input#userNameOnRegister';
const passwordRegisterSelector = 'input#passwordOnRegister';
const usernameLoginSelector = 'input#userName';
const passwordLoginSelector = 'input#password';
const submitButtonSelector= 'input.button#submit';
const messageSelector = 'h4#errorMessageOnRegister';
const messageLoginSelector = 'h4#errorMessage';

const credsCheckUsernameField = [
    {
        checkName: 'valid username & valid password',
        username: 'Mary May',
        password: 'SecretPassword',
        expectedNotification: 'Successfully registered! Please, click Back to return on login page',
        expectedNotificationLogin: ''
    },
    {
        checkName: 'empty username & valid password',
        username: '',
        password: 'SecretPassword',
        expectedNotification: 'Username is required',
        expectedNotificationLogin: 'Username is required'
    },
    {
        checkName: 'username 2 characters & valid password',
        username: 'Ma',
        password: 'SecretPassword',
        expectedNotification: 'Username should contain at least 3 characters',
        expectedNotificationLogin: 'Invalid credentials'
    },
    {
        checkName: 'username with prefix/postfix spaces & valid password',
        username: ' Mary May ',
        password: 'SecretPassword',
        expectedNotification: 'Prefix and postfix spaces are not allowed is username',
        expectedNotificationLogin: 'Invalid credentials'
    },
];

const credsCheckPasswordField = [
    {
        checkName: 'valid username & empty password',
        username: 'John Doe',
        password: '',
        expectedNotification: 'Password is required',
        expectedNotificationLogin: 'Password is required'
    },
    {
        checkName: 'valid username & password 7 characters',
        username: 'John Doe',
        password: 'SecretP',
        expectedNotification: 'Password should contain at least 8 characters',
        expectedNotificationLogin: 'Invalid credentials'
    },
    {
        checkName: 'valid username & password without charecter in lower case',
        username: 'John Doe',
        password: 'secretpassword',
        expectedNotification: 'Password should contain at least 1 character in lower case',
        expectedNotificationLogin: 'Invalid credentials'
    },
];
 

describe('Task1', () => {

    it('register with valid credentials', async () => {
        await browser.maximizeWindow();
        await browser.url(url);

        const registerButtonLink = await $(registerButtonSelector);
        await registerButtonLink.click();

        const usernameFieldLink = await $(usernameRegisterSelector);
        const passwordFieldLink = await $(passwordRegisterSelector);
        const register2ButtonLink = await $(register2ButtonSelector);
        await usernameFieldLink.setValue(credsCheckUsernameField[0].username);
        await passwordFieldLink.setValue(credsCheckUsernameField[0].password);
        await register2ButtonLink.click();

        const messageText = await $(messageSelector)
        await expect(messageText).toHaveText(credsCheckUsernameField[0].expectedNotification)

        await browser.pause(500);
    });
});

describe('Task2: Registration suit', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url(url);
        await browser.pause(500);
        const registerButtonLink = await $(registerButtonSelector);
        await registerButtonLink.click();
        await browser.pause(500);
    });

    for (let i = 1; i < credsCheckUsernameField.length; i++) {
        it(`register with ${credsCheckUsernameField[i].checkName}`, async () => {

            const usernameFieldLink = await $(usernameRegisterSelector);
            const passwordFieldLink = await $(passwordRegisterSelector);
            const register2ButtonLink = await $(register2ButtonSelector);
            await usernameFieldLink.setValue(credsCheckUsernameField[i].username);
            await passwordFieldLink.setValue(credsCheckUsernameField[i].password);
            await register2ButtonLink.click();

            const messageText = await $(messageSelector)
            await expect(messageText).toHaveText(credsCheckUsernameField[i].expectedNotification)

            await browser.pause(500);
        })
    };

    for (let i = 0; i < credsCheckPasswordField.length; i++) {
        it(`register with ${credsCheckPasswordField[i].checkName}`, async () => {

            const usernameFieldLink = await $(usernameRegisterSelector);
            const passwordFieldLink = await $(passwordRegisterSelector);
            const register2ButtonLink = await $(register2ButtonSelector);
            await usernameFieldLink.setValue(credsCheckPasswordField[i].username);
            await passwordFieldLink.setValue(credsCheckPasswordField[i].password);
            await register2ButtonLink.click();

            const messageText = await $(messageSelector)
            await expect(messageText).toHaveText(credsCheckPasswordField[i].expectedNotification)

            await browser.pause(500);
        })
    };
});


describe('Task2: Login suit', () => {
    
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url(url);
    });

    for (let i = 1; i < credsCheckUsernameField.length; i++) {
        it(`login with ${credsCheckUsernameField[i].checkName}`, async () => {

            const usernameFieldLink = await $(usernameLoginSelector);
            const passwordFieldLink = await $(passwordLoginSelector);
            const submitButtonLink = await $(submitButtonSelector);
            await usernameFieldLink.setValue(credsCheckUsernameField[i].username);
            await passwordFieldLink.setValue(credsCheckUsernameField[i].password);
            await submitButtonLink.click();

            const messageText = await $(messageLoginSelector)
            await expect(messageText).toHaveText(credsCheckUsernameField[i].expectedNotificationLogin)

            await browser.pause(500);
        })
    };

    for (let i = 1; i < credsCheckPasswordField.length; i++) {
        it(`login with ${credsCheckPasswordField[i].checkName}`, async () => {

            const usernameFieldLink = await $(usernameLoginSelector);
            const passwordFieldLink = await $(passwordLoginSelector);
            const submitButtonLink = await $(submitButtonSelector);
            await usernameFieldLink.setValue(credsCheckPasswordField[i].username);
            await passwordFieldLink.setValue(credsCheckPasswordField[i].password);
            await submitButtonLink.click();

            const messageText = await $(messageLoginSelector)
            await expect(messageText).toHaveText(credsCheckPasswordField[i].expectedNotificationLogin)

            await browser.pause(500);
        })
    };
});