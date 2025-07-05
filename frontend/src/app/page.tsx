"use client";

import { useState } from "react";
import { CardCasa } from "@/components/CardCasa";
import { CardEntrada } from "@/components/CardEntrada";
import { ModalAdicionarEntrada } from "@/components/ModalAdicionarEntrada";
import { ModalRegistrarCasa } from "@/components/ModalRegistrarCasa"; // MUDANÇA: Importa o novo modal

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
);

// Ícone de Adicionar (+)
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

export default function HomePage() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isEntradaModalOpen, setIsEntradaModalOpen] = useState(false);
  const [isCasaModalOpen, setIsCasaModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[rgb(var(--background-start-rgb))] text-[rgb(var(--foreground-rgb))] overflow-hidden">

      {!isLeftSidebarOpen && (<button onClick={() => setIsLeftSidebarOpen(true)} className="fixed top-4 left-4 p-1 rounded-full bg-[rgb(var(--surface-rgb))] hover:bg-[rgb(var(--primary-rgb))] z-20 cursor-pointer"> <ChevronRightIcon /> </button>)}
      {!isRightSidebarOpen && (<button onClick={() => setIsRightSidebarOpen(true)} className="fixed top-4 right-4 p-1 rounded-full bg-[rgb(var(--surface-rgb))] hover:bg-[rgb(var(--primary-rgb))] z-20 cursor-pointer"> <ChevronLeftIcon /> </button>)}

      <aside className={`transition-all duration-300 ease-in-out bg-[rgb(var(--surface-rgb))] border-r border-[rgb(var(--border-rgb))] flex-shrink-0 ${isLeftSidebarOpen ? 'w-1/6 p-4' : 'w-0 p-0'} overflow-hidden`}>
        <div className="overflow-hidden flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Minhas Casas</h2>
            <button onClick={() => setIsCasaModalOpen(true)} className="bg-zinc-700 p-0.5 rounded hover:bg-emerald-500 cursor-pointer" title="Adicionar Nova Casa">
              <PlusIcon />
            </button>
          </div>
          <button onClick={() => setIsLeftSidebarOpen(false)} className="text-zinc-400 hover:text-[rgb(var(--primary-rgb))] cursor-pointer"> <ChevronLeftIcon /> </button>
        </div>
        <CardCasa
          nome="Betano"
          usuario="paotheus"
          senha="tropado7"
          depositoMin={10}
          saqueMin={20}
        />
        <CardCasa
          nome="Betano"
          usuario="paotheus"
          senha="tropado7"
          depositoMin={10}
          saqueMin={20}
        />
        <CardCasa
          nome="Betano"
          usuario="paotheus"
          senha="tropado7"
          depositoMin={10}
          saqueMin={20}
        />
      </aside>

      <main className="relative flex-1 overflow-y-auto">
        <button onClick={() => setIsEntradaModalOpen(true)} className="cursor-pointer absolute bottom-6 right-6 bg-[rgb(var(--surface-rgb))] text-emerald-500 border border-emerald-500 p-3 rounded-full shadow-lg transition-all z-10" title="Adicionar Nova Entrada">
          <PlusIcon />
        </button>

        <div className={`p-6 transition-all duration-300 ease-in-out
                      ${!isLeftSidebarOpen ? 'pl-15' : ''} 
                      ${!isRightSidebarOpen ? 'pr-15' : ''}`}>
          <header className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
              Greenbook
            </h1>
            <p className="text-zinc-400">Suas entradas e lucros em um só lugar.</p>
          </header>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
            <CardEntrada
              tipo="normal"
              modalidade="back"
              titulo="Santos ser o maior time da Terra"
              casaDeAposta="Betano"
              stake={1000.00}
              odd={1.01}
              status="Ganha"
            />
            <CardEntrada
              tipo="normal"
              modalidade="lay"
              titulo="Palmeiras ganhar Mundial"
              casaDeAposta="Luvabet"
              stake={1.00}
              odd={500.00}
              status="Perdida"
            />
            <CardEntrada
              tipo="normal"
              modalidade="back"
              titulo="Próximo gol do Corinthians ser 100% legal"
              casaDeAposta="Superbet"
              stake={5.00}
              odd={25.00}
              status="Pendente"
            />
            <CardEntrada
              tipo="protecao"
              modalidade="lay"
              titulo="Juiz dar um 'empurrãozinho'"
              casaDeAposta="Bolsa de Apostas"
              stake={20.00}
              odd={1.8}
              status="Pendente"
            />
          </div>
        </div>
      </main>

      {/* Coluna Direita */}
      <aside className={`transition-all duration-300 ease-in-out bg-[rgb(var(--surface-rgb))] border-l border-[rgb(var(--border-rgb))] flex-shrink-0 ${isRightSidebarOpen ? 'w-1/6 p-4' : 'w-0 p-0'}`}>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="flex justify-between flex-wrap mb-4">
            <button onClick={() => setIsRightSidebarOpen(false)} className="cursor-pointer text-zinc-400 hover:text-[rgb(var(--primary-rgb))]"> <ChevronRightIcon /> </button>
            <h2 className="text-xl font-bold">Jogos do Dia</h2>
          </div>
          <p className="text-sm text-zinc-400">API de jogos será integrada aqui.</p>
        </div>
      </aside>

      <ModalAdicionarEntrada isOpen={isEntradaModalOpen} onClose={() => setIsEntradaModalOpen(false)} />
      <ModalRegistrarCasa isOpen={isCasaModalOpen} onClose={() => setIsCasaModalOpen(false)} />
    </div>
  );
}