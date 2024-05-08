import { JwtPayload } from "@auth/interfaces/JwtPayload";
import { ForbiddenException } from "@nestjs/common";
import { Role } from "@prisma/client";


export function validateUserPermission(user: JwtPayload, expectedId: string){
    if (user.id !== expectedId && user.role !== Role.SUPER) {
        throw new ForbiddenException("You do not have permission to perform this action.");
    }
}