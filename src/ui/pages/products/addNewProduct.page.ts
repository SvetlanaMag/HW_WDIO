import { IProduct } from "../../../data/types/product.types.js";
import { SalesPortalPage } from "../salesPortal.page.js";

export class AddNewProductPage extends SalesPortalPage{
    readonly uniqueElement = '//h2[.="Add New Product "]';

    private readonly 'Name input' = '#inputName';
    private readonly 'Manufacturer dropdown' = 'select#inputManufacturer';
    private readonly 'Price input' = '#inputPrice';
    private readonly 'Amount input' = '#inputAmount';
    private readonly 'Notes textarea' = '#textareaNotes';
    private readonly 'Save new product button' = 'button#save-new-product';

    async fillInputs(newProduct: Partial<IProduct>) {
        newProduct.name && (await this.setValue(this['Name input'], newProduct.name));
        newProduct.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], newProduct.manufacturer));
        newProduct.price && (await this.setValue(this['Price input'], newProduct.price));
        newProduct.amount && (await this.setValue(this['Amount input'], newProduct.amount));
        newProduct.notes && (await this.setValue(this['Notes textarea'], newProduct.notes));
    }

    async clickOnSaveButton() {
        await this.click(this['Save new product button']);
    }
}