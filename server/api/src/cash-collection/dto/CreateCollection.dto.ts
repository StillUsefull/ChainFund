import { CashCollection, Category } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";


export class CreateCollectionDto {
    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    @IsOptional()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    goal: number;

    @IsNotEmpty()
    @MaxLength(5000)
    @IsString()
    @IsOptional()
    text: string;

    @IsNotEmpty()
    category: Category;

    @IsNotEmpty()
    @IsUrl()
    @IsOptional()
    googlePay: String;
}