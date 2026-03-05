import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "src/common/services/prisma.service";

@Injectable()
export class TaskService {

    constructor(
        @Inject('POSTGRES_CONNECTION') private pg: Client,
        private prisma: PrismaService
    ) {}

    public async getAllTask(): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({
            orderBy: [ { name: "asc" } ]
        });
        
        return tasks.rows as Task[];
    }
    
    public async getTaksById(id: number): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });

        return task;
    }
    
    public async updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<Task> {
        const task = await this.prisma.task.update({
            where: { id },
            data: taskUpdated
        });

        return task;
    }

    public async insertTask(task: CreateTaskDto): Promise<Task> {
        const task = await this.prisma.task.insert({
            where: { id }
        });

        return task;
    }
    
    public async deleteTask(id: number): Promise<boolean> {
        const task = await this.prisma.task.delete({
            where: { id }
        });

        return task;
    }
}