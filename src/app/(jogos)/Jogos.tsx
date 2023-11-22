"use client";

import { Button } from "@/components/ui/button";
import { Categories, Platform, Types } from "@/models/models";
import { useState } from "react";
import {
  Armchair,
  Beer,
  Bot,
  CloudLightning,
  Frown,
  Gamepad,
  Gamepad2,
  LandPlot,
  Mountain,
  RefreshCw,
  SunMoon,
  Swords,
  Trophy,
  Tv,
  X,
} from "lucide-react";

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
  { id: "15", value: "Horror de Sobrevivência" },
];

const typesJogos: Types[] = [
  {
    id: "1",
    icon: <Gamepad2 className="w-36 h-36" strokeWidth={1.5} />,
    label: "Quero quebrar meu controle",
    value: "desestressar porem com muita acao",
  },
  {
    id: "2",
    icon: <LandPlot className="w-36 h-36" strokeWidth={1.5} />,
    label: "Apenas quero relaxar",
    value: "relaxar",
  },
  {
    id: "3",
    icon: <Swords className="w-36 h-36" strokeWidth={1.5} />,
    label: "Último heroi da terra",
    value: "jogar um pvp de acao",
  },
  {
    id: "4",
    icon: <Mountain className="w-36 h-36" strokeWidth={1.5} />,
    label: "Explorador dos 4 cantos",
    value: "explorar",
  },
  {
    id: "5",
    icon: <Trophy className="w-36 h-36" strokeWidth={1.5} />,
    label: "O Squad ta on",
    value: "jogar com os amigos",
  },
];

const platformJogos: Platform[] = [
  {
    id: "1",
    icon: <img src="/platforms/xbox.svg" width={100} alt="Platform Image" />,
    value: "Xbox",
  },
  {
    id: "2",
    icon: <img src="/platforms/playstation.svg" width={100} alt="Platform Image" />,
    value: "PlayStation",
  },
  {
    id: "3",
    icon: <img src="/platforms/nintendo.svg" width={100} alt="Platform Image" />,
    value: "Nintendo",
  },
  {
    id: "4",
    icon: (
      <img src="/platforms/pc-master-race.svg" width={100} alt="Platform Image" />
    ),
    value: "PC",
  },
  {
    id: "5",
    icon: <h2 className="text-slate-500">Qualquer plataforma</h2>,
    value: "Qualquer plataforma",
  },
];

export default function Jogos() {
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

    //const res = await fetch(`http://localhost:3000/api/jogos`, {
    const res = await fetch(`https://help-ai.vercel.app/api/jogos`, {
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
              Qual gênero de jogo está afim hoje?
            </h1>
            <p className="text-slate-500">(Até 3 categorias)</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categoriesJogos.map((option) => {
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
              Qual seu humor hoje?
            </h1>
          </div>
          <div className="flex justify-start items-center gap-4">
            {typesJogos.map((option) => {
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
            {platformJogos.map((option) => {
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
