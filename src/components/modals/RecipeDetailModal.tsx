
'use client';

import { useState } from 'react';
import { Recipe } from '@/lib/recipes-data';
import { NutritionResult } from '@/lib/nutrition-logic';
import { X, Clock, Flame, ChevronDown, ChevronUp, CheckCircle, ChefHat } from 'lucide-react';
import Image from 'next/image';

interface RecipeDetailModalProps {
    recipe: Recipe;
    userData: NutritionResult | null;
    onClose: () => void;
}

export default function RecipeDetailModal({ recipe, userData, onClose }: RecipeDetailModalProps) {
    const [showFullDetail, setShowFullDetail] = useState(false);

    // Dynamic "Why for you" Logic
    const getPersonalizedReason = () => {
        if (!userData) return "Esta receta es equilibrada y nutritiva.";

        const reasons: string[] = [];
        const { domainScores } = userData;

        if (recipe.nutrientFocus.includes('omega_3') && domainScores.omega3 < 70) {
            reasons.push("cubrir tu déficit de Omega-3");
        }
        if (recipe.nutrientFocus.includes('vitamin_d') && domainScores.vitaminD < 70) {
            reasons.push("mejorar tus niveles de Vitamina D");
        }
        if (recipe.nutrientFocus.includes('b_vitamins') && domainScores.bVitamins < 70) {
            reasons.push("aportar energía y soporte metabólico (Vit B)");
        }
        if (recipe.nutrientFocus.includes('antioxidants') && domainScores.antioxidants < 70) {
            reasons.push("combatir el estrés oxidativo");
        }

        if (reasons.length === 0) return "Esta receta mantiene tu excelente nivel nutricional.";

        const reasonText = reasons.join(" y ");
        return `Esta receta te ayuda a ${reasonText}.`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 scrollbar-hide">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header Image */}
                <div className="relative h-64 w-full">
                    <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold leading-tight">{recipe.title}</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm font-medium opacity-90">
                            <span className="flex items-center gap-1"><Clock size={16} /> {recipe.time}</span>
                            <span className="flex items-center gap-1"><Flame size={16} /> {recipe.calories} kcal</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-8">

                    {/* LEVEL 2: SUMMARY & DECISION */}
                    <div className="space-y-6">
                        {/* Personalized Insight */}
                        <div className="bg-[#f0f9f0] border border-green-100 p-4 rounded-xl flex gap-4 items-start">
                            <div className="p-2 bg-white rounded-full text-[#8dbf44] shadow-sm mt-1">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">Por qué es para ti</h4>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    {getPersonalizedReason()}
                                </p>
                            </div>
                        </div>

                        {/* Quick Ingredients Preview */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Ingredientes Principales</h3>
                            <div className="flex flex-wrap gap-2">
                                {recipe.ingredients.slice(0, 5).map((ing, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                        {ing}
                                    </span>
                                ))}
                                {recipe.ingredients.length > 5 && (
                                    <span className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg text-sm">+{recipe.ingredients.length - 5} más</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTON (Toggle Level 3) */}
                    <button
                        onClick={() => setShowFullDetail(!showFullDetail)}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${showFullDetail
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-[#8dbf44] text-white hover:bg-[#7ca93a] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            }`}
                    >
                        {showFullDetail ? (
                            <>Ocultar Preparación <ChevronUp size={20} /></>
                        ) : (
                            <>Ver Preparación Completa <ChefHat size={20} /></>
                        )}
                    </button>

                    {/* LEVEL 3: FULL DETAILS */}
                    {showFullDetail && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-8 pt-4 border-t">

                            {/* Full Ingredients */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredientes</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {recipe.ingredients.map((ing, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-[#8dbf44]"></div>
                                            {ing}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Steps */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Preparación</h3>
                                <div className="space-y-6">
                                    {recipe.steps ? recipe.steps.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-500 font-bold rounded-full flex items-center justify-center mt-1">
                                                {i + 1}
                                            </div>
                                            <p className="text-gray-700 leading-relaxed pt-1.5">{step}</p>
                                        </div>
                                    )) : <p>Pasos no disponibles.</p>}
                                </div>
                            </div>

                            {/* Macros & Tips */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                                {recipe.macros && (
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase">Macros por porción</h4>
                                        <div className="flex gap-4 text-sm text-gray-600">
                                            <div><span className="font-bold block text-gray-900">{recipe.macros.protein}</span> Prot</div>
                                            <div><span className="font-bold block text-gray-900">{recipe.macros.carbs}</span> Carbs</div>
                                            <div><span className="font-bold block text-gray-900">{recipe.macros.fats}</span> Grasas</div>
                                        </div>
                                    </div>
                                )}
                                {recipe.tips && (
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase">Tips del Chef</h4>
                                        <p className="text-sm text-gray-600 italic">"{recipe.tips[0]}"</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
