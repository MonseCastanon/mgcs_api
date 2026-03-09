import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString({message: "El nombre debe ser una cadena de texto"})
    @MinLength(3, {message: "El nombre debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "El nombre debe tener menos de 100 caracteres"})
    @ApiProperty({example: "name", description: "string", required: false})
    name?: string;
    
    @IsString({message: "El apellido debe ser una cadena de texto"})
    @MinLength(3, {message: "El apellido debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "El apellido debe tener menos de 100 caracteres"})
    @ApiProperty({example: "lastname", description: "string", required: false})
    lastname?: string;
    
    @IsString({message: "El nombre de usuario debe ser una cadena de texto"})
    @MinLength(3, {message: "El nombre de usuario debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "El nombre de usuario debe tener menos de 100 caracteres"})
    @ApiProperty({example: "username", description: "string", required: false})
    username?: string;
    
    @IsString({message: "La contraseña debe ser una cadena de texto"})
    @MinLength(8, {message: "La contraseña debe tener al menos 8 caracteres"})
    @MaxLength(200, {message: "La contraseña debe tener menos de 64 caracteres"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial"})
    @ApiProperty({example: "password", description: "string", required: false})
    password?: string;
}