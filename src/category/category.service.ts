import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<Category>
  ) {}
  async create(data: CreateCategoryDto) {
    const checkCategory = await this.CategoryModel.findOne({ name: data.name });

    if (checkCategory) {
      throw new BadRequestException('This Category Alredy exist');
    }

    let newProd = await this.CategoryModel.create(data);
    return { data: newProd };
  }

  async findAll() {
    let data = await this.CategoryModel.find();
    return { data };
  }

  async findOne(id: string) {
    let data = await this.CategoryModel.findById(id);

    if (!data) {
      throw new NotFoundException('Product Not Found');
    }

    return { data };
  }

  async update(id: string, data: UpdateCategoryDto) {
    let check = await this.CategoryModel.findById(id);

    if (!check) {
      throw new NotFoundException('Product Not Found');
    }

    if (data.name) {
      const checkCategory = await this.CategoryModel.findOne({
        name: data.name,
      });

      if (checkCategory) {
        throw new BadRequestException('This Category Alredy exist');
      }
    }

    let data1 = await this.CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return { data: data1 };
  }

  async remove(id: string) {
    let check = await this.CategoryModel.findById(id);

    if (!check) {
      throw new NotFoundException('Product Not Found');
    }
    let data = await this.CategoryModel.findByIdAndDelete(id);
    return { data };
  }

  async query(data: any) {
    let { name, color, page, limit, sortBy, order, ...filters } = data;

    page = page || 1;
    limit = limit || 10;
    sortBy = sortBy || 'name';
    order = order || 'asc';

    const query: any = { ...filters };

    if (name) {
      query.name = name;
    }

    if (color) {
      query.color = color;
    }

    const skip = (page - 1) * limit;

    return this.CategoryModel.find(query)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1,
      })
      .skip(skip)
      .limit(parseInt(limit, 10));
  }
}
