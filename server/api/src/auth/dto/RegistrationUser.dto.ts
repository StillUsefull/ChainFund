import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator'

export class RegistrationUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    name: string;

}