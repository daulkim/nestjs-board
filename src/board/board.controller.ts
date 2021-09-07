import { Controller, Get } from '@nestjs/common';
import { Board } from './board.model';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService){}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }
}
