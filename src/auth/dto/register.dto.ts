import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class userRegisterDto {

    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    lname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}