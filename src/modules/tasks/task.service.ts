import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService {

    public getAllTask(): string {
        return "Se obtuvieron todas las tareas correctamente uwu";
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