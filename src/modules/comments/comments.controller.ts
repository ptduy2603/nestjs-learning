import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { DatabaseService } from '../database/database.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get()
  getComments() {
    return this.commentsService.getComments();
  }

  @Get('/:id')
  getCommentById(@Param('id') id: string) {
    return this.databaseService.getCommentById(id);
  }
}
