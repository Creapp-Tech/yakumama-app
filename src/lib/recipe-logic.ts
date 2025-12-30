import { NutritionResult } from './nutrition-logic';
import { Recipe, recipes } from './recipes-data';

export function getRecommendedRecipes(result: NutritionResult | null): Recipe[] {
    if (!result) {
        // Return a shuffled mix if no result
        return recipes.slice(0, 4);
    }

    const { domainScores } = result;
    const scores = [
        { id: 'omega_3', score: domainScores.omega3 },
        { id: 'vitamin_d', score: domainScores.vitaminD },
        { id: 'b_vitamins', score: domainScores.bVitamins },
        { id: 'antioxidants', score: domainScores.antioxidants },
    ];

    // Find lowest performing domains (below 70%)
    const priorities = scores
        .filter(s => s.score < 70)
        .sort((a, b) => a.score - b.score)
        .map(s => s.id);

    // Filter logic
    let filtered = recipes;

    // 1. Filter by Diet Preference (Inferred from result or can be passed if we tracked it explicitly in result)
    // For now, let's assume we want to show 'balanced' unless we detect a specific need, 
    // but without explicit 'preference' in the Result object, we might show all.
    // However, if we look at the 'diet' score or similar, we might infer.
    // Ideally, we should have saved the 'diet_type' question in the result object.

    // Let's Score recipes based on match
    const scoredRecipes = filtered.map(recipe => {
        let matchScore = 0;

        // Boost based on nutrient needs
        priorities.forEach((p, index) => {
            if (recipe.nutrientFocus.includes(p as any)) {
                matchScore += (5 - index); // Higher priority = more points
            }
        });

        // General randomness to rotate
        matchScore += Math.random() * 0.5;

        return { recipe, matchScore };
    });

    // Sort by match score
    scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);

    return scoredRecipes.map(item => item.recipe);
}
