import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";

@Controller("api/task")
export class TaskController {

    constructor(private taskScv: TaskService) {}

    @Get()
    async getAllTasks(): Promise<any[]> {
        return this.taskScv.getAllTask();
    }

    @Get(":id")
    public listTaskById(@Param () params: any): Promise<any[]> {
        console.log(params.id);
        return this.taskScv.getAllTask();
    }
    
    @Post()
    public insertTask(@Body()task: any) {
        console.error("insert", task)
        return this.taskScv.insertTask(task);
    }
    
    @Put()
    public updateTask(id: number, task: any): string {
        return this.taskScv.updateTask(task);
    }
    
    @Delete(":id")
    public deleteTask(id: number): string {
        return this.taskScv.deleteTask(id);
    }
}