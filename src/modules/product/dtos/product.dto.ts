import { IsNotEmpty, MinLength, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty() // Đảm bảo tên sản phẩm không được rỗng
  @MinLength(3) // Đảm bảo tên sản phẩm có ít nhất 3 ký tự
  productName: string;

  @IsNotEmpty()
  @IsNumber() // Đảm bảo giá là một số
  price: number;

  @IsOptional() // description là trường tùy chọn
  @MinLength(5, { message: 'Description must be at least 5 characters long' }) // Tùy chọn, nếu có thì phải dài ít nhất 5 ký tự
  description?: string;
}
