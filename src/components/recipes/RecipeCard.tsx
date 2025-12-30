
import { Recipe } from '@/lib/recipes-data';
import { Clock, Flame, Tag } from 'lucide-react';
import Image from 'next/image';

interface RecipeCardProps {
    recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <div className="relative h-48 w-full">
                <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                    {recipe.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm uppercase font-bold">
                            {tag.replace('_', ' ')}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight line-clamp-2">
                        {recipe.title}
                    </h3>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                    {recipe.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium border-t pt-3">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#8dbf44]" />
                        <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span>{recipe.calories} kcal</span>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {recipe.nutrientFocus.map(nutrient => (
                        <div key={nutrient} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase">
                            <Tag className="w-3 h-3" />
                            {nutrient.replace('_', ' ')}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
