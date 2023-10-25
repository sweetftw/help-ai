/* import { useState } from "react"
import { Button } from "./ui/button"



export type Categories = {
    id: string,
    value: string,
  }

const categoriesFilme: Categories[] = [
    { id: "1", value: "Ação" },
    { id: "2", value: "Aventura" },
    { id: "3", value: "Animação" },
    { id: "4", value: "Comédia" },
    { id: "5", value: "Comédia Romântica" },
    { id: "6", value: "Drama" },
    { id: "7", value: "Suspense" },
    { id: "8", value: "Ficção Científica" },
    { id: "9", value: "Fantasia" },
    { id: "10", value: "Terror" },
    { id: "11", value: "Romance" },
    { id: "12", value: "Mistério" },
    { id: "13", value: "Crime" },
    { id: "14", value: "Biografia" },
    { id: "15", value: "História" }
]

const categoriesSeries: Categories[] = [
    { id: "1", value: "Ação" },
    { id: "2", value: "Aventura" },
    { id: "3", value: "Animação" },
    { id: "4", value: "Comédia" },
    { id: "5", value: "Drama" },
    { id: "6", value: "Suspense" },
    { id: "7", value: "Ficção Científica" },
    { id: "8", value: "Fantasia" },
    { id: "9", value: "Terror" },
    { id: "10", value: "Policial" },
    { id: "11", value: "Médica" },
    { id: "12", value: "Comédia Romântica" },
    { id: "13", value: "Reality Show" },
    { id: "14", value: "Histórica" },
    { id: "15", value: "Super-heróis" }
]

const categoriesMusicas: Categories[] = [
    { id: "1", value: "Pop" },
    { id: "2", value: "Rock" },
    { id: "3", value: "Hip-Hop/Rap" },
    { id: "4", value: "Eletrônica" },
    { id: "5", value: "Country" },
    { id: "6", value: "R&B" },
    { id: "7", value: "Reggae" },
    { id: "8", value: "Jazz" },
    { id: "9", value: "Clássica" },
    { id: "10", value: "Sertanejo" },
    { id: "11", value: "Funk" },
    { id: "12", value: "Metal" },
    { id: "13", value: "Indie" },
    { id: "14", value: "Soul" },
    { id: "15", value: "Blues" }
]

const categoriesJogos: Categories[] = [
    { id: "1", value: "Ação" },
    { id: "2", value: "Aventura" },
    { id: "3", value: "RPG (Role-Playing Game)" },
    { id: "4", value: "Tiro em Primeira Pessoa (FPS)" },
    { id: "5", value: "Tiro em Terceira Pessoa" },
    { id: "6", value: "Esportes" },
    { id: "7", value: "Corrida" },
    { id: "8", value: "Estratégia em Tempo Real (RTS)" },
    { id: "9", value: "Estratégia por Turnos" },
    { id: "10", value: "Simulação" },
    { id: "11", value: "Quebra-cabeças" },
    { id: "12", value: "Jogos de Cartas" },
    { id: "13", value: "Jogos de Tabuleiro" },
    { id: "14", value: "Mundo Aberto" },
    { id: "15", value: "Horror de Sobrevivência" }
]

export default function SelectCategory(menu: string) {

    const [menuSelected, setMenuSeleted] = useState<Categories[]>([]);
    const [category, setCategory] = useState<string[]>([]);

    switch (menu) {
        case 'filmes':
            setMenuSeleted(categoriesFilme);
            break;
        case 'series':
            setMenuSeleted(categoriesSeries);
            break;
        case 'musicas':
            setMenuSeleted(categoriesMusicas);
            break;
        case 'jogos':
            setMenuSeleted(categoriesJogos);
            break;
        default:
            break;
    }

    return (
        <div className='flex flex-col justify-center items-center gap-5'>
            <div>
                <h1 className='font-bold text-3xl text-red-400'>Quais categorias de jogos você gostaria de jogar hoje?</h1>
                <p className='text-slate-500'>(Até 3 categorias)</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {menuSelected.map(option => {
                return (
                    <Button variant="outline" className='flex flex-col justify-center items-center gap-3 bg-transparent hover:bg-red-100' id={option.value} key={option.value} onClick={() => selectedCategories(option.value)}>
                        <p className='text-lg text-slate-500'>{option.value}</p>
                    </Button>
                )
                })}
            </div>
            <div>
                {category.length > 3 || category.length === 0 ? 
                <></> 
                :
                <div>

                <form onSubmit={handleSubmit}>
                    <Button type="submit" variant="ghost" className='flex justify-center items-center'>
                        <p>Pronto</p>
                    </Button>
                </form>
                </div>
                }
            </div>
        </div> 
    )
} */