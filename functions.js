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

// Add the rest of the functions here...

module.exports = {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeRecipeAlternative
  // Export other functions as needed
};