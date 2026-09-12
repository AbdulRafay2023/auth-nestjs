import { Injectable } from '@nestjs/common';
import { userRegisterDto } from '../auth/user-register-dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async createUser(data:{
        fname: string;
        lname: string;
        email: string;
        password: string;
    }) {
      return this.prisma.user.create({
        data,
      });
    }

    getUser() {
        return this.prisma.user.findMany();
    }
}
