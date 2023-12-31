"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useChat } from "ai/react";
import { Categories, Platform, Types } from "@/models/models";
import {
  Armchair,
  Beer,
  Bot,
  CloudLightning,
  RefreshCw,
  SunMoon,
  Tv,
  X,
} from "lucide-react";

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
  { id: "15", value: "Super-heróis" },
];

const typesSeries: Types[] = [
  {
    id: "1",
    icon: <Armchair className="w-36 h-36" strokeWidth={1.5} />,
    label: "Família",
    value: "assistir com a família",
  },
  {
    id: "2",
    icon: <Beer className="w-36 h-36" strokeWidth={1.5} />,
    label: "Sexta-feira a noite",
    value: "assistir sexta-feira a noite",
  },
  {
    id: "3",
    icon: <SunMoon className="w-36 h-36" strokeWidth={1.5} />,
    label: "Fim de tarde",
    value: "assistir fim de tarde",
  },
  {
    id: "4",
    icon: <CloudLightning className="w-36 h-36" strokeWidth={1.5} />,
    label: "Chuva e sofá",
    value: "assistir com o tempo chuvoso",
  },
  {
    id: "5",
    icon: <Tv className="w-36 h-36" strokeWidth={1.5} />,
    label: "Hoje é maratona",
    value: "maratonar",
  },
];

const platformFilme: Platform[] = [
  {
    id: "1",
    icon: <img src="/platforms/netflix.svg" width={100} alt="Platform Image" />,
    value: "Netflix",
  },
  {
    id: "2",
    icon: <img src="/platforms/prime.svg" width={100} alt="Platform Image" />,
    value: "Amazon Prime",
  },
  {
    id: "3",
    icon: <img src="/platforms/disney.svg" width={100} alt="Platform Image" />,
    value: "Disney+",
  },
  {
    id: "4",
    icon: (
      <img src="/platforms/globoplay.svg" width={100} alt="Platform Image" />
    ),
    value: "Globoplay",
  },
  {
    id: "5",
    icon: (
      <img src="/platforms/crunchyroll.svg" width={100} alt="Platform Image" />
    ),
    value: "Crunchyroll",
  },
  {
    id: "6",
    icon: <img src="/platforms/hbo.svg" width={100} alt="Platform Image" />,
    value: "HBO Max",
  },
  {
    id: "7",
    icon: <img src="/platforms/appletv.svg" width={100} alt="Platform Image" />,
    value: "Apple TV+",
  },
  {
    id: "8",
    icon: (
      <img src="/platforms/paramount.svg" width={100} alt="Platform Image" />
    ),
    value: "Paramount+",
  },
  {
    id: "9",
    icon: <img src="/platforms/looke.svg" width={100} alt="Platform Image" />,
    value: "Looke",
  },
  {
    id: "10",
    icon: <h2 className="text-slate-500">Qualquer plataforma</h2>,
    value: "Qualquer plataforma",
  },
];

export default function Series() {
  const [category, setCategory] = useState<string[]>([]);
  const [type, setType] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [responseAi, setResponseAi] = useState<string[]>([]);
  const [isSeletedCategory, setisSeletedCategory] = useState(false);
  const [isSeletedType, setIsSeletedType] = useState(false);
  const [isSeletedPlatform, setIsSeletedPlatform] = useState(false);
  const [isDone, setIsDone] = useState(false);

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

  async function handleSubmit(platform: string) {
    setIsSeletedPlatform(true);
    setPlatform(platform);
    const bodyReq = JSON.stringify({
      category: category,
      type: type,
      platform: platform,
    });

    //const res = await fetch(`http://localhost:3000/api/series`, {
    const res = await fetch(`https://help-ai.vercel.app/api/series`, {
      method: "POST",
      body: bodyReq,
    });
    const response = await res.json();

    const list = response.data.split("\n");

    setResponseAi(list);
    setIsDone(true);
  }

  return (
    <>
      {!isSeletedCategory ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <h1 className="font-bold text-3xl text-red-400">
              Quais categorias de série você gostaria de ver hoje?
            </h1>
            <p className="text-slate-500">(Até 3 categorias)</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categoriesSeries.map((option) => {
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
              Qual tipo de serie está a fim hoje?
            </h1>
          </div>
          <div className="flex justify-start items-center gap-4">
            {typesSeries.map((option) => {
              return (
                <Button
                  variant="outline"
                  className="w-60 h-60 flex flex-col justify-center items-center gap-3"
                  key={option.id}
                  onClick={() => selectedType(option.value)}
                >
                  {option.icon}
                  <h1 className="text-lg text-slate-500">{option.label}</h1>
                </Button>
              );
            })}
          </div>
        </div>
      ) : !isSeletedPlatform ? (
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
                  onClick={() => handleSubmit(option.value)}
                >
                  {option.icon}
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {!isDone ? (
            <div>
              <RefreshCw className="animate-spin" />
            </div>
          ) : (
            <div className="flex flex-row justify-center items-start gap-20">
              <div className="flex flex-col justify-center items-center">
                <Bot size={120} className="animate-bounce" />
                <p>Aqui está nossa recomendação</p>
              </div>

              <div className="text-center">
                {responseAi.map((option) => {
                  return <h1 className="text-lg mb-2">{option}</h1>;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
