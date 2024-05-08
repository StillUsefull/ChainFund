import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { CashCollectionModule } from './cash-collection/cash-collection.module';
import { TransactionModule } from './transaction/transaction.module';
import { PostModule } from './post/post.module';
import { PhotoModule } from './photo/photo.module';
import { CommentModule } from './comment/comment.module';
import { RequestModule } from './request/request.module';
import { HelpRequestModule } from './help-request/help-request.module';
import { MailModule } from './mail/mail.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CacheModule } from '@nestjs/cache-manager';
import { convertTimeToSeconds } from '@common/utils';

@Module({
  imports: [
            UserModule, 
            AuthModule, 
            AuthModule, 
            ConfigModule.forRoot({isGlobal: true}), 
            CashCollectionModule, 
            TransactionModule, 
            PostModule, 
            PhotoModule, 
            CommentModule, 
            RequestModule, 
            HelpRequestModule, 
            MailModule,
            SchedulerModule,
            ThrottlerModule.forRoot([{
              ttl: 6000,
              limit: 20
            }]),
            CacheModule.registerAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: async (configService: ConfigService) => ({
                ttl: convertTimeToSeconds(configService.get('JWT_EXP')),
                max: Number(configService.get('CACHE_MAX_SIZE')),
                store: 'memory'
              })
            })
            
          ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
