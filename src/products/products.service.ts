import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IProducts } from './products.interface';
import { ProductsDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  private products=[
    {id:1,name:'apple',category:"fruit",price:3,createAt:new Date().toISOString()},
    {id:2,name:'orange',category:"fruit",price:2,createAt:new Date().toISOString()},
    {id:3,name:'phone',category:"technique",price:300,createAt:new Date().toISOString()},
  ]
  private lang={
    "en":"hello",
    "ka":"გამარჯობა"
  }
  filterByLang(queryLang: string) {
    if (this.lang[queryLang]) {
      return this.lang[queryLang]; 
    } 
  }
  getAllProducts(){
    return this.products
  }
  filterprice(queryPrice: number){
    return this.products.filter((product: IProducts) => product.price >= queryPrice)
  }
  filterbyCategoryAndPrice(queryCategory: string, queryPrice: number){
    return this.products.filter((product: IProducts) => product.category === queryCategory && product.price >= queryPrice);
  }
  filtercategory(queryCategory: string){
    return this.products.filter((product: IProducts) => product.category === queryCategory )
  }
  creatProducts(body: ProductsDto){
    if(!body.name || !body.price) throw new HttpException("name and price is required",HttpStatus.BAD_REQUEST)
      const lastId = this.products[this.products.length -1]?.id || 0
    const newProduct={
      id:lastId+1,
      ...body,
      createdAt: new Date().toISOString(),
    }
    this.products.push(newProduct)
    return newProduct
  }
  deleteProducts(id: number){
    const index = this.products.findIndex((product) => product.id === id);
    if(index === -1) throw new BadRequestException('Not found')
      const deleteProduct= this.products.splice(index,1)
    return deleteProduct
  }
  getById(id: number){
    const product = this.products.find((product) => product.id === id);
    if(!product) throw new BadRequestException("not found")
      return product
  }
  updateProduct(id:number, body: ProductsDto){
    const index = this.products.findIndex((product) => product.id === id);
    if(index === -1) throw new BadRequestException('Not found')
      const updateProduct={
      ...this.products[index],
      ...body
    }
    this.products[index]=updateProduct
    return updateProduct;

  }
}
