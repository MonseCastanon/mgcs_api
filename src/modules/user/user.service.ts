import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Client } from "pg";
import { PrismaService } from "src/common/services/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ Injectable()
export class UserService {
    constructor(
        @Inject('POSTGRES_CONNECTION') private pg: Client,
        private prisma: PrismaService
    ) {}

    public async getAllUsers(): Promise<any[]> {
        const users = await this.prisma.user.findMany({
            orderBy: [ { name: "asc" } ],
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                created_at: true
            }
        })

        return users as unknown as User[];
    }

    public async getUserById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                created_at: true
            }
        });

        return user as unknown as User | null;
    }

    public async insertUser(userDto: CreateUserDto): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: userDto as any
        });

        return newUser as unknown as User;
    }

    public async updateUser(id: number, userUpdated: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.update({
            where: { id },
            data: userUpdated as any
        });

        return user as unknown as User;
    }

    // Sino tiene tareas lo puede eliminar, en caso de tener tareas asignadas no se puede eliminar
    public async deleteUser(id: number): Promise<boolean> {
        const tasks = await this.prisma.task.findMany({
            where: { user_id: id }
        });

        if (tasks.length > 0) {
            throw new Error("No se puede eliminar el usuario porque tiene tareas asignadas");
        }

        await this.prisma.user.delete({
            where: { id }
        });

        return true;
    }
}