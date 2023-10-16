const scriptFilmes = 'Gostaria de uma recomendação de 10 filmes aclamados pelas criticas com as seguintes categorias: '
const scriptResearchFilmes = 'Não gostei dessas opções, me de outras 10 opções'

export async function POST(req: Request) {
    const { category } = await req.json();

    const messageReq = scriptFilmes + category.toString()

    console.log(messageReq)
    
    const res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            body: JSON.stringify({ messages: messageReq})
        })

    const response = await res.json()
    console.log(response)


    return Response.json({ data: null })
}