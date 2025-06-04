import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '../../entities/Comment.entity';
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  //[GET]: /comments
  async getAllComments(): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository.find();
      return comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error('Could not fetch comments');
    }
  }

  //[GET]: /comments/:id
  async getCommentById(id: string | number): Promise<Comment | null> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: parseInt(id.toString(), 10) },
      });

      return comment || null;
    } catch (error) {
      console.error('Error fetching comment by ID:', error);
      throw new Error('Could not fetch comment');
    }
  }

  //[POST] /comments
  async createNewComment(body: CreateCommentDto): Promise<Comment> {
    try {
      const newComment = this.commentRepository.create(body);
      const savedComment = await this.commentRepository.save(newComment);
      return savedComment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Could not create comment');
    }
  }

  //[PATCH]: /comments/:id
  async updateComment(
    id: number,
    data: Partial<Comment>,
  ): Promise<Comment | null> {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });

      if (!comment) return null;

      Object.assign(comment, data);
      const updatedComment = await this.commentRepository.save(comment);
      return updatedComment;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw new Error('Could not update comment');
    }
  }

  //[DELETE]: /comments/:id
  async deleteComment(id: number): Promise<boolean> {
    try {
      const result = await this.commentRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('Comment not found');
      }

      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw new Error('Could not delete comment');
    }
  }
}
