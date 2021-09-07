import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardService {

    // For test without DB
    private boards: Board[] = [];

    getAllBoards():  Board[]{
        return this.boards;
    }
}
