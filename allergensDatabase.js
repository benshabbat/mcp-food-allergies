const allergensDatabase = {
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
  // Add the rest of the allergens here...
};

module.exports = allergensDatabase;