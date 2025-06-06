# MCP System for Food Allergen Substitutions

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Importing the MCP Module](#importing-the-mcp-module)
   - [Key Capabilities](#key-capabilities)
4. [Databases](#databases)
   - [Allergens Database](#allergens-database)
   - [Dishes Database](#dishes-database)
5. [Main Functions](#main-functions)
   - [`getAllergensFromDish`](#getallergensfromdish)
   - [`getAllergenAlternatives`](#getallergenalternatives)
   - [`getSafeRecipeAlternative`](#getsaferecipealternative)
   - [`getSafeDishSuggestions`](#getsafedishsuggestions)
   - [`addDish`](#adddish)
   - [`addAllergen`](#addallergen)
6. [Usage Examples](#usage-examples)
7. [Using with LLM](#using-with-llm)
8. [Extending the System](#extending-the-system)
9. [License](#license)

---

## Overview

The MCP (Model Context Protocol) for Food Allergen Substitutions is a tool designed to help people with food allergies find safe alternatives to allergenic ingredients in a wide variety of dishes and recipes. The system provides functions to identify allergens, suggest alternatives, and recommend safe dishes based on user-defined allergies.

---

## Installation

1. Clone or download the repository to your local machine:
   ```bash
   git clone https://github.com/benshabbat/mcp-food-allergies.git
   ```
2. Ensure you have Node.js installed on your system.
3. Install dependencies using:
   ```bash
   npm install
   ```

---

## Usage

### Importing the MCP Module

To use the MCP system in your project, import the module into your JavaScript file:

```javascript
const mcp = require('./mcp-food-allergies.js');
const {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeDishSuggestions,
  getSafeRecipeAlternative,
  addDish,
  addAllergen
} = require('./functions');
```

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

### `addDish(dish)`

Adds a new dish to the dishes database.

**Parameters:**
- `dish` (object): An object containing the dish name, list of ingredients/allergens, category, and difficulty level

**Output:**
- An object indicating the success of the operation

### `addAllergen(allergen)`

Adds a new allergen to the allergens database.

**Parameters:**
- `allergen` (object): An object containing the allergen name, category, list of alternatives, and notes

**Output:**
- An object indicating the success of the operation

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
    "eggs": ["commercial egg replacer", "ground flax seeds + water", "mashed banana"],
    "cow milk": ["almond milk", "soy milk", "coconut milk"]
  },
  allAlternativesFound: true,
  message: "Alternatives found for all problematic ingredients in pancake"
}
*/
```

### Getting Safe Dish Recommendations

```javascript
const safeDishes = mcp.getSafeDishSuggestions(["gluten", "nuts"]);
console.log(safeDishes);
/* Output:
{
  success: true,
  allergies: ["gluten", "nuts"],
  safeDishes: [
    { dishName: "omelet", category: "breakfast", difficulty: "easy" }
  ],
  potentiallyAdaptableDishes: [
    {
      dishName: "pancake",
      category: "baked goods",
      difficulty: "easy",
      problematicIngredients: ["wheat flour", "nuts"]
    }
  ]
}
*/
```

### Adding a New Dish

```javascript
const result = addDish(
  "vegan pizza",
  ["vegan cheese", "tomato sauce", "gluten-free crust"],
  "main course",
  "medium",
  true
);
console.log(result);
/* Output:
{
  success: true,
  message: "Dish added successfully"
}
*/
```

### Adding a New Allergen

```javascript
const result = addAllergen(
  "soy milk",
  "dairy alternative",
  ["almond milk", "oat milk", "coconut milk"],
  "medium",
  "Soy milk is a common alternative for cow milk but may cause allergies in some people."
);
console.log(result);
/* Output:
{
  success: true,
  message: "Allergen added successfully"
}
*/
```

## Installation and Usage

### Installation

1. Copy the JavaScript file `mcp-food-allergies.js` to your project
2. Import the module in your code:
```javascript
const mcp = require('./mcp-food-allergies.js');
```

### Basic Usage

```javascript
// Check allergens in a dish
const allergens = mcp.getAllergensFromDish("pizza");
// Get alternatives for an allergen
const alternatives = mcp.getAllergenAlternatives("wheat flour");
// Adapt a dish for allergies
const adaptedRecipe = mcp.getSafeRecipeAlternative("pizza", ["gluten", "dairy"]);
// Get safe dish recommendations
const recommendations = mcp.getSafeDishSuggestions(["gluten", "nuts"]);
```

## Using with LLM (Large Language Model)

The MCP system can work efficiently with large language models (like Claude, GPT, etc.) to provide a natural and intuitive user experience:

1. **Natural Language Queries** - The user can ask questions like:
   - "Are there any allergens in an omelet?"
   - "What are the alternatives to eggs in a pancake recipe?"
   - "What safe dishes are there for someone with a dairy and gluten allergy?"
2. **Response Processing** - The LLM can run the appropriate functions and process the raw data into understandable and simple answers
3. **Continuous Conversation** - The LLM can maintain an ongoing conversation, ask follow-up questions, and improve recommendations based on the user's specific needs

### Example Integration with OpenAI

```javascript
const { Configuration, OpenAIApi } = require("openai");
const mcp = require("./mcp-food-allergies");

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY", // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

// Function to handle user input and provide responses
async function chatWithMCP(userInput) {
  let response;
  // Check if the user is asking about allergens in a dish
  if (userInput.includes("allergens in")) {
    const dishName = userInput.split("allergens in")[1].trim();
    response = mcp.getAllergensFromDish(dishName);
  // Check if the user is asking for alternatives to a specific allergen
  } else if (userInput.includes("alternatives for")) {
    const allergen = userInput.split("alternatives for")[1].trim();
    response = mcp.getAllergenAlternatives(allergen);
  // Check if the user is asking for safe dishes based on allergies
  } else if (userInput.includes("safe dishes for")) {
    const allergies = userInput.split("safe dishes for")[1].trim().split(", ");
    response = mcp.getSafeDishSuggestions(allergies);
  // If the question doesn't match predefined patterns, use the LLM
  } else {
    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer the following question based on food allergies: ${userInput}`,
      max_tokens: 150,
    });
    response = gptResponse.data.choices[0].text.trim();
  }
  return response;
}

// Example usage
(async () => {
  const userQuestion = "What are the allergens in pancake?";
  const answer = await chatWithMCP(userQuestion);
  console.log("User:", userQuestion);
  console.log("MCP:", answer);
})();
```

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

### Summary of Changes:
1. **English Translation**: All content is now in English.
2. **Improved Formatting**: Added clear sections for installation, usage, and examples.
3. **Examples**: Provided detailed examples for each function.

## Contributing

We welcome contributions to the MCP System for Food Allergen Substitutions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
