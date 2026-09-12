import { Controller, Post,Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './user-register-dto';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}  

  @Post('register')
  userRegister(@Body() userRegisterDto: userRegisterDto) {
    return this.authService.userRegister(userRegisterDto);
  }
   
  //get all users
  @Get('user')
  getUser(){
    return this.authService.getUser();
  }
} 
