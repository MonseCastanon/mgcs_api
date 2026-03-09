import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message: "El nombre debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre es requerido"})
    @MinLength(3, {message: "El nombre debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "El nombre debe tener menos de 100 caracteres"})
    @ApiProperty({example: "name", description: "string"})
    name: string;
    
    @IsString({message: "El apellido debe ser una cadena de texto"})
    @IsNotEmpty({message: "El apellido es requerido"})
    @MinLength(3, {message: "El apellido debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "El apellido debe tener menos de 100 caracteres"})
    @ApiProperty({example: "lastname", description: "string"})
    lastname: string;
    
    @IsString({message: "El nombre de usuario debe ser una cadena de texto"})
    @IsNotEmpty({message: "El nombre de usuario es requerido"})
    @MinLength(3, {message: "El nombre de usuario debe tener al menos 3 caracteres"})
    @MaxLength(100, {message: "El nombre de usuario debe tener menos de 100 caracteres"})
    @ApiProperty({example: "username", description: "string"})
    username: string;
    
    @IsString({message: "La contraseña debe ser una cadena de texto"})
    @IsNotEmpty({message: "La contraseña es requerida"})
    @MinLength(8, {message: "La contraseña debe tener al menos 8 caracteres"})
    @MaxLength(200, {message: "La contraseña debe tener menos de 64 caracteres"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial"})
    @ApiProperty({example: "password", description: "string"})
    password: string;
}