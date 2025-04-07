// MCP System for Food Allergen Substitutions
// Model Context Protocol for managing dishes and allergens

// Database of common allergens and recommended substitutions
const allergensDatabase = {
  // Protein-based allergens
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
  }
};

// Database of common dishes and the allergens they contain
const dishesDatabase = {
  "pancake": {
    ingredients: ["wheat flour", "eggs", "cow milk"],
    category: "baked goods",
    difficulty: "easy"
  },
  "alfredo pasta": {
    ingredients: ["pasta", "cow milk", "cheese"],
    category: "main course",
    difficulty: "medium"
  },
  "chocolate cake": {
    ingredients: ["wheat flour", "eggs", "cow milk"],
    category: "desserts",
    difficulty: "medium"
  },
  "falafel": {
    ingredients: ["chickpeas", "peanuts"],
    category: "main course",
    difficulty: "medium",
    notes: "Sometimes contains peanuts or tahini - depends on the recipe"
  },
  "muesli": {
    ingredients: ["oats", "cow milk", "almonds", "nuts"],
    category: "breakfast",
    difficulty: "easy"
  },
  "omelet": {
    ingredients: ["eggs"],
    category: "breakfast",
    difficulty: "easy"
  },
  "hummus": {
    ingredients: ["chickpeas", "tahini"],
    category: "appetizer",
    difficulty: "medium"
  },
  "cheese pastry": {
    ingredients: ["wheat flour", "cheese"],
    category: "baked goods",
    difficulty: "medium"
  },
  "pizza": {
    ingredients: ["wheat flour", "cheese"],
    category: "main course",
    difficulty: "medium"
  },
  "couscous": {
    ingredients: ["couscous"],
    category: "main course",
    difficulty: "medium"
  }
};

// Function that returns a list of allergens from a specific dish
function getAllergensFromDish(dishName) {
  const dish = dishesDatabase[dishName];
  if (!dish) {
    return { success: false, message: `Dish ${dishName} not found in the database` };
  }
  
  return {
    success: true,
    dishName: dishName,
    allergens: dish.ingredients,
    category: dish.category,
    difficulty: dish.difficulty
  };
}

// Function that suggests alternatives to a specific allergen
function getAllergenAlternatives(allergen) {
  const allergenInfo = allergensDatabase[allergen];
  if (!allergenInfo) {
    return { success: false, message: `Allergen ${allergen} not found in the database` };
  }
  
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

// Demonstrating MCP system usage
function demonstrateMCPUsage() {
  // Example 1: Getting allergen information for a dish
  console.log("Example 1: Allergens in pancakes");
  console.log(getAllergensFromDish("pancake"));
  console.log("\n");
  
  // Example 2: Getting alternatives for a specific allergen
  console.log("Example 2: Alternatives for cow milk");
  console.log(getAllergenAlternatives("cow milk"));
  console.log("\n");
  
  // Example 3: Adapting a dish according to allergies
  console.log("Example 3: Adapting pancakes for dairy allergy");
  console.log(getSafeRecipeAlternative("pancake", ["dairy"]));
  console.log("\n");
  
  // Example 4: Suggesting safe dishes based on allergies
  console.log("Example 4: Recommended dishes for gluten and nut allergies");
  console.log(getSafeDishSuggestions(["gluten", "nuts"]));
}

// Run demonstration
// demonstrateMCPUsage();

// Export functions for external use
module.exports = {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeRecipeAlternative,
  getSafeDishSuggestions,
  allergensDatabase,
  dishesDatabase
};