import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Olma' })
  @IsString()
  name: string;

  @ApiProperty({ example: '23000' })
  @IsString()
  price: string;

  @ApiProperty({ example: 'red' })
  @IsString()
  color: string;
}
