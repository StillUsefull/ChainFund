import { CashCollection, Category } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";


export class CreateCollectionDto {
    
    @MaxLength(50)
    @IsString()
    @IsOptional()
    title: string;

    
    @IsOptional()
    goal: number;

    @MaxLength(5000)
    @IsString()
    @IsOptional()
    text: string;

    @IsNotEmpty()
    category: Category;

    @IsEmail()
    @IsOptional()
    payPalEmail: String;
}