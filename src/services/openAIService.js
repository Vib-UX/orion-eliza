require("dotenv").config();
const axios = require("axios");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const queryOpenAI = async (knowledgeBase, question) => {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key in environment variables.");
  }

  if (!knowledgeBase || !knowledgeBase.userProfile) {
    throw new Error("Invalid knowledge base: Missing user profile data.");
  }

  const userProfile = knowledgeBase.userProfile;

  // Extract full user profile & fitness details
  const profileDetails = `
  **User Profile:**
  - 👤 Name: ${userProfile.name}
  - 📅 Age: ${userProfile.age}
  - 📍 Location: ${userProfile.location}
  - 🏳️ Gender: ${userProfile.gender}
  - 📏 Height: ${userProfile.height}
  - ⚖️ Weight: ${userProfile.weight}

  **Fitness Data:**
  - 🎯 Fitness Goals: ${userProfile.health?.goals?.join(", ") || "Not provided"}
  - 🏋️ Current Routine: ${userProfile.health?.currentRoutine || "Not specified"}

  **Interests & Expertise:**
  - 🌍 Interests: ${
    userProfile.interests ? userProfile.interests.join(", ") : "None listed"
  }
  - 📖 Expertise: ${
    knowledgeBase.knowledge
      ? knowledgeBase.knowledge.join(", ")
      : "No expertise available"
  }

  **Bio & Specialization:**
  - 🔹 ${knowledgeBase.bio ? knowledgeBase.bio.join(" ") : "No bio available"}
  - 📚 Topics Covered: ${
    knowledgeBase.topics
      ? knowledgeBase.topics.join(", ")
      : "No topics specified"
  }

  **Unique Attributes:**
  - 📝 Message Examples: ${
    knowledgeBase.messageExamples
      ? JSON.stringify(knowledgeBase.messageExamples, null, 2)
      : "None available"
  }
  - 🎭 Style: ${
    knowledgeBase.style
      ? JSON.stringify(knowledgeBase.style, null, 2)
      : "No specific style"
  }
  - 🎯 Adjectives: ${
    knowledgeBase.adjectives
      ? knowledgeBase.adjectives.join(", ")
      : "No adjectives defined"
  }
  `;

  // System message to define assistant behavior
  const systemMessage = {
    role: "system",
    content: `You are an AI assistant named ${knowledgeBase.name}. Your expertise is tailored for ${userProfile.name}. You provide insights on blockchain, DeFi, and personal wellness, using their personal fitness profile and blockchain knowledge base.`,
  };

  // User message includes full profile details + the actual question
  const userMessage = {
    role: "user",
    content: `${profileDetails}\n\n**Question:** ${question}`,
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [systemMessage, userMessage],
        max_tokens: 250,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data.choices?.[0]?.message?.content?.trim() ||
      "No response received."
    );
  } catch (error) {
    console.error("Error querying OpenAI:", error?.response?.data || error);
    throw new Error("Failed to query OpenAI");
  }
};

module.exports = { queryOpenAI };
