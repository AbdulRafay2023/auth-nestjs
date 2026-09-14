import { Controller, Post,Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/register.dto';
import { userLoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

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
  userLogin(@Body() userLoginDto: userLoginDto) {

    return this.authService.userLogin(userLoginDto);

  }

  @Post('send-otp')
  sendOtp(@Body() SendOtpDto: SendOtpDto){
    return this.authService.sendOtp(SendOtpDto.email);
  }

  @Post('verify-otp')
  verifyOtp(@Body() VerifyOtpDto:VerifyOtpDto){
    return this.authService.verifyOtp(VerifyOtpDto.email, VerifyOtpDto.otp)
  }


  
}

  

