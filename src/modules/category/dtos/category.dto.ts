import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsUUID, MinLength } from "class-validator";


export class CategoryDto {
  @IsNotEmpty() // Đảm bảo tên sản phẩm không được rỗng
  @MinLength(3) // Đảm bảo tên sản phẩm có ít nhất 3 ký tự
  categoryName: string;

}
