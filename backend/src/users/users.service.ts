import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        let hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : null;
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
    }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async createProfile(userId: string, data: any): Promise<any> {
        // Check if profile already exists
        const existingProfile = await this.prisma.userProfile.findUnique({
            where: { userId }
        });

        if (existingProfile) {
            throw new Error('Profile already exists for this user');
        }

        // Prepare data for Prisma
        // Ensure dateOfBirth is a Date object if provided
        const profileData: Prisma.UserProfileCreateInput = {
            user: { connect: { id: userId } },
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
            gender: data.gender, // Assumed to match Enum Gender or be handled
            country: data.country,
            city: data.city,
            occupation: data.occupation,
            phoneNumber: data.phoneNumber,
            consentGiven: data.consentGiven === true || data.consentGiven === 'true',
            // workHours is not in schema, ignoring
            // privacyAccepted is not in schema, ignoring
        };

        try {
            return await this.prisma.userProfile.create({
                data: profileData,
            });
        } catch (error) {
            throw new Error(`Failed to create profile: ${error.message}`);
        }
    }
}
