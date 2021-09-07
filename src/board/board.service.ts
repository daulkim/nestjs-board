import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';

@Injectable()
export class BoardService {

    // For test without DB
    private boards: Board[] = [];

    getAllBoards():  Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }
}
