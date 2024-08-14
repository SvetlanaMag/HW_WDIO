import { SalesPortalPage } from "../pages/salesPortal.page.js";
import { MENUITEM } from "../../data/types/leftSideMenuItems.types.js";


export class LeftSideMenu extends SalesPortalPage{
    readonly uniqueElement = 'span.fs-4'

    private readonly dropdownTitle = 'a#dropdownUser1';
    private readonly leftsideMenuItem = (itemName: MENUITEM) => `//a[contains(@onclick, "sideMenuClickHandler('${itemName}');")]`;

    async clickOnMenuItem (itemName: MENUITEM) {
        await this.click(this.leftsideMenuItem(itemName))
    }

    async getUsername () {
       return await this.getText(this.dropdownTitle)
    }

}