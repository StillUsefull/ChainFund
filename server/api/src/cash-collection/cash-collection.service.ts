import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CashCollectionService {
    constructor(private readonly databaseService: DatabaseService){}

    async create(dto) {
        
    }
}
