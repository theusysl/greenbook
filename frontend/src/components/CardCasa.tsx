"use client";

import { useState } from 'react';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .523-.134 1.014-.369 1.438m-1.154 1.154A3 3 0 019 12c0-.523.134-1.014.369-1.438" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.423 6.423C4.07 8.07 2.25 12 2.25 12s3.75 6.75 9.75 6.75c1.61 0 3.13-.28 4.477-.777M17.577 17.577C19.93 15.93 21.75 12 21.75 12s-3.75-6.75-9.75-6.75c-.98 0-1.93.09-2.823.26" />
  </svg>
);

type CardCasaProps = {
  nome: string;
  usuario?: string;
  senha?: string;
  depositoMin: number;
  saqueMin: number;
};

export function CardCasa(props: CardCasaProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 mb-3 overflow-hidden">
      <h3 className="font-bold text-emerald-500">{props.nome}</h3>
      
      {props.usuario && (
        <p className="text-sm text-zinc-400 mt-2">
          Usuário: <span className="font-mono text-zinc-200">{props.usuario}</span>
        </p>
      )}

      {props.senha && (
        <div className="text-sm text-zinc-400 mt-1 flex flex-wrap items-center gap-1">
          <span>Senha: </span>
          <span className="font-mono text-zinc-200 tracking-wider">
            {senhaVisivel ? props.senha : '•••••'}
          </span>
          <button 
            onClick={() => setSenhaVisivel(!senhaVisivel)} 
            className="cursor-pointer text-zinc-500 hover:text-emerald-500"
            title={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {senhaVisivel ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
      )}

      <div className="flex justify-between flex-wrap gap-x-2 text-xs mt-3 text-zinc-400">
        <div>Dep. Mín: R${props.depositoMin.toFixed(2)}</div>
        <div>Saque Mín: R${props.saqueMin.toFixed(2)}</div>
      </div>
    </div>
  );
}