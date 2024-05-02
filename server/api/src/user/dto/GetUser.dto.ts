import {CashCollection, Post, Role, User, Comment, Token} from '@prisma/client'
import { Exclude } from 'class-transformer';


export class GetUserDto implements User {
    id: string;
    
    email: string;
    
    @Exclude()
    password: string;

    name: string;

    semi: string;
    
    telegram: string;

    role: Role;

    about: string;

    @Exclude()
    Token: Token[];

    posts: Post[];

    collections: CashCollection[]; 

    photo: string;

    @Exclude()
    comments: Comment[];

    @Exclude()
    createdAt: Date;

    constructor(user: User){
        Object.assign(this, user)
    }
    
}