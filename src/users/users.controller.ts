import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/Role/role.enum';
import { RoleGuard } from 'src/auth/role.guard';
import { UpdateDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() data: RegisterDto) {
    return this.usersService.register(data);
  }

  @Post('/login')
  login(@Body() data: LoginDto) {
    return this.usersService.login(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.findOne(id, req);
  }

  @Patch()
  update(
    @Param('id') id: string,
    @Body() data: UpdateDto,
    @Req() req: Request,
  ) {
    return this.usersService.update(id, data, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.remove(id, req);
  }
}
