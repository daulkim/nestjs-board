import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board-dto';

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService){}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {

        return this.boardService.getBoardById(id);

    }
    
}
