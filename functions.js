const fs = require("fs");
const path = require("path");
const allergensDatabase = require("./allergensDatabase");
const dishesDatabase = require("./dishesDatabase");
const { isAllergenValid, isDishValid } = require("./helpers");

// Path to the databases
const dishesDatabasePath = path.join(__dirname, "dishesDatabase.js");
const allergensDatabasePath = path.join(__dirname, "allergensDatabase.js");

// Helper function to save changes to a database file
function saveDatabaseToFile(database, filePath, variableName) {
  const fileContent = `const ${variableName} = ${JSON.stringify(database, null, 2)};\n\nmodule.exports = ${variableName};`;
  fs.writeFileSync(filePath, fileContent, "utf8");
}

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

  // Save the updated database to the file
  saveDatabaseToFile(dishesDatabase, dishesDatabasePath, "dishesDatabase");

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

  // Save the updated database to the file
  saveDatabaseToFile(allergensDatabase, allergensDatabasePath, "allergensDatabase");

  return { success: true, message: `Allergen ${allergenName} added successfully.` };
}

module.exports = {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeRecipeAlternative,
  addDish,
  addAllergen
};