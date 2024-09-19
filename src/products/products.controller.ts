import { ProductsDto } from './dto/products.dto';
import { ProductsService } from './products.service';
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService){}
  @Get()
  getAllProducts(@Query( 'price', new ParseIntPipe({optional:true}))price , @Query('category') category,
   @Query('lang', new DefaultValuePipe('en'))lang
){
    if (price && category) {
      return this.ProductsService.filterbyCategoryAndPrice(category, price);
    }
    if(price){
      return this.ProductsService.filterprice(price)
    }
    if(category){
      return this.ProductsService.filtercategory(category)
    }
    if(lang){
      return this.ProductsService.filterByLang(lang)
    }
    return this.ProductsService.getAllProducts()
  }
  @Post()
  createProduct(@Body() body: ProductsDto){
    return this.ProductsService.creatProducts(body)
  }
  @Delete(":id")
  deleteProduct(@Param('id',ParseIntPipe) id: number){
    return this.ProductsService.deleteProducts(id)
  }
  @Get(":id")
  getById(@Param('id',ParseIntPipe) id: number){
    return this.ProductsService.getById
  }
  @Patch(":id")
  updateProduct(@Param('id',ParseIntPipe) id: number, @Body() body: ProductsDto){
    return this.ProductsService.updateProduct(id,body)
  }
}
