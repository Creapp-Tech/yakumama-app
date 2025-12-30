import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { calculateAllScores } from '@/modules/evaluation/services/calculationService';
import { EvaluationResponse } from '@/modules/evaluation/types/evaluation.types';

export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Verify Session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json(
            { error: 'No autorizado' },
            { status: 401 }
        );
    }

    try {
        const responses: EvaluationResponse = await request.json();

        // 2. Calculate Scores
        const scores = calculateAllScores(responses);

        // 3. Prepare DB Payload (Mapping to existing schema)
        const dbPayload = {
            user_id: session.user.id,
            type: responses.tipo_evaluacion || 'inicial',
            ecf_score: scores.ECF,
            efc_score: scores.EFC,
            nsc_score: scores.NSC,
            ibcy_score: scores.IBCY,
            total_score: scores.IBCY, // Assuming IBCY is the total/global score
            raw_responses: responses,
            levels: {
                ecf: scores.Nivel_ECF,
                efc: scores.Nivel_EFC,
                nsc: scores.Nivel_NSC
            },
            completed_at: new Date().toISOString()
        };

        // 4. Save to Database
        const { data, error } = await supabase
            .from('evaluations')
            .insert(dbPayload)
            .select()
            .single();

        if (error) {
            console.error('Database Error:', error);
            throw error;
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Calculation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Error al calcular evaluación' },
            { status: 500 }
        );
    }
}
