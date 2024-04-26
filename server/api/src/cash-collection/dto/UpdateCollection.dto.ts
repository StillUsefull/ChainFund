import { CashCollection, Category } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";


export class UpdateCollectionDto {
    @MaxLength(50)
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

    @IsUrl()
    @IsOptional()
    payPalEmail: String;
}