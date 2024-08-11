import { ModalWindowPage } from "../../pages/products/modalWindow.page.js";
import { textNotification } from "../../../data/modalWindowTextNotification.js";
import { ProductsPage } from "../../pages/products/products.page.js";
import { IProduct } from "../../../data/types/product.types.js";

export class ModalWindowService {
    constructor (
        private modalWindowPage = new ModalWindowPage(),
        private productsPage = new ProductsPage(),
    ) {}

    async checkNotificationCreateProduct() {
        expect(await this.modalWindowPage.getNotificationText()).toEqual(textNotification.createProduct)
        await this.modalWindowPage.closeNotificationWindow()
    }

    async openDetailsWindow(newProduct: IProduct) {
        await this.productsPage.clickOnDetailsButton(newProduct.name);
        await this.productsPage.waitForSpinnerToHide();
        await this.modalWindowPage.waitForOpened();
        expect (await this.modalWindowPage.getDetailsTitle()).toEqual(newProduct.name + "'s Details");
    }

    async checkDetailsWindowData(newProduct: IProduct) {
        expect (await this.modalWindowPage.getNameFieldText()).toEqual(newProduct.name);
        expect (await this.modalWindowPage.getAmountFieldText()).toEqual(newProduct.amount);
        expect (await this.modalWindowPage.getPriceFieldText()).toEqual(newProduct.price);
        expect (await this.modalWindowPage.getManufacturerFieldText()).toEqual(newProduct.manufacturer);
        expect (await this.modalWindowPage.getNotesFieldText()).toEqual(newProduct.notes);
        await this.modalWindowPage.closeDetailsWindow();
        await this.productsPage.waitForOpened();
    }
   
}