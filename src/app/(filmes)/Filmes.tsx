"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useChat } from "ai/react";
import { Armchair, Beer, CloudLightning, SunMoon, Tv, X } from "lucide-react";
import { Categories, Types } from "@/models/models";
import Image from "next/image";

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
  { id: "15", value: "História" },
];

const typesFilme: Types[] = [
  {
    id: "1",
    icon: <Armchair className="w-36 h-36" strokeWidth={1.5} />,
    value: "Família",
  },
  {
    id: "2",
    icon: <Beer className="w-36 h-36" strokeWidth={1.5} />,
    value: "Sexta-feira a noite",
  },
  {
    id: "3",
    icon: <SunMoon className="w-36 h-36" strokeWidth={1.5} />,
    value: "Fim de tarde",
  },
  {
    id: "4",
    icon: <CloudLightning className="w-36 h-36" strokeWidth={1.5} />,
    value: "Chuva e sofá",
  },
  {
    id: "5",
    icon: <Tv className="w-36 h-36" strokeWidth={1.5} />,
    value: "Hoje é maratona",
  },
];

const platformFilme: Types[] = [
  {
    id: "1",
    icon: (
      <img
        src="/platforms/netflix.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Netflix",
  },
  {
    id: "2",
    icon: (
      <img
        src="/platforms/prime.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Amazon Prime",
  },
  {
    id: "3",
    icon: (
      <img
        src="/platforms/disney.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Disney+",
  },
  {
    id: "4",
    icon: (
      <img
        src="/platforms/globoplay.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Globoplay",
  },
  {
    id: "5",
    icon: (
      <img
        src="/platforms/telecine.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Telecine",
  },
  {
    id: "6",
    icon: (
      <img
        src="/platforms/hbo.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "HBO Max",
  },
  {
    id: "7",
    icon: (
      <img
        src="/platforms/appletv.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Apple TV+",
  },
  {
    id: "8",
    icon: (
      <img
        src="/platforms/paramount.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Paramount+",
  },
  {
    id: "9",
    icon: (
      <img
        src="/platforms/looke.svg"
        width={100}
        alt="Platform Image"
      />
    ),
    value: "Looke",
  },
  {
    id: "10",
    icon: <h2 className="text-slate-500">Qualquer plataforma</h2>,
    value: "Qualquer plataforma",
  },
];

export default function Filmes() {
  const [category, setCategory] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [responseAi, setResponseAi] = useState<string>();
  const [isSeletedCategory, setisSeletedCategory] = useState(false);
  const [isSeletedType, setIsSeletedType] = useState(false);
  const [isDone, setisDone] = useState(false);

  const { messages } = useChat();

  function selectedCategories(value: string) {
    if (!category.includes(value)) {
      setCategory((category) => [...category, value]);
      document.getElementById(value)!.classList.remove("border-slate-200");
      document.getElementById(value)!.classList.add("border-red-500");
    } else {
      setCategory((prev) => prev.filter((category) => category !== value));
      document.getElementById(value)!.classList.remove("border-red-500");
      document.getElementById(value)!.classList.add("border-slate-200");
    }
  }

  function selectedType(value: string) {
    setType(value);
    setIsSeletedType(true);
  }

  async function handleSubmit() {
    //setisSeletedCategory(true);
    const bodyReq = JSON.stringify({ category: category });

    const res = await fetch("http://localhost:3000/api/filmes", {
      method: "POST",
      body: bodyReq,
    });
    const response = await res.json();
    setResponseAi(response.data);
  }

  return (
    <>
      {!isSeletedCategory ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <h1 className="font-bold text-3xl text-red-400">
              Quais categorias de filmes você gostaria de ver hoje?
            </h1>
            <p className="text-slate-500">(Até 3 categorias)</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categoriesFilme.map((option) => {
              return (
                <Button
                  variant="outline"
                  className="flex flex-col justify-center items-center gap-3 bg-transparent hover:bg-red-100"
                  id={option.value}
                  key={option.value}
                  onClick={() => selectedCategories(option.value)}
                >
                  <p className="text-lg text-slate-500">{option.value}</p>
                </Button>
              );
            })}
          </div>
          <div>
            {category.length > 3 || category.length === 0 ? (
              <></>
            ) : (
              <div>
                <Button
                  type="submit"
                  variant="ghost"
                  onClick={() => setisSeletedCategory(true)}
                  className="flex justify-center items-center"
                >
                  <p>Pronto</p>
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : !isSeletedType ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <div>
            <h1 className="font-bold text-3xl text-red-400">
              Qual tipo de filme está a fim hoje?
            </h1>
          </div>
          <div className="flex justify-start items-center gap-4">
            {typesFilme.map((option) => {
              return (
                <Button
                  variant="outline"
                  className="w-60 h-60 flex flex-col justify-center items-center gap-3"
                  key={option.id}
                  onClick={() => selectedType(option.value)}
                >
                  {option.icon}
                  <h1 className="text-lg text-slate-500">{option.value}</h1>
                </Button>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10">
        <div>
          <h1 className="font-bold text-3xl text-red-400">
            Onde deseja assistir?
          </h1>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {platformFilme.map((option) => {
            return (
              <Button
                variant="outline"
                className="w-40 h-20 flex flex-col justify-center items-center gap-3"
                key={option.id}
                onClick={() => selectedType(option.value)}
              >
                {option.icon}
              </Button>
            )
          })}
        </div>
      </div>
      )}
    </>
  );
}

{
  /* <div>
            <p>{responseAi}</p>
        </div> */
}
