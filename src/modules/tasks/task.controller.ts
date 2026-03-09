import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("api/task")
export class TaskController {

    constructor(private taskScv: TaskService) {}

    @Get()
    async getAllTasks(): Promise<any[]> {
        return this.taskScv.getAllTask();
    }

    @Get(":id")
    public async listTaskById(@Param ("id", ParseIntPipe) id: number): Promise<Task> {
        const result = await this.taskScv.getTaksById(id);
        
        if (result == undefined)
            throw new HttpException(`Tarea con ID ${id} no encontrada`, HttpStatus.NOT_FOUND);

        return result;
    }
    
    @Post()
    public async insertTask(@Body()task: CreateTaskDto): Promise<Task> {
        const result = await this.taskScv.insertTask(task);

        if (result == undefined)
            throw new HttpException("Tarea no registrada", HttpStatus.INTERNAL_SERVER_ERROR)

        return result;
    }
    
    @Put(":id")
    public async updateTask(@Param("id", ParseIntPipe) id: number, @Body() task: any): Promise<Task> {
        return await this.taskScv.updateTask(id, task);
    }
    
    @Delete(":id")
    public async deleteTask(@Param("id", ParseIntPipe)id: number): Promise<boolean> {
        try {
            await this.taskScv.deleteTask(id);
        } catch {
            throw new HttpException("Tarea no encontrada", HttpStatus.NOT_FOUND)
        }

        return true;
    }
}