import { Body, ConsoleLogger, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { identity } from 'rxjs';
import { Board, BoardStatus } from './board.model';
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
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {

        return this.boardService.getBoardById(id);

    }

    @Delete(':id')
    deleteBoard(@Param('id') id: string): void {
        this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id: string,
                    @Body('status') status: BoardStatus): Board 
    {
        return this.boardService.updateBoardStatus(id, status);
    }

}
