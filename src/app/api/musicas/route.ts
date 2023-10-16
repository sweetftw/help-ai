const scriptMusicas = 'Gostaria de uma recomendação de 10 artistas iconicos na seguintes categorias: '
const scriptResearchMusicas = 'Não gostei dessas opções, me de outras 10 opções'

export async function POST(req: Request) {
    const { category } = await req.json();

    const messageReq = scriptMusicas + category.toString()

    console.log(messageReq)
    
    const res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            body: JSON.stringify({ messages: messageReq})
        })

    const response = await res.json()
    console.log(response)


    return Response.json({ data: null })
}