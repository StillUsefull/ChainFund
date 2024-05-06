import { DatabaseService } from '@database/database.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
    constructor(private readonly databaseService: DatabaseService){}

    private readonly logger = new Logger(SchedulerService.name);
    @Cron('0 * * * *')
    async ttlHelpRequest(){
        const result = await this.databaseService.helpRequest.deleteMany({
            where: {
                expires: {
                    lt: new Date()
                }
            }
        });

        this.logger.debug(`Deleted ${result.count} exp records in HelpRequests`)
    }

    @Cron('0 * * * *')
    async ttlPosts(){
        const result = await this.databaseService.post.deleteMany({
            where: {
                expires: {
                    lt: new Date()
                }
            }
        });

        this.logger.debug(`Deleted ${result.count} exp records in Posts`)
    }
}
