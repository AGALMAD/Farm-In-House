import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { QuerySelector } from '../models/query-selector';
import { PagedProducts } from '../models/paged-products';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { ProductToInsert } from '../models/product-to-insert';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) { }

  async getAllProducts(querySelector: QuerySelector): Promise<PagedProducts | null> {
    const result = await this.api.get<PagedProducts>("Product", {
      "ProductType": querySelector.productType,
      "OrdinationType": querySelector.ordinationType,
      "OrdinationDirection": querySelector.ordinationDirection,
      "ProductPageSize": querySelector.productPageSize,
      "ActualPage": querySelector.actualPage,
      "Search": querySelector.search
    }, 'json');

    if (result.data) {
      const pagedProducts = result.data
      if (pagedProducts.products) {
        for (const product of pagedProducts.products) {
          product.image = environment.imageRouteBasic + product.image 
        }
      }
      return pagedProducts
    }

    return null;
  }

  async getById(id: number): Promise<Product | null> {
    const path = "Product/" + id
    const result = await this.api.get<Product>(path, {}, 'json')
    if (result.data) {
      const product: Product = result.data
      product.image = environment.imageRouteBasic + product.image
      return product
    }
    return null
  }

  async getCompleteProducts() : Promise<Product[] | null>
  {
    const result = await this.api.get("Product/complete", {}, 'json');
    if(result.data){
      const products : any = result.data;
      for (const product of products) {
        product.image = environment.imageRoute + product.image 
      }
      return products;
    }
    return null;
  }
  /*async modifyProduct(Product:Product) : Promise<Product|null>{
    const result=await this.api.put("Product/modify",{});
    
  }*/
  async createProduct(productToInsert: ProductToInsert)
  {
    const formData = new FormData();
    /*

    public string Name { get; set; }

public string Description { get; set; }

public long Price { get; set; }

public int Stock { get; set; }

public IFormFile Image { get; set; }

public int CategoryId { get; set; }
    */
    formData.append('Name', productToInsert.name);
    formData.append('Description', productToInsert.description);
    formData.append('Price', productToInsert.price.toString());
    formData.append('Stock', productToInsert.stock.toString());
    formData.append('Image', productToInsert.image);
    formData.append('CategoryId', productToInsert.categoryId.toString());
    const result = await this.api.post("Product", formData)
    console.log("INSERTANDO NUEVO PRODUCTO: ", result)
  }
}
