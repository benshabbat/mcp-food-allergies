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

// Add the rest of the functions here...

module.exports = {
  getAllergensFromDish,
  getAllergenAlternatives
  // Export other functions as needed
};