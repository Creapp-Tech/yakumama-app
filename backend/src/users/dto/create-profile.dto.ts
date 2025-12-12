import { IsDateString, IsEnum, IsString, IsBoolean, IsOptional } from 'class-validator';

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    NON_BINARY = 'NON_BINARY',
    PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
    OTHER = 'OTHER'
}

export class CreateProfileDto {
    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    occupation?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsBoolean()
    consentGiven: boolean;

    @IsBoolean()
    @IsOptional()
    privacyAccepted?: boolean;
}
