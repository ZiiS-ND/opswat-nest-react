import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserDTO, UserRegisterDTO } from './user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserRegisterDTO) {
    console.log(data);
    return this.userService.register(data);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  getProfile(@Req() req: any) {
    const userEmail = req.user.email;
    return this.userService.getProfile(userEmail);
  }

  @Get('users')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @Delete('user/:email')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  deleteUser(@Req() req: any, @Param('email') email: string) {
    const yourId = req.user.id;

    return this.userService.deleteUser(email, yourId);
  }
}
