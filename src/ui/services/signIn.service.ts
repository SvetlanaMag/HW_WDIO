import { LeftSideMenu } from "../pages/leftSideMenu.page.js";
import { SignInPage } from "../pages/signIn.page.js";
import { ICredentials } from "../../data/types/creds.types.js";
import { ADMIN_PASSWORD, ADMIN_EMAIL } from '../../config/environment.js';
import { HomePage } from "../pages/home.page.js";

export class SignInService {
    constructor(
        protected signInPage = new SignInPage(),
        private homePage = new HomePage(),
        protected leftSideMenu = new LeftSideMenu(),
    ) {}

    async openSalesPortal() {
        await this.signInPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
    }

    async login(credentials: Partial<ICredentials>){
        await this.signInPage.fillLoginForm(credentials);
        await this.signInPage.clickSubmitButton();
        await this.signInPage.waitForSpinnerToHide();
        await this.leftSideMenu.waitForOpened();
        await this.homePage.waitForOpened();
    }

    async loginAsAdmin() {
        await this.login({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    }

    async checkRightUserIsLogin(ADMIN_USERNAME: string) {
        const login = ADMIN_USERNAME
        await expect(await this.leftSideMenu.getUsername()).toEqual(login)
    }

    async signOut() {
        await browser.deleteCookies(['Authorization']);
      }

}