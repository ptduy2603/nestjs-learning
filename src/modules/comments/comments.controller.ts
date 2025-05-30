import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.entity';

@Controller({ path: '/comments', version: '1' })
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments() {
    const comments = await this.commentsService.getAllComments();
    return comments;
  }

  @Get('/:id')
  async getCommentById(@Param('id') id: string | number) {
    if (!id || isNaN(Number(id))) return { error: 'Invalid ID' };

    try {
      const comment = await this.commentsService.getCommentById(id);
      if (!comment) {
        return 'Comment not found';
      }
      return comment;
    } catch (error: unknown) {
      console.error('Error fetching comment by ID:', error);
      return { error: 'Failed to fetch comment' };
    }
  }

  @Post()
  async createNewComment(@Body() body: { author: string; content: string }) {
    const { author, content } = body;

    if (!author.trim() || !content.trim())
      return { error: 'Author and content cannot be empty' };

    try {
      const newComment = await this.commentsService.createNewComment(
        author,
        content,
      );
      return newComment;
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error && typeof error === 'object' && 'message' in error) {
        message = (error as { message: string }).message;
      }
      return { error: 'Failed to create comment', details: message };
    }
  }

  @Patch('/:id')
  async updateComment(
    @Body() body: Partial<Comment>,
    @Param('id') id: string | number,
  ) {
    if (!id || isNaN(Number(id))) return { error: 'Invalid ID' };

    try {
      const updatedComment = await this.commentsService.updateComment(
        Number(id),
        body,
      );
      if (!updatedComment) {
        return { error: 'Comment not found or update failed' };
      }
      return updatedComment;
    } catch (error: unknown) {
      console.error('Error updating comment:', error);
      return { error: 'Failed to update comment' };
    }
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: string | number) {
    if (!id || isNaN(Number(id))) return { error: 'Invalid ID' };

    try {
      const deleted = await this.commentsService.deleteComment(Number(id));
      if (!deleted) {
        return { error: 'Comment not found or deletion failed' };
      }
      return { message: 'Comment deleted successfully' };
    } catch (error: unknown) {
      console.error('Error deleting comment:', error);
      return { error: 'Failed to delete comment' };
    }
  }
}
