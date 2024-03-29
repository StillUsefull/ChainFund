import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsString()
    password: string;

}