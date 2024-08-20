import { faker } from "@faker-js/faker";
import { MENUITEM } from "../../data/types/leftSideMenuItems.types.js";
import { AddNewProductService } from "../services/products/addNewProduct.service.js";
import { ProductsListService } from "../services/products/products.service.js";
import { SalesPortalService } from "../services/salesPortal.service.js";
import { SignInService } from "../services/signIn.service.js";
import { generateNewProduct } from "../../data/newProduct.js";
import { ModalWindowService } from "../services/products/modalWindow.service.js";
import { IProduct } from "../../data/types/product.types.js";
import { INPUTFIELD } from "../../data/textNotification.js";


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

        it('create new product with data minimum values', async () => {
            newProduct = generateNewProduct({
                name: faker.string.alphanumeric(3),
                price: 1,
                amount: 1,
            });
            await addNewProductService.create(newProduct);
            await productsService.checkNotificationCreateProduct();
        
            await modalWindowService.openDetailsWindow(newProduct);
            await modalWindowService.checkDetailsWindowData(newProduct);
        });


//Здесь баг на фронте: При длинном названии продукта кнопка "Закрыть" улетает за границу модального окна
//Добавила клик на кнопку Cancel, если не находит кнопку Закрыть
        it('create new product with data maximum values', async () => {
            newProduct = generateNewProduct({
                name: faker.string.alphanumeric(40),
                price: 99999,
                amount: 999,
            });
            await addNewProductService.create(newProduct);
            await productsService.checkNotificationCreateProduct();
        
            await modalWindowService.openDetailsWindow(newProduct);
            await modalWindowService.checkDetailsWindowData(newProduct);
        });
    });

    context('Negative cases', () => {

        it('validate name field, 2 characters', async () => {
            const newProduct = generateNewProduct({
                name: faker.string.alphanumeric(2),
            });
            await addNewProductService.fillProductInputs(newProduct);
            await addNewProductService.checkErrorMessage(INPUTFIELD.NAME)

            await addNewProductService.checkSaveNewProductButtonIsDisabled()
        });

        it('validate amount field, 1000 items', async () => {
            const newProduct = generateNewProduct({
                amount: 1000,
            });
            await addNewProductService.fillProductInputs(newProduct);
            await addNewProductService.checkErrorMessage(INPUTFIELD.AMOUNT)

            await addNewProductService.checkSaveNewProductButtonIsDisabled()
        });

// Баг: при заполнении поля Notes кнопка Сохранить становится кликабельной.
        it('validate pricet field, 100000 price', async () => {
            const newProduct = generateNewProduct({
                price: 100000,
            });
            await addNewProductService.fillProductInputs(newProduct);
            await addNewProductService.checkErrorMessage(INPUTFIELD.PRICE)

            await addNewProductService.checkSaveNewProductButtonIsDisabled()
        });
    });
});