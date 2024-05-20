import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, isURL } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @MaxLength(100)
    title?: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @MaxLength(4200)
    text?: string

    @IsUrl()
    @IsOptional()
    socialLink?: string
}