import { SalesPortalPage } from "../pages/salesPortal.page.js";
import { LeftSideMenu } from "../pages/leftSideMenu.page.js";
import { ProductsPage } from "../pages/products/products.page.js";
import { MENUITEM } from "../../data/types/leftSideMenuItems.types.js";
import { HomePage } from "../pages/home.page.js";
import { OrdersPage } from "../pages/orders.page.js";
import { CustomersPage } from "../pages/customers.page.js";
import { INOTIFICATION } from "../../data/textNotification.js";


export class SalesPortalService extends SalesPortalPage {
    readonly uniqueElement = '';

    constructor(
        private leftSideMenu = new LeftSideMenu(),
        private productsPage = new ProductsPage(),
        private homePage = new HomePage(),
        private ordersPage= new OrdersPage(),
        private customersPage = new CustomersPage()

    ) {
        super();
    }

    async checkNotificationText(action: INOTIFICATION) {
        expect(await this.getNotificationText()).toEqual(action)
        await this.closeNotificationWindow()
    }

    async openPageFromLeftsideMenu(itemName: MENUITEM) {
        await this.leftSideMenu.clickOnMenuItem(itemName);
        await this.leftSideMenu.waitForSpinnerToHide();
        itemName === MENUITEM.HOME ? await this.homePage.waitForOpened() :
        itemName === MENUITEM.PRODUCTS ? await this.productsPage.waitForOpened() :
        itemName === MENUITEM.ORDERS ? await this.ordersPage.waitForOpened() :
        itemName === MENUITEM.CUSTOMERS ? await this.customersPage.waitForOpened() : false
    }
}