import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";



export class CreateRequestDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    @MaxLength(3000)
    interests: string;


    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    category: string;
}