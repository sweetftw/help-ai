'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Categories } from "../page";
import { useChat } from 'ai/react';

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



export default function Filmes() {
    const [category, setCategory] = useState<string[]>([]);
    const [responseAi, setResponseAi] = useState<string>();
    const [isDone, setIsDone] = useState(false);

    const { messages } = useChat();

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

        const res = await fetch('http://localhost:3000/api/filmes', {
            method: 'POST',
            body: bodyReq
        })
        const response = await res.json();
        setResponseAi(response.data);
    }

    return <>
    {!isDone ? 
        <div className='flex flex-col justify-center items-center gap-5'>
            <div>
                <h1 className='font-bold text-3xl text-red-400'>Quais categorias de filmes você gostaria de ver hoje?</h1>
                <p className='text-slate-500'>(Até 3 categorias)</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {categoriesFilme.map(option => {
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
            <p>{responseAi}</p>
        </div>}
    </>
}