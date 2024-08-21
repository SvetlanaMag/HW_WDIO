
export const createProduct = 'Product was successfully created';
export const deleteProduct = 'Product was successfully deleted';

export enum INPUTFIELD {
    NAME = 'Name',
    PRICE = 'Price',
    AMOUNT = 'Amount',
};

export const validationMessage: {'Name': string, 'Price': string, 'Amount': string} = {
    'Name': "Products's name should contain only 3-40 alphanumerical characters and one space between",
    'Price': "Price should be in range 1-99999",
    'Amount': "Amount should be in range 0-999"
}