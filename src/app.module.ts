import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.model';
import { Category } from './models/category.model';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './models/user.model';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { join } from 'path';


@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('USERNAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Product, Category, User],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    CategoryModule,
    UserModule,
    AuthModule,
    FileUploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }


// export class AppModule implements OnApplicationBootstrap {
//   private readonly logger = new Logger(AppModule.name);

//   constructor(private readonly dataSource: DataSource) { }

//   async onApplicationBootstrap() {
//     try {
//       await this.dataSource.initialize();
//       this.logger.log('Database connection established successfully');
//     } catch (error) {
//       this.logger.error('Failed to connect to the database', error.stack);
//       process.exit(1);
//     }
//   }
// }
