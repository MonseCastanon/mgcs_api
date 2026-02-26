import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { Task } from "./entities/task.entity";

@Injectable()
export class TaskService {

    constructor(
        @Inject('POSTGRES_CONNECTION') private pg: Client
    ) {}

    public async getAllTask(): Promise<Task[]> {
        const query = `SELECT * FROM tasks ORDER BY name ASC`;

        const results = await this.pg.query(query);
        console.log(results.rows);
        
        return results.rows as Task[];
    }
    
    public getTaksById(id: number): string {
        return "Obteniendo la tarea ${id}";
    }
    
    public updateTask(task: any): string {
        return task;
    }

    public insertTask(task: any): any {
        return task;
    }
    
    public deleteTask(id: number): string {
        return "Eliminando la tarea con ${id}";
    }
}