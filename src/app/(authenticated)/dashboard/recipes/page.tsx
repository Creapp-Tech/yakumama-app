'use client';

import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/recipes-data';
import { getRecommendedRecipes } from '@/lib/recipe-logic';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { NutritionResult } from '@/lib/nutrition-logic';
import Link from 'next/link';
import { ArrowLeft, ChefHat } from 'lucide-react';
import RecipeDetailModal from '@/components/modals/RecipeDetailModal';

export default function RecipesPage() {
    const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [userResult, setUserResult] = useState<NutritionResult | null>(null);

    useEffect(() => {
        const loadRecipes = () => {
            try {
                // Get nutrition result from local storage
                const savedResult = localStorage.getItem('lastNutritionResult');
                const result: NutritionResult | null = savedResult ? JSON.parse(savedResult) : null;
                setUserResult(result);

                const recipes = getRecommendedRecipes(result);
                setRecommendedRecipes(recipes);
            } catch (error) {
                console.error("Error loading recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, []);

    if (!loading && !recommendedRecipes.length && !localStorage.getItem('lastNutritionResult')) {
        // Locked State
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-[#8dbf44] mb-8 transition-colors w-fit">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Volver al Inicio
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-center relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
                    <div className="p-10 md:p-16 space-y-6">
                        <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                            <ChefHat className="w-10 h-10 text-[#8dbf44]" />
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            Para recomendarte recetas que sí ayuden a tu cerebro, necesitamos conocerte primero.
                        </h2>

                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Nuestro algoritmo selecciona alimentos específicos para cubrir tus brechas nutricionales (Omega-3, Vitamina D, etc.). Sin tu evaluación, no podemos personalizar tu plan.
                        </p>

                        <div className="pt-6">
                            <Link href="/dashboard/nutrition" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#8dbf44] border border-transparent rounded-xl hover:bg-[#7ca93a] hover:shadow-lg transform hover:-translate-y-1">
                                Comenzar Evaluación Nutricional
                                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-4 border-[#8dbf44] border-t-transparent rounded-full mb-4"></div>
            Buscando las mejores recetas para ti...
        </div>;
    }

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="mb-8">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-[#8dbf44] mb-4 transition-colors w-fit">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Volver al Inicio
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#f0f9f0] rounded-xl">
                        <ChefHat className="w-8 h-8 text-[#8dbf44]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Recetas Diarias</h1>
                        <p className="text-gray-600">Personalizadas según tus necesidades nutricionales</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {recommendedRecipes.map((recipe) => (
                    <div key={recipe.id} className="h-full cursor-pointer" onClick={() => setSelectedRecipe(recipe)}>
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
            </div>

            {recommendedRecipes.length === 0 && (
                <div className="text-center p-12 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500">No encontramos recetas específicas en este momento.</p>
                </div>
            )}

            {selectedRecipe && (
                <RecipeDetailModal
                    recipe={selectedRecipe}
                    userData={userResult}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}
        </div>
    );
}
