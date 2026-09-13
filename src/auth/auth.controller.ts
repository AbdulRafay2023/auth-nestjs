import { Controller, Post,Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/register.dto';
import { userLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}  

  //user register
  @Post('register')
  userRegister(@Body() userRegisterDto: userRegisterDto) {
    return this.authService.userRegister(userRegisterDto);
  }
   
  //get all users
  @Get('user')
  getUser(){
    return this.authService.getUser();
  }

  //user login
  @Post('login')
   userLoginIn(@Body() signInDto: userLoginDto) {
    return this.authService.userLogin(signInDto);
  }
  }

  

