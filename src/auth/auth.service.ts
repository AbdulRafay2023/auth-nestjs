import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'; 
import { userRegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import   * as bcrypt from 'bcrypt';
import { userLoginDto } from './dto/login.dto';
import { response } from 'express';

@Injectable()
export class AuthService {
   
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
   

    //user register
    async userRegister(userRegisterDto: userRegisterDto) {
        console.log('User Register DTO:', userRegisterDto);

        const saltRounds = 10;
        const hash = await bcrypt.hash(userRegisterDto.password, saltRounds);
        // Logic for user register 
        //  1.check if user email already exist 
        //  2. hash the password
        //  3. save the user to the database
        //  4. jwt token generate 
        //  5. return token in response
        const user = await this.userService.createUser({...userRegisterDto, password: hash});
        return user;
    }

    getUser() {
        return this.userService.getUser();
    }

    //user login
    async userLogin(userLoginDto: userLoginDto){

        //1. Find user by email
        const user = await this.userService.findUserByEmail(
            userLoginDto.email
        )

        //check user exitst
        if(!user){
            return{
                message: "Invalid email or password"
            };
        }

        //compare passoword
        const passwordMatch = await bcrypt.compare(userLoginDto.password, user?.password);

        if(!passwordMatch){
            return{
                message: "Invalid email or password"
            }
        }

        //generate jwt token
        const token = this.jwtService.sign({
            email: user?.email,
            sub : user?.id       
        })
         
        return {
            message: "Login Successfully rafay",
            token : token,
        }
    }


}
