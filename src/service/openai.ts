import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function OpenAICompletion(messages: string) {
    console.log(messages)
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [
      {
        role: "user",
        content: messages,
      },
    ],
  });

  return Response.json({ data: response.choices[0].message.content });
}