import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { DatabaseService } from '../database/database.service';

@Controller('/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getCommentById(@Query() query: { name: string; id: string }) {
    const { name, id } = query;
    return 'Comment with name = ' + name + 'and Id = ' + id;
  }

  @Post('/create')
  createNewComment(
    @Body() body: { id: string; author: string; content: string },
  ) {
    const { id, author, content } = body;
    return `Create new comment with id = ${id} and author = ${author} and content = ${content}`;
  }

  @Delete('/delete')
  remove() {
    return 'Delete';
  }
}
