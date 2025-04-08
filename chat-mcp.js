const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeRecipeAlternative,
  addDish,
  addAllergen
} = require("./functions");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

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

// Function to handle user input and integrate MCP with LLM
async function chatWithMCP(userInput) {
  let response;

  // Check if the user is asking about allergens in a dish
  if (userInput.includes("allergens in")) {
    const dishName = userInput.split("allergens in")[1].trim();
    response = getAllergensFromDish(dishName);

  // Check if the user is asking for alternatives to a specific allergen
  } else if (userInput.includes("alternatives for")) {
    const allergen = userInput.split("alternatives for")[1].trim();
    response = getAllergenAlternatives(allergen);

  // Check if the user is asking to add a new dish
  } else if (userInput.includes("add dish")) {
    const dishDetails = userInput.split("add dish")[1].trim();
    const [dishName, ingredients, category, difficulty, kosher] = dishDetails.split(", ");
    response = addDish(
      dishName,
      ingredients.split(";"),
      category,
      difficulty,
      kosher === "true"
    );

  // Check if the user is asking to add a new allergen
  } else if (userInput.includes("add allergen")) {
    const allergenDetails = userInput.split("add allergen")[1].trim();
    const [allergenName, category, alternatives, proteinContent, notes] = allergenDetails.split(", ");
    response = addAllergen(
      allergenName,
      category,
      alternatives.split(";"),
      proteinContent,
      notes
    );

  // If the question doesn't match, send it to Claude
  } else {
    response = await chatWithClaude(userInput);
  }

  return response;
}

// API endpoint to handle chat requests
app.post("/chat", async (req, res) => {
  const userInput = req.body.userInput;
  if (!userInput) {
    return res.status(400).json({ error: "userInput is required" });
  }

  const answer = await chatWithMCP(userInput);
  res.json({ answer });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});