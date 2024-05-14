import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { UserModule } from '@user/user.module';
import { MailModule } from '@mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  providers: [RequestService],
  controllers: [RequestController]
})
export class RequestModule {}
