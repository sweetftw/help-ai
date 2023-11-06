'use client'

import { Button } from "@/components/ui/button"
import { Categories } from "@/models/models";
import { useState } from "react";

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
  
  



export default function Musicas() {
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

        const res = await fetch('http://localhost:3000/api/musicas', {
            method: 'POST',
            body: bodyReq
        })
    }

    return <>
    {!isDone ? 
        <div className='flex flex-col justify-center items-center gap-5'>
            <div>
                <h1 className='font-bold text-3xl text-red-400'>Quais destes gêneros você gostaria de escutar hoje?</h1>
                <p className='text-slate-500'>(Até 3 gêneros)</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {categoriesMusicas.map(option => {
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