import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from "./user.service";
import { User } from "src/models/user.model";
import { UserController } from "./user.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, JwtService],
    exports: [UserService],

})

export class UserModule { };