import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly  jwtSerive: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    let request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedException('Token Not Found');
    }
    
    try {
      let data = this.jwtSerive.verify(token);
      
      if (!data) {
        throw new UnauthorizedException('Wrong Token');
      }

      request['user'] = data;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token Not Found');
    }
  }
}
