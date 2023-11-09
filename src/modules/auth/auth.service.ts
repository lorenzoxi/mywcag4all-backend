import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: any) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  
  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}
