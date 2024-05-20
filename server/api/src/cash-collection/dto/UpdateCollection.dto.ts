import { CashCollection, Category } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";


export class UpdateCollectionDto {
    @MaxLength(100)
    @IsOptional()
    title: string;

    @IsOptional()
    goal: number;

    @MaxLength(5000)
    @IsString()
    @IsOptional()
    text: string;
   
    @IsOptional()
    category: Category;

    @IsEmail()
    @IsOptional()
    payPalEmail: String;
}