import { GoogleGuard } from "./google.guard";
import { JwtAuthGuard } from "./jwt.guard";
import { RoleGuard } from "./role.guard";

export const GUARDS = [JwtAuthGuard, RoleGuard, GoogleGuard]