import { SalesPortalPage } from '../salesPortal.page.js';

export class ModalWindowPage extends SalesPortalPage {
    readonly uniqueElement = 'h5.modal-title';

    private readonly notification = '.toast-container.notification-wrapper .toast-body';
    private readonly closeNotificationButton = '.toast-container.notification-wrapper .btn-close';
    private readonly nameField = '//section/div[1]/div';
    private readonly amountField = '//section/div[2]/div';
    private readonly priceField = '//section/div[3]/div';
    private readonly manufacturerField = '//section/div[4]/div';
    private readonly notesField = '//section/div[6]/div';
    private readonly closeDetailsWindowButton = 'div.modal-header button.btn-close';


    async getNotificationText() {
        return await this.getText(this.notification)
    }

    async closeNotificationWindow() {
        await this.click(this.closeNotificationButton)
    }

    async getDetailsTitle() {
        return await this.getText(this.uniqueElement)
    }

    async getNameFieldText() {
        return await this.getText(this.nameField)
    }

    async getAmountFieldText() {
        const amountFieldText = await this.getText(this.amountField)
        return +amountFieldText
    }

    async getPriceFieldText() {
        const priceFieldText = await this.getText(this.priceField)
        return +priceFieldText
    }

    async getManufacturerFieldText() {
        return await this.getText(this.manufacturerField)
    }

    async getNotesFieldText() {
        return await this.getText(this.notesField)
    }

    async closeDetailsWindow() {
        await this.click(this.closeDetailsWindowButton)
    }
}