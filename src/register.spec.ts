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
const validCredentials = {
    username: 'MaryMM',
    password: 'Password'
};
const actualSuccessMessageText = 'Successfully registered! Please, click Back to return on login page'

const inValidCredentials = {
    username: ['', 'Ma', ' Mary '],
    password: ['', 'Passwor', 'password'],
    errorMessageRegisterUsername: ['Username is required',
                            'Username should contain at least 3 characters', 
                            'Prefix and postfix spaces are not allowed is username'],
    errorMessageRegisterPassword: ['Password is required',
                            'Password should contain at least 8 characters', 
                            'Password should contain at least 1 character in lower case'],
    errorMessageLoginUsername: ['Username is required',
                                'Invalid credentials', 
                                'Invalid credentials'],
    errorMessageLoginPassword: ['Password is required',
                                'Invalid credentials', 
                                'Invalid credentials']
};

describe('Task1', () => {

    it('register with valid credentials', async () => {
        await browser.maximizeWindow();
        await browser.url(url);

        const registerButtonLink = await $(registerButtonSelector);
        await registerButtonLink.click();

        const usernameFieldLink = await $(usernameRegisterSelector);
        const passwordFieldLink = await $(passwordRegisterSelector);
        const register2ButtonLink = await $(register2ButtonSelector);
        await usernameFieldLink.setValue(validCredentials.username);
        await passwordFieldLink.setValue(validCredentials.password);
        await register2ButtonLink.click();

        const messageText = await $(messageSelector)
        await expect(messageText).toHaveText(actualSuccessMessageText)

        await browser.pause(2000);
    });
});

describe('Task2: Registration suit', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url(url);
        await browser.pause(1000);
        const registerButtonLink = await $(registerButtonSelector);
        await registerButtonLink.click();
        await browser.pause(2000);
    });

    for (let i = 0; i < inValidCredentials.username.length; i++) {
        it(`register with invalid ${inValidCredentials.username[i]}`, async () => {

            const usernameFieldLink = await $(usernameRegisterSelector);
            const passwordFieldLink = await $(passwordRegisterSelector);
            const register2ButtonLink = await $(register2ButtonSelector);
            await usernameFieldLink.setValue(inValidCredentials.username[i]);
            await passwordFieldLink.setValue(validCredentials.password);
            await register2ButtonLink.click();

            const messageText = await $(messageSelector)
            await expect(messageText).toHaveText(inValidCredentials.errorMessageRegisterUsername[i])

            await browser.pause(2000);
        })
    };

    for (let i = 0; i < inValidCredentials.password.length; i++) {
        it(`register with invalid ${inValidCredentials.password[i]}`, async () => {

            const usernameFieldLink = await $(usernameRegisterSelector);
            const passwordFieldLink = await $(passwordRegisterSelector);
            const register2ButtonLink = await $(register2ButtonSelector);
            await usernameFieldLink.setValue(validCredentials.username);
            await passwordFieldLink.setValue(inValidCredentials.password[i]);
            await register2ButtonLink.click();

            const messageText = await $(messageSelector)
            await expect(messageText).toHaveText(inValidCredentials.errorMessageRegisterPassword[i])

            await browser.pause(2000);
        })
    };
});


describe('Task2: Login suit', () => {
    
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url(url);
    });

    for (let i = 0; i < inValidCredentials.username.length; i++) {
        it(`login with invalid ${inValidCredentials.username[i]}`, async () => {

            const usernameFieldLink = await $(usernameLoginSelector);
            const passwordFieldLink = await $(passwordLoginSelector);
            const submitButtonLink = await $(submitButtonSelector);
            await usernameFieldLink.setValue(inValidCredentials.username[i]);
            await passwordFieldLink.setValue(validCredentials.password);
            await submitButtonLink.click();

            const messageText = await $(messageLoginSelector)
            await expect(messageText).toHaveText(inValidCredentials.errorMessageLoginUsername[i])

            await browser.pause(2000);
        })
    };

    for (let i = 0; i < inValidCredentials.password.length; i++) {
        it(`register with invalid ${inValidCredentials.password[i]}`, async () => {

            const usernameFieldLink = await $(usernameLoginSelector);
            const passwordFieldLink = await $(passwordLoginSelector);
            const submitButtonLink = await $(submitButtonSelector);
            await usernameFieldLink.setValue(validCredentials.username);
            await passwordFieldLink.setValue(inValidCredentials.password[i]);
            await submitButtonLink.click();

            const messageText = await $(messageLoginSelector)
            await expect(messageText).toHaveText(inValidCredentials.errorMessageLoginPassword[i])

            await browser.pause(2000);
        })
    };
});