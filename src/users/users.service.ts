import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async FirstUser(name: string) {
    const user = await this.UserModel.findOne({ email: name });
    return user;
  }

  async register(data: RegisterDto) {
    let CheckUser = await this.FirstUser(data.fullName);

    console.log(CheckUser);

    if (CheckUser) {
      throw new BadRequestException('User alredy exist!');
    }

    let hash = bcrypt.hashSync(data.password, 7);

    let newUser = await this.UserModel.create({ ...data, password: hash });

    return { message: 'User Created Succesfully', data: newUser };
  }

  async login(data: LoginDto) {
    let CheckUser = await this.FirstUser(data.email);

    if (!CheckUser) {
      throw new NotFoundException('User Not Found');
    }

    let checkPassword = bcrypt.compareSync(data.password, CheckUser.password);

    if (!checkPassword) {
      throw new NotFoundException('Wrong password');
    }

    let token = this.jwtService.sign({
      id: CheckUser._id,
      role: CheckUser.role,
    });

    return { message: 'Login successful', token };
  }

  async findAll() {
    return await this.UserModel.find();
  }

  async findOne(id: string, req: Request) {
    if (req['user']._id !== id) {
      throw new BadRequestException("You cannot view other people's data.");
    }

    let OneUser = await this.UserModel.findById(id);

    if (!OneUser) {
      throw new NotFoundException('User Not Found');
    }
    return { data: OneUser };
  }

  async update(id: string, data: UpdateDto, req: Request) {

    if (req['user']._id !== id) {
      throw new BadRequestException("You cannot change other people's information.")
    }

    let OneUser = await this.UserModel.findById(id);

    if (!OneUser) {
      throw new NotFoundException('User Not Found');
    }

    let UpdatedUser = await this.UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return { message: 'Changes saved successfully.', data: UpdatedUser };
  }

  async remove(id: string, req: Request) {
    
    if (req['user']._id !== id) {
      throw new BadRequestException("You cannot delete other people's data.")
    }
    let OneUser = await this.UserModel.findById(id);

    if (!OneUser) {
      throw new NotFoundException('User Not Found');
    }

    let deletUser = await this.UserModel.findByIdAndDelete(id);
    return { message: 'User Deleted Successfully', data: deletUser };
  }
}
