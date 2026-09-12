import { Injectable } from '@nestjs/common';
import { userRegisterDto } from '../auth/user-register-dto';

@Injectable()
export class UserService {

    createUser(userRegisterDto: userRegisterDto) {
     return {message: 'User created successfully Rafay'};
    }
}
