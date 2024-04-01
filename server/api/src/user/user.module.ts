import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@database/database.module';
import {STRATEGIES} from '@auth/strategies'
import {GUARDS} from '@auth/guards'
import {CacheModule} from '@nestjs/cache-manager'
@Module({
  imports: [DatabaseModule, CacheModule.register()],
  providers: [UserService,  ...STRATEGIES, ...GUARDS],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
