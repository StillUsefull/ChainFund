import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length, MaxLength } from "class-validator";


export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @MaxLength(32)
    name: string;

}