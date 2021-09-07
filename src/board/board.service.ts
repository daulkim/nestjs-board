import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {

    // For test without DB
    private boards = [];

    getAllBoards(){
        return this.boards;
    }
}
