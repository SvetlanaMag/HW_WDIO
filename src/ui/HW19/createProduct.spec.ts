import { LeftSideMenuService } from "../services/leftSideMenu.service.js";
import { AddNewProductService } from "../services/products/addNewProduct.service.js"
import { ProductsListService } from "../services/products/products.service.js";
import { SignInService } from "../services/signIn.service.js";
import { ADMIN_USERNAME } from "../../data/credentials.js";
import { newProduct } from "../../data/newProduct.js"
import { ModalWindowService } from "../services/products/modalWindow.service.js";

describe('Task2: Create new product', () => {

    const signInService = new SignInService();
    const leftSideMenuService = new LeftSideMenuService();
    const addNewProductService = new AddNewProductService();
    const productsService = new ProductsListService();
    const modalWindowService = new ModalWindowService();
    
    beforeEach(async() => {
 
        await signInService.openSalesPortal();
        await signInService.loginAsAdmin();
        await signInService.checkRightUserIsLogin(ADMIN_USERNAME);

    });

    it('should create new product', async() => {

        await leftSideMenuService.openProductsPage()
        await productsService.openAddNewProductPage();
        await addNewProductService.create(newProduct);

        await modalWindowService.checkNotificationCreateProduct();
        
        await modalWindowService.openDetailsWindow(newProduct);
        await modalWindowService.checkDetailsWindowData(newProduct);

    });

});