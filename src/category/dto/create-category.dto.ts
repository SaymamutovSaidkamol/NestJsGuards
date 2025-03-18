import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'TV' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'black' })
  @IsString()
  color: string;
}
