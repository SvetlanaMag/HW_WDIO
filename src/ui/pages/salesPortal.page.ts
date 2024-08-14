import { BasePage } from "./base.page.js";

export abstract class SalesPortalPage extends BasePage {
    protected readonly spinner = '.spinner-border';
    abstract readonly uniqueElement: string;
    private readonly notification = '.toast-container.notification-wrapper .toast-body';
    private readonly closeNotificationButton = '.toast-container.notification-wrapper .btn-close';

    async waitForSpinnerToHide() {
        await this.waitForElement(this.spinner, 10000, true)
    }

    async waitForOpened() {
        await this.waitForElement(this.uniqueElement);
    }

    async getNotificationText() {
        return await this.getText(this.notification)
    }

    async closeNotificationWindow() {
        await this.click(this.closeNotificationButton)
    }

}