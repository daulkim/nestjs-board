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

    async deleteBoard(id: number): Promise<void> {
       const result = await this.boardRepository.delete(id);
       
       if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
       }
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board: Board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
