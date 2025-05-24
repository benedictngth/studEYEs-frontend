import axios from "axios";

const openai_api_key = import.meta.env.VITE_OPENAI_API_KEY

export async function fetchUselessFact(prompt: string) {
    
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            { model: "gpt-3.5-turbo",
                messages: [
                    {role: "user", content: prompt},
                ],
            },
            { headers: {
                Authorization: `Bearer ${openai_api_key}`,
                "Content-Type": "application/json",
}
            }
        );
        return response.data.choices[0].message.content;
    } catch (error: any) {
    console.error("Error calling OpenAI:", error);
    if (error.response?.status === 429) {
      return "⚠️ You're sending too many requests. Try again in a moment.";
    }
    return "⚠️ Could not fetch a message.";
  }
}