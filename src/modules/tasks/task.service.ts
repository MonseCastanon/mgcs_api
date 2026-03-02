import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

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
    
    public async getTaksById(id: number): Promise<Task> {
        const query = `SELECT * FROM tasks WHERE id = ${id}`;

        const result = (await this.pg.query(query)).rows as Task[];

        return result[0] as Task;
    }
    
    public async updateTask(id: number, taskUpdate: UpdateTaskDto): Promise<Task> {
        const task = await this.getTaksById(id);
        task.name = taskUpdate.name ?? task.name;
        task.description = taskUpdate.description ?? task.description;
        task.priority = taskUpdate.priority ?? task.priority;
        
        const query = 
        `UPDATE tasks
        SET name = '${ task.name }',
        description = '${ task.description }',
        priority = '${ task.priority }'
        WHERE id = ${ id }`;

        await this.pg.query(query);

        return this.getTaksById(id);
    }

    public async insertTask(task: CreateTaskDto): Promise<Task> {
        const sql = `INSERT INTO tasks
        (name, description, priority, user_id)
        VALUES('${ task.name }', '${ task.description }', '${ task.priority }', '${ task.user_id }')
        RETURNING id`;

        const result = await this.pg.query(sql);
        const insertId = result.rows[0].id;

        return this.getTaksById(insertId);
    }
    
    public async deleteTask(id: number): Promise<boolean> {
        const query = `DELETE FROM tasks WHERE id = ${id}`;
        const result = await this.pg.query(query);

        return result.rowCount == 1;
    }
}