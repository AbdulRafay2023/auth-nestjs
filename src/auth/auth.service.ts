import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { userRegisterDto } from './user-register-dto';
import   * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
   
    constructor(private readonly userService: UserService) {}
   
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
        return this.userService.createUser({...userRegisterDto, password: hash});
    }

    getUser() {
        return this.userService.getUser();
    }
}
