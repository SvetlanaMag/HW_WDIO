import { SalesPortalPage } from "../pages/salesPortal.page.js";
//import { ICredentials } from "../../data/types/creds.types.js";



export class LeftSideMenu extends SalesPortalPage{
    readonly uniqueElement = 'span.fs-4'

    private readonly dropdownTitle = 'a#dropdownUser1';
    private readonly productsLeftsideMenu = '[onclick="sideMenuClickHandler(\'Products\');"]';

    async clickOnProductsLeftsideMenu () {
        await this.click(this.productsLeftsideMenu)
    }

    async getUsername () {
       return await this.getText(this.dropdownTitle)
    }

}