import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {

    constructor( 
        @InjectRepository(BoardRepository) 
        private boardRepository: BoardRepository) {

    }

    // // For test without DB
    // private boards: Board[] = [];

    // getAllBoards():  Board[] {
    //     return this.boards;
    // }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Can't find Board with id: ${id}`);
        }
        
        return found;
    }

    // deleteBoard(id: string): void {
    //     const board = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board: Board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
