import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { userRegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { userLoginDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly emailService: EmailService, private readonly prismaService: PrismaService) { }


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
        const user = await this.userService.createUser({ ...userRegisterDto, password: hash });
        return user;
    }

    getUser() {
        return this.userService.getUser();
    }

    //user login
    async userLogin(userLoginDto: userLoginDto) {

        //1. Find user by email
        const user = await this.userService.findUserByEmail(
            userLoginDto.email
        )

        //check user exitst
        if (!user) {
            return {
                message: "Invalid email or password"
            };
        }

        //compare passoword
        const passwordMatch = await bcrypt.compare(userLoginDto.password, user?.password);

        if (!passwordMatch) {
            return {
                message: "Invalid email or password"
            }
        }

        //generate jwt token
        const token = this.jwtService.sign({
            email: user?.email,
            sub: user?.id
        })

        return {
            message: "Login Successfully",
            token: token,
        }
    }

    //send-otp
    async sendOtp(email: string) {

        // 1. Check user exists
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            return {
                message: 'User not found',
            };
        }

        // 2. Generate 6 digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // 3. OTP expires after 5 minutes
        const expiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // 4. Save OTP in database
        await this.prismaService.otpCode.create({
            data: {
                email,
                otp,
                expiresAt,
            },
        });

        // 5. Send OTP through Resend
        await this.emailService.sendOtpEmail(email, otp);

        return {
            message: 'OTP sent successfully',
        };
    }

    //verify-otp
    async verifyOtp(email: string, otp: string) {

        // Find latest OTP
        const otpRecord = await this.prismaService.otpCode.findFirst({
            where: {
                email,
                otp,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // OTP doesn't exist
        if (!otpRecord) {
            return {
                message: 'Invalid OTP',
            };
        }

        // OTP expired
        if (new Date() > otpRecord.expiresAt) {
            return {
                message: 'OTP expired',
            };
        }

        // Find user
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            return {
                message: 'User not found',
            };
        }

        // Generate JWT
        const token = this.jwtService.sign({
            email: user.email,
            sub: user.id,
        });

        return {
            message: 'OTP login successful',
            token,
        };
    }


}
