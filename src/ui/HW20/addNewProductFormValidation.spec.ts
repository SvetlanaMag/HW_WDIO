import { faker } from "@faker-js/faker";
import { MENUITEM } from "../../data/types/leftSideMenuItems.types.js";
import { AddNewProductService } from "../services/products/addNewProduct.service.js";
import { ProductsListService } from "../services/products/products.service.js";
import { SalesPortalService } from "../services/salesPortal.service.js";
import { SignInService } from "../services/signIn.service.js";
import { generateNewProduct } from "../../data/newProduct.js";
import { ModalWindowService } from "../services/products/modalWindow.service.js";
import { IProduct } from "../../data/types/product.types.js";
import { INOTIFICATION, INPUTFIELD } from "../../data/textNotification.js";


describe('Validation form', () => {
    
    const signInService = new SignInService();
    const salesPortalService = new SalesPortalService();
    const addNewProductService = new AddNewProductService();
    const productsService = new ProductsListService();
    const modalWindowService = new ModalWindowService();

    beforeEach(async() => {
        await signInService.openSalesPortal();
        await signInService.loginAsAdmin();
        await salesPortalService.openPageFromLeftsideMenu(MENUITEM.PRODUCTS)
        await productsService.openAddNewProductPage();
    });

    afterEach(async() => {
        await signInService.signOut();
    });

    context('Positive cases', () => {
        let newProduct: IProduct

        afterEach(async() => {
            await productsService.deleteCreatedProduct(newProduct);
        });

        it('Should successfully create new product with minimum input values', async () => {
            newProduct = generateNewProduct({
                name: faker.string.alphanumeric(3),
                price: 1,
                amount: 1,
                notes: '-'
            });
            await addNewProductService.create(newProduct);
            await salesPortalService.checkNotificationText(INOTIFICATION.CREATE);
        
            await modalWindowService.openDetailsWindow(newProduct);
            await modalWindowService.checkDetailsWindowData(newProduct);
        });


//При длинном названии продукта кнопка "Закрыть" улетает за границу модального окна
//Добавила клик на кнопку Cancel
        it('Should successfully create new product with maximum input values', async () => {
            newProduct = generateNewProduct({
                name: faker.string.alphanumeric(40),
                price: 99999,
                amount: 999,
            });
            await addNewProductService.create(newProduct);
            await salesPortalService.checkNotificationText(INOTIFICATION.CREATE);
        
            await modalWindowService.openDetailsWindow(newProduct);
            await modalWindowService.checkDetailsWindowData(newProduct);
        });
    });

    context('Negative cases', () => {

        it('Should validate name field with input value 2 characters', async () => {
            const newProduct = generateNewProduct({
                name: faker.string.alphanumeric(2),
            });
            await addNewProductService.fillProductInputs(newProduct);
            await addNewProductService.checkErrorMessage(INPUTFIELD.NAME)

            await addNewProductService.checkSaveNewProductButtonIsDisabled()
        });

        it('Should validate amount field with input value 1000', async () => {
            const newProduct = generateNewProduct({
                amount: 1000,
            });
            await addNewProductService.fillProductInputs(newProduct);
            await addNewProductService.checkErrorMessage(INPUTFIELD.AMOUNT)

            await addNewProductService.checkSaveNewProductButtonIsDisabled()
        });

// При заполнении поля Notes кнопка Сохранить становится кликабельной.
        it('Should validate price field with input value 100000', async () => {
            const newProduct = generateNewProduct({
                price: 100000,
            });
            await addNewProductService.fillProductInputs(newProduct);
            await addNewProductService.checkErrorMessage(INPUTFIELD.PRICE)

            await addNewProductService.checkSaveNewProductButtonIsDisabled()
        });
    });
});