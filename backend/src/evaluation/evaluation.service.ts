import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EvaluationService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        const { responses, type } = data;
        const userId = 'user_id_placeholder'; // TODO: Get from Context/JWT

        // --- SCORING LOGIC ---
        // Helper Maps & Functions
        const normPos = (val: number) => (val - 1) * 25;
        const normNeg = (val: number) => (5 - val) * 25;

        // 1. ECF CALCULATION
        const q7 = normNeg(responses.q7);
        const q8 = normNeg(responses.q8);
        const q10 = normNeg(responses.q10);
        const q9 = normPos(responses.q9);
        const q12 = normPos(responses.q12);
        const q29 = normPos(responses.q29);
        const q11 = normPos(responses.q11);
        const q13 = normNeg(responses.q13);
        const q17 = normPos(responses.q17);

        // Q27 Memory test logic
        const words = ['sol', 'agua', 'libro', 'verde', 'camino', 'nube', 'tiempo', 'mano'];
        const userWords = (responses.q27 || '').toLowerCase().split(/[\s,]+/).filter((w: string) => words.includes(w));
        const memoryCount = userWords.length;
        let q27Score = 20;
        if (memoryCount >= 7) q27Score = 100;
        else if (memoryCount >= 5) q27Score = 75;
        else if (memoryCount >= 3) q27Score = 50;

        const atencion = (q7 + q8 + q10) / 3;
        const memoria = (q9 + q27Score) / 2;
        const claridad = (q12 + q29) / 2;
        const productividad = q11;
        const estres = (q13 + q17) / 2;

        const ecf = (0.30 * atencion) + (0.20 * memoria) + (0.20 * claridad) + (0.10 * productividad) + (0.20 * estres);

        // 2. EFC CALCULATION
        const q18Map: any = { '0 días': 0, '1-2 días': 40, '3-4 días': 70, '5 o más días': 100 };
        const q19Map: any = { 'Caminar': 50, 'Gimnasio (pesas/máquinas)': 100, 'Correr': 70, 'Ciclismo': 70, 'Yoga/Pilates': 60, 'Ninguna': 0 };
        const q18 = q18Map[responses.q18] || 0;
        const q19 = q19Map[responses.q19] || 50;
        const q20 = normPos(responses.q20);
        const q21Penalty = (responses.q21 && responses.q21.length > 5) ? -20 : 0;

        let efc = (0.35 * q18) + (0.25 * q19) + (0.30 * q20) + q21Penalty;
        efc = Math.max(0, Math.min(100, efc));

        // 3. NSC CALCULATION
        const q22Map: any = { 'Nunca': 0, '1 vez al mes': 25, '1 vez a la semana': 50, '2-3 veces por semana': 80, 'Más de 3 veces por semana': 100 };
        const q24Map: any = { 'Sí': 100, 'A veces': 60, 'No': 0 };
        const q25Map: any = { '0 veces': 100, '1-2 veces': 70, '3-4 veces': 40, '5 o más veces': 0 };

        const q22 = q22Map[responses.q22] || 0;
        const q23 = normPos(responses.q23);
        const q24 = q24Map[responses.q24] || 0;
        const q25 = q25Map[responses.q25] || 0;
        const q26 = normPos(responses.q26);

        const nsc = (0.25 * q22) + (0.25 * q24) + (0.25 * q25) + (0.15 * q23) + (0.10 * q26);

        // 4. IBCY CALCULATION
        const ibcy = (0.50 * ecf) + (0.25 * efc) + (0.25 * nsc);

        // Levels
        const getLevel = (s: number) => s < 50 ? 'Principiante' : s < 75 ? 'Regular' : 'Avanzado';

        // SAVE TO DB
        // Note: Assuming User ID is hardcoded or fetched. In real app, pass from Controller.
        // For now finding the first user or creating dummy if testing?
        // Better: Controller should pass userId.

        return this.prisma.evaluation.create({
            data: {
                userId: data.userId, // Controller must pass this
                type: 'INITIAL',
                status: 'COMPLETED',
                ecfScore: ecf,
                efcScore: efc,
                nscScore: nsc,
                ibcyScore: ibcy,
                ecfLevel: getLevel(ecf),
                efcLevel: getLevel(efc),
                nscLevel: getLevel(nsc),
                ibcyLevel: getLevel(ibcy),
                responses: {
                    create: Object.entries(responses).map(([k, v]) => ({
                        questionId: k,
                        questionText: 'Unknown', // TODO: Map to actual question text
                        response: JSON.stringify(v)
                    }))
                },
                plan: {
                    create: {
                        physicalLevel: getLevel(efc),
                        physicalType: efc < 50 ? 'Caminatas + Movilidad' : 'Entrenamiento Funcional',
                        physicalFrequency: efc < 50 ? 3 : 5,
                        cognitiveLevel: getLevel(ecf),
                        cognitiveTasksPerDay: ecf < 50 ? 2 : 1,
                        cognitiveComponents: JSON.stringify(['Meditación', 'Lectura']),
                        nutritionalLevel: getLevel(nsc),
                        nutritionalFocus: JSON.stringify(['Más agua', 'Menos azúcar'])
                    }
                }
            },
            include: { plan: true }
        });
    }

    async findAll() {
        return this.prisma.evaluation.findMany({
            include: {
                user: { select: { name: true, email: true } },
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.evaluation.findUnique({
            where: { id },
            include: {
                responses: true,
                plan: true,
            }
        });
    }
}

