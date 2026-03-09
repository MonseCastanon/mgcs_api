import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString({message: "El nombre debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre es requerido"})
    @MinLength(3, {message: "El nombre debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "El nombre debe tener menos de 100 caracteres"})
    @ApiProperty({example: "name", description: "string"})
    name: string;
    
    @IsString({message: "La descripción debe ser una cadena de texto"})
    @IsNotEmpty({message: "La descripción es requerida"})
    @MinLength(3, {message: "La descripción debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "La descripción debe tener menos de 100 caracteres"})
    @ApiProperty({example: "description", description: "string"})
    description: string;
    
    @IsNotEmpty({message: "La prioridad es requerida"})
    @IsBoolean({message: "La prioridad debe ser un booleano"})
    @ApiProperty({example: "priority", description: "boolean"})
    priority: boolean;
    
    @IsInt({message: "El ID del usuario debe ser un entero"})
    @ApiProperty({example: "user_id", description: "number"})
    user_id: number;
}