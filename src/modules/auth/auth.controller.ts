import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('private')
  //@UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('public')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  async register(@Body() RegisterDTO: CreateUserDto) {
    const user = await this.userService.create(RegisterDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() RegisterDTO: CreateUserDto) {
    const user = await this.userService.findByLogin(RegisterDTO);

    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
