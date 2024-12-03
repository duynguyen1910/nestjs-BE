export class CreateProductDto {
    productName: string;
    description?: string;
    price: number;
    images: string[];
    categoryIds: string[];
}
