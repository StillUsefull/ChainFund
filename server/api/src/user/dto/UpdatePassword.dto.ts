import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";




export class updatePasswordDto {
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    newPassword: string;
}