import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { DeleteUserDTO } from './dto/delete-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('UserController: create');
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @Delete('')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(deleteUserDto: DeleteUserDTO) {
    return this.userService.deleteUser(deleteUserDto);
  }
}
