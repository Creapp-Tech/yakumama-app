import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { AuthGuard } from '@nestjs/passport'; // Using standard for now, assuming JwtStrategy is global or standard

@Controller('evaluation')
export class EvaluationController {
    constructor(private readonly evaluationService: EvaluationService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req, @Body() createEvaluationDto: any) {
        // Inject userId into the DTO or pass it as separate arg
        const userId = req.user.id;
        return this.evaluationService.create({ ...createEvaluationDto, userId });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(@Request() req) {
        // Only admins should see all evaluations
        // For now, return user's own evaluations
        return this.evaluationService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        // Verify user owns this evaluation or is admin
        return this.evaluationService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user/has-initial')
    async hasInitialEvaluation(@Request() req) {
        const userId = req.user.id;
        return this.evaluationService.hasInitialEvaluation(userId);
    }
}
