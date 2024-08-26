import { INPUTFIELD, validationMessage } from "../../../data/textNotification.js";
import { IProduct } from "../../../data/types/product.types.js";
import { logStep } from "../../../utils/report/decorator.js";
import { AddNewProductPage } from "../../pages/products/addNewProduct.page.js";
import { ProductsPage } from "../../pages/products/products.page.js";

export class AddNewProductService {
    constructor(
        private addNewProductPage = new AddNewProductPage(),
        private productsPage = new ProductsPage(),
    ) {}

    @logStep('Fill product inputs')
    async fillProductInputs(newProduct: Partial<IProduct>) {
        await this.addNewProductPage.fillInputs(newProduct)
    }

    @logStep('Save new product')
    async save() {
        await this.addNewProductPage.clickOnSaveButton()
    }

    @logStep('Create product')
    async create(newProduct: IProduct) {
        await this.fillProductInputs(newProduct);
        await this.save();
        await this.addNewProductPage.waitForSpinnerToHide();
        await this.productsPage.waitForOpened();
    }

    @logStep('Check error message')
    async checkErrorMessage(field: INPUTFIELD) {
        const expectedMessage = await this.addNewProductPage.getErrorMessage(field)

        expect(expectedMessage).toEqual(validationMessage[field])
    }

    @logStep('Check Save button is diabled')
    async checkSaveNewProductButtonIsDisabled() {
        const button = await this.addNewProductPage.getSaveButton()
        await expect(button).toBeDisabled()

    }
 } 