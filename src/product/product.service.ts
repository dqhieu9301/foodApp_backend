import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'nestjs-cloudinary';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async createProduct(file: any, dataProduct: ProductCreateDTO) {
    const res = await this.cloudinaryService.uploadFile(file);
    const path = res.url;
    const newProduct = {...dataProduct, path: path};
    await this.productRepository.save(newProduct);
    return {
      message: "create product success"
    };
  }

  async getListProductByType(typeProduct: string) {
    const listProduct = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.id', 'product.name', 'product.type', 'product.path', 'product.cost', 'product.quantity'])
      .where('product.type = :typeProduct', {typeProduct})
      .getMany();
    return {
      listProduct
    };
  }

  async searchProduct(search: string) {
    const listProduct = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.id', 'product.name', 'product.type', 'product.path', 'product.cost', 'product.quantity'])
      .where("product.name LIKE :search", {search: `%${search}%`})
      .getMany();
    
    return {
      listProduct
    };
  }

  async getDetailProduct(productId: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .select(['product.id', 'product.name', 'product.type', 'product.path', 'product.cost', 'product.quantity', 'product.describe'])
      .where('product.id = :productId', {productId})
      .getOne();
    if(!product) {
      throw new BadRequestException("Product doesn't exist");
    }
    return {
      product
    };
  }
}
