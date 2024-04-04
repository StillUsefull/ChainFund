import { IsBoolean, IsNotEmpty, IsString, IsUrl, MaxLength, isURL } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    title: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(4200)
    text: string

    @IsBoolean()
    published?: boolean

    @IsUrl()
    socialLink?: string
}