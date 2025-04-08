const allergensDatabase = {
  // Dairy
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
  "butter": {
    category: "dairy",
    alternatives: ["margarine", "coconut oil", "olive oil"],
    proteinContent: "low",
    notes: "Coconut oil is a good alternative for baking"
  },

  // Gluten
  "wheat": {
    category: "gluten",
    alternatives: ["rice flour", "almond flour", "coconut flour", "oat flour"],
    proteinContent: "medium",
    notes: "Rice flour is a versatile alternative for most recipes"
  },
  "barley": {
    category: "gluten",
    alternatives: ["quinoa", "millet", "buckwheat"],
    proteinContent: "medium",
    notes: "Quinoa is a high-protein alternative suitable for salads and sides"
  },
  "rye": {
    category: "gluten",
    alternatives: ["oat flour", "rice flour", "corn flour"],
    proteinContent: "medium",
    notes: "Oat flour works well in baking as a substitute for rye"
  },

  // Nuts
  "peanuts": {
    category: "nuts",
    alternatives: ["sunflower seed butter", "soy butter", "coconut butter"],
    proteinContent: "high",
    notes: "Sunflower seed butter is a common alternative for peanut butter"
  },
  "almonds": {
    category: "nuts",
    alternatives: ["sunflower seeds", "pumpkin seeds", "coconut flakes"],
    proteinContent: "high",
    notes: "Pumpkin seeds are a good alternative for snacking or baking"
  },
  "cashews": {
    category: "nuts",
    alternatives: ["macadamia nuts", "sunflower seeds", "coconut cream"],
    proteinContent: "high",
    notes: "Coconut cream can replace cashews in creamy recipes"
  },

  // Eggs
  "eggs": {
    category: "eggs",
    alternatives: ["flaxseed meal + water", "chia seeds + water", "mashed banana", "applesauce"],
    proteinContent: "high",
    notes: "Flaxseed meal is a great binding agent for baking"
  },

  // Seafood
  "fish": {
    category: "seafood",
    alternatives: ["tofu", "jackfruit", "seitan"],
    proteinContent: "high",
    notes: "Tofu is a versatile alternative for fish in savory dishes"
  },
  "shellfish": {
    category: "seafood",
    alternatives: ["mushrooms", "jackfruit", "tofu"],
    proteinContent: "medium",
    notes: "Mushrooms can mimic the texture of shellfish in many recipes"
  },

  // Soy
  "soy": {
    category: "soy",
    alternatives: ["coconut milk", "almond milk", "rice milk"],
    proteinContent: "medium",
    notes: "Coconut milk is a rich alternative for soy milk in creamy dishes"
  },

  // Others
  "honey": {
    category: "sweetener",
    alternatives: ["maple syrup", "agave nectar", "date syrup"],
    proteinContent: "low",
    notes: "Maple syrup is a 1:1 substitute for honey in most recipes"
  },
  "sugar": {
    category: "sweetener",
    alternatives: ["stevia", "monk fruit sweetener", "coconut sugar"],
    proteinContent: "low",
    notes: "Coconut sugar has a similar flavor profile to brown sugar"
  },
  "corn": {
    category: "grains",
    alternatives: ["rice", "quinoa", "millet"],
    proteinContent: "medium",
    notes: "Quinoa is a high-protein alternative for corn in salads and sides"
  }
};

module.exports = allergensDatabase;