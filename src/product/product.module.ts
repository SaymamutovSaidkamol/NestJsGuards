import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProducSchema, Product } from './entities/product.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProducSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
