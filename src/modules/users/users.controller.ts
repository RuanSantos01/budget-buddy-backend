import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/singin.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put('delete')
  logicalDeleteUser(@ActiveUserId() userId: string) {
    return this.usersService.logicalDeleteUser(userId);
  }

  @Put('reactive')
  @IsPublic()
  reactiveUser(@Body() signinDto: SigninDto) {
    return this.usersService.reactiveUser(signinDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  singin(@Body() singinDto: SigninDto) {
    return this.usersService.singin(singinDto);
  }

  @Post('signup')
  @IsPublic()
  create(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }
}
