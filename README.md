# MCP System for Food Allergen Substitutions

## Overview

The MCP (Model Context Protocol) for Food Allergen Substitutions is a tool designed to help people with food allergies find safe alternatives to allergenic ingredients in a wide variety of dishes and recipes. The system was developed to provide a comprehensive and accessible solution for managing food allergies in everyday life.

## Key Capabilities

- **Allergen Identification in Dishes** - A system that quickly identifies which allergens are present in a specific dish
- **Allergen Alternative Suggestions** - Offers a variety of safe alternatives to allergenic ingredients
- **Recipe Customization** - Allows for customizing existing recipes to personal needs by replacing allergenic ingredients
- **Safe Dish Recommendations** - Provides a list of safe dishes for consumption based on a personal allergy profile

## Databases

The system is based on two main databases:

### Allergens Database (`allergensDatabase`)

A comprehensive database of common allergens and their alternatives, including:
- Allergen name
- Category (dairy, gluten, nuts, etc.)
- List of recommended alternatives
- Protein content
- Notes and recommendations for use

### Dishes Database (`dishesDatabase`)

A database of common dishes and the allergens they contain, including:
- Dish name
- List of ingredients/allergens
- Dish category (main course, dessert, breakfast, etc.)
- Preparation difficulty level

## Main Functions

### `getAllergensFromDish(dishName)`

Returns a list of all allergens found in a specific dish.

**Parameters:**
- `dishName` (string): Name of the dish to check

**Output:**
- An object containing the dish name, list of allergens, category, and difficulty level

### `getAllergenAlternatives(allergen)`

Returns a list of recommended alternatives for a specific allergen.

**Parameters:**
- `allergen` (string): Name of the allergen

**Output:**
- An object containing the allergen name, its category, list of alternatives, and notes

### `getSafeRecipeAlternative(dishName, allergies)`

Suggests a customized version of a dish without specific allergens.

**Parameters:**
- `dishName` (string): Name of the dish
- `allergies` (array): List of allergies to check

**Output:**
- An object containing information about the dish safety, problematic ingredients, and recommended alternatives

### `getSafeDishSuggestions(allergies)`

Suggests a list of safe dishes based on a list of allergies.

**Parameters:**
- `allergies` (array): List of allergies to check

**Output:**
- An object containing a list of safe dishes and dishes that can be easily adapted

## Usage Examples

### Checking Allergens in a Dish

```javascript
const pancakeAllergens = getAllergensFromDish("pancake");
console.log(pancakeAllergens);
/* Output:
{
  success: true,
  dishName: "pancake",
  allergens: ["wheat flour", "eggs", "cow milk"],
  category: "baked goods",
  difficulty: "easy"
}
*/
```

### Getting Alternatives for an Allergen

```javascript
const milkAlternatives = getAllergenAlternatives("cow milk");
console.log(milkAlternatives);
/* Output:
{
  success: true,
  allergen: "cow milk",
  category: "dairy",
  alternatives: ["almond milk", "soy milk", "coconut milk", "oat milk", "rice milk"],
  notes: "Coconut milk is richer in fat and better suited for sweet and creamy dishes"
}
*/
```

### Adapting a Dish for Allergies

```javascript
const adaptedPancake = getSafeRecipeAlternative("pancake", ["dairy", "eggs"]);
console.log(adaptedPancake);
/* Output:
{
  success: true,
  dishName: "pancake",
  safeToEat: false,
  problematicIngredients: ["eggs", "cow milk"],
  alternatives: {
    "eggs": ["commercial egg replacer", "ground flax seeds + water", "mashed banana", "tahini + water", "applesauce", "aquafaba (chickpea water)"],
    "cow milk": ["almond milk", "soy milk", "coconut milk", "oat milk", "rice milk"]
  },
  allAlternativesFound: true,
  message: "Alternatives found for all problematic ingredients in pancake"
}
*/
```

### Getting Safe Dish Recommendations

```javascript
const safeDishes = getSafeDishSuggestions(["gluten", "dairy"]);
console.log(safeDishes);
/* Output contains a list of safe dishes and dishes that can be adapted */
```

## Installation and Usage

### Installation

1. Copy the JavaScript file `mcp-food-allergies.js` to your project
2. Import the module in your code:

```javascript
const allergensSystem = require('./mcp-food-allergies.js');
```

### Basic Usage

```javascript
// Check allergens in a dish
const allergens = allergensSystem.getAllergensFromDish("pizza");

// Get alternatives for an allergen
const alternatives = allergensSystem.getAllergenAlternatives("wheat flour");

// Adapt a dish for allergies
const adaptedRecipe = allergensSystem.getSafeRecipeAlternative("pizza", ["gluten", "dairy"]);

// Get safe dish recommendations
const recommendations = allergensSystem.getSafeDishSuggestions(["gluten", "nuts"]);
```

## Using with LLM (Large Language Model)

The MCP system can work efficiently with large language models (like Claude, GPT, etc.) to provide a natural and intuitive user experience:

1. **Natural Language Queries** - The user can ask questions like:
   - "Are there any allergens in an omelet?"
   - "What are the alternatives to eggs in a pancake recipe?"
   - "What safe dishes are there for someone with a dairy and gluten allergy?"

2. **Response Processing** - The LLM can run the appropriate functions and process the raw data into understandable and simple answers

3. **Continuous Conversation** - The LLM can maintain an ongoing conversation, ask follow-up questions, and improve recommendations based on the user's specific needs

## Extending the System

The system is modular and can be easily extended:

1. **Adding Allergens** - Add new allergens to the `allergensDatabase`
2. **Adding Dishes** - Add new dishes to the `dishesDatabase`
3. **Developing Additional Functions** - For example, functions for filtering dishes by preparation time, cuisine region, etc.
4. **Integration with External APIs** - The system can be modified to use an external API instead of local databases

## License

This project is open source and distributed under the MIT License. You are free to use, modify, and distribute it according to the license terms.

---

Developed to improve food accessibility for people with food allergies and sensitivities.