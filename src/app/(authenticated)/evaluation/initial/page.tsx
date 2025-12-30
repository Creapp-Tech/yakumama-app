import EvaluationWizard from '@/components/evaluation/EvaluationWizard';

export default function InitialEvaluationPage() {
    return (
        <div className="min-h-screen bg-[#f0f9f0] p-4 lg:p-8">
            <div className="max-w-4xl mx-auto mb-8 text-center pt-4">
                <h1 className="text-3xl font-bold text-[#8dbf44]">Evaluación Inicial</h1>
                <p className="text-gray-600 mt-2">Mide tu bienestar cognitivo actual para diseñar tu plan.</p>
            </div>
            <EvaluationWizard />
        </div>
    );
}
