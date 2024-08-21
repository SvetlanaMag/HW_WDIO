import { DETAILSFIELDS } from '../../../data/types/detailsWindowFields.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class ModalWindowPage extends SalesPortalPage {
    readonly uniqueElement = 'h5.modal-title';

    private readonly 'Modal value by field name' = (field: DETAILSFIELDS) => `//div[./strong[.='${field}:']]/div`;
    private readonly closeDetailsWindowButton = 'div.modal-header button.btn-close';
    private readonly cancelDetailsWindowButton = '.modal-footer .btn-secondary';
    private readonly submitDeleteButton = '.modal-dialog button[type="submit"]';

    async getDetailsTitle() {
        return await this.getText(this.uniqueElement)
    }

    async getDetailsData() {
        const [name, amount, price, manufacturer, notes] = await Promise.all([
            this.getText(this['Modal value by field name'](DETAILSFIELDS.NAME)),
            this.getText(this['Modal value by field name'](DETAILSFIELDS.AMOUNT)),
            this.getText(this['Modal value by field name'](DETAILSFIELDS.PRICE)),
            this.getText(this['Modal value by field name'](DETAILSFIELDS.MANUFACTURER)),
            this.getText(this['Modal value by field name'](DETAILSFIELDS.NOTES))
          ]);
          return { name, manufacturer, price: +price, amount: +amount, notes };
    }

    async closeDetailsWindow() {
        await this.click(this.cancelDetailsWindowButton)
    }
    
    async clickOnSubmitDeleteButton() {
        await this.click(this.submitDeleteButton)
    }
}