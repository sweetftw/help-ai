//import { OpenAICompletion } from "@/service/openai";
import OpenAI from "openai";

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//const scriptResearchFilmes = "Não gostei dessas opções, me de outras 10 opções";

export async function POST(req: Request) {
  const { category, type, platform } = await req.json();

  const scriptSeries = `Gostaria de uma recomendação de 10 series aclamados pelas criticas nas categorias ${category.toString()} para ${type} na plataforma ${platform},
  me de a resposta em apenas a lista em texto`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [
      {
        role: "user",
        content: scriptSeries,
      },
    ],
  });
  console.log(response.choices[0].message.content);

  return Response.json({ data: response.choices[0].message.content });
}