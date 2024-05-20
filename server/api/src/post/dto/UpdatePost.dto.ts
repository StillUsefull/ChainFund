import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator"

export class UpdatePostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @IsOptional()
    title?: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(4200)
    @IsOptional()
    text?: string

    @IsOptional()
    socialLink?: string

    @IsOptional()
    publish: boolean
}