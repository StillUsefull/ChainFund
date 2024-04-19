import { CashCollection, Category } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";


export class UpdateCollectionDto {
    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    @IsOptional()
    title: string;

    @IsNotEmpty()
    @IsOptional()
    goal: number;

    @IsNotEmpty()
    @MaxLength(5000)
    @IsString()
    @IsOptional()
    text: string;

    @IsNotEmpty()
    @IsOptional()
    category: Category;

    @IsNotEmpty()
    @IsUrl()
    @IsOptional()
    googlePay: String;
}