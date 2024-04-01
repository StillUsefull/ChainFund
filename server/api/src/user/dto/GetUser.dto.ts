import {CashCollection, Post, Role, User, Comment} from '@prisma/client'
import { Exclude } from 'class-transformer';


export class GetUserDto implements User {
    id: string;
    
    email: string;
    
    @Exclude()
    password: string;

    name: string;

    telegram: string;

    @Exclude()
    role: Role;

    @Exclude()
    Token: string;

    posts: Post[];

    collections: CashCollection[]; 

    @Exclude()
    comments: Comment[];

    @Exclude()
    createdAt: Date;

    constructor(user: User){
        Object.assign(this, user)
    }
}