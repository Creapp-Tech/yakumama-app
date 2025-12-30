export interface Recipe {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    time: string;
    calories: number;
    tags: ('vegan' | 'keto' | 'low_carb' | 'high_protein' | 'balanced')[];
    nutrientFocus: ('omega_3' | 'vitamin_d' | 'b_vitamins' | 'antioxidants' | 'general')[];
    ingredients: string[];
    // Level 3 details
    steps: string[];
    tips?: string[];
    substitutions?: string[];
    macros?: {
        protein: string;
        carbs: string;
        fats: string;
    };
}

export const recipes: Recipe[] = [
    {
        id: '1',
        title: 'Salmón al Horno con Espárragos',
        description: 'Filete de salmón rico en Omega-3 acompañado de espárragos crocantes.',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=600&auto=format&fit=crop',
        time: '25 min',
        calories: 450,
        tags: ['keto', 'low_carb', 'high_protein'],
        nutrientFocus: ['omega_3', 'vitamin_d'],
        ingredients: ['1 Filete de Salmón (150g)', '1 manojo de Espárragos', '1 limón', '2 cdas Aceite de Oliva', '1 diente de Ajo picado'],
        steps: [
            'Precalienta el horno a 200°C.',
            'Coloca el salmón y los espárragos en una bandeja para hornear.',
            'Rocía con aceite de oliva, ajo, sal, pimienta y rodajas de limón.',
            'Hornea por 12-15 minutos hasta que el salmón esté cocido y los espárragos tiernos.'
        ],
        tips: ['Usa papel ahumado para preservar los jugos del pescado.'],
        macros: { protein: '35g', carbs: '5g', fats: '28g' }
    },
    {
        id: '2',
        title: 'Bowl de Quinoa y Kale',
        description: 'Un bowl energético lleno de antioxidantes y fibra.',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        time: '20 min',
        calories: 380,
        tags: ['vegan', 'balanced'],
        nutrientFocus: ['antioxidants', 'b_vitamins'],
        ingredients: ['1 taza Quinoa cocida', '1 taza Kale masajeado', '1/2 Aguacate', '2 cdas Nueces', 'Aderezo de limón'],
        steps: [
            'Cocina la quinoa según las instrucciones del paquete.',
            'Masajea el kale con un poco de aceite de oliva y sal hasta que suavice.',
            'En un bowl, combina la quinoa, kale, aguacate en cubos y nueces.',
            'Rocía con el aderezo de limón antes de servir.'
        ],
        substitutions: ['Puedes usar espinaca en lugar de kale.'],
        macros: { protein: '12g', carbs: '45g', fats: '18g' }
    },
    {
        id: '3',
        title: 'Omelette de Espinaca y Champiñones',
        description: 'Desayuno potente para cargar Vitamina D y B.',
        imageUrl: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=600&auto=format&fit=crop',
        time: '15 min',
        calories: 320,
        tags: ['keto', 'high_protein', 'balanced'],
        nutrientFocus: ['vitamin_d', 'b_vitamins'],
        ingredients: ['2 Huevos grandes', '1 taza de Espinaca fresca', '1/2 taza Champiñones laminados', '30g Queso feta', 'Aceite de coco'],
        steps: [
            'Bate los huevos en un bowl con sal y pimienta.',
            'Saltea los champiñones en una sartén con un poco de grasa hasta que doren.',
            'Agrega la espinaca hasta que se marchite.',
            'Vierte los huevos sobre los vegetales y cocina a fuego medio.',
            'Agrega el queso feta y dobla el omelette.'
        ],
        macros: { protein: '22g', carbs: '4g', fats: '24g' }
    },
    {
        id: '4',
        title: 'Batido Verde "Cerebro Activo"',
        description: 'Smoothie cargado de magnesio y antioxidantes para la concentración.',
        imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=600', // Valid Smoothie
        time: '5 min',
        calories: 210,
        tags: ['vegan', 'balanced'],
        nutrientFocus: ['antioxidants', 'general'],
        ingredients: ['1 taza Espinaca', '1 Plátano congelado', '1 cda Semillas de Chía', '1 vaso Leche de almendra', 'Hielo'],
        steps: [
            'Coloca todos los ingredientes en la licuadora.',
            'Procesa a alta velocidad hasta obtener una mezcla suave y cremosa.',
            'Sirve inmediatamente.'
        ],
        tips: ['Agrega una medida de proteína en polvo si lo tomas post-entreno.'],
        macros: { protein: '6g', carbs: '35g', fats: '8g' }
    },
    {
        id: '5',
        title: 'Ensalada de Atún Mediterránea',
        description: 'Fresca, rápida y llena de Omega-3.',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600', // Valid Salad
        time: '10 min',
        calories: 350,
        tags: ['low_carb', 'high_protein'],
        nutrientFocus: ['omega_3', 'b_vitamins'],
        ingredients: ['1 lata de Atún en agua', '10 Tomates Cherry', '5 Aceitunas negras', '1/2 Pepino', '1 cda Aceite de Oliva Extra Virgen'],
        steps: [
            'Drena el atún y colócalo en un bowl.',
            'Corta los tomates y aceitunas a la mitad, y el pepino en cubos.',
            'Mezcla todos los ingredientes.',
            'Adereza con aceite de oliva, sal y orégano.'
        ],
        macros: { protein: '30g', carbs: '8g', fats: '20g' }
    },
    {
        id: '6',
        title: 'Tofu Salteado con Verduras',
        description: 'Opción vegana alta en proteína y vitaminas del grupo B.',
        imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=600', // Valid Tofu/Curry
        time: '20 min',
        calories: 300,
        tags: ['vegan', 'high_protein'],
        nutrientFocus: ['b_vitamins', 'antioxidants'],
        ingredients: ['200g Tofu firme', '1 taza Flores de Brócoli', '1 Zanahoria en tiras', '2 cdas Salsa de Soya', '1 cdta Jengibre rallado'],
        steps: [
            'Prensa el tofu para quitar el exceso de agua y córtalo en cubos.',
            'Dora el tofu en una sartén caliente.',
            'Agrega las verduras y saltea por 5 minutos.',
            'Añade la salsa de soya y jengibre, cocina 2 minutos más.'
        ],
        macros: { protein: '18g', carbs: '20g', fats: '14g' }
    },
    {
        id: '7',
        title: 'Yogur Griego con Bayas y Semillas',
        description: 'Probióticos y antioxidantes para un intestino y cerebro feliz.',
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a029177b?auto=format&fit=crop&q=80&w=600', // Valid
        time: '5 min',
        calories: 250,
        tags: ['balanced', 'high_protein'],
        nutrientFocus: ['antioxidants', 'vitamin_d'],
        ingredients: ['1 taza Yogur Griego sin azúcar', '1/2 taza Arándanos/Fresas', '1 cda Semillas de Calabaza', '1 cdta Miel (opcional)'],
        steps: [
            'Sirve el yogur en un bowl.',
            'Decora con las frutas y las semillas.',
            'Endulza con un poco de miel si lo deseas.'
        ],
        macros: { protein: '20g', carbs: '25g', fats: '8g' }
    },
    {
        id: '8',
        title: 'Aguacates Rellenos de Huevo',
        description: 'Grasas saludables y proteína para energía sostenida.',
        imageUrl: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&q=80&w=600', // Valid
        time: '15 min',
        calories: 400,
        tags: ['keto', 'low_carb'],
        nutrientFocus: ['omega_3', 'b_vitamins'],
        ingredients: ['1 Aguacate grande', '2 Huevos pequeños', 'Cilantro fresco', 'Sal y pimienta al gusto'],
        steps: [
            'Precalienta el horno a 200°C.',
            'Corta el aguacate a la mitad y quita el hueso. Si el hueco es muy pequeño, retira un poco de pulpa.',
            'Coloca las mitades en un molde para muffins para que no se vuelquen.',
            'Rompe un huevo dentro de cada mitad.',
            'Hornea por 15 minutos o hasta que la clara cuaje.'
        ],
        macros: { protein: '14g', carbs: '12g', fats: '35g' }
    }
];
