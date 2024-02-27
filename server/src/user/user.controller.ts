import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserRegisterDTO } from './user.dto';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserRegisterDTO) {
    return this.userService.register(data);
  }

  @Get('profile')
  @UseGuards(new AuthGuard())
  getProfile(@Req() req: any) {
    const userEmail = req.user.email;
    return this.userService.getProfile(userEmail);
  }

  @Get('users')
  @UseGuards(new AuthGuard())
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @Delete('user/:email')
  @UseGuards(new AuthGuard())
  deleteUser(@Req() req: any, @Query('email') email: string) {
    const yourId = req.user.id;

    return this.userService.deleteUser(email, yourId);
  }
}
