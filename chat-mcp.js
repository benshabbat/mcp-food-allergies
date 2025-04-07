const axios = require("axios");
const mcp = require("./mcp-food-allergies");

// Claude API key and URL configuration
const CLAUDE_API_KEY = "YOUR_CLAUDE_API_KEY"; // Replace with your Claude API key
const CLAUDE_API_URL = "https://api.anthropic.com/v1/complete"; // API URL (check official documentation)

// Function to send a question to Claude
async function chatWithClaude(userInput) {
  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        prompt: `Answer the following question based on food allergies: ${userInput}`,
        model: "claude-v1", // Check the exact model name in the documentation
        max_tokens_to_sample: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CLAUDE_API_KEY}`,
        },
      }
    );

    return response.data.completion.trim();
  } catch (error) {
    console.error("Error communicating with Claude:", error.message);
    return "Sorry, I couldn't process your request.";
  }
}

// Function to handle user input and integrate MCP
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

  // If the question doesn't match, send it to Claude
  } else {
    response = await chatWithClaude(userInput);
  }

  return response;
}

// Example conversation
(async () => {
  const userQuestion = "What are the allergens in pancake?";
  const answer = await chatWithMCP(userQuestion);
  console.log("User:", userQuestion);
  console.log("MCP:", answer);
})();