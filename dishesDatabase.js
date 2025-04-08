const dishesDatabase = {
  // Breakfast dishes
  "pancake": {
    ingredients: ["wheat flour", "eggs", "cow milk"],
    category: "breakfast",
    difficulty: "easy",
    kosher: true
  },
  "omelet": {
    ingredients: ["eggs", "salt", "pepper"],
    category: "breakfast",
    difficulty: "easy",
    kosher: true
  },
  "muesli": {
    ingredients: ["oats", "cow milk", "almonds", "raisins"],
    category: "breakfast",
    difficulty: "easy",
    kosher: true
  },
  "shakshuka": {
    ingredients: ["eggs", "tomatoes", "onions", "peppers", "olive oil"],
    category: "breakfast",
    difficulty: "medium",
    kosher: true
  },

  // Main course dishes
  "hamburger": {
    ingredients: ["beef", "wheat bun", "lettuce", "tomato", "onion", "ketchup", "mustard"],
    category: "main course",
    difficulty: "medium",
    kosher: true
  },
  "grilled salmon": {
    ingredients: ["salmon", "lemon", "olive oil", "garlic"],
    category: "main course",
    difficulty: "medium",
    kosher: true
  },
  "falafel": {
    ingredients: ["chickpeas", "onions", "garlic", "parsley", "tahini"],
    category: "main course",
    difficulty: "medium",
    kosher: true
  },
  "hummus": {
    ingredients: ["chickpeas", "tahini", "lemon juice", "garlic"],
    category: "main course",
    difficulty: "easy",
    kosher: true
  },
  "couscous": {
    ingredients: ["couscous", "vegetables", "spices"],
    category: "main course",
    difficulty: "medium",
    kosher: true
  },
  "roast chicken": {
    ingredients: ["chicken", "potatoes", "carrots", "onions", "spices"],
    category: "main course",
    difficulty: "medium",
    kosher: true
  },

  // Desserts
  "chocolate cake": {
    ingredients: ["wheat flour", "eggs", "cow milk", "cocoa powder", "sugar"],
    category: "desserts",
    difficulty: "medium",
    kosher: true
  },
  "fruit salad": {
    ingredients: ["apples", "oranges", "bananas", "grapes", "kiwi"],
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
  "apple pie": {
    ingredients: ["apples", "wheat flour", "sugar", "cinnamon", "butter"],
    category: "desserts",
    difficulty: "medium",
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
  "granola bar": {
    ingredients: ["oats", "honey", "almonds", "raisins"],
    category: "snacks",
    difficulty: "medium",
    kosher: true
  },

  // Soups
  "vegetable soup": {
    ingredients: ["carrots", "celery", "onions", "potatoes", "zucchini", "spices"],
    category: "soups",
    difficulty: "easy",
    kosher: true
  },
  "lentil soup": {
    ingredients: ["lentils", "onions", "carrots", "celery", "spices"],
    category: "soups",
    difficulty: "easy",
    kosher: true
  },
  "chicken soup": {
    ingredients: ["chicken", "carrots", "celery", "onions", "noodles"],
    category: "soups",
    difficulty: "medium",
    kosher: true
  },

  // Salads
  "israeli salad": {
    ingredients: ["tomatoes", "cucumbers", "onions", "parsley", "olive oil", "lemon juice"],
    category: "salads",
    difficulty: "easy",
    kosher: true
  },
  "caesar salad": {
    ingredients: ["lettuce", "croutons", "parmesan cheese", "caesar dressing"],
    category: "salads",
    difficulty: "medium",
    kosher: true
  },
  "quinoa salad": {
    ingredients: ["quinoa", "cucumbers", "tomatoes", "parsley", "lemon juice"],
    category: "salads",
    difficulty: "easy",
    kosher: true
  }
};

module.exports = dishesDatabase;