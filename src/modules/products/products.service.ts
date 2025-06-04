import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../../entities/Product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  //[GET] /products
  async getAllProducts(): Promise<Product[]> {
    try {
      const products: Product[] = await this.productRepository.find();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  // [POST] /products
  async createProduct(productData: Product): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(productData);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  // [PATCH] /products/:id
  async updateProduct(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product | null> {
    try {
      await this.productRepository.update(id, productData);
      return await this.productRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
