import { Module } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileUploadController } from "./file-upload.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
    ],
    controllers: [FileUploadController],
    providers: [FileUploadService]
})

export class FileUploadModule { };