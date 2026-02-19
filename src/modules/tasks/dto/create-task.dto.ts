import { IsBoolean, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;
    
    @IsString()
    @IsNotEmpty({ message: 'El campo es requerido' })
    @MinLength(3)
    @MaxLength(100)
    description: string;
    
    @IsNotEmpty()
    @IsBoolean()
    priority: boolean;
    
    @IsInt()
    
    userId: number;
}