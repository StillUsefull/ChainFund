import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';

@Module({
  imports: [UserModule, AuthModule, AuthModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
