import { Body, ConsoleLogger, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { identity } from 'rxjs';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('board')
export class BoardController {

    constructor(private boardService: BoardService){}

    @Get('/')
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {

        return this.boardService.getBoardById(id);

    }

    @Delete(':id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id', ParseIntPipe) id: number,
                    @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> 
    {
        return this.boardService.updateBoardStatus(id, status);
    }

}
