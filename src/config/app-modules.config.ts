import { ProductModule } from '../modules/product/product.module';
import { CategoryModule } from '../modules/category/category.module';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { FileUploadModule } from '../modules/file-upload/file-upload.module';

export const AppModules = [
  ProductModule,
  CategoryModule,
  UserModule,
  AuthModule,
  FileUploadModule,
];
