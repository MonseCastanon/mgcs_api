import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  imports: [AuthModule, TaskModule]
})
export class AppModule {}


/** 
 // ! Crear un caso de uso de tareas. Creat carpeta de tareas
 * Tareas  
  dot, Service, Worker


  get con lsitado de tareas
  Api \task

  // ! Agreagr dto, interdaces, crear un metodo que cree tareas
 */