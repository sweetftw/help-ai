'use client'

import { Button } from "@/components/ui/button"
import { Popcorn, Gamepad2, Music, Clapperboard, Bot, RotateCcw } from 'lucide-react';
import { useState } from "react";
import Filmes from "./(filmes)/Filmes";
import Series from "./Series";
import Musicas from "./Musicas";
import Jogos from "./Jogos";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type Categories = {
  id: string,
  value: string,
}

const categoriesOptions = [
  { 
    icon: <Clapperboard className='w-36 h-36' strokeWidth={1.5}/>,
    value: 'Filmes'
  },
  { 
    icon: <Popcorn className='w-36 h-36' strokeWidth={1.5}/>,
    value: 'Series'
  },
  { 
    icon: <Music className='w-36 h-36' strokeWidth={1.5}/>,
    value: 'Musicas'
  },
  { 
    icon: <Gamepad2 className='w-36 h-36' strokeWidth={1.5}/>,
    value: 'Jogos'
  }
]

export default function Home() {


  const [category, setCategory] = useState('');

  console.log(category)

  return (
    <main className="flex min-h-screen flex-col gap-16 py-12 mx-64">
      <header className='flex flex-col justify-center items-start gap-5'>
        <div className="flex justify-between items-center gap-7">
          <h1 className='text-7xl font-extrabold'>help AI</h1>
          <Bot className="w-16 h-16" />
        </div>
        <p className='text-lg text-slate-500'>Não perca mais tempo, deixa que fizemos um match perfeito para você!</p>
      </header>
      <section className='flex flex-col justify-center items-center'>
        <div className="w-full flex justify-end items-center">
          <TooltipProvider >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => setCategory('')}>
                    <RotateCcw />
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refazer minhas escolhas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {category == '' ? 
        <div className='flex flex-col justify-center items-center gap-5'>
          <h1 className='font-bold text-3xl text-red-400'>O que podemos te ajudar a escolher hoje</h1>
          <div className='flex justify-start items-center gap-4'>
            {categoriesOptions.map(option => {
              return (
                <Button variant="outline" className='w-60 h-60 flex flex-col justify-center items-center gap-3' key={option.value} onClick={() => setCategory(option.value)}>
                  {option.icon}
                  <h1 className='text-lg text-slate-500'>{option.value}</h1>
                </Button>
              )
            })}
          </div>
        </div> 
        : category == 'Filmes' ? 
          <Filmes />
        : category == 'Series' ?
          <Series />
        : category == 'Musicas' ?
          <Musicas />
        : category == 'Jogos' ?
          <Jogos />
        : <></>
        }
      </section>
    </main>
  )
}
