const {
  getAllergensFromDish,
  getAllergenAlternatives,
  getDishesWithAllergen
} = require('./mcp-food-allergies');

test('getAllergensFromDish should return allergens for a valid dish', () => {
  const result = getAllergensFromDish("pancake");
  expect(result.success).toBe(true);
  expect(result.allergens).toContain("wheat flour");
});

test('getAllergenAlternatives should return alternatives for a valid allergen', () => {
  const result = getAllergenAlternatives("cow milk");
  expect(result.success).toBe(true);
  expect(result.alternatives).toContain("almond milk");
});

test('getDishesWithAllergen should return dishes containing a specific allergen', () => {
  const result = getDishesWithAllergen("peanuts");
  expect(result.success).toBe(true);
  expect(result.dishes.length).toBeGreaterThan(0);
});