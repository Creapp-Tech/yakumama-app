import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
    constructor(private readonly evaluationService: EvaluationService) { }

    @Post()
    create(@Body() createEvaluationDto: any) {
        return this.evaluationService.create(createEvaluationDto);
    }

    @Get()
    findAll() {
        return this.evaluationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.evaluationService.findOne(id);
    }
}
