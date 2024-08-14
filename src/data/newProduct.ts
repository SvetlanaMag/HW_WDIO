import { IProduct, MANUFACTURER } from "../data/types/product.types.js";

export const newProduct: IProduct = {
    name: 'Test name' + Date.now(),
    manufacturer: MANUFACTURER.APPLE,
    price: 100,
    amount: 5,
    notes: 'Test notes'
}