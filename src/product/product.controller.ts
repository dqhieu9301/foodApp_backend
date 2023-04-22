import { Body, Controller, Get, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('/api/product')
@ApiTags("Product")
export class ProductController {
  constructor(
        private readonly productService: ProductService
  ) {}
  @ApiSecurity('JWT-auth')
    @Post('/create')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile(new ParseFilePipe({
    validators: [
      // new FileTypeValidator({ fileType: 'image/jpeg' }),
      // new MaxFileSizeValidator({ maxSize: 10000 })
    ]
  })) file: Express.Multer.File, @Body() dataProduct: ProductCreateDTO) {
    return this.productService.createProduct(file, dataProduct);
  }

  @Get('/get-list-product')
  async getListProductByType(@Query('type') type: string) {
    return this.productService.getListProductByType(type);
  }

  @Get('/get-detail-product/:productId')
  async getDetailProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.getDetailProduct(productId);
  }
  
}

