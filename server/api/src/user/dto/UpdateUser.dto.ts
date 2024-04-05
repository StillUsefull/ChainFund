import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length, MaxLength } from "class-validator";


export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    @IsOptional()
    password?: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(32)
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    telegram?: string;

}