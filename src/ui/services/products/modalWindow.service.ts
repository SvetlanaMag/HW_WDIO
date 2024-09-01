import { ModalWindowPage } from "../../pages/products/modalWindow.page.js";
import { ProductsPage } from "../../pages/products/products.page.js";
import { IProduct } from "../../../data/types/product.types.js";
import { logStep } from "../../../utils/report/decorator.js";

export class ModalWindowService {
    constructor (
        private modalWindowPage = new ModalWindowPage(),
        private productsPage = new ProductsPage(),
    ) {}

    async openDetailsWindow(newProduct: IProduct) {
        await this.productsPage.clickOnDetailsButton(newProduct.name);
        await this.productsPage.waitForSpinnerToHide();
        await this.modalWindowPage.waitForOpened();
        expect (await this.modalWindowPage.getDetailsTitle()).toEqual(newProduct.name + "'s Details");
    }

    @logStep('Validate product in Details window')
    async checkDetailsWindowData(newProduct: IProduct) {
        const receivedProduct = await this.modalWindowPage.getDetailsData()
        await expect (receivedProduct).toMatchObject({...newProduct})
        await this.modalWindowPage.closeDetailsWindow()
    }

    @logStep('Delete product')
    async deleteProduct(newProduct: IProduct) {
        await this.productsPage.clickOnDeleteButton(newProduct.name);
        await this.productsPage.waitForSpinnerToHide();
        await this.modalWindowPage.waitForOpened();
        await this.modalWindowPage.clickOnSubmitDeleteButton();
    }
 
}