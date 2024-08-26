import { LeftSideMenu } from "../pages/leftSideMenu.page.js";
import { SignInPage } from "../pages/signIn.page.js";
import { ICredentials } from "../../data/types/creds.types.js";
import { ADMIN_PASSWORD, ADMIN_EMAIL } from '../../config/environment.js';
import { HomePage } from "../pages/home.page.js";
import { logStep } from "../../utils/report/decorator.js";

export class SignInService {
    constructor(
        protected signInPage = new SignInPage(),
        private homePage = new HomePage(),
        protected leftSideMenu = new LeftSideMenu(),
    ) {}

    @logStep('Open Sales portal')
    async openSalesPortal() {
        await this.signInPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
    }

    @logStep('Login')
    async login(credentials: Partial<ICredentials>){
        await this.signInPage.fillLoginForm(credentials);
        await this.signInPage.clickSubmitButton();
        await this.signInPage.waitForSpinnerToHide();
        await this.leftSideMenu.waitForOpened();
        await this.homePage.waitForOpened();
    }

    @logStep('Login as admin')
    async loginAsAdmin() {
        await this.login({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    }

    @logStep('Check username')
    async checkRightUserIsLogin(ADMIN_USERNAME: string) {
        const login = ADMIN_USERNAME
        await expect(await this.leftSideMenu.getUsername()).toEqual(login)
    }

    @logStep('Sign Out')
    async signOut() {
        await browser.deleteCookies(['Authorization']);
      }

}