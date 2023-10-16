'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Categories } from "./page";

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
  
  



export default function Jogos() {
    const [category, setCategory] = useState<string[]>([]);
    const [isDone, setIsDone] = useState(false);

    function selectedCategories(value: string) {
        if(!category.includes(value)) {
            setCategory(category => [...category, value])
            document.getElementById(value)!.classList.remove('border-slate-200');
            document.getElementById(value)!.classList.add('border-red-500');
        } else {
            setCategory(prev => prev.filter(category => category !== value))
            document.getElementById(value)!.classList.remove('border-red-500');
            document.getElementById(value)!.classList.add('border-slate-200');
        }
    }

    async function handleSubmit() {
        setIsDone(true)

        const bodyReq = JSON.stringify({ category: category })

        const res = await fetch('http://localhost:3000/api/jogos', {
            method: 'POST',
            body: bodyReq
        })
    }

    return <>
    {!isDone ? 
        <div className='flex flex-col justify-center items-center gap-5'>
            <div>
                <h1 className='font-bold text-3xl text-red-400'>Quais categorias de jogos você gostaria de jogar hoje?</h1>
                <p className='text-slate-500'>(Até 3 categorias)</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {categoriesJogos.map(option => {
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
        : 
        <div>
            <p>Response...</p>
        </div>}
    </>
}