import { IProduct, MANUFACTURER } from "../data/types/product.types.js";
import { faker } from '@faker-js/faker';
import { getRandromEnumValue } from "../utils/getRandomValue.js";


//HW19
export const newProduct: IProduct = {
    name: 'Test name' + Date.now(),
    manufacturer: MANUFACTURER.APPLE,
    price: 100,
    amount: 5,
    notes: 'Test notes'
}

//HW20
export function generateNewProduct(productData?: Partial<IProduct>) {
    const productToCreate: IProduct = {
      name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
      price: faker.number.int({ min: 1, max: 99999 }),
      amount: faker.number.int({ min: 0, max: 999 }),
      notes: faker.string.alphanumeric(238) + '!@#$%^&*()_+',
      manufacturer: getRandromEnumValue(MANUFACTURER),
      ...productData
    };
    return productToCreate;
}