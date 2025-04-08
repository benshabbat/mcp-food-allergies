const allergensDatabase = require("./allergensDatabase");
const dishesDatabase = require("./dishesDatabase");
const { isAllergenValid, isDishValid } = require("./helpers");

function getAllergensFromDish(dishName) {
  if (!isDishValid(dishName)) {
    return { success: false, message: `Dish ${dishName} not found in the database` };
  }

  const dish = dishesDatabase[dishName];
  return {
    success: true,
    dishName,
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
    allergen,
    category: allergenInfo.category,
    alternatives: allergenInfo.alternatives,
    notes: allergenInfo.notes
  };
}

function getSafeRecipeAlternative(dishName, allergies) {
  if (!isDishValid(dishName)) {
    return { success: false, message: `Dish ${dishName} not found in the database` };
  }

  const dish = dishesDatabase[dishName];
  const problematicIngredients = dish.ingredients.filter(ingredient =>
    allergies.includes(ingredient)
  );

  const alternatives = problematicIngredients.reduce((acc, ingredient) => {
    acc[ingredient] = allergensDatabase[ingredient]?.alternatives || ["No alternatives found"];
    return acc;
  }, {});

  return {
    success: true,
    dishName,
    safeToEat: problematicIngredients.length === 0,
    problematicIngredients,
    alternatives
  };
}

// Function to add a new dish to the dishesDatabase
function addDish(dishName, ingredients, category, difficulty, kosher = true) {
  if (dishesDatabase[dishName]) {
    return { success: false, message: `Dish ${dishName} already exists in the database.` };
  }

  dishesDatabase[dishName] = {
    ingredients,
    category,
    difficulty,
    kosher
  };

  return { success: true, message: `Dish ${dishName} added successfully.` };
}

// Function to add a new allergen to the allergensDatabase
function addAllergen(allergenName, category, alternatives, proteinContent, notes = "") {
  if (allergensDatabase[allergenName]) {
    return { success: false, message: `Allergen ${allergenName} already exists in the database.` };
  }

  allergensDatabase[allergenName] = {
    category,
    alternatives,
    proteinContent,
    notes
  };

  return { success: true, message: `Allergen ${allergenName} added successfully.` };
}

module.exports = {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeRecipeAlternative,
  addDish,
  addAllergen
};