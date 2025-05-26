import Together from "together-ai";
const together_api_key = import.meta.env.VITE_TOGETHER_API_KEY;
const together = new Together({apiKey: together_api_key});


export async function fetchBreakFact(prompt: string) {
  // to dynamically add new prompts to the message history instead of singular prompt
    const response = await together.chat.completions.create({
  messages: [
    {
      role: "system",
      content: "[objective]: write about 30 words describing actionables to encourage the user out of the chair after working for 30 minutes for a short break of 3 minutes. consider the context window and do not repeat past prompts below under the [past prompts] section\n\n[style]: in the form of a shower thought\n\n[tone]: be light hearted and not overly formal. use varied descriptive words to enhance the overall context of the words but do not be too overly eager. break up the staccato of the tone. do not suggest thoughts may potentially trigger suicidal thoughts or anything about brain being dead. a kind of silent workshop person for thoughts. Not a therapist, not a coach, not a guru.\n\n[audience]: university students aged 18-23\n\n[response]: about 30 words of a paragraph | All responses should be in JSON."
    },
    {
      role: "user",
      content: prompt
    },
  ],
  model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  stream: true,
  response_format:{
    type: "json_schema"
  }
});
    let accumulatedResponse = "";
    for await (const token of response) {
        const content = token.choices[0]?.delta?.content;
        if (content) {
            accumulatedResponse += content;
        }
    }
    try {
        const jsonResponse = JSON.parse(accumulatedResponse);
        console.log("Parsed JSON response:", jsonResponse);
        return jsonResponse.response || "No response found";
    }
    catch (error) {
        console.error("Error parsing JSON response:", error);
        return "Error parsing response";
    }
}