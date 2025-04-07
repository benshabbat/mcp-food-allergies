// MCP System for Food Allergen Substitutions
// Model Context Protocol for managing dishes and allergens

// Database of common allergens and recommended substitutions
const allergensDatabase = {
  // Dairy-based allergens
  "cow milk": {
    category: "dairy",
    alternatives: ["almond milk", "soy milk", "coconut milk", "oat milk", "rice milk"],
    proteinContent: "high",
    notes: "Coconut milk is richer in fat and better suited for sweet and creamy dishes"
  },
  "cheese": {
    category: "dairy",
    alternatives: ["soy cheese", "cashew cheese", "almond cheese", "coconut cheese"],
    proteinContent: "high",
    notes: "Cashew and soy cheeses are good for textures similar to soft cheeses"
  },
  "yogurt": {
    category: "dairy",
    alternatives: ["soy yogurt", "coconut yogurt", "almond yogurt"],
    proteinContent: "medium",
    notes: "Coconut yogurt is suitable for sweet dishes, soy yogurt is better for savory dishes"
  },

  // Gluten-based allergens
  "wheat flour": {
    category: "gluten",
    alternatives: ["rice flour", "corn flour", "buckwheat flour", "coconut flour", "almond flour", "tapioca flour"],
    proteinContent: "medium",
    notes: "For baking, it's recommended to combine several gluten-free flours"
  },
  "pasta": {
    category: "gluten",
    alternatives: ["rice pasta", "corn pasta", "lentil pasta", "quinoa pasta", "glass noodles"],
    proteinContent: "medium",
    notes: "Lentil and quinoa pasta provide more protein than rice or corn pasta"
  },
  "couscous": {
    category: "gluten",
    alternatives: ["quinoa", "buckwheat", "rice", "corn"],
    proteinContent: "medium",
    notes: "Quinoa is a good alternative in terms of texture and nutritional value"
  },

  // Nut-based allergens
  "peanuts": {
    category: "nuts",
    alternatives: ["sunflower seeds", "pumpkin seeds", "tahini", "avocado"],
    proteinContent: "high",
    notes: "Those allergic to peanuts are not necessarily allergic to tree nuts and vice versa"
  },
  "almonds": {
    category: "nuts",
    alternatives: ["sunflower seeds", "pumpkin seeds", "flax seeds", "oats"],
    proteinContent: "high",
    notes: "Ground oats can be a good alternative to the texture of almond powder in baking"
  },
  "cashews": {
    category: "nuts",
    alternatives: ["sunflower seeds", "pumpkin seeds", "tahini"],
    proteinContent: "high",
    notes: "Tahini can provide a similar creamy texture in spreads and sauces"
  },

  // Soy-based allergens
  "soy": {
    category: "legumes",
    alternatives: ["chickpeas", "lentils", "beans", "chickpea tofu"],
    proteinContent: "high",
    notes: "Chickpea tofu (bufu) is a good alternative to regular tofu for those allergic to soy"
  },

  // Egg-based allergens
  "eggs": {
    category: "eggs",
    alternatives: ["commercial egg replacer", "ground flax seeds + water", "mashed banana", "tahini + water", "applesauce", "aquafaba (chickpea water)"],
    proteinContent: "high",
    notes: "For baking: 1/4 cup applesauce or mashed banana = 1 egg; for binding: 1 tbsp flax seeds + 3 tbsp water = 1 egg"
  },

  // Fish-based allergens
  "fish": {
    category: "fish",
    alternatives: ["tofu", "jackfruit", "eggplant", "zucchini"],
    proteinContent: "high",
    notes: "Jackfruit and tofu are good substitutes for texture in savory dishes"
  },

  // Sesame-based allergens
  "tahini": {
    category: "seeds",
    alternatives: ["sunflower seed butter", "pumpkin seed butter", "almond butter"],
    proteinContent: "medium",
    notes: "Sunflower seed butter is a great alternative for spreads and dressings"
  },

  // Additional allergens
  "honey": {
    category: "sweeteners",
    alternatives: ["maple syrup", "date syrup", "agave syrup"],
    proteinContent: "low",
    notes: "Date syrup is a great natural sweetener for desserts and drinks"
  },
  "mustard": {
    category: "spices",
    alternatives: ["horseradish", "wasabi", "dijon-free mustard"],
    proteinContent: "low",
    notes: "Horseradish can provide a similar spicy kick in recipes"
  },
  "corn": {
    category: "grains",
    alternatives: ["rice", "quinoa", "buckwheat"],
    proteinContent: "medium",
    notes: "Rice and quinoa are versatile substitutes for corn in many dishes"
  },
  "gelatin": {
    category: "animal-based",
    alternatives: ["agar-agar", "pectin", "vegan gelatin"],
    proteinContent: "low",
    notes: "Agar-agar is a plant-based alternative for desserts and jellies"
  },
  "coconut": {
    category: "nuts",
    alternatives: ["almond milk", "soy milk", "oat milk"],
    proteinContent: "medium",
    notes: "Almond milk is a versatile substitute for coconut milk in recipes"
  }
};

// Database of common dishes and the allergens they contain
const dishesDatabase = {
  // Breakfast dishes
  "pancake": {
    ingredients: ["wheat flour", "eggs", "cow milk"],
    category: "breakfast",
    difficulty: "easy",
    kosher: true
  },
  "omelet": {
    ingredients: ["eggs"],
    category: "breakfast",
    difficulty: "easy",
    kosher: true
  },
  "muesli": {
    ingredients: ["oats", "cow milk", "almonds", "nuts"],
    category: "breakfast",
    difficulty: "easy",
    kosher: true
  },

  // Main course dishes
  "falafel": {
    ingredients: ["chickpeas", "peanuts"],
    category: "main course",
    difficulty: "medium",
    kosher: true,
    notes: "Sometimes contains peanuts or tahini - depends on the recipe"
  },
  "hummus": {
    ingredients: ["chickpeas", "tahini"],
    category: "appetizer",
    difficulty: "medium",
    kosher: true
  },
  "couscous": {
    ingredients: ["couscous"],
    category: "main course",
    difficulty: "medium",
    kosher: true
  },
  "shakshuka": {
    ingredients: ["eggs", "tomatoes", "onions", "peppers"],
    category: "main course",
    difficulty: "easy",
    kosher: true
  },
  "grilled salmon": {
    ingredients: ["salmon", "lemon", "olive oil", "garlic"],
    category: "main course",
    difficulty: "medium",
    kosher: true
  },

  // Desserts
  "chocolate cake": {
    ingredients: ["wheat flour", "eggs", "cow milk", "cocoa powder"],
    category: "desserts",
    difficulty: "medium",
    kosher: true
  },
  "fruit salad": {
    ingredients: ["apples", "oranges", "bananas", "grapes"],
    category: "desserts",
    difficulty: "easy",
    kosher: true
  },
  "coconut macaroons": {
    ingredients: ["coconut", "sugar", "eggs"],
    category: "desserts",
    difficulty: "easy",
    kosher: true
  },

  // Snacks
  "popcorn": {
    ingredients: ["corn kernels", "salt", "oil"],
    category: "snacks",
    difficulty: "easy",
    kosher: true
  },
  "baked potato chips": {
    ingredients: ["potatoes", "salt", "olive oil"],
    category: "snacks",
    difficulty: "easy",
    kosher: true
  },

  // Soups
  "vegetable soup": {
    ingredients: ["carrots", "celery", "onions", "potatoes", "zucchini"],
    category: "soups",
    difficulty: "easy",
    kosher: true
  },
  "lentil soup": {
    ingredients: ["lentils", "onions", "carrots", "celery", "spices"],
    category: "soups",
    difficulty: "easy",
    kosher: true
  }
};

// Helper function to check if an allergen exists in the database
function isAllergenValid(allergen) {
  return allergensDatabase.hasOwnProperty(allergen);
}

// Helper function to check if a dish exists in the database
function isDishValid(dishName) {
  return dishesDatabase.hasOwnProperty(dishName);
}

// Function to list all dishes containing a specific allergen
function getDishesWithAllergen(allergen) {
  if (!isAllergenValid(allergen)) {
    return { success: false, message: `Allergen ${allergen} not found in the database` };
  }

  const dishesWithAllergen = Object.entries(dishesDatabase)
    .filter(([_, dishInfo]) => dishInfo.ingredients.includes(allergen))
    .map(([dishName, dishInfo]) => ({
      dishName,
      category: dishInfo.category,
      difficulty: dishInfo.difficulty
    }));

  return {
    success: true,
    allergen: allergen,
    dishes: dishesWithAllergen,
    message: dishesWithAllergen.length > 0
      ? `Found ${dishesWithAllergen.length} dishes containing ${allergen}`
      : `No dishes found containing ${allergen}`
  };
}

// Improved error handling in existing functions
function getAllergensFromDish(dishName) {
  if (!isDishValid(dishName)) {
    return { success: false, message: `Dish ${dishName} not found in the database` };
  }

  const dish = dishesDatabase[dishName];
  return {
    success: true,
    dishName: dishName,
    allergens: dish.ingredients,
    category: dish.category,
    difficulty: dish.difficulty
  };
}

function getAllergenAlternatives(allergen) {
  if (!isAllergenValid(allergen)) {
    return { success: false, message: `Allergen ${allergen} not found in the database` };
  }

  const allergenInfo = allergensDatabase[allergen];
  return {
    success: true,
    allergen: allergen,
    category: allergenInfo.category,
    alternatives: allergenInfo.alternatives,
    notes: allergenInfo.notes
  };
}

// Function that suggests a customized version of a dish without specific allergens
function getSafeRecipeAlternative(dishName, allergies) {
  const dish = dishesDatabase[dishName];
  if (!dish) {
    return { success: false, message: `Dish ${dishName} not found in the database` };
  }
  
  const problematicIngredients = dish.ingredients.filter(ingredient => 
    allergies.some(allergy => 
      allergy === ingredient || 
      (allergensDatabase[ingredient] && allergensDatabase[ingredient].category === allergy)
    )
  );
  
  if (problematicIngredients.length === 0) {
    return { 
      success: true, 
      dishName: dishName,
      message: `Dish ${dishName} is safe to eat for the specified allergies`,
      safeToEat: true
    };
  }
  
  const alternatives = {};
  let allAlternativesFound = true;
  
  problematicIngredients.forEach(ingredient => {
    if (allergensDatabase[ingredient]) {
      alternatives[ingredient] = allergensDatabase[ingredient].alternatives;
    } else {
      allAlternativesFound = false;
      alternatives[ingredient] = ["No alternatives found"];
    }
  });
  
  return {
    success: true,
    dishName: dishName,
    safeToEat: false,
    problematicIngredients: problematicIngredients,
    alternatives: alternatives,
    allAlternativesFound: allAlternativesFound,
    message: allAlternativesFound ? 
      `Alternatives found for all problematic ingredients in ${dishName}` : 
      `No alternatives found for some problematic ingredients in ${dishName}`
  };
}

// Function that suggests safe dishes based on a list of allergies
function getSafeDishSuggestions(allergies) {
  const safeDishes = [];
  const potentiallyAdaptableDishes = [];
  
  for (const [dishName, dishInfo] of Object.entries(dishesDatabase)) {
    const problematicIngredients = dishInfo.ingredients.filter(ingredient => 
      allergies.some(allergy => 
        allergy === ingredient || 
        (allergensDatabase[ingredient] && allergensDatabase[ingredient].category === allergy)
      )
    );
    
    if (problematicIngredients.length === 0) {
      safeDishes.push({
        dishName: dishName,
        category: dishInfo.category,
        difficulty: dishInfo.difficulty
      });
    } else {
      // Check if there are alternatives for all problematic ingredients
      let allAlternativesFound = true;
      
      for (const ingredient of problematicIngredients) {
        if (!allergensDatabase[ingredient] || !allergensDatabase[ingredient].alternatives || allergensDatabase[ingredient].alternatives.length === 0) {
          allAlternativesFound = false;
          break;
        }
      }
      
      if (allAlternativesFound) {
        potentiallyAdaptableDishes.push({
          dishName: dishName,
          category: dishInfo.category,
          difficulty: dishInfo.difficulty,
          problematicIngredients: problematicIngredients
        });
      }
    }
  }
  
  return {
    success: true,
    allergies: allergies,
    safeDishes: safeDishes,
    potentiallyAdaptableDishes: potentiallyAdaptableDishes
  };
}

// Demonstrating MCP system usage with new functionality
function demonstrateMCPUsage() {
  console.log("Example 1: Allergens in pancakes");
  console.log(getAllergensFromDish("pancake"));
  console.log("\n");

  console.log("Example 2: Alternatives for cow milk");
  console.log(getAllergenAlternatives("cow milk"));
  console.log("\n");

  console.log("Example 3: Adapting pancakes for dairy allergy");
  console.log(getSafeRecipeAlternative("pancake", ["dairy"]));
  console.log("\n");

  console.log("Example 4: Recommended dishes for gluten and nut allergies");
  console.log(getSafeDishSuggestions(["gluten", "nuts"]));
  console.log("\n");

  console.log("Example 5: Dishes containing peanuts");
  console.log(getDishesWithAllergen("peanuts"));
}

// Run demonstration
// demonstrateMCPUsage();

// Export functions for external use
module.exports = {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeRecipeAlternative,
  getSafeDishSuggestions,
  getDishesWithAllergen,
  allergensDatabase,
  dishesDatabase
};