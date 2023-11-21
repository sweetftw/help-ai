import { OpenAICompletion } from "@/service/openai";

const scriptResearchFilmes = "Não gostei dessas opções, me de outras 10 opções";

export async function POST(req: Request) {
  const { category, type, platform } = await req.json();

  const scriptFilmes = `Gostaria de uma recomendação de 10 filmes aclamados pelas criticas nas categorias ${category.toString()} para ${type} na plataforma ${platform},
  me de a resposta em apenas a lista em texto`;

  console.log('api filmes')

 /*  const res = await fetch(`http://localhost:3000/api/chat`, {
  //const res = await fetch(`https://help-ai.vercel.app/api/chat`, {
    method: "POST",
    body: JSON.stringify({ messages: scriptFilmes }),
  });
  const responseAI = await res.json(); */

  const res = await OpenAICompletion(scriptFilmes)
  const responseAI = await res.json();
  console.log(responseAI.data);

  return Response.json({ data: responseAI.data });
}
