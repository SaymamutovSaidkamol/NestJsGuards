import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  color: string;
}

export const ProducSchema = SchemaFactory.createForClass(Product);
