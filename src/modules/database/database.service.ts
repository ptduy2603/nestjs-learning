import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  getAllComments() {
    return [
      {
        id: '1',
        content: 'This is a comment',
        author: 'User1',
      },
      {
        id: '2',
        content: 'This is another comment',
        author: 'User2',
      },
      {
        id: '3',
        content: 'This is yet another comment',
        author: 'User3',
      },
    ];
  }

  getCommentById(id: string) {
    return 'Get comment with id: ' + id;
  }
}
