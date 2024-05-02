import { Module } from '@nestjs/common';
import { HelpRequestService } from './help-request.service';
import { HelpRequestController } from './help-request.controller';

@Module({
  providers: [HelpRequestService],
  controllers: [HelpRequestController]
})
export class HelpRequestModule {}
