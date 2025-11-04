import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, ForgotPasswordDto, ResetPasswordDto } from '../user/dto/create_user_dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
@ApiTags('User Management Endpoints')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create-account')
    @ApiResponse({ status: 201, description: "User registration is successful!" })
    @ApiBody({ type: CreateUserDto })
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: CreateUserDto) {
        const user = await this.userService.register(body);
        return { success: true, message: "User registration is successful!", data: user };
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User login is successful!" })
    async login(@Body() body: LoginUserDto) {
        const user = await this.userService.login(body);
        return { success: true, message: "User login is successful", user };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User logout is successful!" })
    async logout(@Body('id') id: string) {
        const user = await this.userService.logout(id);
        return { success: true, message: "User has been logged out successfully!", data: user };
    }

    @Get('all-users')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "All users fetched successfully!" })
    async fetchAllUsers() {
        const users = await this.userService.fetchAllUsers();
        return { success: true, message: "Users have been fetched successfully!", data: users };
    }

    @Get('fetch-user/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User has been fetched successfully!" })
    async fetchUser(@Param('id') id: string) {
        const user = await this.userService.fetchUser(id);
        return { success: true, message: "User has been fetched successfully!", data: user };
    }

    @Delete('remove-user/:id')
    @HttpCode(HttpStatus.OK)
     @ApiResponse({ status: 200, description: "User deletion is successful!" })
    async deleteAccount(@Param('id') id: string) {
        const user = await this.userService.deleteAccount(id);
        return { success: true, message: "User has been deleted successfully!", data: user };
    }

    @Post('forgot-password')
    @ApiBody({ type: ForgotPasswordDto })
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Password reset email sent successfully!" })
    async forgotPassword(@Body('email') email: string) {
        const message = await this.userService.forgotPassword(email);
        return { success: true, message };
    }

    @Post('reset-password')
    @ApiBody({ type: ResetPasswordDto })
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "Password reset successfully!" })
    async resetPassword(@Body() body: ResetPasswordDto) {
        const message = await this.userService.resetPassword(body.email, body.code, body.newPassword);
        return { success: true, message };
    }

    @Patch('block-user/:id')
    @HttpCode(HttpStatus.OK)
    async blockUser(@Param('id') id: string) {
        const user = await this.userService.blockUser(id);
        return { success: true, message: "User has been blocked successfully!", data: user };
    }

    @Patch('unblock-user/:id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: "User has been unblocked successfully!" })
    async unBlockUser(@Param('id') id: string) {
        const user = await this.userService.unBlockUser(id);
        return { success: true, message: "User has been unblocked successfully!", data: user };
    }
}
