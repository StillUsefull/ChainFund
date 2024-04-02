import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength } from "class-validator";


export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(32)
    name: string;

    @IsString()
    @IsNotEmpty()
    telegram: string;

}