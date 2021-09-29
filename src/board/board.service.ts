import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {

    constructor( 
        @InjectRepository(BoardRepository) 
        private boardRepository: BoardRepository) {

    }

    // // For test without DB
    // private boards: Board[] = [];

    async getAllBoards(user: User):  Promise<Board[]> {

        /**
        * QueryBuilder 사용
        * const query = this.boardRepository.createQueryBuilder('board');
        * query.where('board.userId = :userId', { userId: user.id }); 
        * const boards = await query.getMany();
        * return boards;
        */
        
        /**
         * Repository API 사용
        */ 
        return this.boardRepository.find({ where: [{ user: user}] })
        
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
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
            throw new NotFoundException(`Can't find Board with id: ${id}`);
       }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}
