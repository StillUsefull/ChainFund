import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";




export class updatePasswordDto {
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    newPassword: string;
}