import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { UserDecorator } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces/JwtPayload';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Delete('/:id')
    delete(@Param('id') id: string, @UserDecorator() user: JwtPayload){
        return this.commentService.delete(id, user);
    }

    @Put('/:id')
    modify(@Param('id') id: string, @Body() body, @UserDecorator() user: JwtPayload){
        return this.commentService.modify(id, body.text, user)
    }

    @Post()
    create(@Body() body, @UserDecorator() user: JwtPayload){
        return this.commentService.create(body.text, user, body.fund)
    }
}