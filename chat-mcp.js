const { Configuration, OpenAIApi } = require("openai");
const mcp = require("./mcp-food-allergies");

// הגדרת OpenAI API
const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY", // הכנס את המפתח שלך כאן
});
const openai = new OpenAIApi(configuration);

// פונקציה שמנהלת שיחה עם המשתמש
async function chatWithMCP(userInput) {
  // עיבוד השאלה של המשתמש
  let response;
  if (userInput.includes("allergens in")) {
    const dishName = userInput.split("allergens in")[1].trim();
    response = mcp.getAllergensFromDish(dishName);
  } else if (userInput.includes("alternatives for")) {
    const allergen = userInput.split("alternatives for")[1].trim();
    response = mcp.getAllergenAlternatives(allergen);
  } else if (userInput.includes("safe dishes for")) {
    const allergies = userInput.split("safe dishes for")[1].trim().split(", ");
    response = mcp.getSafeDishSuggestions(allergies);
  } else {
    // אם השאלה לא מתאימה, השתמש ב-LLM
    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer the following question based on food allergies: ${userInput}`,
      max_tokens: 150,
    });
    response = gptResponse.data.choices[0].text.trim();
  }

  return response;
}

// דוגמה לשיחה
(async () => {
  const userQuestion = "What are the allergens in pancake?";
  const answer = await chatWithMCP(userQuestion);
  console.log("User:", userQuestion);
  console.log("MCP:", answer);
})();