import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";

@Controller("api/task")
export class TaskController {

    constructor(private taskScv: TaskService) {}

    // !http:localhost:300/api/task/1
    getAllTasks(): string {
        return this.taskScv.getAllTask();
    }

    // !http:localhost:300/api/task/1
    @Get(":id")
    public listTaskById(@Param () params: any): string {
        console.log(params.id);
        return this.taskScv.getAllTask();
    }
    
    // !http:localhost:300/api/task/1
    @Post()
    public insertTask(task: any) {
        return this.taskScv.insertTask(1);
    }
    
    // !http:localhost:300/api/task/1
    @Put()
    public updateTask(id: number, task: any): string {
        return this.taskScv.updateTask(task);
    }
    
    // !http:localhost:300/api/task/1
    @Delete(":id")
    public deleteTask(id: number): string {
        return this.taskScv.deleteTask(id);
    }
}