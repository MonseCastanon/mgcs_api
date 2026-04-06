import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UtilService } from "src/common/services/util.service";

@Controller("api/user")
export class UserController {
    constructor(
        private userScv: UserService,
        private utilScv: UtilService
    ) {}

    @Get()
    async getAllUsers(): Promise<any[]> {
        return this.userScv.getAllUsers();
    }

    @Get(":id")
    public async listUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
        const result = await this.userScv.getUserById(id);
        
        if (result == undefined)
            throw new HttpException(`Usuario con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);

        return result;
    }

    // Debe validar que no coincida con otros usuarios dentro d ela api
    @Post()
    public async insertUser(@Body() user: CreateUserDto): Promise<User> {
        const result = await this.userScv.insertUser(user);

        const encryptedPassword = await this.utilScv.hash(user.password);
        user.password = encryptedPassword;
        if (result == undefined)
            throw new HttpException("Usuario no registrado", HttpStatus.INTERNAL_SERVER_ERROR)

        return result;
    }

    @Put(":id")
    public async updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<User> {
        return await this.userScv.updateUser(id, user);
    }

    @Delete(":id")
    public async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
        try {
            await this.userScv.deleteUser(id);
        } catch {
            throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND)
        }

        return true;
    }
    
}