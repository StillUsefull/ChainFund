import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length, MaxLength } from "class-validator";


export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;
    

    @IsNotEmpty()
    @MaxLength(32)
    @IsOptional()
    name?: string;

    @MaxLength(32)
    @IsOptional()
    semi: string;


    @IsString()
    @IsOptional()
    telegram?: string;

}