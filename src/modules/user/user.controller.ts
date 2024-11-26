import { Controller, Get, Injectable, Req, UseGuards } from "@nestjs/common";
import { User } from "src/models/user.model";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/jwt-auth.guard";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(AuthGuard)
    getAllUser(): Promise<User[]> {
        return this.userService.getAllUser();
    }


    @Get('info')
    @UseGuards(AuthGuard)
    getUserInfo(@Req() req): Promise<User> {
        const userId = req.user.sub;
        return this.userService.getUserInfo(userId);
    }
}