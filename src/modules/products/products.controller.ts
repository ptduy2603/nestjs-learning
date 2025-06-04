import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller({ path: '/products', version: '1' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    try {
      return await this.productsService.getAllProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
      return { error: 'Error fetching products: ' + error?.message };
    }
  }
}
