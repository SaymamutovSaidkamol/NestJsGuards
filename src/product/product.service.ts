import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}
  async create(data: CreateProductDto) {
    let newProd = await this.ProductModel.create(data);
    return { data: newProd };
  }

  async findAll() {
    let data = await this.ProductModel.find();
    return { data };
  }

  async findOne(id: string) {
    let data = await this.ProductModel.findById(id);

    if (!data) {
      throw new NotFoundException('Product Not Found');
    }

    return { data };
  }

  async update(id: string, data: UpdateProductDto) {
    let check = await this.ProductModel.findById(id);

    if (!check) {
      throw new NotFoundException('Product Not Found');
    }

    let data1 = await this.ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return { data: data1 };
  }

  async remove(id: string) {
    let check = await this.ProductModel.findById(id);

    if (!check) {
      throw new NotFoundException('Product Not Found');
    }
    let data = await this.ProductModel.findByIdAndDelete(id);
    return { data };
  }

  async query(data: any){
    let {name, price, color, page, limit, sortBy, order, ...filters} = data

    page = page || 1;
    limit = limit || 10;
    sortBy = sortBy || 'name';
    order = order || 'asc';

    const query: any = { ...filters };

    if (name) {
      query.name = name;
    }

    if (price) {
      query.price = price;
    }

    if (color) {
      query.color = color;
    }

    const skip = (page - 1) * limit;

    return this.ProductModel.find(query)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1,
      })
      .skip(skip)
      .limit(parseInt(limit, 10));
  }
}
