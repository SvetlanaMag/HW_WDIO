import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ModalWindowPage } from '../../pages/products/modalWindow.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';
import { SalesPortalService } from '../salesPortal.service.js';
import { createProduct, deleteProduct } from "../../../data/textNotification.js";
import { IProduct } from '../../../data/types/product.types.js';
import { ModalWindowService } from './modalWindow.service.js';

export class ProductsListService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
    private modalWindowPage = new ModalWindowPage(),
    private salesPortalService = new SalesPortalService(),
    private modalWindowService = new ModalWindowService()
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

  async openDetailsWindow(productName: IProduct) {
    await this.productsPage.clickOnDetailsButton(productName.name);
    await this.productsPage.waitForSpinnerToHide();
    await this.modalWindowPage.waitForOpened();
  }

  async checkNotificationCreateProduct() {
    await this.salesPortalService.checkNotificationText(createProduct)
  }

  async checkNotificationDeleteProduct() {
    await this.salesPortalService.checkNotificationText(deleteProduct)
  }

  async deleteCreatedProduct(productName: IProduct) {
    await this.modalWindowService.deleteProduct(productName);
    await this.checkNotificationDeleteProduct()
  }

}