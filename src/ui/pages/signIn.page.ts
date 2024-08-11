import { ICredentials } from "../../data/types/creds.types.js";
import { SalesPortalPage } from "./salesPortal.page.js";

export class SignInPage extends SalesPortalPage{
    uniqueElement = '//form[.//input[@id="emailinput"]]';

    private readonly 'Email Input' = 'input#emailinput';
    private readonly 'Password Input' = 'input#passwordinput';
    private readonly 'Submit button' = 'button[type="submit"]';

    async fillLoginForm(credentials: Partial<ICredentials>) {
        credentials.email && (await this.setValue(this['Email Input'], credentials.email));
        credentials.password && (await this.setValue(this['Password Input'], credentials.password));
    }

    async clickSubmitButton() {
        await this.click(this['Submit button'])
    }
}

