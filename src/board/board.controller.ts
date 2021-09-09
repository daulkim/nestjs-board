import { Body, ConsoleLogger, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService){}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(@Body('title') title: string,
                @Body('description') description: string
                ): Board {
        
        return this.boardService.createBoard(title, description);
    }
}
