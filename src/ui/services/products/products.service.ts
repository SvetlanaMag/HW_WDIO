import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ModalWindowPage } from '../../pages/products/modalWindow.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import { SalesPortalService } from '../salesPortal.service.js';
import { createProduct } from "../../../data/textNotification.js";

export class ProductsListService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
    private modalWindowPage = new ModalWindowPage(),
    private salesPortalService = new SalesPortalService()
  ) {}

  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.productsPage.waitForSpinnerToHide();
    await this.addNewProductPage.waitForOpened();
  }

  async getCreatedProductData(productName: string) {
    const createdProductData = await this.productsPage.getDataByName(productName);
    return createdProductData;
  }

  async openDetailsWindow(productName: string) {
    await this.productsPage.clickOnDetailsButton(productName);
    await this.productsPage.waitForSpinnerToHide();
    await this.modalWindowPage.waitForOpened();
  }

  async checkNotificationCreateProduct() {
    await this.salesPortalService.checkNotificationText(createProduct)
  }

}