import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService {

    public newTask(): string {
        return "Se agregó la tarea correctamente";
    }
}