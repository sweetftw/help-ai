"use client";

import { Button } from "@/components/ui/button";
import { Categories, Platform, Types } from "@/models/models";
import { useState } from "react";
import {
  Armchair,
  Bed,
  Beer,
  Bot,
  CloudLightning,
  Frown,
  HandMetal,
  RefreshCw,
  Snail,
  SunMoon,
  Tv,
  X,
} from "lucide-react";

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
  { id: "15", value: "Blues" },
];

const typesMusicas: Types[] = [
  {
    id: "1",
    icon: <Frown className="w-36 h-36" strokeWidth={1.5} />,
    label: "Quero chorar",
    value: "chorar",
  },
  {
    id: "2",
    icon: <Beer className="w-36 h-36" strokeWidth={1.5} />,
    label: "Hoje é sexta",
    value: "comemorar",
  },
  {
    id: "3",
    icon: <HandMetal className="w-36 h-36" strokeWidth={1.5} />,
    label: "Acho que vou pedir demissão",
    value: "escutar e me sentir empoderada",
  },
  {
    id: "4",
    icon: <Snail className="w-36 h-36" strokeWidth={1.5} />,
    label: "Pleníssimo",
    value: "ficar calmo",
  },
  {
    id: "5",
    icon: <Bed className="w-36 h-36" strokeWidth={1.5} />,
    label: "Aquela soneca",
    value: "dormir",
  },
];

const platformMusicas: Platform[] = [
  {
    id: "1",
    icon: <img src="/platforms/spotify.svg" width={100} alt="Platform Image" />,
    value: "Spotify",
  },
  {
    id: "2",
    icon: <img src="/platforms/youtube-music.svg" width={100} alt="Platform Image" />,
    value: "Youtube Music",
  },
  {
    id: "3",
    icon: <img src="/platforms/amazon-music.svg" width={100} alt="Platform Image" />,
    value: "Amazon Music",
  },
  {
    id: "4",
    icon: (
      <img src="/platforms/deezer.svg" width={100} alt="Platform Image" />
    ),
    value: "Deezer",
  },
  {
    id: "5",
    icon: <h2 className="text-slate-500">Qualquer plataforma</h2>,
    value: "Qualquer plataforma",
  },
];

export default function Musicas() {
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

    //const res = await fetch(`http://localhost:3000/api/musicas`, {
    const res = await fetch(`https://help-ai.vercel.app/api/musicas`, {
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
              Quais gênero está mais afim de curtir hoje?
            </h1>
            <p className="text-slate-500">(Até 3 categorias)</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categoriesMusicas.map((option) => {
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
            {typesMusicas.map((option) => {
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
              Onde deseja escutar?
            </h1>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {platformMusicas.map((option) => {
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
