const allergensDatabase = require("./allergensDatabase");
const dishesDatabase = require("./dishesDatabase");

function isAllergenValid(allergen) {
  return allergensDatabase.hasOwnProperty(allergen);
}

function isDishValid(dishName) {
  return dishesDatabase.hasOwnProperty(dishName);
}

module.exports = {
  isAllergenValid,
  isDishValid
};