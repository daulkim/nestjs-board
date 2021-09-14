import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board/board.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

}