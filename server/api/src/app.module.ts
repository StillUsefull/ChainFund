import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { CashCollectionModule } from './cash-collection/cash-collection.module';
import { TransactionModule } from './transaction/transaction.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, AuthModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), CashCollectionModule, TransactionModule, PostModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
