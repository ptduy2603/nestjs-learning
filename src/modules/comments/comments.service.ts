import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { Comment } from 'src/types';

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  getComments(): Comment[] {
    return this.databaseService.getAllComments();
  }
}
