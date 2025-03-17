import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/Role/role.enum';

export class UpdateDto {
  @IsString()
  @ApiProperty({ example: 'Saidkamol' })
  fullName?: string;

  @IsString()
  @ApiProperty({ example: 'example@gmail.com' })
  email?: string;

  @IsEnum(Role)
  @ApiProperty({ example: ['ADMIN', 'SUPER_ADMIN', 'USER'] })
  role: Role;

  @IsString()
  @ApiProperty({ example: '1234' })
  password?: string;
}

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'example@gmail.com' })
  email?: string;

  @IsString()
  @ApiProperty({ example: '1234' })
  password?: string;
}

