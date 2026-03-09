import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @ApiProperty({example: "name", description: "string"})
    name?: string;
    
    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
    @ApiProperty({example: "description", description: "string"})
    description?: string;
    
    @IsOptional()
    @IsBoolean({ message: 'La prioridad debe ser un valor booleano' })
    @ApiProperty({example: "priority", description: "boolean"})
    priority?: boolean;
}