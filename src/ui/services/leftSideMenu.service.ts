import { LeftSideMenu } from "../pages/leftSideMenu.page.js";
import { ProductsPage } from "../pages/products/products.page.js";



export class LeftSideMenuService {
    constructor(
        private leftSideMenu = new LeftSideMenu(),
        private productsPage = new ProductsPage()
    ) {}

    async openProductsPage() {
        await this.leftSideMenu.clickOnProductsLeftsideMenu();
        await this.leftSideMenu.waitForSpinnerToHide();
        await this.productsPage.waitForOpened();
    }

 
}