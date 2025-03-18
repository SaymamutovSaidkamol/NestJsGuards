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

  
  @ApiProperty({ example: '67d8e9e9102273465bb54fdf' })
  @IsString()
  category: string;
}
