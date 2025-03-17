import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProducSchema, Product } from './entities/product.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProducSchema }]),
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
