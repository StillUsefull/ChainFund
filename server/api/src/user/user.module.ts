import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@database/database.module';
import {STRATEGIES} from '@auth/strategies'
import {GUARDS} from '@auth/guards'
import {CacheModule} from '@nestjs/cache-manager'
import { PhotoModule } from 'src/photo/photo.module';
import { MailModule } from 'src/mail/mail.module';
@Module({
  imports: [DatabaseModule, CacheModule.register(), PhotoModule, MailModule],
  providers: [UserService,  ...STRATEGIES, ...GUARDS],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
