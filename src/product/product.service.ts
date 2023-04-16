import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
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
    const listProduct = await this.productRepository.find({ where: {type: typeProduct}});
    return {
      listProduct: listProduct
    };
  }
}
