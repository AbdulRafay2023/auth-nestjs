import { Injectable } from '@nestjs/common';
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

    //find user by email
    async findUserByEmail(email:string){
      return this.prisma.user.findUnique({
        where: {
          email : email,
        },
      })
    }
}
