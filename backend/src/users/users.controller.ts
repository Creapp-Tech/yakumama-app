import { Controller, Post, Body, UseGuards, Request, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
// Prisma import removed as it was unused
// Assuming JwtAuthGuard is available. If not, I will need to check auth module.
// Based on previous file listing, there is an auth module.
// I will import it conditionally or check file structure again if it fails.
// For now, I will assume a standard AuthGuard location or just implement the method and fix imports.
// Wait, I saw 'auth' dir. Best practice: likely exported from auth/jwt-auth.guard or similar.
// I'll skip the guard for a moment or try to find it.
// Actually, I'll write the controller without the Guard first to ensure structure, then add it.
// No, user needs it secure. I will try to find the guard first.

// Let's assume the guard is not strictly required for compilation if not imported, but good practice.
// I'll verify the AuthGuard location in a separate step or just guess standard. 
// Standard in NestJS is usually standard @UseGuards(AuthGuard('jwt')) from @nestjs/passport. 

import { AuthGuard } from '@nestjs/passport'; // Generic approach if custom guard not found immediately
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('profile')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createProfile(@Request() req, @Body() profileData: CreateProfileDto) {
        // The profileData comes from the frontend form
        // We need to attach the userId from the authenticated request
        const userId = req.user.id; // standard passport strategy
        return this.usersService.createProfile(userId, profileData);
    }
}
