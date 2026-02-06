import { Controller, Post } from "@nestjs/common";
import { TaskService } from "./task.service";

@Controller()
export class TaskController {

    constructor(private taskScv: TaskService) {}

    @Post()
    public newTask() {
        return "Agrega una nueva tarea" + this.taskScv;
    }
}