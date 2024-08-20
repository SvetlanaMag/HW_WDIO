import { INPUTFIELD, validationMessage } from "../../../data/textNotification.js";
import { IProduct } from "../../../data/types/product.types.js";
import { AddNewProductPage } from "../../pages/products/addNewProduct.page.js";
import { ProductsPage } from "../../pages/products/products.page.js";

export class AddNewProductService {
    constructor(
        private addNewProductPage = new AddNewProductPage(),
        private productsPage = new ProductsPage(),
    ) {}

    async fillProductInputs(newProduct: Partial<IProduct>) {
        await this.addNewProductPage.fillInputs(newProduct)
    }

    async save() {
        await this.addNewProductPage.clickOnSaveButton()
    }

    async create(newProduct: IProduct) {
        await this.fillProductInputs(newProduct);
        await this.save();
        await this.addNewProductPage.waitForSpinnerToHide();
        await this.productsPage.waitForOpened();
    }

    async checkErrorMessage(field: INPUTFIELD) {
        const expectedMessage = await this.addNewProductPage.getErrorMessage(field)

        expect(expectedMessage).toEqual(validationMessage[field])
    }

    async checkSaveNewProductButtonIsDisabled() {
        const button = await this.addNewProductPage.getOnSaveButton()
        await expect(button).toBeDisabled()

    }
 } 